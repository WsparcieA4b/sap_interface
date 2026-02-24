"use strict";
const express = require('express')
const router = express.Router()
const logger = require('../log-config')
const cfg = require("../helpers/api.config");
const fprx = require("../helpers/proxy_funct");
const conn = cfg.s4.connection
const connOD = cfg.od_prod.connection
const fetch = require('node-fetch')

router.post('/proxy_docod', async function (req, res, next) {
    const doc_o = req.body
    const urlOd = connOD.host// process.env.PROD_SAP_OD_API_URL // endpoint do SAP 
    const url = conn.host + conn.port + conn.endpoint_purchase //endpoint z Purchase do AUth?
    // logger.info('[proxy_od.post] url: ' + url)
    // logger.info('[proxy_od.post] req.body: ' + JSON.stringify(req.body))
    let fakeBody = { ...doc_o }
    try {
        const response = await fprx.fetchToken(url, conn.passphrase, conn.pfxFilePath)
        if (response.ok) {
            logger.info('[S4_FETCH_TOKEN] [proxy_od.post]  Response OK from S4!')
            const csrfToken = response.headers.get('x-csrf-token')
            const cookieInp = response.headers.get("set-cookie")
            const cookie = fprx.prepCookie(cookieInp)
            await postData(res, fakeBody, urlOd, cookie, csrfToken, conn.passphrase, conn.pfxFilePath)
        } else {
            const obj = {
                status: response.status,
                statusText: response.statusText
            }
            logger.error(response, obj)
            return next({ error: true, message: 'fetchToken NOT OK response :)', resp: obj })
        }
    }
    catch (err) {
        logger.error('[proxy_od.post] error ', err)
        console.log(err)
        return next(err)
    }
});

async function postData(res, data, url, cookie, token, passphr, pfxFilePath) {
    const myHeaders = fprx.createHeaders("application/json", token)
    myHeaders.append("Cookie", cookie)
    logger.info('[proxy_od.post] ' + JSON.stringify(data))
    const requestOptions = {
        method: conn.method,
        body: JSON.stringify(data),
        headers: myHeaders,
        agent: fprx.createAgent(passphr, pfxFilePath),
        redirect: 'follow'
    }
    console.log("Dane OD do SAP:", requestOptions.body)
    //await shared.SAP_Logger_Save_WF_Call2IntegrationLog(data.id, "Rozpoczęcie transmisji do SAP", requestOptions.body, 'Info', null)
    try {
        const response = await fetch(url, requestOptions);
        const { ok: isOK, status, statusText: message, data } = response || {}
        const result = await response.text();
        console.info('-------- POST OD result -----------')
        console.log(result)
        const post_ret = { ok: isOK, status, message, data: result }
        res.status(status || 200).json(post_ret);
    }
    catch (error) {
        console.timeLog(error)
        res.status(status || 200).json(error);
    }
}

module.exports = router
