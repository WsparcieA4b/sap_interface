
"use strict";
const express = require('express')
const dbapi = require('../service/attachments_dbapi.js')
const router = express.Router()
const NOIDGIVEN = { success: false, message: "Nie podano niezbednego parametru id " };

// metoda zwraca attachment dla podango id z tabeli file_attachments
// jest uniwersalna dla wszystkich załączników systemu
router.get('/attachments/:id([0-9]+)', function (req, res, next) {

    const { id = null } = req.params
    if (!id) {
        res.status(400).json(NOIDGIVEN);
    }

    dbapi.getAttachmentFsName(id)
        .then(function (fsFile) {
            dbapi.streamFile(res, fsFile);
        })
        .catch(function (err) {
            //res.status(400).send(err)
            return next(err)
        });
})




module.exports = router