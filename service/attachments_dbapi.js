"use strict";
const BPromise = require("bluebird");
const db = require("../helpers/db");
const fs = require('fs');
const contentDisposition = require('content-disposition')
const onFinished = require('on-finished')
const destroy = require('destroy');
const apiconfig = require("../helpers/api.config")

module.exports = {
    // file_attachments - głowna tabela przechowująca scieżkę do załączników
    getAttachmentFsName: function (id) {
        return db("file_attachments").where("id", id).first()
            .then(function (fsFile) {
                return fsFile;
            })
    },
    streamFile: streamFile,
    listAttachments4ERPCall: listAttachments4ERPCall
}



function setFileRespHeaders(fsFile, fpath, res) {
    //  res.setHeader('Content-Type', mime.lookup(fpath))
    const filename = encodeURIComponent(fsFile.file_name);
    const contDisp = contentDisposition(filename);
    res.setHeader('Content-Disposition', contDisp)
    res.setHeader('x-filename', filename)
    res.attachment(filename);
    res.type(encodeURIComponent(fpath));
}

function streamFile(res, fsFile) {
    const fnf = 'Plik nie został odnaleziony w repozytorium załączników!'
    const NOPOINT = { status: 500, statusText: fnf, success: false, message: fnf };
    const NOFILEFND = { status: 500, statusText: fnf, success: false, message: fnf };
    const NOIDGIVEN = { status: 500, statusText: 'Brak ID!', success: false, message: "Nie podano niezbednego parametru id " };

    if (!fsFile) {
        throw NOPOINT;
    }
    const fpath = GetFilePath(fsFile)

    if (!fs.existsSync(fpath)) {
        throw NOFILEFND
    }

    setFileRespHeaders(fsFile, fpath, res);
    //przesyłanie strumienia do klienta
    const stream = fs.createReadStream(fpath);
    stream.on("error", function (err) {
        res.end();
    });
    stream.pipe(res);
    onFinished(res, function (err) {
        destroy(stream)
    })
}


function GetFilePath(fsFile) {
    const filePointer = fsFile.file_pointer;
    let dir = fsFile.storage_folder;

    if (dir[dir.length - 1] != "/") {
        dir = dir + "/";
    }
    //korekta zapisanego w db katalogu ponieważ zapis w db w formacie "../folder_name/"
    const darr = dir.split("/")
    const att_catalog = darr[1] || ''// powinno zwrócić nazwę (jw. np. "folder_name")  // <-------- UWAGA - nie testowane !!!!

    const access_path = apiconfig.file_repo.path; //ścieżka do katalogu zawierajacego katalog a plikami
    //pełna ścieżka do pliku (w stosunku do katalogu głownego aplikacji app.js)
    const file = access_path + att_catalog + "/" + filePointer;

    console.log("Ścieżka do katalogu z załącznikami: " + file)
    return file;
}

async function listAttachments4ERPCall(erpcallid) {
    const ATTCHM_SQL = ` file_id as file_id, file_id as id, id as link_id, mark4ekp, mark4erp
                  , (SELECT file_name from file_attachments fa where fa.id=file_id) as "file_name"
                  , (SELECT date_added from file_attachments fa where fa.id=file_id) as "date_added"
                  , (SELECT file_size from file_attachments fa where fa.id=file_id) as "file_size"
                  , (SELECT file_size/1024 from file_attachments fa where fa.id=file_id) as "file_size_kb"
                  , '' as "parent_id"  `;
    const call = await db("se_service_calls").select(db.raw(`id,sap_order_no`)).where("sap_order_no", erpcallid).first();
    if (!call) {
        return { message: "No call found!" }
    }
    const attWh = `(call_id=:call_id) AND (coalesce(mark_deleted,false)=false) AND (mark4erp=true) `
    const attch2files = await db("se_service_calls_2_attachments").select(db.raw(ATTCHM_SQL)).whereRaw(attWh, { call_id: call.id }).orderBy('id', 'desc');


    // const { system_url = null } = set || {}
    // dodałem w sapapi.config.js fileserver.url, żeby pasował do urla API. W Options4Applications był url dla aplikacji SE
    const system_url = apiconfig.fileserver.url
    const system_path = apiconfig.fileserver.path

    if (!system_url || !system_path)
        throw new Error("Błąd konfiguracji Service Express. URL systemu nie został ustawiony.")

    const atturl_base = system_url + system_path

    // example: https://dspl-test.service-exp.pl/apitest/api/attachments/204
    // "URL": "https://www.google.de",
    // "URLDescription": "Google Link"

    const links = await BPromise.map(attch2files, function (att) {
        return {
            URL: atturl_base + att.file_id,
            URLDescription: att ? att.file_name : 'default_name'
        }
    }, { concurrency: 1 })

    return links || []
}

