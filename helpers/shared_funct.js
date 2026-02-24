"use strict";

const browser = require('browser-detect');

module.exports = {

    //zamienia obiekt na łańcuch: {klucz: warotść}
    getObjectInfoText: getObjectInfoText,

    mapUser4Token: function (user) {
        var min = {};
        min.user_login = user.email;
        min.id = user.id;
        min.type = ''
        if (user.isEmployee === true) {
            min.eid = user.employee_id;
            min.type = 'E'
        }

        if (user.isClient === true) {
            min.eid = "?"
            min.type = 'C'
        }
        min.name = user.master_name;
        return min;
    },
    hashPassword: function (password) {
        var salt = crypto.randomBytes(128).toString('base64');
        var iterations = 10000;
        var hash = pbkdf2(password, salt, iterations);

        return {
            salt: salt,
            hash: hash,
            iterations: iterations
        };
    },
    headerInfo: function (req) {
        let br = Object.assign({}, browser(req.headers['user-agent']));
        delete br.versionNumber; // duplikat version
        return {
            ip: (req.headers['x-forwarded-for'] || req.connection.remoteAddress) || "",
            app_ver: req.headers['x-appver'] || "ver?",
            sysName: req.body.system || "?",
            url: req.originalUrl || "",
            browser: getObjectInfoText(br),
            token: req.headers['authorization'] || req.body.token || req.query.token,
            params: JSON.stringify(req.params)
        }
    },
    biKeyExtract: function (req) {
        if (!req) return null;
        const { key = null } = req.query;
        return key;
    },
    isEmpty: _isEmpty

}

function getObjectInfoText(obiekt) {
    if (!obiekt) return "";
    if (_isEmpty(obiekt)) return "";
    var reTxt = "";
    Object.keys(obiekt).map(e => {
        reTxt = reTxt + (e || '') + ': ' + obiekt[e] + ', ';
    });
    return reTxt;
}

function _isEmpty(obj) {
    if (!obj) return true;
    return Object.keys(obj).length === 0;
}