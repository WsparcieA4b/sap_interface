
const jwt = require('jsonwebtoken');
const config = require("../helpers/api.config");
const logger = require('../log-config');
const log2db = require("../service/logviewer");
const sf = require('../helpers/shared_funct')

//kazdy request trafia tutaj w celu weryfikacji uprawnień logującego się
module.exports = function (req, res, next) {
    const ip = req.ip;
    // These are the typical localhost values
    const isLocal =
        ip === '::1' ||               // IPv6 localhost
        ip === '::ffff:127.0.0.1' ||  // IPv4-mapped IPv6 localhost
        ip === '127.0.0.1' ||         // IPv4 localhost
        ip.endsWith('127.0.0.1');     // sometimes appears in proxies

    if (isLocal) {
        // Skip token check → go directly to route handler
        return next();
    }
    const { headers = null } = req || {}
    const inf = sf.headerInfo(req);
    const inf2 = { ...inf };
    const debug_token = inf.token
    delete inf2.token;
    if (inf.token) {
        //Bearer 384562935672...
        const actToken = inf.token.substring(7, inf.token.length); //ekstract tokena z AuthHeader
        jwt.verify(actToken, config.jwt.secretKey, function (err, decodedToken) {// verifies secret and checks exp
            if (err) { //failed verification.
                const decTest = jwt.decode(actToken)
                logger.error("Bład weryfikacji JWT. Token: " + inf.token);
                if (decTest)
                    logger.error("Login in token: " + decTest.user_login || '?' + "; Expiry: " + decTest.exp || '?');
                log2db.saveErrorText2Log("API:JWT: Błąd weryfikacji tokena JWT. " + sf.getObjectInfoText(inf2), "API:JWT")
                // log2db.saveErrorText2Log("API:JWT: Failed token(2/2): " + inf.token, "API:JWT")
                return res.status(401).json({
                    "error": true,
                    success: false,
                    hide: true,
                    message: "Odmowa autoryzacji: " + err.name || ""
                });
            }
            req.userjwt = decodedToken;  //attach decodedToken token to request
            next(); //no error, proceed
        });
    } else {
        // forbidden without token
        logger.info("[Auth ERROR JWT]: No token? req.headers:" + JSON.stringify(headers));
        console.log("[Auth ERROR JWT]: No token? req.headers:" + JSON.stringify(headers))
        log2db.saveErrorText2Log("API:JWT: żądanie bez JWT!. IP: " + sf.getObjectInfoText(inf2), "API:JWT")
        return res.status(403).send({
            "error": true,
            "success": false,
            "message": 'Odmowa dostępu. Brak poświadczeń uprawnień użytkownika!'
        });
    }
}

