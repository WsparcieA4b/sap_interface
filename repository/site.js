'use strict';
var db = require('../helpers/db')
var cmn = require('./common')

const tableSiteErp = 's_site_erp' 
const tableAssetsSite = 's_assets_site'
const tableSiteErpSapSalesAssign = 's_site_erp_sap_sales_assign'
const tableSiteErpSapCCAssign = 's_site_erp_sap_cc_assign'

module.exports = {
    checkSiteExists: async function (selection) { return cmn.checkExists(tableSiteErp, selection) },

    checkAssetsSiteExists: async function (selection) { return cmn.checkExists(tableAssetsSite, selection) },

    updateSiteErp: async function (selection, data) { return cmn.update(tableSiteErp, selection, data) },

    insertSiteErp: async function (data) { return cmn.insert(tableSiteErp, data) },

    updateAssetsSiteErp: async function (selection, data) { return cmn.update(tableAssetsSite, selection, data) },

    insertAssetsSiteErp: async function (data) { return cmn.insert(tableAssetsSite, data) },

    insertSiteErpSapSalAssign: async function (insertData, siteId) {
        if (insertData.constructor === Array && insertData.length > 0) {
            return db(tableSiteErpSapSalesAssign).insert(
                insertData.map(m => { return { 'site_id': siteId, ...m } })
            )
            .onConflict(['site_id', 'sales_organisation_id']).merge()
        }
    },

    insertSiteErpSapCCAssign: async function (insertData, siteId) {
        if (insertData.constructor === Array && insertData.length > 0) {
            return db(tableSiteErpSapCCAssign).insert(
                insertData.map(m => { return { 'site_id': siteId, ...m } })
            )
                .onConflict(['site_id', 'company_code_id'])
                .merge()
        }
    }
}
