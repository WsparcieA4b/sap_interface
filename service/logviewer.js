"use strict";
const Promise = require("bluebird");
const db = require("../helpers/db"); 
//All functions return a bluebird promise for their results

module.exports = {
    listLog: function (search, id, pageSize, page) {
        var totalRows = 0;
        var result = {};
        // sort = util.parseSortString(qf.sort, "m.id"), 

        let par_id = -1;
        if (!!id && !isNaN(id)) par_id = id * 1;

        var offset = (page - 1) * pageSize;
        var wherRaw = `
        ((   lower(message) like '%' || lower(:search) || '%')  or (lower(source) like '%' || lower(:search) || '%')  
           or (lower(origin) like '%' || lower(:search) || '%') or (:search='') )  
        AND ((id=:id) OR (:id=-1)) 
        `

        // tylko ostatnie  
        //przygotownaie pagingu - ilosc stron
        return db("log_table").select(db.raw("count(*) as count"))
            .whereRaw(wherRaw, {
                search: search,
                id: par_id
            })
            .then(function (rows) {
                totalRows = rows[0] ? 1 * rows[0].count : 0;
                if (pageSize <= totalRows)
                    offset = (page - 1) * pageSize;

            })
            .then(function () {
                return db("log_table")
                    //.select(db.raw(selMain))
                    .whereRaw(wherRaw, {
                        search: search,
                        id: par_id
                    })
                    .orderBy("id", "desc")
                    .limit(pageSize).offset(offset)

                    .then(function (rows) {
                        result.count = totalRows;
                        result.pageSize = pageSize;
                        result.page = page;
                        result.items = rows;
                        // console.log(rows);
                        return result;
                    });


            })


    },
    saveWarn2Log: function (log) {
        if (!log.message)
            return
        log.date_event = new Date();
        if (!log.severity)
            log.severity = 'Warn'

        if (!log.source)
            log.source = '?'
        if (!log.origin)
            log.origin = 'undefined api client'

        if (!log.username)
            log.username = 'no user'

        delete log.id

        return db("log_table")
            .insert(log, "id")
            .then(function (ret) {
                return ret[0];
            })
    },
    newLOG_SAVE: function (msg, level, source, userObj) {
        return Promise.resolve().then(function () {
            var log = {};
            if (!msg)
                return
            log.message = msg;
            log.date_event = new Date();
            log.severity = 'Warn'


            log.severity = level || 'Info';
            if (!log.source)
                log.source = source || 'api';
            if (!log.origin)
                log.origin = 'api'

            log.username = userObj ? userObj.email : '?';

            delete log.id

            return db("log_table")
                .insert(log, "id")
                .then(function (ret) {
                    return ret[0];
                })
        })
    },
    saveWarnText2Log: function (msg, source) {
        var log = {};
        if (!msg)
            return
        log.message = msg;
        log.date_event = new Date();

        log.severity = 'Warn'

        if (!log.source)
            log.source = source || '';
        if (!log.origin)
            log.origin = 'api'

        delete log.id

        return db("log_table")
            .insert(log, "id")
            .then(function (ret) {
                return ret[0];
            })
    },
    saveErrorText2Log: function (msg, source) {
        var log = {};
        if (!msg)
            return
        log.message = msg;
        log.date_event = new Date();

        if (!log.severity)
            log.severity = 'Error'

        if (!log.source)
            log.source = source || '';
        if (!log.origin)
            log.origin = 'api'

        delete log.id

        return db("log_table")
            .insert(log, "id")
            .then(function (ret) {
                return ret[0];
            })
    },
    saveInforText2Log: function (msg, source) {
        var log = {};
        if (!msg)
            return
        log.message = msg;
        log.date_event = new Date();

        if (!log.severity)
            log.severity = 'Info'

        if (!log.source)
            log.source = source || '';
        if (!log.origin)
            log.origin = 'api'

        delete log.id

        return db("log_table")
            .insert(log, "id")
            .then(function (ret) {
                return ret[0];
            })
    },
};