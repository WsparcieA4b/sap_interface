"use strict"
const fetch = require('node-fetch')
const https = require('https')
const cfg = require("../helpers/api.config");
var fs = require('fs');

const conn = cfg.s4.connection

async function fetchToken(url, passphr, pfxFilePath) {
  const requestOptions = {
    headers: createHeaders("text/plain", "fetch"),
    agent: createAgent(passphr, pfxFilePath)
  }
  //console.log(requestOptions.headers)
  return fetch(url, requestOptions)
}

function createHeaders(contentType, token) {
  var fetchHeaders = new fetch.Headers();
  fetchHeaders.append("x-csrf-token", token);
  fetchHeaders.append("Content-Type", contentType);
  return fetchHeaders
}

function createAgent(pass, pfxPath) {
  return new https.Agent({
    pfx: fs.readFileSync(pfxPath),
    passphrase: pass,
    keepAlive: false,
  })
}

function prepCookie(cookie) {
  const jsidIdx = cookie.search("JSESSIONID")
  const jtIdx = cookie.search("JTENANTSESSIONID")
  const c1 = cookie.substring(jsidIdx, cookie.indexOf(";", jsidIdx))
  const c2 = cookie.substring(jtIdx, cookie.indexOf(";", jtIdx))
  return c1 + ";" + c2
}

function fixBody(jsonObject, isNew) {
  if (isNew) {
    return jsonObject
  } else {
    if (!!jsonObject.A_SalesOrder) {
      return jsonObject
    }
    else {
      return { "A_SalesOrder": jsonObject }
    }
  }
}

function prepUrlProxy() {
  return conn.host + conn.port + conn.endpoint_purchase
}

function prepUrl(isNew) {
  var endpoint = conn.endpoint_create
  if (!isNew)
    endpoint = conn.endpoint_update
  return conn.host + conn.port + endpoint
}

function isNewSalesOrder(jsonObject) {
  var str = JSON.stringify(jsonObject)
  if (!!str && str.indexOf('"SalesOrder":') != -1) {
    return false
  }
  return true
}




module.exports = { isNewSalesOrder, createHeaders, prepUrl, prepUrlProxy, prepCookie, fixBody, createAgent, fetchToken }
