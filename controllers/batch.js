"use strict";
const express = require('express')
const repo = require("../service/batch");
const router = express.Router()
const logger = require('../log-config')
const utils = require('../helpers/utils')
const BPromise = require('bluebird')


router.post('/batch', async function (req, res) {
    logger.info('[batch.post] /batch ' + JSON.stringify(req.body))
    const ret_object = {status: 200, error: false }
    let dataArr = utils.ensureArray(req.body.Record)
    logger.info('[batch.post] input array size: ' + dataArr.length  )
  //Bluebird promise lib
  BPromise.map(dataArr, (batch) => {
    return repo.insertOrUpdate(batch)
  }, { concurrency: 3 }
    ).then(() => {
            logger.info('[batch.post] All promises done')
            res.status(200).json(ret_object);
        })
        .catch((e) => {
            logger.info('[batch.post] Error ' + e)
            ret_object.wynik = "Error";
            ret_object.error = true;
            ret_object.message = 'err: ' + e;
            res.status(400).json(ret_object);
        })

});

module.exports = router

