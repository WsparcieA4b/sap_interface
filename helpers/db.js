"use strict";
const cfg = require("./api.config");
const pg = require('pg')

pg.types.setTypeParser(1700, 'text', parseFloat)
var knex = require('knex')(cfg.database.production);

module.exports = knex;

