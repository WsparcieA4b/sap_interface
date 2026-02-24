"use strict";
const express = require('express')
const service = require("../service/materials");
const router = express.Router()
const logger = require('../log-config')
const utils = require('../helpers/utils')
const BPromise = require('bluebird')

router.post('/material', function (req, res) {
    logger.info('[materials.post] /material ' + JSON.stringify(req.body))
    let ret_object = { status: 200, error: false }
    const dataArr = utils.ensureArray(req.body.Record)

    logger.info('[materials.post] input array size: ' + dataArr.length)

    // Bluebird promise lib
    BPromise.map(dataArr, (mat) => {
        return service.insertOrUpdate(mat)
    }, { concurrency: 3 }
    ).then((done) => {
        console.log('[materials.post] All promises done')
        res.status(200).json(ret_object);
    }).catch((e) => {
        console.log('[materials.post] Error ' + e)
        ret_object.wynik = "Error";
        ret_object.error = true;
        ret_object.message = 'err: ' + e;
        res.status(400).json(ret_object);
    })

})

module.exports = router
