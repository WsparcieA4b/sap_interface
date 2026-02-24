"use strict";
const express = require('express')
const service = require("../service/projects");
const router = express.Router()
const logger = require('../log-config')
const utils = require('../helpers/utils')
const BPromise = require('bluebird')

router.post('/project', function (req, res) {
  logger.info('[project.post] /projects ' + JSON.stringify(req.body))
  const ret_object = { status: 200, error: false }

  try {
    let dataArr = utils.ensureArray(req.body.Record)
    //Bluebird promise lib
    BPromise.map(dataArr, (proj) => {
      return service.insertOrUpdate(proj, req.userjwt)
    }, { concurrency: 3 }
    ).then((done) => {
      console.log('[project.post] All promises done')
      res.status(200).json(ret_object);
    }).catch((e) => {
      console.log('[project.post] Error ' + e)
      ret_object.wynik = "Error";
      ret_object.error = true;
      ret_object.message = 'err: ' + e;
      res.status(400).json(ret_object);
    })
  }
  catch (er) {
    console.log('[project.post] Error ' + er)
  }

});

module.exports = router

