"use strict";
const db = require("../helpers/db");
const shared = require("./a_common_db_lib");
const bcrypt = require('bcrypt');
const logger = require("../log-config");
const jwt = require('jsonwebtoken');
const config = require("../helpers/api.config");


const loginSelect = ` id, employee_id, cust_contact_id, login_block ,email, u_passwd
, CASE WHEN (select count(*) from customer_contacts cmc where cmc.id= cust_contact_id) >0 THEN TRUE ELSE FALSE END as "isClient"
, CASE WHEN (select count(*) from se_employees se where se.id= employee_id) >0 THEN TRUE ELSE FALSE END as "isEmployee"
, case when (employee_id is not null) THEN (select se.fname || ' ' || trim(se.lname) from se_employees se where se.id= employee_id)  ELSE
  case when (cust_contact_id is not null)
  THEN (select cmc.fname || ' ' || trim(cmc.lname) from customer_contacts cmc where cmc.id= cust_contact_id)
  ELSE '' END END as "master_name"
  ,case when (employee_id is not null)  THEN (select left(se.fname,1) || '.' || trim(se.lname) from se_employees se where se.id= employee_id)  ELSE
  case when (cust_contact_id is not null)
  THEN (select left(cmc.fname,1) || '.' || trim(cmc.lname) from customer_contacts cmc where cmc.id= cust_contact_id)
  ELSE '' END END as "short_name"
  ,is_su
  `

const cliLoginSelect = `id, employee_id, cust_contact_id, login_block ,email
  , case when char_length(u_passwd)>3 then true else false end as "has_passwd"
  , last_pass_change_date
  , CASE WHEN (select count(*) from customer_contacts cmc where cmc.id= cust_contact_id) >0 THEN TRUE ELSE FALSE END as "isClient"
  , CASE WHEN (select count(*) from se_employees se where se.id= employee_id) >0 THEN TRUE ELSE FALSE END as "isEmployee"
  , portal_enable
  , case when (employee_id is not null) THEN (select se.fname || ' ' || trim(se.lname) from se_employees se where se.id= employee_id)  ELSE
    case when (cust_contact_id is not null)
    THEN (select cmc.fname || ' ' || trim(cmc.lname) from customer_contacts cmc where cmc.id= cust_contact_id)
    ELSE '' END END as "master_name"
    ,case when (employee_id is not null)  THEN (select left(se.fname,1) || '.' || trim(se.lname) from se_employees se where se.id= employee_id)  ELSE
    case when (cust_contact_id is not null)
    THEN (select left(cmc.fname,1) || '.' || trim(cmc.lname) from customer_contacts cmc where cmc.id= cust_contact_id)
    ELSE '' END END as "short_name" `
//ilośc iteracji tworzenia salta
const bcryptRounds = 10;

