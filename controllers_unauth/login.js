"use strict";
const express = require('express')
const router = express.Router()
const log2db = require("../service/logviewer");

const logger = require('../log-config');
const sf = require('../helpers/shared_funct');
const mcr = require('../service/user_crypto')
// głowna metoda logowania usera i wysyłania tokena JWT
const O_NO_USR_NAME_PASS = { success: false, message: "You must send the username and the password!" }
const O_USR_PASS_INV = { success: false, message: "Not authorized!" }
const O_USR_PASS_NOMATCH = { success: false, message: "The username or password don't match!" }
const O_ACC_BLOCKED = { success: false, message: "Your account has been blocked!" }
const O_NEWPASS_IDENTIC = { success: false, message: "Musisz podać nowe hasło inne niż poprzednio używane!" }
const O_PASSCHNG_ERR = { success: false, message: "Error during password change, Contact you system administrator!" }
const O_LOGIN_SUCCESS = { success: true, message: "Login succesful." }

router.post('/users/login', async function (req, res, next) {
    const inf = sf.headerInfo(req);
    let inf2 = { ...inf };
    delete inf2.token;
    const { system = '', password = null, username = null } = req.body;
    // if (!system) {
    //     logWarn("API:LOGIN : nie podano prawidłowego obiektu logowania dla " + " " + sf.getObjectInfoText(inf), null);
    //     return res.status(400).json(O_NO_CORR_UOBJ);
    // }
    if (!username || !password) {
        console.log(`[INT4S4 LOGIN] Missing user or password in request.body. U:${username}, P:${password}`)
        logWarn("API:LOGIN: " + O_NO_USR_NAME_PASS.message + " " + (username || "") + " " + sf.getObjectInfoText(inf), null);
        return res.status(400).json(O_NO_USR_NAME_PASS);
    }
    try {
        const user = await mcr.getLoginByEmail(username);
        if (!user) {
            console.log(`[INT4S4 LOGIN] User not found in db: ${username}. Check if api_logins has proper entry!`)
            logWarn("API:LOGIN: " + O_USR_PASS_INV.message + (username || "") + " " + sf.getObjectInfoText(inf), null);
            return res.status(401).json(O_USR_PASS_INV);
        }
        //weryfikacja poprawności hasła
        const match = await mcr.verifyPassword(password, user);
        if (!match) {
            console.log(`[INT4S4 LOGIN] Pass NOT MATCH for user: ${username} / ${password}`)
            logWarn("API:LOGIN: " + O_USR_PASS_NOMATCH.message + "| " + password + " |; system: " + inf.sysName, user);
            return res.status(401).json(O_USR_PASS_NOMATCH);
        }
        const min_usr = sf.mapUser4Token(user);
        const newToken = mcr.generateUserToken(min_usr);

        if (user.login_block && !user.is_su) {
            logWarn("API:LOGIN: " + O_ACC_BLOCKED.message + "; system: " + inf.sysName, user);
            return res.status(401).json(O_ACC_BLOCKED);
        }
        console.log(`[INT4S4 LOGIN] Access granted for user: ${username}`)
        logInfo("API:LOGIN: Logowanie do interfejsu SAP: " + sf.getObjectInfoText(min_usr) + sf.getObjectInfoText(inf2), user);
        res.status(200).json({ ...O_LOGIN_SUCCESS, ...{ token: newToken } })
    }
    catch (err) {
        console.log("API:LOGIN: ERROR: login: " + username + "; ERR: " + err.message || "");
        return next(err);
    }
})
// głowna metoda logowania usera i wysyłania tokena JWT
router.post('/users/chngp', async function (req, res, next) {
    const inf = sf.headerInfo(req);
    const { password = null } = req.body;
    const { newpassword = null } = req.body;
    const { username = null } = req.body;

    if (!username || !password || !newpassword) {
        return res.status(400).json(O_NO_USR_NAME_PASS);
    }
    if (password === newpassword) {
        return res.status(400).json(O_NEWPASS_IDENTIC);
    }
    try {
        const user = await mcr.getLoginByEmail(username);
        if (!user) {
            logWarn("API:LOGIN: " + O_USR_PASS_INV.message + (username || "") + " " + sf.getObjectInfoText(inf), null);
            return res.status(401).json(O_USR_PASS_INV);
        }
        //test hasła
        const match = await mcr.verifyPassword(password, user);
        if (!match) {
            logWarn("API:LOGIN: " + O_USR_PASS_NOMATCH.message + "; system: " + inf.sysName, user);
            return res.status(401).json(O_USR_PASS_NOMATCH);
        }
        if (user.login_block === true) {
            return res.status(401).json(O_ACC_BLOCKED);
        }

        const usr = await mcr.setPasswordAndGetUser(newpassword, user);
        if (!usr) return res.status(401).json(O_PASSCHNG_ERR);
        const min_usr = sf.mapUser4Token(user); //obiekt zalogowanego usera z minimalną iloscią jego danych (bezpieczeństwo!)
        const newToken = createJWTToken(min_usr);
        logInfo("API:LOGIN: Reset hasła użytkownika: " + min_usr.name, user);
        res.status(200).json({ success: true, message: 'Twoje hasło zostało zmienione!', token: newToken })
    }
    catch (err) {
        console.error(err);
        return next(err)
    }
})

router.get('/users/check/:username', function (req, res) {
    if (!req.params.username) {
        return res.status(400).send("You must send a username");
    }
    mcr.getLoginByEmail(req.params.username)
        .then(function (user) {
            if (!user)
                res.status(201).send({
                    success: true,
                    "username": "OK",
                    message: "Username can be added!"
                });
            else
                res.status(400).send({
                    success: false,
                    message: "A user with that username already exists"
                });
        });
});


function logWarn(m, user) {
    //log2db.newLOG_SAVE(m, 'Warn', 'api/login', user)
    logger.warn(m)
}
function logInfo(m, user) {
    //    log2db.newLOG_SAVE(m, 'Info', 'api/login', user)
    logger.info(m);
}


module.exports = router
