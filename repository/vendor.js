'use strict';
var db = require('../helpers/db')
const tabBisPartnerSapPoAssign = 'business_partner_sap_po_assign' 
const tabBizPartnerSCCA = 'business_partner_sap_cc_assign'

module.exports = {

    insertBPSapPOAssign: async function (insertData, bpId) {
        if (insertData.constructor === Array && insertData.length > 0) {
            return db(tabBisPartnerSapPoAssign).insert(
                insertData.map(m => { return { 'business_partner_id': bpId, ...m } })
            )
            .onConflict(['business_partner_id', 'purchasing_organisation_id'])
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