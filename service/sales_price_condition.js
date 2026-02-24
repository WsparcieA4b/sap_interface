'use strict';
var db = require('../helpers/db');
const logger = require('../log-config')
const parse = require('date-fns').parse
const isValid = require('date-fns').isValid

module.exports = {
    insertOrUpdate: async function (cond) {

        const mat_id = await getIdFor('mm_master', { mat_index: cond.Material })
        const condition_id = await getIdFor('pr_conditions_def', { short: cond.ConditionType })
        const isPPR0 = (cond.ConditionType == 'PPR0') // true / false

        console.log("[pricing.insertOrUpdate] "+cond.ConditionRecord, "Material ID:" + mat_id, "Condition ID:"+condition_id, "Is PPR0:"+ isPPR0)
        let sel, condition_data, message, result, m

        console.log(cond)
        if (!mat_id || !condition_id) {
            message = 'material_id or condition_id is null'
            logger.info(message)
            return { result: 'Error', message: message }
        }
        try {
            if (!!cond.Customer) { // customer is set, so write data to customer_2_condition
                const bp_id = await getIdFor('business_partner_erp', { erp_id: cond.Customer })
                console.log(cond.ConditionRecord +" Customer is set, ==> Bp_id:" + bp_id)
                condition_data = {
                    cust_mast_id: bp_id,
                    condition_type_id: condition_id,
                    c_val_price: isPPR0 ? cond.ConditionRateValue : null,
                    c_waluta: isPPR0 ? cond.ConditionRateValueUnit : null,
                    c_val_markup: (!isPPR0) ? cond.ConditionRateValue : null,
                    material_id: mat_id,
                    erp_condition_id: cond.ConditionRecord
                }
                const table_name = 'customer_2_conditions'
                // console.log('[pricing.insertOrUpdate] 1', bp_id, condition_data)
                // albo 1) wyszukać wg SAP conditionRecord (to klucz warunku w SAP) i sprawdzić czy istnieje
                // albo 2) szukać unikalnej kombinacji: cust_mast_id, condition_type_id i material_id (nie może się powtórzyć)
                // dzisiaj klient nie używa tych warunków więc może być opcja 1
                const fltrOpcja1 = { erp_condition_id: cond.ConditionRecord }
                // const fltrOpcja2 = { cust_mast_id: bp_id, condition_type_id: condition_id, material_id: mat_id }

                const row_exists = await db(table_name).where(fltrOpcja1).first()
                if (!!row_exists) {
                    console.log("row_exists " + cond.ConditionRecord )
                    result = await db(table_name).where({ id: row_exists.id }).update(condition_data)
                    console.log("[pricing.insertOrUpdate] "+ cond.ConditionRecord +" update into " + table_name + ' customer ' + cond.Customer + ' condition rec exists:' + cond.ConditionRecord, condition_data)
                    m = "update"
                } else {
                    console.log("[pricing.insertOrUpdate] "+cond.ConditionRecord, 'insert', table_name, JSON.stringify(condition_data))
                    result = await db(table_name).insert(condition_data)
                    console.log("[pricing.insertOrUpdate] "+ cond.ConditionRecord +" insert " + table_name + ' customer ' + cond.Customer + ' no cond rec:' + cond.ConditionRecord, condition_data)
                    m = "insert"
                }
                // console.log('[pricing.insertOrUpdate] ', m, table_name, condition_data )
                if (!result) {
                    console.log("[pricing.insertOrUpdate] "+ cond.ConditionRecord +" result", result)
                    message = 'Nieudany ' + message + ' do ' + table_name + ', ' + JSON.stringify(condition_data)
                    logger.error(message)
                    throw new Error(message)
                } else {
                    console.log(cond.ConditionRecord +" result is not null => update or insert done with success")
                }
            } else { // no customer given, so write to pr_pricelist_details
                console.log('[pricing.insertOrUpdate] '+cond.ConditionRecord + ' no customer given, so write to pr_pricelist_details')
                const pr_list_id = await getIdFor('pr_price_list', { is_default: true })
                //parser daty - zaminie ajson string na datę javascript
                //dokuemntacja:  https://date-fns.org/v2.14.0/docs/isValid
                const date_from = parse(cond.ConditionValidityStartDate)
                const date_to = parse(cond.ConditionValidityEndDate)
                if (!isValid(date_from) || !isValid(date_to)) {
                    //jesli data niewłaściwa
                    message = 'Niepoprawna data ' + date_from + ' lub ' + date_to + '.'
                    logger.error(message)
                    throw new Error(message)
                }
                //25.07.2020 - zmian struktury tabeli pr_pricelist_details - dodana kolumna uom_id (klucz obcy do tab: catalogue)
                //wyszukanie id rekodu jednostki na podstawie kodu jednostki z SAP
                const uomrow = await db('catalogue')
                    .where(db.raw(`(context = 'uom') AND (lower(kod) = lower(:inkod))`, { inkod: cond.ConditionQuantityUnitCode })) 
                    .first()
                console.log(cond.ConditionRecord +" catalogue row for "+cond.ConditionQuantityUnitCode , JSON.stringify(uomrow))

                let uomID = null // 2020-08-26
                if(!!uomrow) {
                    uomID = uomrow.id || null
                }
                const condition_data = {
                    price_list_id: pr_list_id,
                    price: cond.ConditionRateValue,
                    currency: cond.ConditionRateValueUnit,
                    material_id: mat_id,
                    cond_type_id: condition_id,
                    price_unit: cond.ConditionQuantity,
                    //uom: cond.ConditionQuantityUnitCode, -- wycofane - zamiast uom referencja do uom_id 
                    uom_id: uomID, // dodane 25.07.2020 , zmiana 2020-08-26
                    valid_from: date_from,
                    valid_to: date_to
                }
                const table_name = 'pr_pricelist_details'
                sel = { material_id: mat_id, cond_type_id: condition_id }
                const row_exists = await db(table_name).where(sel).first()
                if (!!row_exists) {
                    console.log("[pricing.insertOrUpdate] "+cond.ConditionRecord+" update data with: " + JSON.stringify(condition_data)                    )
                    result = await db(table_name).where({ id: row_exists.id }).update(condition_data)
                    m = "update"
                } else {
                    console.log("[pricing.insertOrUpdate] "+cond.ConditionRecord +" insert data with: " + JSON.stringify(condition_data)                    )
                    const a = db(table_name).insert(condition_data).toSQL().toNative()
                    console.log(a)
                    result = await db(table_name).insert(condition_data)
                    m = "insert"
                }
                console.log("[pricing.insertOrUpdate] "+cond.ConditionRecord, m, table_name, JSON.stringify( condition_data))
                if (!result) {
                    message = 'Nieudany ' + message + ' do ' + table_name + ', ' + JSON.stringify(condition_data)
                    logger.error(message)
                    throw new Error(message)
                }
            }
            message = m + ' ' + "sukces"
            logger.info(message)
            return { result: result, message: message };
        } catch (error) {
            logger.info("[pricing.insertOrUpdate] "+cond.ConditionRecord +" error: " + JSON.stringify(error) + JSON.stringify({ ...sel, ...condition_data }))
            return error
        }
    }
}

async function getIdFor(table_name, selection) {
    //console.log('[pricing.getIdFor] ', table_name, selection)
    const row = await db(table_name).where(selection).first().select('id')
    if (!!row) {
        return row['id']
    } else {
        return null
    }
}


