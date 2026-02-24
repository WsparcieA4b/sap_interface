'use strict';
const db = require('../helpers/db');
const fs = require("fs");
const BPromise = require('bluebird');
const appendFile = BPromise.promisify(require("fs").appendFile);
const writeFile = BPromise.promisify(require("fs").writeFile);
module.exports = {
    //generator funkcji mapowania pól tabel bazy danych 
    generateAll: async function () {
        const fileName = "service/a_db_table_map.js"
        await writeFile(fileName, '//' + String.fromCharCode(10))
        await appendFile(fileName, '//  File generated automatically by map generator. Do not modify it manually! ' + String.fromCharCode(10), 'utf8');
        await appendFile(fileName, '//  Date generated: ' + new Date() + String.fromCharCode(10), 'utf8');
        await appendFile(fileName, '// ' + String.fromCharCode(10), 'utf8');
        await appendFile(fileName, String.fromCharCode(10), 'utf8');
        await appendFile(fileName, `module.exports = { ` + String.fromCharCode(10), 'utf8');

        const file_data_arr = await db('information_schema.tables')
            .whereRaw(`table_schema = 'public' and table_type='BASE TABLE' and ( not table_name like '%-%')`)
            .select(db.raw('table_name')).groupBy('table_name').orderBy('table_name');


        const file_data = await BPromise.map(file_data_arr, function (table) {
            const { table_name = '' } = table
            const prefix = `map4db_` + table_name + `: function(dto) { ` + String.fromCharCode(10) + ` return {` + String.fromCharCode(10)
            const suffix = String.fromCharCode(10) + `}` + String.fromCharCode(10) + ','

            return db('information_schema.columns').select(db.raw(`string_agg(column_name||': dto.'||column_name,', ') ||' }' as "c" `))
                .where('table_name', table_name).first()
                .then(function (model) {
                    const { c = '' } = model || {}
                    const ret = prefix + c + suffix;
                    fs.appendFileSync(fileName, ret, 'utf8');
                    return ret
                })
        })

        await appendFile(fileName, String.fromCharCode(10) + '}', 'utf8');
        return file_data
    }



}
