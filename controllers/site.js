"use strict";
const express = require('express')
const service = require("../service/site");
const cleaner = require("../service/customers_clean");
const router = express.Router()
const logger = require('../log-config')
const utils = require('../helpers/utils')
const BPromise = require('bluebird')

router.post('/site', function (req, res) {
  logger.info('[sites.post] /site ' + JSON.stringify(req.body))
  let ret_object = { status: 200, error: false }
  const dataArr = utils.ensureArray(req.body.Record)

  logger.info('[sites.post] input array size: ' + dataArr.length)

  //Bluebird promise lib
  BPromise.map(dataArr, (site) => {
    return service.insertOrUpdate(site)
  }, { concurrency: 3 }
  ).then((done) => {
    console.log('[sites.post] All promises done')
    res.status(200).json(ret_object);
  }).catch((e) => {
    console.log('[sites.post] Error ' + e)
    ret_object.wynik = "Error";
    ret_object.error = true;
    ret_object.message = 'err: ' + e;
    res.status(400).json(ret_object);
  })

});

module.exports = router
