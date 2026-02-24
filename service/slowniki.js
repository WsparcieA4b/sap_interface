"use strict";
const db = require("../helpers/db");
const shared = require('./a_common_db_lib');


module.exports = {
  listCombinedCatalogues: async function () {
    let response = {};
    const sql_prot_types = `*,(select nazwa from catalogue c where c.id=se_t_protoc_templates.install_type_id) as "rodzaj_instalacji"`;

    // const all_catalogue = await db('catalogue').orderBy("context", "asc").orderBy("nazwa", "asc")
    // response.all_cat = all_catalogue || [];
    const uoms = await db("catalogue").where("context", "uom").orderBy("priority", "asc");
    response.uoms = uoms || [];
    const vm = await shared.cl_CatalogueArrayByContext("vert_market")
    response.vert_markets = vm || [];
    const curr = await shared.cl_CatalogueArrayByContext("currency");
    response.currency = curr || [];
    const ccs = await shared.cl_CatalogueArrayByContext("cc")
    response.cost_centers = ccs || [];
    const depts = await shared.cl_CatalogueArrayByContext("company_depts");
    response.org_departments = depts || [];
    const segmts = await shared.cl_CatalogueArrayByContext("client_segment");
    response.client_segments = segmts || [];
    const instyp = await shared.cl_CatalogueArrayByContext("installation_type")
    response.installation_type = instyp || [];
    const contyps = await shared.cl_CatalogueArrayByContext("contract_type");
    response.contract_types = contyps || [];
    const clicallprio = await shared.cl_CatalogueArrayByContext("client_prio");
    response.cli_call_priorities = clicallprio || [];
    const ourprio = await shared.cl_CatalogueArrayByContext("ourprio");
    response.our_call_prio = ourprio || [];
    const clicalltyp = await shared.cl_CatalogueArrayByContext("cli_call_type");
    response.cli_call_type = clicalltyp || [];
    const pt_base = await shared.cl_CatalogueArrayByContext("pt_base");
    response.pt_base = pt_base || [];


    const ct = await db("se_service_calls_types").orderBy("sort_key", "asc");
    response.call_types = ct || [];
    const whereRaw = " (  (enabled=true) OR (:act=false)  ) ";
    const callstats = await db("se_service_call_status").select("id", "status_name", "enabled").whereRaw(whereRaw, { act: true }).orderBy("id");
    response.call_statuses = callstats || [];
    const billint = await db("catalogue_time_periods").where("is_active", true).orderBy("sort_id", "asc");
    response.bill_intervals = billint || [];
    const reptmc = await db("se_service_report_timing_categories").orderBy("id", "asc")
    response.rep_time_cats = reptmc || []; 
    const bg = await db("rozl_klasy_wynagrodzen").orderBy("id");
    response.bonus_groups = bg || [];
    const pt = await db("payment_terms").select("id", "days_count", "name", "is_enabled").where("is_enabled", true).orderBy("days_count");
    response.payment_terms = pt || [];
    const mgr = await db("s_assets_device_groups").select("id", "group_name", "description", "is_active").where("is_active", true).orderBy("group_name")
    response.machine_groups = mgr || [];
    const cenniki = await db("pr_price_list").orderBy("id").where(db.raw('(is_hidden is null or  is_hidden=false)'));
    response.PRICELISTS = cenniki || [];
    const prcond = await db("pr_conditions_def").orderBy("id");
    response.PRICECONDEFS = prcond || [];
    const prottyp = await db("se_t_protoc_templates").select(db.raw(sql_prot_types)).where("aktywny", true).orderBy("sort_id");
    response.protocol_types = prottyp || [];
    const ptmpl = await getProtocolTemplates()
    response.protocol_defs = ptmpl || [];
    return response;
  },
  listPriceLists: async function () {
    const cenniki = await db("pr_price_list").orderBy("id").where(db.raw('(is_hidden is null or is_hidden=false)'));

    return cenniki;
  },
  listCombinedCatalogues4Ekp: async function () {
    let response = {};
    //odchudzona wersja słowników dla EKP (minimalny rozmiar)  
    const ct = await db("se_service_calls_types").orderBy("sort_key", "asc");
    response.call_types = ct || [];

    const curr = await shared.cl_CatalogueArrayByContext("currency");
    response.currency = curr || [];
    const clicallprio = await shared.cl_CatalogueArrayByContext("client_prio");
    response.cli_call_priorities = clicallprio || [];
    const ourprio = await shared.cl_CatalogueArrayByContext("ourprio");
    response.our_call_prio = ourprio || [];
    const clicalltyp = await shared.cl_CatalogueArrayByContext("cli_call_type");
    response.cli_call_type = clicalltyp || [];
    const uoms = await db("catalogue").where("context", "uom").orderBy("priority", "asc");
    response.uoms = uoms || [];

    const prcond = await db("pr_conditions_def").orderBy("id");
    response.PRICECONDEFS = prcond || [];

    const ptmpl = await getProtocolTemplates()
    response.protocol_defs = ptmpl || [];

    return response;
  },
  listCombinedCatalogues4Portal: function () {
    var response = {};
    response.call_types = [];
    response.installation_type = [];
    response.currency = [];
    response.cli_call_priorities = [];
    response.cli_call_type = [];
    return db("catalogue")
      .where("context", "cli_call_type")
      .orderBy("nazwa", "asc")
      .then(function (rows) {
        response.cli_call_type = rows;
        return response;
      })
      .then(function (resp) {
        return db("catalogue")
          .where("context", "client_prio")
          .orderBy("nazwa", "asc")
          .then(function (rows) {
            response.cli_call_priorities = rows;
            return response;
          });
      })
      .then(function (resp) {
        return db("catalogue")
          .where("context", "currency")
          .orderBy("nazwa", "asc")
          .then(function (rows) {
            response.currency = rows;
            return response;
          });
      })
      .then(function (resp) {
        return db("catalogue")
          .where("context", "installation_type")
          .orderBy("nazwa", "asc")
          .then(function (rows) {
            response.installation_type = rows;
            return response;
          });
      })
      .then(function (rows) {
        return response;
      });
  },
  listAllinCatalogue: function (search, pageSize, page) {
    var totalRows = 0;
    var result = {};

    var offset = (page - 1) * pageSize;
    var whereRaw = " (    ((context=:search) OR (:search=''))      ) ";

    //przygotownaie pagingu - ilosc stron
    return db("catalogue")
      .select(db.raw("count(*) as count"))
      .whereRaw(whereRaw, {
        search: search
      })
      .then(function (rows) {
        totalRows = rows[0] ? 1 * rows[0].count : 0;
        if (pageSize <= totalRows) {
          offset = (page - 1) * pageSize;
        } else {
          page = 1;
          offset = 0;
        }

        //main query
        return db("catalogue")
          .whereRaw(whereRaw, {
            search: search
          })
          .limit(pageSize)
          .offset(offset)
          .orderBy("id", "desc")
          .then(function (rows) {
            result.count = totalRows;
            result.pageSize = pageSize;
            result.page = page;
            result.items = rows;
            // console.log(rows);
            return result;
          });
      });
  },
  listCatalogueClasses: function (search, pageSize, page) {
    var totalRows = 0;
    var result = {};
    var offset = (page - 1) * pageSize;
    var whereRaw = " (    ((context=:search) OR (:search=''))      ) ";

    //przygotownaie pagingu - ilosc stron
    return db("catalogue_class")
      .select(db.raw("count(*) as count"))
      .whereRaw(whereRaw, {
        search: search
      })
      .then(function (rows) {
        totalRows = rows[0] ? 1 * rows[0].count : 0;
        if (pageSize <= totalRows) {
          offset = (page - 1) * pageSize;
        }
        //main query
        return db("catalogue_class")
          .whereRaw(whereRaw, {
            search: search
          })
          .limit(pageSize)
          .offset(offset)
          .orderBy("description", "desc")
          .then(function (rows) {
            result.count = totalRows;
            result.pageSize = pageSize;
            result.page = page;
            result.items = rows;
            // console.log(rows);
            return result;
          });
      });
  },



  listPaymentTerms: function (activeOnly) {
    var result = {};

    const p_active = !!activeOnly;

    var whereRaw = " (  (is_enabled=true) OR (:act=false)  ) ";
    //main query
    return db("payment_terms")
      .select("id", "days_count", "name", "is_enabled")
      .whereRaw(whereRaw, {
        act: p_active
      })
      .orderBy("days_count")
      .then(function (rows) {
        result.count = rows.length;
        result.pageSize = 0;
        result.page = 0;
        result.items = rows;
        return result;
      })

  },
  listCostCenters: async function (search, pageSize, page) {
    let totalRows = 0;
    let result = {};

    let offset = (page - 1) * pageSize;
    const filter = { search: search };
    const whereRaw = `(context='cc') AND (enabled=true) AND (lower(nazwa) like '%'||lower(:search)||'%')`;

    //przygotownaie pagingu - ilosc stron
    const stat = await db("catalogue").select(db.raw("cast(count(*) as integer) as count")).whereRaw(whereRaw, filter).first();
    totalRows = stat ? 1 * stat.count : 0;
    if (pageSize <= totalRows) {
      offset = (page - 1) * pageSize;
    } else {
      page = 1;
      offset = 0;
    }

    //main query
    return db("catalogue").whereRaw(whereRaw, filter).limit(pageSize).offset(offset).orderBy("nazwa")
      .then(function (rows) {
        result.count = totalRows;
        result.pageSize = pageSize;
        result.page = page;
        result.items = rows;
        return result;
      });

  },
  listProjectDictionaries: async function () {
    //słowniki dla moduły projektów (frequent fetch)
    const response = {};
    const prtyps = await db("p_project_type").orderBy("type_name", "asc");
    response.project_types = prtyps || [];
    const prstat = await db("p_project_status").orderBy("id", "asc");
    response.project_status = prstat || [];
    const contr_types = await db("p_contract_type").orderBy("type_name", "asc");
    response.contr_types = contr_types || [];
    const bill_intervals = await db("se_service_contr_biill_periods").orderBy("period_months", "asc");
    response.bill_intervals = bill_intervals || [];
    const bus_segments = await shared.cl_CatalogueArrayByContext("bus_segments");
    response.bus_segments = bus_segments || [];

    const ext_defs = await db("p_contract_ext_definitions").orderBy('is_sales').orderBy('display_name');
    response.cextdefs = ext_defs || [];
    const contr_kind = await db("p_project_contract_kind").orderBy('is_sales').orderBy('nazwa');
    response.contr_kind = contr_kind || [];

    const typy_zalacznikow = await db("d_doc_types").orderBy('type_name')
    response.doc_types = typy_zalacznikow || [];

    const wherRaw = `(id  in (SELECT employee_id FROM se_employees_2_groups e2g where e2g.group_id = :group_id) OR (:group_id = -1))`;
    //const pms_id = 7; //grup ahandlowców - docelowo z setup jak powyższe
    // const pms = await db("se_employees").select(db.raw(query.selectPracownikShot4Autocomplete)).whereRaw(wherRaw, { group_id: pms_id }).orderBy("fname", "asc");

    //deprecated - used employee autocomplete (wybór z całej listy pracowników)
    response.pm = [];

    return response;
  },
  getSingle: function (id) {
    return db("catalogue")
      .where("id", id)
      .first()
      .then(function (entity) {
        return entity;
      });
  },
  getByClass: function (classid, pageSize, page) {
    var rowSQl = `* ,(select description from catalogue_class cc where cc.context = catalogue.context) as "opis_grupy"`;
    var totalRows = 0;
    var offset = (page - 1) * pageSize;
    var result = {};
    //przygotownaie pagingu - ilosc stron
    return db("catalogue")
      .select(db.raw("count(*) as count"))
      .where("context", classid)
      .then(function (rows) {
        totalRows = rows[0] ? 1 * rows[0].count : 0;
        if (pageSize <= totalRows) {
          offset = (page - 1) * pageSize;
        }
        //main query
        return db("catalogue")
          .select(db.raw(rowSQl))
          .where("context", classid)
          .limit(pageSize)
          .offset(offset)
          .orderBy("nazwa", "asc")
          .then(function (rows) {
            result.count = totalRows;
            result.pageSize = pageSize;
            result.page = page;
            result.items = rows;
            return result;
          });
      });
  },
  //Inserts the given person object and resolves to its ID
  addEntity: async function (ent) {
    delete ent.id;
    const ret = await db("catalogue").insert(ent, "id");
    return { id: ret[0], message: "Dodano nowy element", status: 201 }

  },
  editEntity: async function (ent) {
    const id = ent.id;
    const ret = await db("catalogue").where("id", id).update(ent, "id");
    return { message: "Zmiany elementu zostały zapisane", status: 200 }
  },
  deleteEntity: function (id) {
    // return db("se_employees").where("id", id).delete("id").then();
  },
  getProtocolTemplates: getProtocolTemplates,
  getTemplateSingle: getTemplateSingle
};

