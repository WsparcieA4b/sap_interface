'use strict';
var db = require('../helpers/db');
var repo = require('../repository/customer');
var vendorrepo = require('../repository/vendor');
const logger = require('../log-config')
const utils = require('../helpers/utils')

//All functions return a bluebird promise for their results
module.exports = {
    insertOrUpdate: async function (customer) {
        const erp_sel = { erp_id: customer.InternalID }
        const legacy_erp_sel = { erp_id: customer.CafmID }
        let bp_id = null
        const data = customer2Dvo(customer)

        // logger.info('[customers.insertOrUpdate] data:' + JSON.stringify(data))

        let message = "Zaktualizowane dane";
        let result = null
        try {
            const existing_row = await repo.checkRowExist(erp_sel)
            const existing_legacy_row = (!!customer.CafmID) ? await repo.checkRowExistLegacy(legacy_erp_sel) : false;

            // if CafmID is set and exists matching row
            // update row with erp_id set to InternalID
            if (!!existing_row) {
                logger.info('[customers.insertOrUpdate] update:' + JSON.stringify(data))
                result = await repo.updateBizPartnerErp(erp_sel, data)
                if (!result) {
                    logger.error("[customers.insertOrUpdate] Update danych nieudany! " + customer.InternalID + ', ' + JSON.stringify(data))
                    throw new Error("Update danych nieudany! " + customer.InternalID)
                }
                bp_id = existing_row.id
            } else if (!!existing_legacy_row) {
                logger.info('[customers.insertOrUpdate] legacy row exists:' + JSON.stringify(legacy_erp_sel))
                result = await repo.updateBizPartnerErpLegacy(legacy_erp_sel, { ...erp_sel, ...data })
                if (!result) {
                    logger.error("[customers.insertOrUpdate] Update danych  legacy id nieudany! " + customer.CafmID + ', ' + JSON.stringify(data))
                    throw new Error("Update danych legacy id nieudany! " + customer.CafmID)
                }
                bp_id = existing_legacy_row.id
            } else { // insert new record
                logger.info('[customers.insertOrUpdate] insert:' + JSON.stringify(data))
                result = await repo.insertBizPartnerErp({ ...erp_sel, ...data, active: true })
                if (!result) {
                    logger.error("[customers.insertOrUpdate] Zapis danych nieudany! " + customer.InternalID + ', ' + JSON.stringify(data))
                    throw new Error("Zapis danych nieudany! " + customer.InternalID)
                }
                bp_id = result[0]
                message = "Dodano nowy rekord"
            }
            // write bp sap cc assign
            if (!!data.vendor) {
                await vendorrepo.insertBPSapCCAssign(
                    readVendorCompanyCodeAssignmentArray(customer),
                    bp_id)
                await vendorrepo.insertBPSapPOAssign(
                    readPurchaseOrganisationAssignmentArray(customer),
                    bp_id)
            } else {
                await repo.insertBPSapCCAssign(
                    readCompanyCodeAssignmentArray(customer),
                    bp_id)
                await repo.insertBPSapSalAssign(
                    readSalesOrganisationAssignmentArray(customer),
                    bp_id)
            }

            if (!!customer.URI || !!customer.Telephone || !!customer.MobilePhone) {
                await writeContactData(customer, { bp_id: bp_id })
            }

            logger.info('[customers.insertOrUpdate]  ' + message + ', InternalID:' + customer.InternalID)

            return {
                success: true,
                message: message
            }
        }
        catch (error) {
            logger.info('[customers.insertOrUpdate] error:' + JSON.stringify(data))
            console.log(error)
            return error
        }
    }
}

async function writeContactData(customer, bp_sel) {
    let ext_data = {}
    if (!!customer.URI) ext_data.email = customer.URI
    if (!!customer.Telephone) ext_data.telephone = customer.Telephone
    if (!!customer.MobilePhone) ext_data.mobphone = customer.MobilePhone
    logger.info('[customers.insertOrUpdate] ext_data:' + JSON.stringify(ext_data))

    if (!!await repo.checkCustMasterExtExist(bp_sel)) {
        logger.info('[customers.insertOrUpdate] cust_master_ext: update ' + JSON.stringify(bp_sel) + ', ' + JSON.stringify(ext_data))
        await repo.updateCustMasterExt(bp_sel, ext_data)
    } else {
        logger.info('[customers.insertOrUpdate] cust_master_ext: insert ' + JSON.stringify(bp_sel) + ', ' + JSON.stringify(ext_data))
        await repo.insertCustMasterExt({ ...bp_sel, ...ext_data })
    }
}

function readSalesOrganisationAssignmentArray(customer) {
    const soaArray = []
    if (!!customer.SalesOrganisationAssignment) {
        const arr = utils.ensureArray(customer.SalesOrganisationAssignment)
        for (let soa of arr) {
            console.log(soa)
            soaArray.push({ 'sales_organisation_id': soa.SalesOrganisationID, 'blocked_for_ordering': soa.BlockedForOrdering })
        }
    }
    return soaArray
}

function readCompanyCodeAssignmentArray(customer) {
    const ccaArray = []
    if (!!customer.CompanyCodeAssignment) {
        const arr = utils.ensureArray(customer.CompanyCodeAssignment)
        for (let cca of arr) {
            console.log(cca)
            ccaArray.push({ 'company_code_id': cca.CompanyCodeID })
        }
    }
    return ccaArray
}

function readVendorCompanyCodeAssignmentArray(customer) {
    const ccaArray = []
    if (!!customer.CompanyCodeAssignment) {
        const arr = utils.ensureArray(customer.CompanyCodeAssignment)
        for (let cca of arr) {
            console.log(cca)
            ccaArray.push({ 'company_code_id': cca.CompanyID, 'blocked_company_code': cca.BlockedCompanyCode })
        }
    }
    return ccaArray
}

function readPurchaseOrganisationAssignmentArray(customer) {
    const poaArray = []
    if (!!customer.PurchasingOrganizationAssignment) {
        const arr = utils.ensureArray(customer.PurchasingOrganizationAssignment)
        for (let poa of arr) {
            console.log(poa)
            poaArray.push({
                'purchasing_organisation_id': poa.PurchasingOrganisationID,
                'blocked_for_purchasing': poa.BlockedForPurchasing
            })
        }
    }
    return poaArray
}

function customer2Dvo(customer) {
    const vendor_par = customer.vendor ? { vendor: customer.vendor } : {}
    const customer_par = customer.customer ? { customer: customer.customer } : {}
    return {
        erp_name: customer.FirstLineName,
        address2: (customer.StreetPostalCode + ' ' + customer.CityName),
        address1: (customer.StreetName + ' ' + customer.HouseID),
        tax_id: customer.PartyTaxID, ...vendor_par, ...customer_par
    }
}
