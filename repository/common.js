'use strict'
var db = require('../helpers/db')

module.exports = {
    checkExists: async function (table, selection) {
        return db(table).where(selection).first()
    },

    insert: async function (table, data) {
        return db(table).insert(data, 'id')
    },

    update: async function update(table, selection, data) {
        return db(table).where(selection).update(data, 'id')
    }
}