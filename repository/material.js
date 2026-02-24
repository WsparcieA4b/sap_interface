'use strict'
var cmn = require('./common')
var db = require('../helpers/db')

const tableName = 'mm_master'
const tableMasterGroup = 'mm_master_groups'
const tableCatalog = 'catalogue'
const tableSoa = 'mm_erp_sales_org_assignment'
const tableEpa = 'mm_erp_plan_assignment'
const tableEva = 'mm_erp_valuation_assignment'

module.exports = {
    checkRowExist: async function (selection) {
        return cmn.checkExists(tableName, selection)
    },

    checkMatGroupRowExist: async function (selection) {
        return cmn.checkExists(tableMasterGroup, selection)
    },
    
    checkCatalogueExist: async function (selection) {
        return cmn.checkExists(tableCatalog, selection)
    },
    
    updateMaterial: async function (selection, data) {
        return cmn.update(tableName, selection, data)
    },

    insertMaterial: async function (insertData) {
        return cmn.insert(tableName, insertData)
    },

    insertMaterialGroup: async function (insertData) {
        return cmn.insert(tableMasterGroup, insertData)
    },

    insertCatalogue: async function (insertData) {
        return cmn.insert(tableCatalog, insertData)
    },


    insertSoaArray: async function (insertData, masterId) {
        if (insertData.length > 0) {
            return db(tableSoa).insert(
                insertData.map(m => { return { 'master_id': masterId, ...m } })
            )
            .onConflict(['master_id','sales_organization_id', 'distribution_channel_code'])
            .merge()
        }
    },


    insertPaArray: async function (insertData, masterId) {
        if (insertData.length > 0) {
            return db(tableEpa).insert(
                insertData.map(m => { return { 'master_id': masterId, ...m } })
            )
            .onConflict(['master_id','plant_id'])
            .merge()
        }
    },


    insertVaaArray: async function (insertData, masterId) {
        if (insertData.length > 0) {
            return db(tableEva).insert(
                insertData.map(m => { return { 'master_id': masterId, ...m } })
            )
                .onConflict(['master_id'
                    , 'valuation_area_id'
                    // Czy ponizsze trzy kolumny nie powinny być traktowane jako wymiary?
                //     , 'inventory_valuation_procedure_code'
                //     , 'price_unit_number_value'
                //     , 'currency_code'
                ])
                .merge()
        }
    },

}
