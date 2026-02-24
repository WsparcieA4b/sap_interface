"use strict";
const express = require('express')
const repo = require("../service/attachments_info");
const logger = require('../log-config')
const router = express.Router()
const utils = require('../helpers/utils')
const BPromise = require('bluebird');

router.post('/attachments', async function (req, res) {
    logger.info('[attachments_info.post] /attachments ' + JSON.stringify(req.body))
    if (!req.body.A_BillingDocument || !req.body.A_BillingDocument.A_BillingDocumentType) {
        res.status(400).json({ status: 200, error: true, message: "Wrong input JSON format." })
        return
    }
    const dataArr = utils.ensureArray(req.body.A_BillingDocument.A_BillingDocumentType)
    logger.info('[attachments_info.post] input array size: ' + dataArr.length)

    BPromise.map(dataArr, (attachment_info) => {
        return repo.prepareAttachmentInfo(attachment_info)
    }, { concurrency: 3 }
    ).then((urlArrData) => {
        logger.info('[attachments_info.post] All promises done', urlArrData)
        res.status(200).json({ A_BillingDocument: { A_BillingDocumentType: urlArrData } });
    }).catch((e) => {
        logger.info('[attachments_info.post] Error ' + e)
        console.error(e)
        res.status(400).json({ wynik: "Error", error: true, message: 'Internal server error' })
    })
});

module.exports = router

