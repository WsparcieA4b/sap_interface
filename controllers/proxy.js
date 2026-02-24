"use strict";
const express = require('express')
const router = express.Router()
const logger = require('../log-config')
const cfg = require("../helpers/api.config");
const fprx = require("../helpers/proxy_funct");
const conn = cfg.s4.connection
const fetch = require('node-fetch')
const repo = require("../service/proxy");
const shared = require('../service/a_common_db_lib')

router.post('/proxy', async function (req, res, next) {
    const isNew = fprx.isNewSalesOrder(req.body.body)
    const url = fprx.prepUrl(isNew)
    logger.info('[proxy.post] url: ' + url)
    logger.info('[proxy.post] req.body: ' + JSON.stringify(req.body))

    try {
        const response = await fprx.fetchToken(url, conn.passphrase, conn.pfxFilePath)
        if (response.ok) {
            const csrfToken = response.headers.get('x-csrf-token')
            const cookieInp = response.headers.get("set-cookie")
            const cookie = fprx.prepCookie(cookieInp)
            postData(res, req.body, url, cookie, csrfToken, isNew, conn.passphrase, conn.pfxFilePath)
        } else {
            console.log('STATUS:', response.status)
            console.log('STATUSTXT:', response.statusText)
            console.log('[PRXY DIAG] CONN.url', url)
            console.log('[PRXY DIAG] CONN.passphrase', conn.passphrase)
            console.log('[PRXY DIAG] CONN.pfxFilePath', conn.pfxFilePath)
            return next({ error: true, message: 'fetchToken NOT OK response :)' })
        }
    }
    catch (err) {
        return next(err)
    }
});

async function postData(res, data, url, cookie, token, isNew, passphr, pfxFilePath) {
    const myHeaders = fprx.createHeaders("application/json", token)
    myHeaders.append("Cookie", cookie)
    var so_data = fprx.fixBody(data.body, isNew)

    logger.info('[proxy.post] id:' + data.id)
    logger.info('[proxy.post] ' + JSON.stringify(so_data))
    const requestOptions = {
        method: conn.method,
        body: JSON.stringify(so_data),
        headers: myHeaders,
        agent: fprx.createAgent(passphr, pfxFilePath),
        redirect: 'follow'
    }
    console.log("Dane zlecenia do SAP:", requestOptions.body)
    await shared.SAP_Logger_Save_Call2IntegrationLog(data.id, "Rozpoczęcie transmisji do SAP", requestOptions.body, 'Info', null)
    try {
        const response = await fetch(url, requestOptions);
        const rcode = response.status
        const isOK = response.ok;
        const result = await response.text();
        const { statusText = '' } = response || {}
        logger.info('-------- result -----------')
        logger.info(result)
        console.log(result)
        const xmler = result.startsWith('<?xml')
        if (!isOK) {
            //bład po stronie SAP
            await shared.SAP_Logger_Save_Call2IntegrationLog(data.id, `Nieudany zapis do SAP. Status: ${rcode}`, statusText + ' ' + result, xmler ? 'Warning' : 'Info', null)
            res.status(rcode || 200).json({ status: rcode || 200, error: false, message: `Update done. Status: ${rcode}` });
        }
        else if (!isNew) {
            console.log('Update done!')
            await shared.SAP_Logger_Save_Call2IntegrationLog(data.id, `Zlecenie SAP zaktualizowane. Status: ${rcode}`, statusText + ' ' + result, xmler ? 'Warning' : 'Info', null)
            res.status(rcode || 200).json({ status: rcode || 200, error: false, message: `Update done. Status: ${rcode}` });
        }
        else if (result.startsWith('{')) {
            try {
                const jsn = JSON.parse(result)
                const so = jsn.A_SalesOrder.A_SalesOrderType.SalesOrder
                console.log("Zapis " + so + ", " + data.id)
                //logger dla UI
                await shared.SAP_Logger_Save_Call2IntegrationLog(data.id, "Nowe zlecenie SAP zapisane " + so, so, 'Info', null)
                //oryginalna metoda MD
                await repo.insertOrUpdate(so, data.id).then(insResult => {
                    if (!insResult.error) {
                        console.log(insResult.message)
                        res.status(200).json({ status: 200, error: false, message: insResult.message });
                    } else {
                        console.log(insResult.message)
                        res.status(200).json({ status: 200, error: true, message: insResult.message });
                    }
                }).catch(err => {
                    res.status(500).json({ status: 500, error: true, message: err })
                })
                //Koniec

            } catch (jsnError) {
                console.log(jsnError)
                await shared.SAP_Logger_Save_Call2IntegrationLog(data.id, "Zapis nr zlecenia erp nieudany ", '-', 'Error', null)
                res.status(500).json({ status: 500, error: true, message: jsnError });
            }
        }
        else {
            //logger błedu SAP
            await shared.SAP_Logger_Save_Call2IntegrationLog(data.id, "Błąd zapisu zlecenia do SAP!", result, 'Error', null)
            throw Error(result);
        }

    }
    catch (error) {
        //logger fetch (inne błędy)
        await shared.SAP_Logger_Save_Call2IntegrationLog(data.id, "Inny błąd zapisu do SAP!", error ? error.message : 'Empty error property!', 'Error', null)
        res.status(400).json({ status: 400, error: true, message: error });
    }
}

module.exports = router
