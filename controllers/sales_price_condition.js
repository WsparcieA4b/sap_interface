"use strict";
const express = require('express')
const service = require("../service/sales_price_condition");
const router = express.Router()
const logger = require('../log-config')
const utils = require('../helpers/utils')
const BPromise = require('bluebird')

router.post('/pricing', function (req, res) {
    let ret_object = { status: 200, error: false }
    const dataArr = utils.ensureArray(req.body.Record)

    logger.info('[sales_price_condition.post] /pricing \n input array size: ' + dataArr.length + '\n body: ' + JSON.stringify(req.body))
    //Bluebird promise lib
    BPromise.map(dataArr, (salePrice) => {
        return service.insertOrUpdate(salePrice)
    }, { concurrency: 3 }
    ).then((done) => {
        console.log('[sales_price_condition.post] All promises done')
        res.status(200).json(ret_object);
    }).catch((e) => {
        console.log('[sales_price_condition.post] Error ' + e)
        ret_object.wynik = "Error";
        ret_object.error = true;
        ret_object.message = 'err: ' + e;
        res.status(400).json(ret_object);
    })

});

module.exports = router
