'use strict';
var db = require('../helpers/db');
const logger = require('../log-config')

module.exports = {
    insertOrUpdate: async function (batch) {
               logger.info('[batch.insertOrUpdate] ', JSON.stringify(batch))
        console.log('[batch.insertOrUpdate] ', JSON.stringify(batch))
        const tab_warehouses = 'mm_warehouses'
        const tab_tech_imported = 'mm_tech_stock_imported'

        const sel_wh = { legacy_store_id: batch.Batch }
        const sel_wh_legacy = { legacy_store_id: !! batch.CafmID ? batch.CafmID:null }

        const sel_tech_imp = { legacy_tech_id: batch }
        const sel_tech_imp_legacy = { legacy_tech_id: batch.CafmID }

        let message = null
        let result = null
        try{
            logger.info("sel_wh", sel_wh)
            const batch_exists = await db(tab_warehouses).where(sel_wh).first()
            const batch_exists_legacy = !! batch.CafmID ?  await db(tab_warehouses).where(sel_wh_legacy).first() : false
            logger.info("batch_exists_legacy: " + batch_exists_legacy)
            let idWarehouse, warehouseName = batch.Batch
            if (!! batch_exists) {
                logger.info('[batch.insertOrUpdate] batchExists: ' + batch_exists.id)
                idWarehouse = batch_exists.id
                if(!! batch_exists.warehause_name){
                    warehouseName = batch_exists.warehause_name
                }
            } else if(!! batch_exists_legacy) {
                logger.info ('[batch.insertOrUpdate] batch_exists_legacy: ' + batch_exists_legacy.id)
                // update with new id
                idWarehouse = batch_exists_legacy.id
                if(!! batch_exists_legacy.warehause_name){
                    warehouseName = batch_exists_legacy.warehause_name
                }
                result = await db(tab_warehouses).where(sel_wh_legacy).update({warehouse_name: warehouseName, legacy_store_id:batch.Batch})
                if(!result) {
                    throw new Error("Update mm_warehouse.legacy_store_id nieudany! " + JSON.stringify(batch))
                }
            } else {
                logger.info('[batch.insertOrUpdate] insert new  warehouse')
                // create batch
                result = await db(tab_warehouses).insert({warehouse_name: batch.Batch, legacy_store_id:batch.Batch}, 'id')
                if(!result) {
                    throw new Error("Zapis danych nieudany! " + JSON.stringify(batch));
                }
                idWarehouse = result[0]
                message = "Warehouse zaktualizowany"
            }
            // read matName
            const res = await db('mm_master').where({mat_index:batch.Material}).select('mat_name')
            let matName = null
            if(!! res && res.length > 0){
                matName = res[0].mat_name
                logger.info('[batch.insertOrUpdate] matName:' + matName)
            }
            // update data in mm_tech_stock_imported
            await db(tab_tech_imported).where({mat_index:batch.Material, legacy_tech_id:batch.Batch }).delete()
            result = await db(tab_tech_imported).insert({legacy_tech_id:batch.Batch, mat_index:batch.Material, mat_name: matName, warehouse_id:idWarehouse}, 'id')

            logger.info('[batch.insertOrUpdate] done')
            return {message: message, result: result}
        } catch (error) {
            console.error(error)
            return error
        }
    }
}

