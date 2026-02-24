'use strict';
var projectRepo = require('../repository/project');
const logger = require('../log-config')

module.exports = {
    insertOrUpdate: async function (project, userjwt) {
        const { eid: userID = null } = userjwt || {} //zalogowany ID usera z tokena JWT
        const repo_args = {
            customer: project.Customer, project_name: project.ProjectName, profit_center: project.ProfitCenter,
            project_stage: project.ProjectStage, stage_description: project.StageDescription, org_id: project.OrgID,
            date_modified: new Date(), added_by: userID
        }


        const project_sel = { project_id: project.ProjectID }
        logger.info('[projects.insertOrUpdate] args: ' + JSON.stringify(repo_args))
        let message = null
        let result = null
        try {
            const row_exists = await projectRepo.checkProjectWbsExists(project.ProjectID)
            let idProjRow = null // id row of project
            if (!!row_exists) {
                logger.info('[projects.insertOrUpdate] update: ' + JSON.stringify(repo_args))
                result = await projectRepo.updateProjectWbs(project_sel, repo_args)
                idProjRow = row_exists['id']
                if (!result) {
                    logger.error("Update danych nieudany! " + project.ProjectID)
                    throw new Error("Update danych nieudany! " + project.ProjectID)
                }
                message = "Record updated"
            } else {
                logger.info('[projects.insertOrUpdate] insert: ' + JSON.stringify({ ...project_sel, ...repo_args }))
                // ew record
                result = await projectRepo.insertProjectsWbs({ ...project_sel, ...repo_args })
                if (!result) {
                    logger.error("Zapis danych nieudany! " + project.ProjectID)
                    throw new Error("Zapis danych nieudany! " + project.ProjectID);
                }
                idProjRow = result[0]
                message = "Record inserted"
            }
            let workPackageArr = project.WorkpackageSet.Workpackage
            if (workPackageArr.constructor !== Array) {
                workPackageArr = [workPackageArr]
            }
            result = await writeWorkPackageArray(idProjRow, workPackageArr, userID)
            return { message: message, result: result }
        } catch (error) {
            logger.info('[projects.insertOrUpdate] error: ' + JSON.stringify(error) + JSON.stringify({ ...project_sel, ...repo_args }))
            logger.info(error)
            return error
        }
    }
}

async function writeWorkPackageArray(idProjectRow, workPkgArray, eid = null) {
    //iteracje po workPkgArray
    let i
    for (i in workPkgArray) {
        const { WorkPackageID = null, WorkPackageName = null } = workPkgArray[i] || {};

        const exist_wbs = await projectRepo.checkWbsExists(WorkPackageID)
        if (!!exist_wbs) {
            const updated = await projectRepo.updateWbsPkgName(exist_wbs.id, WorkPackageName, eid)
            if (!!updated) {
                logger.info(`wbs row updated for id: ${exist_wbs.id}`);

                let fdoc_exists = await projectRepo.checkFDocExists(exist_wbs.id)
                if (!fdoc_exists) {
                    await insertFdocMpk(exist_wbs.id)
                }
            } else {
                logger.info(`wbs row update error for id: ${exist_wbs.id}`)
                throw Error(`wbs row update error for id: ${exist_wbs.id}`)
            }
        } else {
            const inserted = await projectRepo.insertWbsPkg(idProjectRow, WorkPackageID, WorkPackageName, eid)
            if (!!inserted) {
                const newID = inserted[0];
                await insertFdocMpk(newID)
                logger.info(`wbs row inserted for id: ${newID}`);
            } else {
                throw Error(`wbs row insert error for id: ${exist_wbs.id}`)
            }
        }
    }
    logger.info(`WBS update completed for all WBS for project ${idProjectRow}`)
    return { success: true }
}

async function insertFdocMpk(idProjRow) {
    let fdoc_inserted_row = await projectRepo.insFDocMpk(idProjRow)
    if (!fdoc_inserted_row) {
        logger.error("Nieudany zapis do fdoc_mpk wbs_id: " + idProjRow)
    }
}
