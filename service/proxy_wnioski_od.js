'use strict';
var db = require('../helpers/db');
var logger = require("../log-config");

module.exports = {
    insertOrUpdate: async function (sapOrderNo, serviceId) {
        const tableName = 'fdoc_documents'
        const sel = { id: serviceId }
        //zapis nr zelecnia SAp wdokuemncie i zmiana statusu na 'Zafakturowany'
        const dbdata = { sap_order_no: sapOrderNo } // data.body.A_SalesOrder.A_SalesOrderType.SalesOrder}
        try {
            const so_exists = await db(tableName).where(sel).first()
            if (!!so_exists) {
                const res = await db(tableName).where(sel).update(dbdata, "sap_order_no")
                return { result: res, error: false, message: `Identyfikator SAP ${sapOrderNo} zapisany do fdoc_documents, id: ${serviceId}` }
            } else {
                return { result: "Error", error: true, message: "Brak rekordu z id = " + serviceId }
            }
        } catch (error) {
            return { result: "Error", error: true, message: error }
        }
    },

    isNew: async function (serviceId) {
        const tableName = 'fdoc_documents'
        const sel = { id: serviceId }
        const so_exists = await db(tableName).where(sel).first()
        if (!!so_exists) {
            const sap_order_no = so_exists['sap_order_no']
            logger.info('[isNew] sap_order_no: ' + sap_order_no)
            if (sap_order_no > 0)
                return false
        }
        return true
    }
}
