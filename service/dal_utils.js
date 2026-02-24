//@ts-check
"use strict";
var BbPromise = require("bluebird");
var db = require("../helpers/db");
var query = require('./se_calls-sql');
var appset = require("./app_settings");
const moment = require('moment');
var readFile = BbPromise.promisify(require("fs").readFile);

const stream = require('stream');
const stat = BbPromise.promisify(require("fs").stat);
var logger = require('../log-config');
const fs = require('fs');

module.exports = {
    getBusinessPartnerByKey: function (id) {
        return db("business_partner_erp")
            .select("id", "erp_id", "erp_name")
            .where("id", id).first()
    },
    getClientConditions: function (client) {
        return db("customer_2_conditions")
            .select(db.raw(query.condition2client))
            .where("cust_mast_id", client.id)
            .orderBy("condition_type_id")
            .then(function (c2cond) {
                return c2cond
            })
    },
    getClientCondById: function (client_id) {
        return db("customer_2_conditions")
            .select(db.raw(query.condition2client))
            .where("cust_mast_id", client_id)
            .orderBy("condition_type_id")
            .then(function (c2cond) {
                return c2cond
            })
    },
    getConditionsDefinitions: function () {
        return db("pr_conditions_def") //czytanie definicjo warunkóœ
            .orderBy("id")
            .then(function (defs) {
                return defs;
            })
    },
    getClientPriceList: async function (client_id) {
        const bp = await getClientbyBPkey(client_id);
        if (!bp)
            throw new Error("Nie znaleziono klienta z id: " + client_id)

        let extNullorEmpty = !bp.ext || Object.keys(bp.ext).length === 0;
        if (extNullorEmpty) { //brak rozszerzenai klient a- zakładam nowe z domyślna listą cenową
            logger.warn("Brak obiektu ext klienta. Tworzę nowy dla client_id: " + client_id)
            let ins_obj = { bp_id: bp.id, price_list_use_default: true }
            await db("cust_master_ext").insert(ins_obj, "id")
            const pr = await db("pr_price_list").where("is_default", true).first() //zwraca defaultową liste cenową 
            return pr || null;
        } else {

            if (bp.ext.price_list_use_default === true) {
                const pr = await db("pr_price_list").where("is_default", true).first();
                return pr || null;
            }
            else {
                const pr = await db("pr_price_list").where("id", bp.ext.price_list_id).first()
                return pr || null;
            }
        }

    },
    getPriceObject: function (priceList_id, mat_index) {
        return db("pr_pricelist_details")
            .where("price_list_id", priceList_id)
            .andWhere("mat_index", mat_index).first()
            .then(function (price) {
                return price || null;
            })

    },
    getQuotationLineConditionTemplate: function (cli_cond, cond_definitions, priceObj, cust_pricelist, mat_index, group_id) {
        //pobieranei listy /templatu warunków w formacie do zapisanai w ofercie
        // na podstawie warunków klienta i zdefiniowanych templatów warunku   
        let ret_array = [];
        let cond_defs = cond_definitions || [];
        //lista definicji warunków bez manualnych (ceny irabatu)
        const defs_no_manual = cond_definitions.filter(c => !(!!c.is_manual_price || !!c.is_manual_discount))
        //wpisywanie domyślnego warunku - listy cenowej
        let ddef = defs_no_manual[0];
        let ret_v = createDefaultCondition(ddef, cust_pricelist, priceObj)
        ret_array.push(ret_v);
        return BbPromise.map(defs_no_manual, function (def) {
            let matchingCC = cli_cond.find(cc => cc.condition_type_id === def.id);
            if (matchingCC) {
                let ret_item = createQuoteCondItem(def, matchingCC, cust_pricelist, group_id, mat_index, priceObj);
                const exist = ret_array.find(c => {
                    if (!ret_item)
                        return true;
                    return ret_item.condition_type_id === c.condition_type_id;
                })
                if (ret_item && !exist) //ret_item może być null (jesli np grupa nie pasuje)
                    ret_array.push(ret_item);
            }
        }, { concurrency: 1 })
            .then(function () {
                let len = ret_array.length;
                if (len > 0) {
                    ret_array[len - 1].is_active = true;
                }
            })
            .then(function (ret) {
                return ret_array;
            })
    },
    getDateTimeString: function (inDate) {
        if (!inDate) return "";
        var mD = moment(inDate);
        if (mD.isValid() === false) return "";

        return mD.format("YYYY.MM.DD HH:mm");
    },
    getDateString: function (inDate) {
        if (!inDate) return "";
        var mD = moment(inDate);
        if (mD.isValid() === false) return "";

        return mD.format("YYYY.MM.DD");
    },
    getHTMLTemplateByID: function (template_id) {
        //get final html template pointer
        return db("se_protocol_templates").first()
            .where("id", template_id)
            .then(function (templPointer) {
                return templPointer;
            })
            .then(function (templ) { //get the template itself
                if (!templ)
                    return null;
                let tmplPath = "html_templates/" + templ.filename;
                return readFile(tmplPath, 'utf8')
                    .then(function (htmlTemplate) {
                        return htmlTemplate
                    })
            })
    },

 
    streamToPromise: streamToPromise,
    // GenericHtml2Pdf2Stream : _chromeHtml2Pdf2Stream
}
function createDefaultCondition(def, cust_pricelist, priceObj) {
    let objt = getObjTempl();

    let obj = Object.assign(objt, def);
    obj.price_list_name = cust_pricelist.pricelist_name;
    obj.price_list_id = cust_pricelist.id
    obj.condition_type_id = def.id;
    obj.is_active = true;
    obj.cond_price = priceObj ? priceObj.price : 0;
    obj.cond_currency = priceObj ? priceObj.currency : "PLN";
    obj.cond_discount = 0;
    return obj;
}
function createQuoteCondItem(def, clc, cust_pricelist, group_id, mat_index, priceObj) {
    //tworzenie obiektu warunkóœ oferty 
    let objT = getObjTempl();
    let obj = Object.assign(objT, def)

    obj.price_list_id = cust_pricelist.id
    obj.price_list_name = cust_pricelist.pricelist_name;
    obj.condition_type_id = def.id;
    obj.is_active = false;

    if (def.is_pricelist_discount) {
        obj.cond_discount = clc.c_val_discount || 0;
        obj.cond_price = priceObj ? priceObj.price : 0;
        obj.cond_currency = priceObj ? priceObj.currency : "PLN";
    }
    if (def.is_group_discount) { //wpisywanie rabatu grupy jesli nr grup  pasują
        if (group_id === clc.c_val_group_id) {
            obj.mat_group_id = clc.c_val_group_id;
            obj.cond_discount = clc.c_val_discount || 0;
        } else {
            return null;
        }
    }
    if (def.is_special_price) { //wpisywanie ceny dla materiału jeśli indeksy pasują
        if (mat_index === clc.mat_index) {
            obj.mat_index = mat_index;
            obj.mat_name = clc.mat_name;
            obj.cond_price = clc.c_val_price
            obj.cond_currency = clc.c_waluta
        } else {
            return null;
        }
    }
    return obj;

}
function getClientbyBPkey(client_id) {
    return db("business_partner_erp").where("id", client_id)
        .select("id", "erp_name", "erp_id", "short_name").first()
        .then(function (bp) {
            return db("cust_master_ext")
                .select("service_block", "price_list_use_default", "price_list_id")
                .where("bp_id", bp.id).first()
                .then(function (cliext) {
                    bp.ext = cliext || {};
                    return bp;
                })
        })
}

function getObjTempl() {
    return {
        est_line_id: null,
        condition_type_id: null,
        price_list_id: null,
        mat_group_id: null,
        mat_index: null,
        cond_price: null,
        cond_currency: null,
        cond_discount: null,
        cond_remarks: null,
        is_pricelist_discount: null,
        is_group_discount: null,
        is_special_price: null,
        is_manual_price: null,
        is_manual_discount: null,
        is_price_list: null,
        is_active: false
    }
}

function streamToPromise(stream) {
    return new BbPromise(function (resolve, reject) {
        stream.on("end", resolve);
        stream.on("error", reject);
        stream.resume();
    });
}



//zwraca nazwę pliku pdf utworzonego i zapisanego z podanego dokumentu HTML 


async function timeout(ms) {
    return new BbPromise(resolve => setTimeout(resolve, ms));
}

