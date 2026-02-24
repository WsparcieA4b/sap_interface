'use strict'
var repo = require('../repository/material')
var logger = require("../log-config")
const utils = require('../helpers/utils')

//All functions return a bluebird promise for their results

module.exports = {
    insertOrUpdate: async function (material) {
        const mat_sel = { mat_index: material.ProductInternalID }
        const legacy_mat_sel = { mat_index: material.CafmID }
        const mat_data = material2Dvo(material)
        const paArray = readPlanAssignmentArray(material)
        const soaArray = readSalesOrganisationAssignmentArray(material)
        const vaaArray = readValuationAreaAssignmentArray(material)



        console.log('debug] mat_data', mat_data)
        try {
            /// 1. check if measure unit exists in catalogue
            mat_data.uom_id = await assureMeasureUnitCode(material.BaseMeasureUnitCode)
            // 2. check if group exists
            mat_data.group_id = await assureMaterialGroup(material.ProductGroupInternalID)

            let result = null
            let message = null
            let mat_id = null
            const material_exists = await  repo.checkRowExist(mat_sel)
            const material_legacy_exists = (!!material.CafmID) ? await repo.checkRowExist(legacy_mat_sel) : false
            if (!!material_exists) {
                result = await repo.updateMaterial(mat_sel, mat_data)
                mat_id = material_exists['id']
                message = "Record updated"
            } else if (!!material_legacy_exists) {
                result = await repo.updateMaterial(legacy_mat_sel, { ...mat_sel, ...mat_data })
                mat_id = material_legacy_exists['id']
                message = "Record updated"
            } else {
                result = await repo.insertMaterial({ ...mat_sel, ...mat_data })
                mat_id = result[0]
                message = "New record inserted"
            }

            await repo.insertSoaArray(soaArray, mat_id)
            await repo.insertPaArray(paArray, mat_id)
            await repo.insertVaaArray(vaaArray, mat_id)


            return { result: result, message: message }
        } catch (error) {
            logger.info('[materials.insertOrUpdate] error ' + error + ' ' + JSON.stringify({ ...mat_sel, ...mat_data }))
            return error
        }
    }
}

async function assureMaterialGroup(productGroupInternalID) {
    let rv = null
    const mat_group_sel = { group_name: productGroupInternalID }
    const group_exists = await repo.checkMatGroupRowExist(mat_group_sel)
    if (!!group_exists) {
        logger.info('[materials.assureMaterialGroup] mat exists' + JSON.stringify(group_exists))
        rv = group_exists['id']
    }
    else {
        logger.info('[materials.assureMaterialGroup] mat not exists, creating' + JSON.stringify(mat_group_sel))
        const result = await repo.insertMaterialGroup({ ...mat_group_sel, is_active: true })
        rv = result[0]
    }
    return rv
}

async function assureMeasureUnitCode(baseMeasureUnitCode) {
    // material.BaseMeasureUnitCode - symbol jednostka miary z SAP  ( 'UnitOfMeasureISOCode' z dotarczonego przez Allgeier pliku jednostek) 
    // kompletny dump jednostek z SAP zapisane w tabeli catalogue (kolumna: kod) 

    let rv = null

    const mat_cat_sel = { kod: baseMeasureUnitCode, context: 'uom' }
    const catalogue_exists = await repo.checkCatalogueExist(mat_cat_sel)
    if (!!catalogue_exists) {
        rv = catalogue_exists['id']
    }
    else {
        logger.info('[materials.assureMaterialGroup] uom not exists, creating' + JSON.stringify(catalogue_exists))
        const result = await repo.insertCatalogue({ ...mat_cat_sel, enabled: true, is_warranty: false })
        rv = result[0]
    }
    return rv
}

function material2Dvo(material) {
    return  {
        uom_id: '',
        group_id: '',
        distribution_channel_code: material.DistributionChannelCode,
        mat_name: material.Description,
        unit_cost: !!material.PriceAmountValue ? material.PriceAmountValue : null,
        unit_cost_currency: material.CurrencyCode
    }
}

function readSalesOrganisationAssignmentArray(material) {
    const soaArray = []
    if(!!material.SalesOrganizationAssignment) {
        const arr = utils.ensureArray(material.SalesOrganizationAssignment)
        for(let soa of arr) {
            console.log(soa)
            soaArray.push({'sales_organization_id':soa.SalesOrganizationID, 'distribution_channel_code': soa.DistributionChannelCode})
        }
    }
    return soaArray
}

function readPlanAssignmentArray(material) {
    const soaArray = []
    if(!!material.PlanAssignment) {
        const arr = utils.ensureArray(material.PlanAssignment)
        for(let soa of arr) {
            console.log(soa)
            soaArray.push({'plant_id':soa.PlantID})
        }
    }
    return soaArray
}

function readValuationAreaAssignmentArray(material) {
    const soaArray = []
    if(!!material.ValuationAreaAssignment) {
        const arr = utils.ensureArray(material.ValuationAreaAssignment)
        for(let soa of arr) {
            console.log(soa)
            soaArray.push({
                'valuation_area_id': soa.ValuationAreaID,
                'inventory_valuation_procedure_code': soa.InventoryValuationProcedureCode,
                'price_unit_number_value': soa.PriceUnitNumberValue,
                'price_amount_value': soa.PriceAmountValue,
                'currency_code': soa.CurrencyCode
            })
        }
    }
    return soaArray
}
