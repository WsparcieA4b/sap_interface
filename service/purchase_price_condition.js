'use strict';
var db = require('../helpers/db');
const logger = require('../log-config')
const parse = require('date-fns').parse
const isValid = require('date-fns').isValid

module.exports = {
    insertOrUpdate: async function (dto) {
        let m, message, result
        try {
            console.log('[purchase_pricing.insertOrUpdate]')
            const condition_data = await map4db_pr_purchase_info(dto)
            const table_name = 'pr_purchase_info'
            const sel = {
                supplier_id: condition_data.supplier_id,
                material_id: condition_data.material_id,
                condition_type_id: condition_data.condition_type_id,
                prunit_uom_id: condition_data.prunit_uom_id
            }
            const row_exists = await db(table_name).where(sel).first()
            if (!!row_exists) {
                result = await db(table_name).where({ id: row_exists.id }).update(condition_data)
                m = "update"
            } else {
                const a = db(table_name).insert(condition_data).toSQL().toNative()
                console.log(a)
                result = await db(table_name).insert(condition_data)
                m = "insert"
            }
            if (!result) {
                message = 'Nieudany ' + message + ' do ' + table_name + ', ' + JSON.stringify(condition_data)
                logger.error(message)
                throw new Error(message)
            }
            // message = m + ' ' + "sukces"
            // logger.info(message)
            return { result: result, message: message };
        } catch (error) {
            logger.info('[purchase_pricing.insertOrUpdate] error: ' + JSON.stringify(error))
            return error
        }
    }
}

async function getIdFor(table_name, selection) {
    const row = await db(table_name).where(selection).first().select('id')
    if (!!row) {
        console.log('[purchase_pricing.getIdFor] ', table_name, selection, row['id'])
        return row['id']
    } else {
        console.log('[purchase_pricing.getIdFor] ', table_name, selection, ' null')
        return null
    }
}

async function map4db_pr_purchase_info(dto) {
    let message
    console.log(dto)
    const date_from = parse(dto.ConditionValidityStartDate)
    console.log(dto.ConditionValidityStartDate, date_from)
    const date_to = parse(dto.ConditionValidityEndDate)
    console.log(dto.ConditionValidityEndDate, date_to)
    if (!isValid(date_from) || !isValid(date_to)) {
        //jesli data niewłaściwa
        message = 'Niepoprawna data ' + date_from + ' lub ' + date_to + '.'
        logger.error(message)
        throw new Error(message)
    }
    const condition_type_id = await getIdFor('pr_conditions_def', { short: dto.ConditionType })
    const material_id = await getIdFor('mm_master', { mat_index: dto.Material })
    const supplier_id = await getIdFor('business_partner_erp', { erp_id: dto.Supplier })
    // md 2020-08-05 PurchasingInfo z SAP ma 'kod', a nie 'nazwa' 
    const prunit_uom_id = await getIdFor('catalogue', { kod: dto.ConditionQuantityUnitCode, context: 'uom' })

    const rv = {
        erp_condition_id: dto.ConditionRecord,
        condition_type_id: condition_type_id,
        material_id: material_id,
        supplier_id: supplier_id,
        purchasing_org: dto.PurchasingOrganization,
        plant: dto.Plant,
        valid_from: date_from,
        valid_to: date_to,
        price: dto.ConditionRateValue,
        currency: dto.ConditionRateValueUnit,
        prunit: dto.ConditionQuantity,
        prunit_uom_id: prunit_uom_id
    }
    if (!rv.material_id || !rv.condition_type_id || !rv.supplier_id || !rv.prunit_uom_id) {
        message = 'Error! Null: material_id:' + rv.material_id + ', condition_type_id: ' + rv.condition_type_id + ', supplier_id: ' + rv.supplier_id + ', prunit_uom_id: ' + rv.prunit_uom_id
        console.log(message)
        logger.info(message)
        throw new Error(message)
    }

    return rv
}
