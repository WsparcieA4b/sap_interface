'use strict';
var db = require('../helpers/db')
var cmn = require('./common')

const tabFdocMpk = 'fdoc_mpk'
const tabSapProjectWbs = 'sap_projects_wbs'
const tabSapProjectsWorkPackage = 'sap_projects_work_package'

module.exports = {

    insertWbsPkg: async function (idProjectRow, workPkgId, workPgkName, eid = null) {
        return cmn.insert(tabSapProjectsWorkPackage,
            { 'sap_project_id': idProjectRow, 'work_package_id': workPkgId, 'work_package_name': workPgkName, added_by: eid, date_modified: new Date(), is_new: true })
    },

    updateWbsPkgName: async function (id, wpgName, eid = null) {
        return cmn.update(tabSapProjectsWorkPackage, { 'id': id }, { 'work_package_name': wpgName, added_by: eid, date_modified: new Date(), is_new: true })
    },

    checkWbsExists: async function (workPackageId) {
        return cmn.checkExists(tabSapProjectsWorkPackage, { 'work_package_id': workPackageId })
    },

    updateProjectWbs: async function (projectSel, insertData) {
        return cmn.update(tabSapProjectWbs, projectSel, insertData)
    },

    insertProjectsWbs: async function (insertData) {
        return cmn.insert(tabSapProjectWbs, insertData)
    },

    checkProjectWbsExists: async function (projectId) {
        return cmn.checkExists(tabSapProjectWbs, { project_id: projectId })
    },

    checkFDocExists: async function (wbsId) {
        return cmn.checkExists(tabFdocMpk, { wbs_id: wbsId })
    },

    insFDocMpk: async function (idProjRow) {
        return db(tabFdocMpk).insert({ wbs_id: idProjRow }, 'id')
    }
}