module.exports = {
    getLoginByEmail: async function (login) {
        const log_o = await db("app_logins").select(db.raw(loginSelect)).where("email", login.trim()).first()
        return log_o
    },
    generateUserToken: function (user) {
        const { secretKey, expiry_minutes } = config.jwt || {}
        if (!secretKey)
            throw new Error('Invalid auth configuration!')

        return jwt.sign(user, secretKey, {
            expiresIn: (expiry_minutes || 10) * 60 * 1 // czas w sekundach
        });
    },
    setPasswordAndGetUser: async function (newpassword, dbuser) {
        //walidacja hasła również po stronie frontendu ...
        if (!newpassword) return null;
        if (newpassword.length <= 3) return null
        //tworzenie hasha hasła
        const hash = await bcrypt.hash(newpassword, bcryptRounds);
        //zapis do db
        await db("app_logins").where("id", dbuser.id).first().update({ u_passwd: hash }, "id");
        const ruser = await db("app_logins").select(db.raw(loginSelect)).where("id", dbuser.id).first();
        return ruser;
    },
    getLoginByCustomerContactID: async function (ID) {
        const user = await db("app_logins").select(db.raw(cliLoginSelect))
            .where("cust_contact_id", ID).first()

        return user;
    },
    //weryfikacja przy kazdym logownaiu do systemu
    verifyPassword: async function (password, dbuser) {
        //dbuser: obiekt uzytkownika - rekord z tabeli app_logins
        let match = false;
        let u_passwd = dbuser.u_passwd || "";
        const isDbHashed = u_passwd.startsWith('$2');

        if (isDbHashed) { //hasło w db jest już hashowane!
            match = await bcrypt.compare(password, u_passwd); //test poprawnosci
            return match;
        }
        else { //hasło plain - konwersja do hasha...
            match = password === u_passwd;
            if (match) {
                const hash = await bcrypt.hash(password, bcryptRounds);//tworzenie hasha hasła
                await db("app_logins").where("id", dbuser.id).first().update({ u_passwd: hash }, "id");
            }
            return match;
        }
    },
    changePass: async function (passObject, jwtuser) {
        if (!jwtuser || !jwtuser.eid)
            throw new Error("Nieudana autoryzacja użytkownika!")

        if (!passObject || !passObject.np)
            throw new Error("Operacja nie może być wykonana dla przesłanych danych!")

        const user = await shared.cl_Employee(jwtuser.eid);
        if (!user)
            throw new Error("Nieudana autoryzacja użytkownika!")

        const notifywEmail = passObject.notify || false;

        try {
            const rawFltr = `(usergroup_id in (select id from se_employee_groups eg where eg.id in (select group_id from se_employees_2_groups e2g where e2g.employee_id=:user_id)))
                AND (accessobject_id in (select id from sec_access_objects ao where ao.sys_id='ADMIN_SYS_L2'))`;

            const isL2aadmin = await db("sec_access_perm").select(db.raw("count(*)>0 as is_l2admin")).whereRaw(rawFltr, { user_id: jwtuser.eid }).first();
            if (!isL2aadmin)
                throw new Error("Nie masz autoryzacji do wykonania tego zadania!");

            //OK - tutaj można zaczac zmieniac hasło
            //pobranie dancyh pracownika klßóremu zminiamy
            const employee = await shared.cl_Employee(passObject.empl_id);
            if (!employee) throw new Error("Nieprawidłowe dane pracownika!");
            const login = await db("app_logins").select("id", "employee_id", "login_block", "email").where("employee_id", employee.id).first();
            if (!login) throw new Error("Nie znaleziono informacji o logowaniu dla bieżącego użytkownika!");

            if (login.login_block === true) throw new Error("Nie można zmienić hasła zablokowanemu użytkownikowi!");
            //hashowanie hasła (bcrypt) - asynchronicznie... długo!!!
            const hash = await bcrypt.hash(passObject.np, bcryptRounds);
            let pasO = { u_passwd: hash, force_passwd_change: true, last_pass_change_date: new Date() };
            await db("app_logins").where("id", login.id).update(pasO, "id");



            return { success: true, status: 200, message: "Hasło zostało ustawione!" }
        }
        catch (error) {
            logger.error("Błąd zmiany hasła! Err: " + error.message)
            throw error;
        }
    },
    changeCliContactPass: async function (passObject, jwtuser) {
        if (!jwtuser || !jwtuser.eid)
            throw new Error("Nieudana autoryzacja użytkownika!")

        if (!passObject || !passObject.np)
            throw new Error("Operacja nie może być wykonana dla przesłanych danych!")

        const user = await shared.cl_Employee(jwtuser.eid);
        if (!user) throw new Error("Nieudana autoryzacja użytkownika!")

        const notifywEmail = passObject.notify || false;

        try {
            const rawFltr = `(usergroup_id in (select id from se_employee_groups eg where eg.id in (select group_id from se_employees_2_groups e2g where e2g.employee_id=:user_id)))
                AND (accessobject_id in (select id from sec_access_objects ao where ao.sys_id='ADMIN_SYS_L2'))`;

            const isL2aadmin = await db("sec_access_perm").select(db.raw("count(*)>0 as is_l2admin")).whereRaw(rawFltr, { user_id: jwtuser.eid }).first();
            if (!isL2aadmin)
                throw new Error("Nie masz autoryzacji do wykonania tego zadania!");

            //OK - tutaj można zaczac zmieniac hasło
            let sql = `*,(select count(*) >0 from app_logins l where l.email=customer_contacts.email) as "hasLogin"
            ,coalesce((select  char_length(u_passwd) >0  from app_logins l where l.email=customer_contacts.email), false) as "hasPass"`
            const cont = await db('customer_contacts').select(db.raw(sql)).where('id', passObject.contact_id).first()

            if (!cont) throw new Error("Nieprawidłowe dane kontaktu!");

            let ID = null;

            const login = await db("app_logins").select("id", "employee_id", "login_block", "email").where("cust_contact_id", cont.id).first();
            const newLogin = { cust_contact_id: cont.id, email: cont.email, se_enable: false, ekp_enable: false, last_pass_change_date: new Date() }
            if (!login) {
                const ret = await db("app_logins").insert(newLogin, "id")
                ID = ret[0];
            } else {
                if (login.login_block === true) throw new Error("Nie można zmienić hasła zablokowanemu użytkownikowi!");
                ID = login.id;
            }


            //hashowanie hasła (bcrypt) - asynchronicznie... długo!!!
            const hash = await bcrypt.hash(passObject.np, bcryptRounds);
            let pasO = { u_passwd: hash, force_passwd_change: true, last_pass_change_date: new Date() };
            await db("app_logins").where("id", ID).update(pasO, "id");

            // if (notifywEmail)
            //    await mailapi.sendPasswdChangeEmail(employee.id, user.id, passObject.np);

            return { success: true, status: 200, message: "Hasło zostało ustawione!" }
        }
        catch (error) {
            logger.error("Błąd zmiany hasła! Err: " + error.message)
            throw error;
        }
    },















}