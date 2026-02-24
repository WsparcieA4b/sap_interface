"use strict";
const express = require('express')
const router = express.Router()
const logger = require('../log-config')
const cfg = require("../helpers/api.config")
const fprx = require("../helpers/proxy_funct")
const conn = cfg.s4.connection
const fetch = require('node-fetch')

router.post('/purchase_requisition', async function (req, res, next) {
    var url = fprx.prepUrlProxy() // "https://e700826-iflmap.hcisbt.eu2.hana.ondemand.com/http/cafm/PurReq_OUT"   //conn.host + conn.port + conn.endpoint_create
    logger.info('[purchaseRequisition.post] url: ' + url)
    logger.info('[purchaseRequisition.post] body: ' + JSON.stringify(req.body))
    try {
        const response = await fprx.fetchToken(url, conn.passphrase, conn.pfxFilePath)
        if (response.ok) {
            const csrfToken = response.headers.get('x-csrf-token')
            const cookieInp = response.headers.get("set-cookie")
            const cookie = fprx.prepCookie(cookieInp)
            postData(res, req.body, url, cookie, csrfToken, conn.passphrase, conn.pfxFilePath)
        } else {
            console.log('[PR DIAG] CONN.url', url)
            console.log('[PR DIAG] CONN.passphrase', conn.passphrase)
            console.log('[PR DIAG] CONN.pfxFilePath', conn.pfxFilePath)
            return next({ error: true, message: 'fetchToken NOT OK response :)' })
        }
    }
    catch (err) {
        return next(err)
    }
});

async function postData(res, data, url, cookie, token, passphr, pfxFilePath) {
    const myHeaders = fprx.createHeaders("application/json", token)
    myHeaders.append("Cookie", cookie)

    logger.info('[purchaseRequisition.post] id:' + data.id)
    logger.info('[purchaseRequisition.post] ' + JSON.stringify(data))
    const requestOptions = {
        method: conn.method,
        body: JSON.stringify(data.body),
        headers: myHeaders,
        agent: fprx.createAgent(passphr, pfxFilePath),
        redirect: 'follow'
    }
    try {

        const response = await fetch(url, requestOptions)
        const rcode = response.status
        const isOK = response.ok;
        const result = await response.text();
        logger.info('-------- result -----------')
        logger.info(result)
        console.log('[Result]', result)
        const xmler = result.startsWith('<?xml')
        if (!isOK) {
            //bład po stronie SAP
            res.status(rcode || 200).json({ status: rcode || 200, error: false, message: `SAP reported a problem. Status: ${rcode}` });
        } else if (xmler) {
            res.status(rcode || 200).json({ status: rcode || 200, error: false, message: `SAP reported an error. Status: ${rcode}` });
        }
        else {
            res.status(200).json({ status: 200, error: false, message: "SAP Purchase requisition created", result: result });
        }
    } catch (error) {
        console.log('error', error)
        res.status(400).json({ status: 400, error: true, message: error });

    }

}

module.exports = router
