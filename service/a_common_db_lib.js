'use strict';
const BPromise = require('bluebird');
const setup = require('./app_settings')
const conf = require('../helpers/api.config')
const db = require('../helpers/db');
const query = require('./se_calls-sql');
const moment = require("moment");
const readFile = BPromise.promisify(require("fs").readFile);
const unlinkFile = BPromise.promisify(require("fs").unlink);
const stat = BPromise.promisify(require("fs").stat);
const logger = require('../log-config');
const parse = require('date-fns/parse')
const isValid = require('date-fns/is_valid');
const format = require('date-fns/format')
const mapper = require('./a_db_table_map')

module.exports = {
    getPROTOSAPIntegrationLog: function () {
        const ret = mapper.map4db_sap_integration_log({})
        return ret;
    },
    SAP_Logger_Save_Call2IntegrationLog: async function (call_id, subject, payload, level, user_id) {
        const deepset = await setup.getDeepSettings()
        const { sap_log2_db = false } = deepset || {}// czy logować do DB
        if (!sap_log2_db)
            return { id: null, success: true }

        const o2s = mapper.map4db_sap_integration_log({})
        delete o2s.id;
        o2s.date_added = new Date()
        o2s.added_by = user_id || null
        o2s.level = level;
        o2s.subject = subject;
        o2s.call_id = call_id;
        o2s.payload = payload;
        const sav = await db('sap_integration_log').insert(o2s, "id");
        return { id: sav[0], success: true }
    },
    SAP_Logger_Save_WF_Call2IntegrationLog: async function (wf_call_id, subject, payload, level, user_id) {
        const deepset = await setup.getDeepSettings()
        const { sap_log2_db = false } = deepset || {}// czy logować do DB
        if (!sap_log2_db)
            return { id: null, success: true }
        const o2s = mapper.map4db_sap_integration_log({})
        delete o2s.id;
        o2s.date_added = new Date()
        o2s.added_by = user_id || null
        o2s.level = level;
        o2s.subject = subject;
        o2s.wf_call_id = wf_call_id;
        o2s.payload = payload;
        const sav = await db('sap_integration_log').insert(o2s, "id");
        return { id: sav[0], success: true }
    },
    SAP_Logger_saveGenericObject2IntegrationLog: async function (object) {
        const o2s = mapper.map4db_sap_integration_log(object)
        delete o2s.id;
        o2s.date_added = new Date()
        const sav = await db('sap_integration_log').insert(o2s, "id");
        return { id: sav[0], success: true }
    },
    timeout: async function (ms) {
        return new BPromise(resolve => setTimeout(resolve, ms));
    },
    formatDate: function (date_String, show_time = false) {
        const dt = parse(date_String);
        if (isValid(dt)) {
            return format(dt, show_time ? 'DD.MM.YYYY HH:mm' : 'DD.MM.YYYY')
        } else {
            return date_String
        }
    },
    formatTime: function (date_String) {
        const dt = parse(date_String);
        if (isValid(dt)) {
            return format(dt, 'HH:mm')
        } else {
            return date_String
        }
    },
    cli_NullorEmpty: function (object) {
        if (!object) return true;
        return Object.keys(object).length === 0;

    },
    cli_get_all_reports: function () {
        return db("se_service_reports")
            .then(function (z) {
                return z;
            })
    },
    cli_get_check_ifEreport: async function (report_id) {
        const sq = `id, ereport, (select cast(count(*) as int) from se_service_reports_2_attachments where report_id=se_service_reports.id and (not mark_deleted=true)) as "attchm_count"`
        const ret = await db("se_service_reports").select(db.raw(sq)).where("id", report_id).first();
        return ret;
    },
    cli_get_ReportAttachment: async function (report_id) {
        //pobieranie ostatniego pliku pdf
        const firstAttachm = await db("se_service_reports_2_attachments").where("report_id", report_id).orderBy('id', 'desc').first();
        const fa = await db("file_attachments").where("id", firstAttachm.file_id).first();
        return fa;

    },
    cl_checkIfProtocolInPdfRepository: async function (report_id) {

        //sprawdza czy plik protokołu seriwsowego jest zapisany na dysku!
        const r2p = await db("se_service_reports_protocols_pdf").where("report_id", report_id).orderBy('id', 'desc').first();
        if (!r2p)
            return false;

        const fa = await db("file_attachments").where("id", r2p.file_id).first();
        if (!fa)
            return false;

        let file = fa.storage_folder + fa.file_pointer;
        return stat(file).then(function () {
            return true;
        }).catch(function (error) {
            return false;
        })

    },


    cl_getPdfProtocoFromRepository: async function (report_id) {
        //sprawdza czy plik protokołu seriwsowego jest zapisany na dysku!
        const r2p = await db("se_service_reports_protocols_pdf").where("report_id", report_id).orderBy('id', 'desc').first()
        if (!r2p)
            throw new Error('Uuups! Nie znaleziono rekordu linku pdf dla protokołu ' + report_id)
        const fa = await db("file_attachments").where("id", r2p.file_id).first();
        return fa;
    },
    cl_filenameGenerator: function (fileName) {
        return Date.now() + '..' + fileName
    },
    //API:    search,  id,      pageSize, page
    cl_CatalogueIdName: function (id) {
        return db('catalogue').select('id', 'nazwa').where('id', id).first();
    },
    cl_SiteSingle: function (id) {
        return db("s_site_erp").select(db.raw(query.selectSitesLista))
            .where("id", id).first()
            .then(function (obiekt) {
                return obiekt;
            })
    },
    cl_CatalogueFull: function (id) {
        return db('catalogue')
            .where('id', id).first()
            .then(function (cat) {
                return cat;
            })
    },
    cl_CatalogueArrayByContext: function (context) {
        return db('catalogue')
            .where("context", context)
            .orderBy("nazwa", "asc")

    },
    cl_ProjectStatus: function (id) {
        return db("p_project_status").select("id", "status_name")
            .where("id", id).first()
    },
    cl_Employee: function (id) {
        return getEmployee(id);
    },
    cl_ManagersOfEmployees: async function (ids_array) {

        const arr = await db('se_employees')
            .select(db.raw(query.selectPracownikShot4Autocomplete))
            .whereIn('id', ids_array)
            .map(function (empl) {
                return empl.id
            })
        return arr || [];
    },
    cl_EmployeeShortByid: function (id) {
        return db('se_employees').select(db.raw(query.selectPracownikMinimal)).where('id', id).first()
    },
    cl_EmployeCalendResource: function (id) {
        return db('se_employees').select(db.raw(query.selectPracownCalResource))
            .where('id', id).first()
    },
    cl_EmployeeWManager: function (id) {
        return db('se_employees')
            .where('id', id).select(db.raw(query.selectPracownikWithManager))
            .first()
    },
    cl_EmployeeByLoginID: function (login_id) {
        return db('app_logins')
            .where('id', login_id).first()
            .then(function (loginUsr) {
                if (!loginUsr) return null
                if (!loginUsr.employee_id) return null

                return db('se_employees')
                    .where('id', loginUsr.employee_id)
                    .select(db.raw(query.selectPracownikShot4Autocomplete))
                    .first()
            })
    },
    cl_getLogin4Employee: function (user_id) {
        let seRaw = `is_su, employee_id, email, login_block, force_passwd_change, se_enable, ekp_enable,od_enable, last_pass_change_date`
        return db("app_logins").select(db.raw(seRaw))
            .where("employee_id", user_id).first()
            .then(function (loginConf) {
                return loginConf || {}
            })
    },
    cl_getLoginDatabyEmail: function (email) {
        let seRaw = `employee_id, email, login_block, force_passwd_change, se_enable, ekp_enable`
        return db("app_logins")
            .select(db.raw(seRaw))
            .where('email', email).first()
            .then(function (login) {
                return !!login;
            })
    },
    cl_getEmployeeQualifications: function (employee_id) {
        return db("se_employee_qualifications")
            .select(db.raw(query.employee_qualifications))
            .where("employee_id", employee_id)
            .orderBy("expiry_date")
            .then(function (ql) {
                return ql;
            })
    },

    cl_getTimingCategory: async function (id) {
        const cat = await db("se_service_report_timing_categories").where("id", id).first()
        return cat;
    },
    cl_CallMessages: function (call_id) {

        const msgsel = "id, date_registered, msg_type, call_id, report_id, project_id,  employee_id, m_template_id, m_template_used, m_subject, m_receipients";
        const whereR1 = "(call_id =:call_id  OR report_id in (select id from se_service_reports r where r.call_id=:call_id )  )";

        return db("messages_sent")
            .select(db.raw(msgsel))
            .whereRaw(whereR1, { call_id: call_id })
            .orderBy("id")
            .then(function (messages) {
                return messages || [];
            });

    },
    cl_OfertaTerms: function (term_id) {
        return db("o_oferta_terms").first()
            .where("id", term_id)
            .then(function (typ) {
                return typ || {};
            })
    },
    cl_OfertaTerm: async function (term_id) {
        const ob = await db("o_oferta_terms").select("id", "t_display_name", "t_long_text").where("id", term_id).first()
        return ob || {};

    },



    cli_getDateString: function (inDate) {
        if (!inDate) return "";
        var mD = moment(inDate);
        if (mD.isValid() === false) return "";

        return mD.format("YYYY.MM.DD");
    },
    cli_call_receipts4Call: function (call_id) {
        const selSql = `*
        , (select fname||' '||lname from se_employees e where e.id=se_service_call_tech_receipts.technician_id) as "serwisant"
        `
        return db("se_service_call_tech_receipts")
            .select(db.raw(selSql))
            .where("call_id", call_id)
            .then(function (receipts) {
                return receipts || [];
            })
    },
    cli_call_receiptsByID: function (id) {
        const selSql = `*
        , (select fname||' '||lname from se_employees e where e.id=se_service_call_tech_receipts.technician_id) as "serwisant"
        `
        return db("se_service_call_tech_receipts")
            .select(db.raw(selSql))
            .where("id", id).first()
            .then(function (receipt) {
                return receipt;
            })
    },
    cli_getTimeString: function (inDate) {
        if (!inDate) return "";
        var mD = moment(inDate);
        if (mD.isValid() === false) return "";

        return mD.format("HH:mm");
    },
    cli_GenerateRandomMaterialIndex: function () {
        return "AU" + Math.floor(Math.random() * (10000000 - 10000 + 1) + 10000)
    },
    cli_GetBusinessPartner: async function (id) {
        const sq = `id,erp_id,tax_id,pay_term,erp_name,address1,address2,ad_hoc,
        coalesce((select  efaktura from cust_master_ext ex where ex.bp_id=business_partner_erp.id limit 1),false) as "efaktura",
        coalesce((select  efaktura_email from cust_master_ext ex where ex.bp_id=business_partner_erp.id limit 1),'') as "efaktura_email"`
        const bp = await db("business_partner_erp").select(db.raw(sq)).where("id", id).first();
        return bp
    },

    cli_get_Call_logs: async function (call_id) {
        const sq = `*`
        const rawWh = `(call_id = :call_id) or (report_id in (select id from se_service_reports r where r.call_id =:call_id))`;
        const filter = { call_id: call_id || -1 }
        const bp = await db("se_service_reports_log").select(db.raw(sq)).whereRaw(rawWh, filter);
        return bp || [];
    },
    cli_get_logs_4callIDS: async function (call_ids) {

        const sq = ` id, date_added, severity, typ, employee_id, r_latitude, r_longitude, remarks,exception_remarks, uuid, report_uuid
        ,(select id from se_service_reports r where r.uuid=se_service_reports_log.report_uuid) as report_id
        ,(select call_id from se_service_reports r where r.uuid=se_service_reports_log.report_uuid) as call_id  `

        const report_ids = await db("se_service_reports").select("id", "uuid").whereIn("call_id", call_ids)
            .groupBy("id").orderBy("id").map(function (rep) {
                return { id: rep.id, uuid: rep.uuid }
            });

        // const rpids = report_ids.map(obj => obj.id)
        const rpuuids = report_ids.map(obj => obj.uuid).filter(uuid => !!uuid) //tylko niepuste uuid

        const logs4callAndReps = await db("se_service_reports_log").select(db.raw(sq))
            .whereIn("report_uuid", rpuuids)
        //.whereIn("report_id", rpids)
        //.orWhereIn("call_id", call_ids)

        const rWh = `date_trunc('day', date_added) = current_date`
        const logs4today = await db("se_service_reports_log").select(db.raw(sq)).whereRaw(rWh, {});

        return [...logs4callAndReps, ...logs4today] || [];
    },
    cli_GetServiceCallTypes: async function (id) {
        const c = await db("se_service_calls_types").where("id", id).select("id", "nazwa").first();
        return c;
    },
    cli_GetProtocolCustomNo: async function (id) {
        const q = `(select call_prefix from se_service_calls_types ct where ct.id=
            (select call_type_id from se_service_calls c where c.id=se_service_reports.call_id)
            ) ||to_char(call_id, 'fm00000') ||'_'||id  as cid`

        const c = await db("se_service_reports").where("id", id).select(db.raw(q)).first();
        return c ? c.cid : id;
    },
    cli_GetCallCustomNo: async function (call_id) {
        const q = `(select call_prefix from se_service_calls_types ct where ct.id=call_type_id)||to_char(id, 'fm00000')  as cid`
        const c = await db("se_service_calls").where("id", call_id).select(db.raw(q)).first();
        return c ? c.cid : call_id;
    },
    cli_GetServiceCallTypesExt: async function (id) {
        const c = await db("se_service_calls_types").where("id", id).select("id", "nazwa", "is_maintenance", "is_warranty", "call_prefix", "hcolor").first();
        return c;
    },
    cli_GetServiceCallType4ReportID: async function (report = {}) {
        const scall = await db('se_service_calls').select(db.raw(`id, call_type_id`)).where('id', report.call_id).first();
        const c = await db("se_service_calls_types").where("id", scall.call_type_id).select("id", "nazwa", "is_maintenance", "is_warranty", "call_prefix", "hcolor").first();
        return c;
    },
    cli_GetBusPartner4CalendarResource: function (id) {
        return db("business_partner_erp")
            .select(db.raw(`id,'BP' as restype , erp_id, erp_name, address1,address2`))
            .where("id", id).first()
    },
    cli_GetCall4Autocomplete: function (id) {
        return db("se_service_calls").select(db.raw(query.selCallsQueryStr4EKP)).where("id", id).first()
    },

    cli_getCall_Notes: async function (call_id) {
        const sql = "*, (select fname||' '||lname from se_employees e where e.id=added_by) as autor";
        const rows = await db("se_service_call_notes_internal").select(db.raw(sql)).where("call_id", call_id).orderBy("id");
        return rows;
    },
    cli_GetPdfFooterTemplate: function (tmplPath) {
        return readFile(tmplPath, 'utf8')
            .then(function (htmlTemplate) {
                return htmlTemplate
            }).catch(function (error) {
                logger.error('Błąd odczytu szblonu pdf-footer.html. Czy plik istnieje?');
            })
    },
    cli_GetPdfProtocolHeaderTemplate: function () {
        let tmplPath = "html_templates/pdf-protocol-header.html";
        return readFile(tmplPath, 'utf8')
            .then(function (htmlTemplate) {
                return htmlTemplate
            }).catch(function (error) {
                logger.error('Błąd odczytu szblonu pdf-footer.html. Czy plik istnieje?');
            })
    },
    cli_GetPdfOfertaHeaderTemplate: function () {
        let tmplPath = "html_templates/pdf-oferta-header.html";
        return readFile(tmplPath, 'utf8')
            .then(function (htmlTemplate) {
                return htmlTemplate
            }).catch(function (error) {
                logger.error('Błąd odczytu szblonu pdf-footer.html. Czy plik istnieje?');
            })
    },
    cli_phoneisValid: function (phoneNumber) {
        if (!phoneNumber) return false;
        return (phoneNumber || '').trim().length === 9
    },


    cli_getProjectSingle: function (id) {
        return db("p_projects").select(db.raw(query.selProjectsListQuery))
            .where("id", id).first();
    },


    cli_save2audit: async function (tab_name, det_table, key, jwtuser, details_array, main_message) {
        const a2s = {
            date_changed: new Date(),
            table_name: tab_name,
            det_table: det_table,
            table_key: key,
            user_id: jwtuser ? jwtuser.eid : null,
            change_info: main_message || null
        }

        const isArr = !!details_array && details_array.constructor === Array;
        if (!isArr)
            return;
        if (details_array.length === 0)
            return;

        const ID = await db("audit_table").insert(a2s, "id").then(function (ret) { return ret[0]; });
        return BPromise.map(details_array, function (det) {
            det.parent_id = ID;
            return db("audit_table_details").insert(det, "id");
        })
    },
    cli_getServiceContractSingle: function (id) {
        return db("se_service_contracts").select(db.raw(query.selServContractsListquery))
            .where("id", id).first();
    },

    sortByTextProp: function (list, property) {
        return list.sort((a, b) => {
            var x = a[property].toLowerCase();
            var y = b[property].toLowerCase();
            if (x < y) { return -1; }
            if (x > y) { return 1; }
            return 0;
        });
    },


    getDocInvoiceStatus: function (fa, statuses) {
        const { status_id = null, all_acc = false, is_booked = false, mpk_id = null, gl_account_id = null,
            b_partner_id = null, net_value = null, legal_ent_id = null, fa_number = null } = fa || {}

        const stAnul = statuses.find(o => o.id === -1);
        const stEdycja = statuses.find(o => o.id === 100);
        const stDoAkcept = statuses.find(o => o.id === 200);
        const stZaakcept = statuses.find(o => o.id === 500);
        const stZaksieg = statuses.find(o => o.id === 600);

        if (status_id === -1) return stAnul;
        if (is_booked) return stZaksieg;
        if (all_acc) return stZaakcept;

        const incomplete = !legal_ent_id || !mpk_id || !gl_account_id || !b_partner_id || !net_value || !fa_number;
        if (incomplete) return stEdycja;
        return stDoAkcept;
    },

    prepFileInfo: function (req) {
        let fi = conf.GetFileInfoTemplate(); //template obiektu do bazy danych
        if (req.file) {
            fi.file_pointer = req.file.filename;
            fi.file_name = req.file.originalname;
            fi.file_size = req.file.size;
            fi.storage_folder = req.file.destination;
        }
        return fi;
    },
    pagerUtils: function (test, page, pageSize, offset) {
        const totalRows = test ? 1 * test.count : 0;
        if (pageSize <= totalRows) {
            offset = (page - 1) * pageSize;
        } else {
            page = 1;
            offset = 0;
        }
        return totalRows;
    }
    ,



}


async function getEmployee(id) {
    return db('se_employees').select(db.raw(query.selectPracownikShot4Autocomplete))
        .where('id', id).first()
}


