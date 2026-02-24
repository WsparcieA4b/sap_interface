"use strict";
var db = require("../helpers/db");

//All functions return a bluebird promise for their results
var selString = ["id", "name", "json_object", "deep_opt"];

module.exports = {
    getDeepSettings: getDeepSettingsAll
}



const newMainSel = ["id", "name", "uuid", "data_new"];
async function getDeepSettingsAll() { //dla kopatybilnosci z wczesneijszym kodem (jest wioele wywołań getDeepSettings)
    const ds1 = await getNewDs1Settings()
    const ds2 = await getNewDs2Settings()
    const { data_new: dn1 } = ds1 || {}
    const { data_new: dn2 } = ds2 || {}
    const ret = { ...dn1, ...dn2 }
    return ret;
}
//deep settings1 - tylko dla serwisu producenta
async function getNewDs1Settings() {
    const row = await db("app_options").select(newMainSel).where('name', 'ds1').first()
    return row;
}
//deep settings2 (nowe 08.2023 - nop ustawineia map) - tylko serwis producenta
async function getNewDs2Settings() {
    const row = await db("app_options").select(newMainSel).where('name', 'ds2').first()
    return row;
}
