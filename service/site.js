'use strict';
var db = require('../helpers/db');
var repo = require('../repository/site');
const logger = require('../log-config')
const utils = require('../helpers/utils')

module.exports = {
    insertOrUpdate: async function (siteObject) {
        const erp_sel = { erp_code: siteObject.LocationBusinessPartnerID }
        const legacy_erp_sel = { erp_code: siteObject.CafmID }

        const site_erp_data = site2Dvo(siteObject)

        logger.info('[site.insertOrUpdate] data:' + JSON.stringify(site_erp_data))
        let message = "Zaktualizowane dane";
        let result = null
        let site_id = null

        try {

            const existing_row = await repo.checkSiteExists(erp_sel);
            const existing_legacy_row = (!!siteObject.CafmID) ? await repo.checkSiteExists(legacy_erp_sel) : false;

            // if cafmID is set and exists matching row
            // update row with erp_id set to siteObject.LocationBusinessPartnerID
            if (!!existing_row) {
                logger.info('[site.insertOrUpdate] update:' + JSON.stringify(site_erp_data))
                result = await repo.updateSiteErp(erp_sel, { ...site_erp_data })
                if (!result) {
                    logger.error("[site.insertOrUpdate] Update danych nieudany! " + siteObject.LocationBusinessPartnerID + ', ' + JSON.stringify(site_erp_data))
                    throw new Error("Update danych nieudany! " + siteObject.LocationBusinessPartnerID)
                }
                site_id = existing_row.id
            } else if (!!existing_legacy_row) {
                logger.info('[site.insertOrUpdate] legacy row exists:' + JSON.stringify(legacy_erp_sel))
                result = await repo.updateSiteErp(legacy_erp_sel, { ...erp_sel, ...site_erp_data })
                if (!result) {
                    logger.error("[site.insertOrUpdate] Update danych  legacy id nieudany! " + siteObject.CafmID + ', ' + JSON.stringify(site_erp_data))
                    throw new Error("Update danych legacy id nieudany! " + siteObject.CafmID)
                }
                site_id = existing_legacy_row.id
            } else { // insert new record
                logger.info('[site.insertOrUpdate] insert:' + JSON.stringify(site_erp_data))
                result = await repo.insertSiteErp({ ...erp_sel, ...site_erp_data })
                if (!result) {
                    logger.error("[site.insertOrUpdate] Zapis danych nieudany! " + siteObject.LocationBusinessPartnerID + ', ' + JSON.stringify(site_erp_data))
                    throw new Error("Zapis danych nieudany! " + siteObject.LocationBusinessPartnerID)
                }
                site_id = result[0]
                message = "Dodano nowy rekord"
            }

            repo.insertSiteErpSapCCAssign(
                readCompanyCodeAssignmentArray(siteObject),
                site_id
            )
            repo.insertSiteErpSapSalAssign(
                readSalesOrganisationAssignmentArray(siteObject),
                site_id
            )

            await updateAssetsSite(siteObject, { parent_id: site_id })
            logger.info('[site.insertOrUpdate]  ' + message + ', siteObject.LocationBusinessPartnerID:' + siteObject.LocationBusinessPartnerID)

            return {
                success: true,
                message: message
            }
        }
        catch (error) {
            logger.info('[site.insertOrUpdate] error:' + JSON.stringify(site_erp_data))
            console.log(error)
            return error
        }
    }
}

function site2Dvo(siteObject) {
    return {
        erp_code: siteObject.LocationBusinessPartnerID,
        site_type: null,
        hierarchical_site: null,
        site_name: siteObject.FirstLineName
    }
}

function readSalesOrganisationAssignmentArray(siteObject) {
    const soaArray = []
    if (!!siteObject.SalesOrganisationAssignment) {
        const arr = utils.ensureArray(siteObject.SalesOrganisationAssignment)
        for (let soa of arr) {
            console.log(soa)
            soaArray.push({ 'sales_organisation_id': soa.SalesOrganisationID, 'blocked_for_ordering': soa.BlockedForOrdering })
        }
    }
    return soaArray
}

function readCompanyCodeAssignmentArray(siteObject) {
    const ccaArray = []
    if (!!siteObject.CompanyCodeAssignment) {
        const arr = utils.ensureArray(siteObject.CompanyCodeAssignment)
        for (let cca of arr) {
            console.log(cca)
            ccaArray.push({ 'company_code_id': cca.CompanyCodeID })
        }
    }
    return ccaArray
}

async function updateAssetsSite(siteObject, assets_sel) {
    let ext_data = {
        default_client_id: siteObject.MainBusinessPartnerID,
        address1: siteObject.StreetName + ' ' + siteObject.HouseID,
        zip_code: siteObject.StreetPostalCode,
        city: siteObject.CityName,
        site_email: siteObject.URI,
        aktywny: true
    }
    logger.info('[site.insertOrUpdate] ext_data:' + JSON.stringify(ext_data))

    if (!!await repo.checkAssetsSiteExists(assets_sel)) {
        logger.info('[site.insertOrUpdate]  s_assets_site: update ' + JSON.stringify(assets_sel) + ', ' + JSON.stringify(ext_data))
        await repo.updateAssetsSiteErp(assets_sel, ext_data)
    } else {
        logger.info('[site.insertOrUpdate] s_assets_site: insert ' + JSON.stringify(assets_sel) + ', ' + JSON.stringify(ext_data))
        await repo.insertAssetsSiteErp({ ...assets_sel, ...ext_data })
    }
}