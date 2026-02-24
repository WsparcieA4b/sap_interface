'use strict'
var db = require('../helpers/db')
var cmn = require('./common')

const tabBizPartnerErp = 'business_partner_erp' 
const tabCustMasterExt = 'cust_master_ext'
const tabBizPartnerSSA = 'business_partner_sap_sales_assign'
const tabBizPartnerSCCA = 'business_partner_sap_cc_assign'

module.exports = {

    checkRowExist: async function (erpSel) {
        return cmn.checkExists(tabBizPartnerErp, erpSel)
    },

    checkRowExistLegacy: async function (erpSelLegacy) {
        return cmn.checkExists(tabBizPartnerErp, erpSelLegacy)
    },

    updateBizPartnerErp: async function (erpSel, data) {
        return cmn.update(tabBizPartnerErp, erpSel, data)
    },

    updateBizPartnerErpLegacy: async function (erpSelLegacy, data) {
        return cmn.update(tabBizPartnerErp, erpSelLegacy, data)
    },

    insertBizPartnerErp: async function (insertData) {
        return cmn.insert(tabBizPartnerErp, insertData)
    },

    checkCustMasterExtExist: async function (bpSel) {
        return cmn.checkExists(tabCustMasterExt, bpSel)
    },

    updateCustMasterExt: async function (bpSel, extData) {
        return cmn.update(tabCustMasterExt, bpSel, extData)
    },

    insertCustMasterExt: async function (insertData) {
        return cmn.insert(tabCustMasterExt, insertData)
    },

    insertBPSapSalAssign: async function (insertData, bpId) {
        if (insertData.constructor === Array && insertData.length > 0) {
            return db(tabBizPartnerSSA).insert(
                insertData.map(m => { return { 'business_partner_id': bpId, ...m } })
            )
            .onConflict(['business_partner_id','sales_organisation_id'])
            .merge()
        }
    },

    insertBPSapCCAssign: async function (insertData, bpId) {
        if (insertData.constructor === Array && insertData.length > 0) {
            return db(tabBizPartnerSCCA).insert(
                insertData.map(m => { return { 'business_partner_id': bpId, ...m } })
            )
            .onConflict(['business_partner_id','company_code_id'])
            .merge()
        }
    }
}
