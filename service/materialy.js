"use strict";
let db = require("../helpers/db");
let query = require('./se_calls-sql');
const shared = require('./a_common_db_lib');

module.exports = {
    //API:    search,  id,   pageSize, page 
    listaMaterialow: async function (searchTxt, id, pageSize, page) {
        let totalRows = 0;
        let result = {}; 

        let par_id = -1;
        if (!!id && !isNaN(id)) par_id = id * 1;

        let offset = (page - 1) * pageSize;
        let wherRaw = `
        ((lower(mat_index) like '%' || lower(:search) || '%')  
        or (lower(mat_name) like '%' || lower(:search) || '%')  
        or (lower(ean) like '%' || lower(:search) || '%') 
        or (:search='') )   
        AND ((id=:id) OR (:id=-1))  
        `;
        const filter = {
            search: searchTxt,
            id: par_id
        }
        //przygotownaie pagingu - ilosc stron
        const test = await db("mm_master").select(db.raw("cast(count(*) as int) as count")).whereRaw(wherRaw, filter).first();
        totalRows = test ? 1 * test.count : 0;
        if (pageSize <= totalRows) {
            offset = (page - 1) * pageSize;
        } else {
            page = 1;
            offset = 0;
        }
        const rows = await db("mm_master").select(db.raw(query.mat_master_list_w_stock)).whereRaw(wherRaw, filter)
            .orderBy("mat_name")
            .limit(pageSize).offset(offset)

        result.count = totalRows;
        result.pageSize = pageSize;
        result.page = page;
        result.items = rows;

        return result;

    },
    listaMaterialowEKPwInventory: async function (searchTxt, pageSize, page) {
        let totalRows = 0;
        let result = {};
        // sort = util.parseSortString(qf.sort, "m.id"),  
        let offset = (page - 1) * pageSize;
        let selCount = "count(*) as count";
        // let selMain = " id, isactive, isservice, isownproduct, indeks, ean, nazwa, longmaterialtext, wght, uom, coo, dateadded, dateupdated, groupid, remarks ";
        let wherRaw = `
        ((lower(mat_index) like '%' || lower(:search) || '%')  
        or (lower(mat_name) like '%' || lower(:search) || '%')  
        or (lower(ean) like '%' || lower(:search) || '%') 
        or (:search='') ) 
        `;

        const selMain = `mat_index,  mat_name,longmaterialtext 
        ,coalesce((select sum(di.qty*case when dt.credit=true then 1 else -1 end) from mm_document_items di join  mm_document_header h on di.parent_id=h.id join mm_document_types dt on h.type_id=dt.id
        where di.mat_index = mm_master.mat_index  group by di.mat_index ),0) as inventory
        ,uom_id, (select nazwa from catalogue c where c.id=mm_master.uom_id) as "uom"
        ,group_id, (select  group_name from mm_master_groups g where g.id=group_id) as "group"
        `
        // tylko ostatnie  
        //przygotownaie pagingu - ilosc stron

        const rows = await db("mm_master").select(db.raw(selCount)).first().whereRaw(wherRaw, { search: searchTxt })
        totalRows = rows ? 1 * rows.count : 0;
        if (pageSize <= totalRows) {
            page = 1;
            offset = (page - 1) * pageSize;
        }

        return db("mm_master")
            .select(db.raw(selMain))
            .whereRaw(wherRaw, {
                search: searchTxt
            })
            .limit(pageSize).offset(offset)
            .orderBy("mat_name")
            .then(function (rows) {
                result.count = totalRows;
                result.pageSize = pageSize;
                result.page = page;
                result.items = rows;
                // console.log(rows);
                return result;
            });

    },

    listaMatHistoryByIndex: async function (mat_index, warehouse_id, pageSize, page) {
        let totalRows = 0;
        let result = {};
        let p_warehouse_id = -1;

        if (warehouse_id)
            if (isNaN(warehouse_id * 1) === false)
                p_warehouse_id = parseInt(warehouse_id, 10);

        let offset = (page - 1) * pageSize;
        const wherRaw = ` ((lower(mat_index) like '%' || trim(lower(:search)) || '%')  or (:search='') ) 
        AND  ((from_warehouse_id=:warehouse_id) OR (to_warehouse_id=:warehouse_id) OR (:warehouse_id =-1))
        `;
        const typefields = `type_name,credit,internal,gui_editable,only4ekp_use,use_from_wh, use_to_wh,use_external_party,use_employee,internal_transfer`;
        const filter = { search: mat_index, warehouse_id: p_warehouse_id }

        const test = await db("v_mat_history").select(db.raw("cast(count(*) as int) as count")).whereRaw(wherRaw, filter).first();
        totalRows = test ? 1 * test.count : 0;
        if (pageSize <= totalRows) {
            offset = (page - 1) * pageSize;
        } else {
            page = 1;
            offset = 0;
        }

        return db("v_mat_history").whereRaw(wherRaw, filter).limit(pageSize).offset(offset)
            .orderBy("id", "desc")
            .map(function (item) {
                return db("mm_document_types").select(db.raw(typefields)).where("id", item.type_id).first().then(function (type) {
                    item.type = type || {};
                    return item;
                })
            })

            .then(function (rows) {
                result.count = totalRows;
                result.pageSize = pageSize;
                result.page = page;
                result.items = rows;
                // console.log(rows);
                return result;
            });



    },
    listaGrupyMaterialow: function (searchTxt, id, pageSize, page) {
        let totalRows = 0;
        let result = {};
        // sort = util.parseSortString(qf.sort, "m.id"),  
        let par_id = -1;
        if (!!id && !isNaN(id)) par_id = id * 1;

        let offset = (page - 1) * pageSize;
        let selCount = "count(*) as count";
        // let selMain = " id, isactive, isservice, isownproduct, indeks, ean, nazwa, longmaterialtext, wght, uom, coo, dateadded, dateupdated, groupid, remarks ";
        let wherRaw = `
        ((lower(group_name) like '%' || lower(:search) || '%')  or (:search='') )   
        AND ((id=:id) OR (:id=-1))  
        `;

        // tylko ostatnie  
        //przygotownaie pagingu - ilosc stron
        return db("mm_master_groups")
            .select(db.raw(selCount))
            .whereRaw(wherRaw, {
                search: searchTxt,
                id: par_id
            })
            .then(function (rows) {
                totalRows = rows[0] ? 1 * rows[0].count : 0;
                if (pageSize <= totalRows) {
                    page = 1;
                    offset = (page - 1) * pageSize;
                }
                return db("mm_master_groups")
                    .whereRaw(wherRaw, {
                        search: searchTxt,
                        id: par_id
                    })
                    .limit(pageSize).offset(offset)
                    .orderBy("group_name")
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


    getMaterial: function (id) {
        return db("mm_master")
            .select(db.raw(query.mat_mast_get))
            .where("id", id).first()
            .then(function (mat) {
                return mat;
            });
    },
    getMaterialByIndex: function (mat_index) {
        return db("mm_master")
            .select(db.raw(query.mat_mast_get))
            .where("mat_index", mat_index)
            .first()
            .then(function (mat) {
                return mat;
            });
    },
    //Inserts the given person object and resolves to its ID
    addMaterial: function (material) {
        let m2db = map2DbMMaster(material);
        m2db.dateadded = new Date();
        m2db.dateupdated = new Date();
        delete m2db.id;

        if (!m2db.mat_index || m2db.mat_index == '')
            m2db.mat_index = shared.cli_GenerateRandomMaterialIndex();

        return db("mm_master")
            .insert(m2db, "id")
            .then(function (ret) {
                return { id: ret[0] }
            });
    },
    editMaterial: function (mat) {
        let id = mat.id;
        let m2db = map2DbMMaster(mat);
        m2db.dateupdated = new Date();

        return db("mm_document_items")
            .select(db.raw("cast(count(*) as integer) as cnt"))
            .where("mat_index", mat.mat_index)
            .first()
            .then(function (wyn) {
                if (wyn.cnt > 0)  // jeśeli jestt historia to już nie można zmienić indeksu/...
                    delete m2db.mat_index;
                return db("mm_master")
                    .where("id", id)
                    .update(m2db, "id")
                    .then(function (ret) {
                        return { id: ret[0] }
                    });
            });
    },
    deleteMaterial: function (id) {
        let test = 1;
        // return db("mm_master").where("id", id).delete("id").then();
    }


};
function map2DbMMaster(src) {
    return {
        id: src.id,
        isservice: src.isservice,
        isownproduct: src.isownproduct,
        mat_index: src.mat_index,
        mat_name: src.mat_name,
        ean: src.ean,
        longmaterialtext: src.longmaterialtext,
        wght: src.wght || 0,
        uom_id: src.uom_id,
        dateadded: src.dateadded,
        dateupdated: src.dateupdated,
        group_id: src.group_id,
        unit_cost: src.unit_cost,
        unit_cost_currency: src.unit_cost_currency,
        sync_mobile: src.sync_mobile
    }
}