"use strict";
const express = require('express')
const service = require("../service/customers");
const router = express.Router()
const logger = require('../log-config')
const utils = require('../helpers/utils')
const BPromise = require('bluebird')

router.post('/vendor', function (req, res) {
  logger.info('[vendors.post] /vendor ' + JSON.stringify(req.body))
  const ret_object = { status: 200, error: false }
  let dataArr = utils.ensureArray(req.body.Record)

  logger.info('[vendors.post] input array size: ' + dataArr.length)

  //Bluebird promise lib
  BPromise.map(dataArr, (cust) => {
    return service.insertOrUpdate({ ...cust, 'vendor': true, 'customer': null })
  }, { concurrency: 3 }
  ).then((done) => {
    console.log('[customers.post] All promises done')
    res.status(200).json(ret_object);
  }).catch((e) => {
    console.log('[customers.post] Error ' + e)
    ret_object.wynik = "Error";
    ret_object.error = true;
    ret_object.message = 'err: ' + e;
    res.status(400).json(ret_object);
  })

})

module.exports = router