async function getProtcolTypes() {
  const sql_prot_types = `*,(select nazwa from catalogue c where c.id=se_t_protoc_templates.install_type_id) as "rodzaj_instalacji"`;

  const types = await db("se_t_protoc_templates")
    .select(db.raw(sql_prot_types))
    .where("aktywny", true).orderBy("sort_id");
  return types;
}
function getProtocolTemplates() {

  const sql_prot_types = `*,(select nazwa from catalogue c where c.id=se_t_protoc_templates.install_type_id) as "rodzaj_instalacji"`;

  return db("se_t_protoc_templates")
    .select(db.raw(sql_prot_types))
    .where("aktywny", true)
    // .orderBy("protocol_templ_key")
    .orderBy("sort_id")
    .map(function (tmpl) {
      return getTemplateSingle(tmpl.protocol_templ_key).then(function (data) {
        tmpl = Object.assign(tmpl, data);
        return tmpl;
      });
    })
    .then(function (data) {
      return data;
    })
    .catch(function (err) {
      throw err;
    });
}
async function getTemplateSingle(key) {
  let template = {};
  template.header = {};
  template.disclaimer = {};
  template.columnsdef = [];
  template.questionaire = [];
  if (!key) return template;
  const tm = await db("se_t_dyn_protoc_headers").where("protocol_templ_key", key).first();
  if (tm) {
    delete tm.aktywny;
    delete tm.protocol_templ_key;
    template.header = Object.assign({}, tm);
  }


  const ds = await db("se_t_dyn_protoc_disclaimers").select("protocol_templ_key", "lbltxt_disclaimer", "f_diclaimer_line")
    .where("protocol_templ_key", key).first()

  template.disclaimer = Object.assign({}, (ds || {}))
  // const sql = `*, (select group_name from se_t_protoc_question_groups qg where qg.id=se_t_protoc_template_questionaire.group_id) as "group"`;
  const sql = `* `
  // ładowani listy pytań // sortowanei wg sort_id grupy!!! a póxniej wg sort_id pytania
  const grpby = `(select sort_id from se_t_protoc_question_groups qg where qg.id=se_t_protoc_template_questionaire.group_id)`
  const qq = await db("se_t_protoc_template_questionaire").select(db.raw(sql)).where("protocol_templ_key", key)
    .andWhere("aktywny", true).orderByRaw(grpby).orderBy("sort_id")
    .map(function (q) {
      return db("se_t_protoc_template_question_options").where("question_id", q.id).andWhere("aktywny", true).orderBy("sort_id")
        .then(function (opts) {
          q.options = opts || [];
          return q;
        })
    })
  template.questionaire = qq || [];

  const whRawGrps = `id in (select group_id from se_t_protoc_template_questionaire q where q.protocol_templ_key=:key)`
  const qgrps = await db("se_t_protoc_question_groups").select("id", "group_name", "sort_id", "group_name_visible").whereRaw(whRawGrps, { key: key }).orderBy("sort_id")
    .map(function (grp) {
      return db("se_t_protoc_question_group_tabcolumns").where("group_id", grp.id)
        .andWhere("show_label", true)
        .orderBy("sort_id").then(function (tablbls) {
          grp.tabcolumns = tablbls || {};
          return grp;
        })
    })
  template.qgroups = qgrps || [];


  const th = await db("se_t_protoc_templates_sectab_headers").where("protocol_templ_key", key)

  if (th && th.length > 0)
    template.columnsdef = th || [];
  else {
    const defq = await db("se_t_protoc_templates_sectab_headers").where("protocol_templ_key", "*") //defasult headers
    template.columnsdef = defq || [];
  }

  return template;
}
