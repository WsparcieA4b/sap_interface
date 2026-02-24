//
//  File generated automatically by map generator. Do not modify it manually! 
//  Date generated: Thu Dec 16 2021 20:20:50 GMT+0100 (Central European Standard Time)
// 

module.exports = { 
map4db_app_options: function(dto) { 
 return {
id: dto.id, name: dto.name, json_object: dto.json_object, deep_opt: dto.deep_opt, currv_sego: dto.currv_sego, currv_fmgo: dto.currv_fmgo }
}
,map4db_attachment_2_asset: function(dto) { 
 return {
id: dto.id, file_id: dto.file_id, parent_id: dto.parent_id, mark_deleted: dto.mark_deleted }
}
,map4db_app_mailboxes: function(dto) { 
 return {
id: dto.id, le_id: dto.le_id, enabled: dto.enabled, host_url: dto.host_url, imap_port: dto.imap_port, imap_tls: dto.imap_tls, imap_auth_timeout: dto.imap_auth_timeout, smtp_port: dto.smtp_port, smtp_pool: dto.smtp_pool, smtp_tls: dto.smtp_tls, smtp_max_conn: dto.smtp_max_conn, user_login: dto.user_login, user_p: dto.user_p, def_from: dto.def_from, def_replyto: dto.def_replyto, use_4_receive: dto.use_4_receive, use_4_send: dto.use_4_send, use_4_od: dto.use_4_od, use_4_general: dto.use_4_general, use_4_fm: dto.use_4_fm, imap_reject_unauthorized: dto.imap_reject_unauthorized }
}
,map4db_attachment_2_asset_passconfigs: function(dto) { 
 return {
id: dto.id, file_id: dto.file_id, parent_id: dto.parent_id, mark_deleted: dto.mark_deleted }
}
,map4db_app_logins: function(dto) { 
 return {
id: dto.id, employee_id: dto.employee_id, cust_contact_id: dto.cust_contact_id, login_block: dto.login_block, u_passwd: dto.u_passwd, email: dto.email, force_passwd_change: dto.force_passwd_change, se_enable: dto.se_enable, ekp_enable: dto.ekp_enable, portal_enable: dto.portal_enable, is_su: dto.is_su, last_pass_change_date: dto.last_pass_change_date, od_enable: dto.od_enable, sel: dto.sel }
}
,map4db_attachment_2_machine: function(dto) { 
 return {
id: dto.id, file_id: dto.file_id, parent_id: dto.parent_id, mark_deleted: dto.mark_deleted }
}
,map4db_attachment_2_business_partner: function(dto) { 
 return {
id: dto.id, file_id: dto.file_id, parent_id: dto.parent_id, mark_deleted: dto.mark_deleted }
}
,map4db_attachment_2_doc_invoice: function(dto) { 
 return {
id: dto.id, parent_id: dto.parent_id, file_id: dto.file_id, mark_deleted: dto.mark_deleted, uuid: dto.uuid }
}
,map4db_attachment_2_le_entity: function(dto) { 
 return {
id: dto.id, uuid: dto.uuid, parent_id: dto.parent_id, file_id: dto.file_id, atype: dto.atype, mark_deleted: dto.mark_deleted }
}
,map4db_attachment_2_site_docs: function(dto) { 
 return {
id: dto.id, file_id: dto.file_id, parent_id: dto.parent_id, mark_deleted: dto.mark_deleted }
}
,map4db_attachment_4_employees: function(dto) { 
 return {
id: dto.id, file_id: dto.file_id, parent_id: dto.parent_id, mark_deleted: dto.mark_deleted }
}
,map4db_attachment_2_pr_contract: function(dto) { 
 return {
id: dto.id, project_id: dto.project_id, file_id: dto.file_id, doc_type_id: dto.doc_type_id, mark_deleted: dto.mark_deleted, contract_id: dto.contract_id }
}
,map4db_attachment_4_invoices_4_calls: function(dto) { 
 return {
id: dto.id, file_id: dto.file_id, parent_id: dto.parent_id, mark_deleted: dto.mark_deleted, unpaid: dto.unpaid, amount: dto.amount, due_date: dto.due_date, last_changed: dto.last_changed, last_changed_by: dto.last_changed_by, remarks: dto.remarks, pay_alert: dto.pay_alert }
}
,map4db_audit_table: function(dto) { 
 return {
id: dto.id, table_name: dto.table_name, table_key: dto.table_key, user_id: dto.user_id, date_changed: dto.date_changed, change_info: dto.change_info, det_table: dto.det_table }
}
,map4db_audit_table_details: function(dto) { 
 return {
id: dto.id, parent_id: dto.parent_id, property: dto.property, property_hname: dto.property_hname, old_value: dto.old_value, new_value: dto.new_value, op_type: dto.op_type }
}
,map4db_cat_system_class: function(dto) { 
 return {
id: dto.id, parent_id: dto.parent_id, nazwa: dto.nazwa, active: dto.active }
}
,map4db_bi_report_timing: function(dto) { 
 return {
id_timing: dto.id_timing, report_id: dto.report_id, category_id: dto.category_id, cat: dto.cat, date_added: dto.date_added, added_by: dto.added_by, employee_id: dto.employee_id, work_date: dto.work_date, work_start: dto.work_start, work_end: dto.work_end, travel_time_hrs: dto.travel_time_hrs, distance_km_travel: dto.distance_km_travel, return_km_travel: dto.return_km_travel, minutes_worked: dto.minutes_worked, is_weekend: dto.is_weekend, is_holiday: dto.is_holiday, is_night: dto.is_night, original_row: dto.original_row, trvl_start: dto.trvl_start, trvl_end: dto.trvl_end, retr_start: dto.retr_start, retr_end: dto.retr_end, trvl_mnt: dto.trvl_mnt, work_mnt: dto.work_mnt, retr_mnt: dto.retr_mnt, signedprot_or_calndr: dto.signedprot_or_calndr, cc_id: dto.cc_id, night_mnt: dto.night_mnt, weekend_mnt: dto.weekend_mnt }
}
,map4db_business_partner_sap_cc_assign: function(dto) { 
 return {
id: dto.id, business_partner_id: dto.business_partner_id, company_code_id: dto.company_code_id, blocked_company_code: dto.blocked_company_code }
}
,map4db_business_partner_sap_po_assign: function(dto) { 
 return {
id: dto.id, business_partner_id: dto.business_partner_id, purchasing_organisation_id: dto.purchasing_organisation_id, blocked_for_purchasing: dto.blocked_for_purchasing }
}
,map4db_business_partner_erp: function(dto) { 
 return {
id: dto.id, erp_id: dto.erp_id, erp_name: dto.erp_name, short_name: dto.short_name, tax_id: dto.tax_id, address1: dto.address1, address2: dto.address2, address3: dto.address3, status: dto.status, vendor: dto.vendor, customer: dto.customer, pay_term: dto.pay_term, ad_hoc: dto.ad_hoc, active: dto.active }
}
,map4db_business_partner_sap_sales_assign: function(dto) { 
 return {
id: dto.id, business_partner_id: dto.business_partner_id, sales_organisation_id: dto.sales_organisation_id, blocked_for_ordering: dto.blocked_for_ordering }
}
,map4db_catalogue: function(dto) { 
 return {
id: dto.id, context: dto.context, nazwa: dto.nazwa, enabled: dto.enabled, is_warranty: dto.is_warranty, kod: dto.kod, priority: dto.priority, bill_period_months: dto.bill_period_months, credit: dto.credit, client_code: dto.client_code, is_default: dto.is_default, is_default_time: dto.is_default_time, is_default_pc: dto.is_default_pc, uom_erp_alt: dto.uom_erp_alt }
}
,map4db_catalogue_class: function(dto) { 
 return {
id: dto.id, context: dto.context, description: dto.description }
}
,map4db_cat_system_class_2_fault_type: function(dto) { 
 return {
id: dto.id, active: dto.active, class_id: dto.class_id, fault_id: dto.fault_id }
}
,map4db_cat_system_fault_types: function(dto) { 
 return {
id: dto.id, parent_id: dto.parent_id, nazwa: dto.nazwa, enabled: dto.enabled }
}
,map4db_cat_system_grp_2_sysclass: function(dto) { 
 return {
id: dto.id, active: dto.active, group_id: dto.group_id, class_id: dto.class_id }
}
,map4db_cat_system_groups: function(dto) { 
 return {
id: dto.id, nazwa: dto.nazwa, active: dto.active, is_techn: dto.is_techn, is_other: dto.is_other, leg_catal_id: dto.leg_catal_id }
}
,map4db_customer_2_conditions: function(dto) { 
 return {
id: dto.id, cust_mast_id: dto.cust_mast_id, condition_type_id: dto.condition_type_id, mat_index: dto.mat_index, c_val_price: dto.c_val_price, c_waluta: dto.c_waluta, c_val_group_id: dto.c_val_group_id, c_val_discount: dto.c_val_discount, c_remarks: dto.c_remarks, material_id: dto.material_id, c_val_markup: dto.c_val_markup, erp_condition_id: dto.erp_condition_id }
}
,map4db_catalogue_time_periods: function(dto) { 
 return {
id: dto.id, sort_id: dto.sort_id, nazwa: dto.nazwa, nazwa2: dto.nazwa2, c_interval: dto.c_interval, is_day: dto.is_day, is_week: dto.is_week, is_month: dto.is_month, is_year: dto.is_year, use_4_billing: dto.use_4_billing, use_4_schedules: dto.use_4_schedules, use_4_maintenace: dto.use_4_maintenace, is_onetime: dto.is_onetime, is_active: dto.is_active }
}
,map4db_client_2_contact: function(dto) { 
 return {
id: dto.id, cust_mast_id: dto.cust_mast_id, contact_id: dto.contact_id }
}
,map4db_cust_master_ext: function(dto) { 
 return {
id: dto.id, erp_id: dto.erp_id, market_segment_id: dto.market_segment_id, service_remarks: dto.service_remarks, service_block: dto.service_block, enable_call_priorities: dto.enable_call_priorities, simple_call_status_only: dto.simple_call_status_only, portal_enabled: dto.portal_enabled, imap_read_enabled: dto.imap_read_enabled, price_list_use_default: dto.price_list_use_default, price_list_id: dto.price_list_id, email_call_confirmation: dto.email_call_confirmation, email_protocol: dto.email_protocol, bp_id: dto.bp_id, enable_in_calendar: dto.enable_in_calendar, efaktura: dto.efaktura, efaktura_email: dto.efaktura_email, email: dto.email, telephone: dto.telephone, mobphone: dto.mobphone }
}
,map4db_cust_master_vendor_ext: function(dto) { 
 return {
id: dto.id, date_added: dto.date_added, added_by: dto.added_by, date_updated: dto.date_updated, updated_by: dto.updated_by, short_name: dto.short_name, parent_id: dto.parent_id, valid_from: dto.valid_from, valid_to: dto.valid_to, indefinite_contract: dto.indefinite_contract, contract_memo: dto.contract_memo, remarks1: dto.remarks1, remarks2: dto.remarks2, reaction_time_2_acknldg: dto.reaction_time_2_acknldg, reaction_time_2_fix: dto.reaction_time_2_fix, day_hrs_from: dto.day_hrs_from, day_hrs_to: dto.day_hrs_to, day_labour_rate: dto.day_labour_rate, night_labour_rate: dto.night_labour_rate, has_travel_acc2_quote: dto.has_travel_acc2_quote, has_travel_lumpsum: dto.has_travel_lumpsum, has_travel_rate: dto.has_travel_rate, travel_lumpsum_amount: dto.travel_lumpsum_amount, travel_rate_amount: dto.travel_rate_amount, weekend_rate: dto.weekend_rate, travel_cond_remarks: dto.travel_cond_remarks }
}
,map4db_d_document_acl: function(dto) { 
 return {
id: dto.id, document_id: dto.document_id, group_id: dto.group_id, employee_id: dto.employee_id, ro: dto.ro, rw: dto.rw }
}
,map4db_d_doc_folder_types: function(dto) { 
 return {
id: dto.id, type_name: dto.type_name, enabled: dto.enabled, is_project: dto.is_project, is_contract: dto.is_contract, is_client: dto.is_client, is_asset: dto.is_asset, is_machine: dto.is_machine, is_report: dto.is_report, is_call: dto.is_call }
}
,map4db_customer_contacts: function(dto) { 
 return {
id: dto.id, cust_id: dto.cust_id, fname: dto.fname, lname: dto.lname, email: dto.email, telefon: dto.telefon, stanowisko: dto.stanowisko, remarks: dto.remarks, is_active: dto.is_active, portal_enabled: dto.portal_enabled, fm_enabled: dto.fm_enabled, uuid: dto.uuid, is_tenant: dto.is_tenant, tenant_id: dto.tenant_id, is_deleted: dto.is_deleted }
}
,map4db_d_document_2_attachments: function(dto) { 
 return {
id: dto.id, document_id: dto.document_id, file_id: dto.file_id, mark_deleted: dto.mark_deleted }
}
,map4db_d_doc_types: function(dto) { 
 return {
id: dto.id, type_name: dto.type_name, enabled: dto.enabled, is_purchase_invoice: dto.is_purchase_invoice, is_transfer2service: dto.is_transfer2service }
}
,map4db_d_document_2_category: function(dto) { 
 return {
id: dto.id, category_id: dto.category_id, document_id: dto.document_id }
}
,map4db_fdoc_buinits: function(dto) { 
 return {
id: dto.id, code: dto.code, nazwa: dto.nazwa, active: dto.active, accept_levels: dto.accept_levels, accept_max_level: dto.accept_max_level, show4call: dto.show4call, sap_org_division: dto.sap_org_division, show4od: dto.show4od, last_changed: dto.last_changed, last_changed_by: dto.last_changed_by }
}
,map4db_fdoc_comments: function(dto) { 
 return {
id: dto.id, uuid: dto.uuid, invoice_id: dto.invoice_id, added_by: dto.added_by, date_added: dto.date_added, memo: dto.memo, mark_deleted: dto.mark_deleted, typ: dto.typ }
}
,map4db_fdoc_cost_categories: function(dto) { 
 return {
id: dto.id, cat_name: dto.cat_name, active: dto.active, is_perdiem: dto.is_perdiem, use4od: dto.use4od, use4rws: dto.use4rws }
}
,map4db_fdoc_cost_split: function(dto) { 
 return {
id: dto.id, uuid: dto.uuid, added_by: dto.added_by, invoice_id: dto.invoice_id, lp: dto.lp, wnetto: dto.wnetto, mpk_id: dto.mpk_id, gl_account_id: dto.gl_account_id, cost_cat_id: dto.cost_cat_id }
}
,map4db_d_document_folder: function(dto) { 
 return {
id: dto.id, date_added: dto.date_added, added_by: dto.added_by, owner_id: dto.owner_id, type_id: dto.type_id, folder_aux_name: dto.folder_aux_name, folder_tags: dto.folder_tags, project_id: dto.project_id, contract_id: dto.contract_id, report_id: dto.report_id, call_id: dto.call_id, client_id: dto.client_id, machine_id: dto.machine_id, asset_id: dto.asset_id, mark_deleted: dto.mark_deleted, private: dto.private, public: dto.public }
}
,map4db_d_documents: function(dto) { 
 return {
id: dto.id, date_registered: dto.date_registered, last_modified: dto.last_modified, added_by: dto.added_by, owner_id: dto.owner_id, doc_name: dto.doc_name, doc_tags: dto.doc_tags, doc_type_id: dto.doc_type_id, mark_deleted: dto.mark_deleted, category_id: dto.category_id, receipt_date: dto.receipt_date, remarks: dto.remarks, private: dto.private, public: dto.public, notify_email2_owner: dto.notify_email2_owner, folder_id: dto.folder_id }
}
,map4db_email_2_calls_log: function(dto) { 
 return {
id: dto.id, email_date: dto.email_date, email_id: dto.email_id, e_from: dto.e_from, e_to: dto.e_to, e_subject: dto.e_subject, call_id: dto.call_id, client_id: dto.client_id }
}
,map4db_fdoc_acceptance: function(dto) { 
 return {
id: dto.id, uuid: dto.uuid, added_by: dto.added_by, dateadded: dto.dateadded, invoice_id: dto.invoice_id, acceptor_id: dto.acceptor_id, accepted: dto.accepted, acceptor_decision_date: dto.acceptor_decision_date, remarks: dto.remarks, step: dto.step }
}
,map4db_fdoc_documents_status_log: function(dto) { 
 return {
id: dto.id, date_registered: dto.date_registered, added_by: dto.added_by, call_id: dto.call_id, prev_status: dto.prev_status, new_status: dto.new_status }
}
,map4db_fdoc_emails: function(dto) { 
 return {
id: dto.id, parent_id: dto.parent_id, date_received: dto.date_received, m_from: dto.m_from, m_to: dto.m_to, m_subject: dto.m_subject, m_text: dto.m_text, m_attachments: dto.m_attachments, email_uuid: dto.email_uuid, m_html: dto.m_html }
}
,map4db_fdoc_doc_in_email_message: function(dto) { 
 return {
id: dto.id, invoice_id: dto.invoice_id, is_html: dto.is_html, sender: dto.sender, subject: dto.subject, message: dto.message }
}
,map4db_fdoc_documents: function(dto) { 
 return {
id: dto.id, uuid: dto.uuid, date_added: dto.date_added, added_by: dto.added_by, type_id: dto.type_id, status_id: dto.status_id, legal_ent_id: dto.legal_ent_id, bunit_id: dto.bunit_id, b_partner_id: dto.b_partner_id, bp_name: dto.bp_name, bp_address: dto.bp_address, bp_zip: dto.bp_zip, bp_city: dto.bp_city, vatid: dto.vatid, fa_number: dto.fa_number, fa_date: dto.fa_date, fa_sales_date: dto.fa_sales_date, fa_cost_month: dto.fa_cost_month, date_received: dto.date_received, net_value: dto.net_value, vat_amount: dto.vat_amount, curr: dto.curr, opt_field1: dto.opt_field1, opt_field2: dto.opt_field2, opt_field3: dto.opt_field3, opt_field4: dto.opt_field4, dcomments: dto.dcomments, mpk_id: dto.mpk_id, gl_account_id: dto.gl_account_id, einvoice: dto.einvoice, gross_value: dto.gross_value, call_id: dto.call_id, is_booked: dto.is_booked, book_date: dto.book_date, book_ref: dto.book_ref, le_prefix: dto.le_prefix, custom_doc_id: dto.custom_doc_id, has_optdata: dto.has_optdata, accountant_id: dto.accountant_id, use_split: dto.use_split, sender_email: dto.sender_email, email_uuid: dto.email_uuid, from_imap: dto.from_imap, customno: dto.customno, last_changed: dto.last_changed, last_changed_by: dto.last_changed_by, email_date: dto.email_date, is_proforma: dto.is_proforma, cost_cat_id: dto.cost_cat_id, legacy_mpk: dto.legacy_mpk, erp_po_no: dto.erp_po_no, project_id: dto.project_id, use_call_split: dto.use_call_split, payment_due_date: dto.payment_due_date, payment_done: dto.payment_done, fa_cost_year: dto.fa_cost_year }
}
,map4db_fdoc_import_mapy_tmp: function(dto) { 
 return {
manager_id: dto.manager_id, is_active: dto.is_active, app_enabled: dto.app_enabled, imie: dto.imie, nazwisko: dto.nazwisko, email: dto.email, stanowisko: dto.stanowisko, is_internal: dto.is_internal, date_added: dto.date_added, enable_in_calendar: dto.enable_in_calendar, is_external: dto.is_external, mpk: dto.mpk }
}
,map4db_fdoc_gl_accounts: function(dto) { 
 return {
id: dto.id, acc_code: dto.acc_code, acc_name: dto.acc_name, use4integr: dto.use4integr, active: dto.active }
}
,map4db_fdoc_kob_2_okr: function(dto) { 
 return {
id: dto.id, kob_id: dto.kob_id, okr_id: dto.okr_id, remarks: dto.remarks, flag: dto.flag, last_changed: dto.last_changed, last_changed_by: dto.last_changed_by }
}
,map4db_fdoc_konta_erp: function(dto) { 
 return {
konto: dto.konto, nazwa: dto.nazwa, grupa1op: dto.grupa1op, grupa2op: dto.grupa2op, grupa3op: dto.grupa3op, grupa1adm: dto.grupa1adm, last_changed: dto.last_changed, last_changed_by: dto.last_changed_by }
}
,map4db_fdoc_legal_ent_2_mailbox: function(dto) { 
 return {
id: dto.id, le_id: dto.le_id, mailbox_id: dto.mailbox_id, use4od: dto.use4od, use4service: dto.use4service, default4messaging: dto.default4messaging, uuid: dto.uuid, last_mod_date: dto.last_mod_date, last_mod_by: dto.last_mod_by }
}
,map4db_fdoc_legal_ent: function(dto) { 
 return {
id: dto.id, entity_name: dto.entity_name, vatid: dto.vatid, address: dto.address, city: dto.city, zip: dto.zip, domyslny: dto.domyslny, doc_prefix: dto.doc_prefix, sap_comp_code: dto.sap_comp_code, email: dto.email, regon: dto.regon, www: dto.www, phone: dto.phone, fax: dto.fax, courtid: dto.courtid, capital_info: dto.capital_info, court_info: dto.court_info, board_info: dto.board_info, capitalgroup_info: dto.capitalgroup_info, branch_info: dto.branch_info, memo_text: dto.memo_text, rodo_info: dto.rodo_info, fgaz_info: dto.fgaz_info, sap_sales_org: dto.sap_sales_org, sap_distib_channel: dto.sap_distib_channel, sap_purchas_org: dto.sap_purchas_org, sap_plant: dto.sap_plant, last_mod_date: dto.last_mod_date, last_mod_by: dto.last_mod_by, active: dto.active, is_default: dto.is_default, uuid: dto.uuid }
}
,map4db_fdoc_s_hq_acclvl_dict: function(dto) { 
 return {
id: dto.id, nazwa: dto.nazwa }
}
,map4db_fdoc_s_hq_dostep: function(dto) { 
 return {
id: dto.id, user_id: dto.user_id, mpk_kob: dto.mpk_kob, wbs_id: dto.wbs_id, access_lvl: dto.access_lvl, poziom_db_id: dto.poziom_db_id, last_changed: dto.last_changed, last_changed_by: dto.last_changed_by }
}
,map4db_fdoc_mpk: function(dto) { 
 return {
id: dto.id, code: dto.code, nazwa: dto.nazwa, segm_code: dto.segm_code, kob_id: dto.kob_id, okr_id: dto.okr_id, dyr_id: dto.dyr_id, hidden: dto.hidden, wbs_id: dto.wbs_id, building_id: dto.building_id, rodzaj_id: dto.rodzaj_id, blocked: dto.blocked, block_text: dto.block_text, comp_code: dto.comp_code, cc_id: dto.cc_id, uzywac: dto.uzywac, poz_wyniku_id: dto.poz_wyniku_id, str_kosztu_id: dto.str_kosztu_id, loc_group_id: dto.loc_group_id, last_changed: dto.last_changed, last_changed_by: dto.last_changed_by }
}
,map4db_fdoc_mpk_exceptions: function(dto) { 
 return {
id: dto.id, code: dto.code, nazwa: dto.nazwa, kob_id: dto.kob_id, okr_id: dto.okr_id, dyr_id: dto.dyr_id, is_active: dto.is_active, changed_by: dto.changed_by, date_modified: dto.date_modified, parent_id: dto.parent_id, imported_wbs: dto.imported_wbs, imported_cc: dto.imported_cc }
}
,map4db_fdoc_okr_2_dyr: function(dto) { 
 return {
id: dto.id, okr_id: dto.okr_id, dyr_id: dto.dyr_id, remarks: dto.remarks, flag: dto.flag, last_changed: dto.last_changed, last_changed_by: dto.last_changed_by }
}
,map4db_fdoc_rodzaj: function(dto) { 
 return {
id: dto.id, nazwa: dto.nazwa, show_ui: dto.show_ui, sort_id: dto.sort_id }
}
,map4db_fdoc_service_calls_split: function(dto) { 
 return {
id: dto.id, uuid: dto.uuid, added_by: dto.added_by, invoice_id: dto.invoice_id, call_id: dto.call_id, lp: dto.lp, wnetto: dto.wnetto, mpk_id: dto.mpk_id, category_id: dto.category_id }
}
,map4db_fdoc_s_loc_group: function(dto) { 
 return {
id: dto.id, nazwa: dto.nazwa }
}
,map4db_fdoc_s_login_map: function(dto) { 
 return {
id: dto.id, wbs_id: dto.wbs_id, mpk_kob: dto.mpk_kob, user_id: dto.user_id, last_changed: dto.last_changed, last_changed_by: dto.last_changed_by }
}
,map4db_fdoc_s_poziom_wyniku: function(dto) { 
 return {
id: dto.id, nazwa: dto.nazwa }
}
,map4db_fdoc_s_strukt_kosztow: function(dto) { 
 return {
id: dto.id, nazwa: dto.nazwa }
}
,map4db_fm_call_2_attachments: function(dto) { 
 return {
id: dto.id, uuid: dto.uuid, parent_id: dto.parent_id, file_id: dto.file_id, mark_deleted: dto.mark_deleted }
}
,map4db_fdoc_status: function(dto) { 
 return {
id: dto.id, sort_id: dto.sort_id, status_name: dto.status_name, enabled: dto.enabled, domyslny: dto.domyslny, is_open: dto.is_open }
}
,map4db_fdoc_types: function(dto) { 
 return {
id: dto.id, type_name: dto.type_name, is_default: dto.is_default, active: dto.active }
}
,map4db_file_attachments: function(dto) { 
 return {
id: dto.id, file_pointer: dto.file_pointer, file_name: dto.file_name, file_extension: dto.file_extension, storage_folder: dto.storage_folder, date_added: dto.date_added, added_by_id: dto.added_by_id, file_size: dto.file_size, category_id: dto.category_id }
}
,map4db_file_attachments_categories: function(dto) { 
 return {
id: dto.id, cat_name: dto.cat_name, cat_sort_id: dto.cat_sort_id, is_enabled: dto.is_enabled }
}
,map4db_fin_faktury: function(dto) { 
 return {
id: dto.id, nr_faktury: dto.nr_faktury, data_wystawienia: dto.data_wystawienia, obiekty: dto.obiekty, nr_z: dto.nr_z, nr_zlec: dto.nr_zlec, kwota: dto.kwota }
}
,map4db_fm_call_notes_internal: function(dto) { 
 return {
id: dto.id, uuid: dto.uuid, parent_id: dto.parent_id, added_by: dto.added_by, date_added: dto.date_added, memo: dto.memo, mark_deleted: dto.mark_deleted, typ: dto.typ, typ_id: dto.typ_id }
}
,map4db_fm_call_acceptance: function(dto) { 
 return {
id: dto.id, uuid: dto.uuid, added_by: dto.added_by, dateadded: dto.dateadded, parent_id: dto.parent_id, acceptor_id: dto.acceptor_id, accepted: dto.accepted, acceptor_decision_date: dto.acceptor_decision_date, remarks: dto.remarks, step: dto.step, rejected: dto.rejected, auto_accepted: dto.auto_accepted, auto_accpt_date: dto.auto_accpt_date }
}
,map4db_fm_call_category: function(dto) { 
 return {
id: dto.id, name: dto.name, sort_id: dto.sort_id, is_reactive: dto.is_reactive, is_preventive: dto.is_preventive, is_cli_default: dto.is_cli_default, is_empl_default: dto.is_empl_default, is_4mobile: dto.is_4mobile, is_with_assets: dto.is_with_assets, is_enabled: dto.is_enabled }
}
,map4db_fm_call_messaging: function(dto) { 
 return {
id: dto.id, date_added: dto.date_added, call_id: dto.call_id, status_id: dto.status_id, trigby_attachment: dto.trigby_attachment, trigby_call: dto.trigby_call, trigby_visit: dto.trigby_visit, trigby_note: dto.trigby_note, email_uuid: dto.email_uuid, to_email: dto.to_email }
}
,map4db_fm_call_log: function(dto) { 
 return {
id: dto.id, parent_id: dto.parent_id, date_added: dto.date_added, userlogin_id: dto.userlogin_id, event_text: dto.event_text }
}
,map4db_fm_call_notes_types: function(dto) { 
 return {
id: dto.id, typ: dto.typ, nazwa: dto.nazwa, is_hq: dto.is_hq, is_remark: dto.is_remark, is_accept: dto.is_accept, is_reject: dto.is_reject, bcolor: dto.bcolor }
}
,map4db_fm_call_status: function(dto) { 
 return {
id: dto.id, sort_id: dto.sort_id, status_name: dto.status_name, enabled: dto.enabled, domyslny: dto.domyslny, is_open: dto.is_open, visible4mobile: dto.visible4mobile, send_email: dto.send_email, send_sms: dto.send_sms, allow4formedit: dto.allow4formedit, client_editable: dto.client_editable, can_accept: dto.can_accept, client_att_edit: dto.client_att_edit }
}
,map4db_fm_call_priorities: function(dto) { 
 return {
id: dto.id, sort_id: dto.sort_id, name: dto.name, enabled: dto.enabled, is_client: dto.is_client, prio_level: dto.prio_level, is_default: dto.is_default, site_id: dto.site_id, ttr_hrs: dto.ttr_hrs, ttf_hrs: dto.ttf_hrs, ttc_hrs: dto.ttc_hrs }
}
,map4db_fm_call_tasks: function(dto) { 
 return {
id: dto.id, call_id: dto.call_id, added_by: dto.added_by, date_added: dto.date_added, task_title: dto.task_title, task_memo: dto.task_memo, deadline: dto.deadline, closed: dto.closed, mark_deleted: dto.mark_deleted }
}
,map4db_fm_call_types: function(dto) { 
 return {
id: dto.id, type_name: dto.type_name, enabled: dto.enabled, domyslny: dto.domyslny, is_open: dto.is_open, visible4mobile: dto.visible4mobile, is_clientype: dto.is_clientype, call_prefix: dto.call_prefix, hcolor: dto.hcolor, dark_font: dto.dark_font, disable_protmsg: dto.disable_protmsg, sort_id: dto.sort_id }
}
,map4db_fm_calls: function(dto) { 
 return {
id: dto.id, date_registered: dto.date_registered, added_by: dto.added_by, seller_id: dto.seller_id, call_type_id: dto.call_type_id, team_leader_id: dto.team_leader_id, site_id: dto.site_id, asset_id: dto.asset_id, status_id: dto.status_id, date_expected_by_customer: dto.date_expected_by_customer, deadline_internal: dto.deadline_internal, client_order_no: dto.client_order_no, client_id: dto.client_id, client_is_billto: dto.client_is_billto, billto_id: dto.billto_id, client_caller_name: dto.client_caller_name, client_caller_telephone: dto.client_caller_telephone, client_email: dto.client_email, client_issue_description: dto.client_issue_description, client_call_recepit_email: dto.client_call_recepit_email, client_notifyvia_email: dto.client_notifyvia_email, client_notifyvia_sms: dto.client_notifyvia_sms, client_visit_plan_email: dto.client_visit_plan_email, notify_techn_v_email: dto.notify_techn_v_email, notify_techn_v_sms: dto.notify_techn_v_sms, revenue_expected: dto.revenue_expected, cost_expected: dto.cost_expected, cost_center_id: dto.cost_center_id, client_priority: dto.client_priority, client_type: dto.client_type, imap_origin: dto.imap_origin, portal_origin: dto.portal_origin, technician_origin: dto.technician_origin, uuid: dto.uuid, our_priority: dto.our_priority, coordinator_memo: dto.coordinator_memo, last_updated: dto.last_updated, last_updated_by: dto.last_updated_by, kind: dto.kind, mpk_id: dto.mpk_id, call_title: dto.call_title, call_location: dto.call_location, is_warranty: dto.is_warranty, is_cust_claim: dto.is_cust_claim, area_id: dto.area_id, system_id: dto.system_id, system_type_id: dto.system_type_id, cli_acceptor_id: dto.cli_acceptor_id, workflow_cat_id: dto.workflow_cat_id, actual_user: dto.actual_user, tenant_id: dto.tenant_id, istenant_call: dto.istenant_call }
}
,map4db_fm_calls_status_log: function(dto) { 
 return {
id: dto.id, date_registered: dto.date_registered, added_by: dto.added_by, call_id: dto.call_id, prev_status: dto.prev_status, new_status: dto.new_status }
}
,map4db_fm_cat_areas: function(dto) { 
 return {
id: dto.id, nazwa: dto.nazwa, flag: dto.flag, sort_id: dto.sort_id, site_id: dto.site_id, last_updated_by: dto.last_updated_by, last_upd_date: dto.last_upd_date, use4ppm: dto.use4ppm, active: dto.active, cli_manager_id: dto.cli_manager_id }
}
,map4db_fm_cat_system_detailed: function(dto) { 
 return {
id: dto.id, parent_id: dto.parent_id, nazwa: dto.nazwa, id_other: dto.id_other, last_updated_by: dto.last_updated_by, last_upd_date: dto.last_upd_date, use4ppm: dto.use4ppm, active: dto.active }
}
,map4db_fm_cat_systems: function(dto) { 
 return {
id: dto.id, parent_id: dto.parent_id, nazwa: dto.nazwa, old_id: dto.old_id, flag: dto.flag, sort_id: dto.sort_id, last_updated_by: dto.last_updated_by, last_upd_date: dto.last_upd_date, use4ppm: dto.use4ppm, active: dto.active, ttr_hrs: dto.ttr_hrs, ttf_hrs: dto.ttf_hrs, ttc_hrs: dto.ttc_hrs }
}
,map4db_fm_client_2_site: function(dto) { 
 return {
id: dto.id, client_id: dto.client_id, site_id: dto.site_id, active: dto.active, last_updated_by: dto.last_updated_by, last_updated: dto.last_updated }
}
,map4db_fm_ehs_nm_2_reasons: function(dto) { 
 return {
id: dto.id, incident_id: dto.incident_id, reason_id: dto.reason_id, uuid: dto.uuid, checked: dto.checked }
}
,map4db_fm_ehs_2_attachments: function(dto) { 
 return {
id: dto.id, parent_id: dto.parent_id, file_id: dto.file_id, mark_deleted: dto.mark_deleted, uuid: dto.uuid }
}
,map4db_fm_ehs_event_reasons: function(dto) { 
 return {
id: dto.id, reason_name: dto.reason_name, segment_id: dto.segment_id, is_active: dto.is_active }
}
,map4db_fm_ehs_event_type: function(dto) { 
 return {
id: dto.id, type_name: dto.type_name, segment_id: dto.segment_id, is_active: dto.is_active }
}
,map4db_fm_ehs_nm: function(dto) { 
 return {
id: dto.id, uuid: dto.uuid, added_by: dto.added_by, date_added: dto.date_added, last_updated_by: dto.last_updated_by, last_updated: dto.last_updated, site_id: dto.site_id, is_locked: dto.is_locked, opis: dto.opis, title: dto.title, type_id: dto.type_id, status_id: dto.status_id, event_date: dto.event_date, event_location: dto.event_location, event_type_id: dto.event_type_id, event_reason_id: dto.event_reason_id }
}
,map4db_fm_ehs_status: function(dto) { 
 return {
id: dto.id, status_name: dto.status_name, is_active: dto.is_active, is_open: dto.is_open }
}
,map4db_fm_ehs_type: function(dto) { 
 return {
id: dto.id, type_name: dto.type_name, is_accident: dto.is_accident, is_nearmiss: dto.is_nearmiss, is_unsafe: dto.is_unsafe, prio: dto.prio, icon: dto.icon, color: dto.color }
}
,map4db_fm_ekg: function(dto) { 
 return {
id: dto.id, uuid: dto.uuid, site_id: dto.site_id, type_id: dto.type_id, status_id: dto.status_id, added_by: dto.added_by, date_added: dto.date_added, last_updated_by: dto.last_updated_by, last_updated: dto.last_updated, fname: dto.fname, lname: dto.lname, firma: dto.firma, tenant_id: dto.tenant_id, tenant_floor: dto.tenant_floor, invited_by: dto.invited_by, visit_date: dto.visit_date, remarks: dto.remarks, actual_user: dto.actual_user }
}
,map4db_fm_ekg_log: function(dto) { 
 return {
id: dto.id, parent_id: dto.parent_id, date_added: dto.date_added, userlogin_id: dto.userlogin_id, event_text: dto.event_text }
}
,map4db_fm_ekg_status: function(dto) { 
 return {
id: dto.id, status_name: dto.status_name, is_active: dto.is_active, is_open: dto.is_open }
}
,map4db_fm_ekg_type: function(dto) { 
 return {
id: dto.id, type_name: dto.type_name, prio: dto.prio }
}
,map4db_fm_employee_2_site: function(dto) { 
 return {
id: dto.id, employee_id: dto.employee_id, site_id: dto.site_id, active: dto.active, last_updated_by: dto.last_updated_by, last_updated: dto.last_updated, uuid: dto.uuid, role_id: dto.role_id }
}
,map4db_fm_ppm_frequencies: function(dto) { 
 return {
id: dto.id, nazwa: dto.nazwa, remarks: dto.remarks, other_period: dto.other_period, period_l: dto.period_l, period_uom_id: dto.period_uom_id, is_daily: dto.is_daily, is_weekly: dto.is_weekly, is_biweekly: dto.is_biweekly, is_monthly: dto.is_monthly, is_quarterly: dto.is_quarterly, is_halfyear: dto.is_halfyear, is_yearly: dto.is_yearly, sort_id: dto.sort_id, bcolor: dto.bcolor }
}
,map4db_fm_ppm_def4asset: function(dto) { 
 return {
id: dto.id, date_added: dto.date_added, added_by: dto.added_by, empl_resp_id: dto.empl_resp_id, asset_id: dto.asset_id, machine_id: dto.machine_id, freq_id: dto.freq_id, hourly_budget: dto.hourly_budget, remarks: dto.remarks }
}
,map4db_fm_ppm_plan: function(dto) { 
 return {
id: dto.id, uuid: dto.uuid, added_by: dto.added_by, date_added: dto.date_added, ppm_def4asset_id: dto.ppm_def4asset_id, asset_id: dto.asset_id, start_d: dto.start_d, end_d: dto.end_d, allday: dto.allday, ppm_type_id: dto.ppm_type_id, status_id: dto.status_id }
}
,map4db_fm_role2fmarea: function(dto) { 
 return {
id: dto.id, role_id: dto.role_id, area_id: dto.area_id, ro: dto.ro, rw: dto.rw }
}
,map4db_fm_role_areas: function(dto) { 
 return {
id: dto.id, object_name: dto.object_name, areakey: dto.areakey, licence_type_id: dto.licence_type_id }
}
,map4db_fm_roles: function(dto) { 
 return {
id: dto.id, sort_id: dto.sort_id, name: dto.name, enabled: dto.enabled, is_4employee: dto.is_4employee, is_technician: dto.is_technician, is_supervisor: dto.is_supervisor, is_director: dto.is_director, is_client_l1: dto.is_client_l1, is_client_l2: dto.is_client_l2, is_su: dto.is_su, is_client_l3: dto.is_client_l3, send_call_emails: dto.send_call_emails, cost_approver: dto.cost_approver, is_tenant: dto.is_tenant }
}
,map4db_fm_ppm_plan_status: function(dto) { 
 return {
id: dto.id, status_name: dto.status_name, enabled: dto.enabled, domyslny: dto.domyslny, is_open: dto.is_open, color: dto.color }
}
,map4db_fm_report_materials: function(dto) { 
 return {
id: dto.id, report_id: dto.report_id, material_id: dto.material_id, indeks: dto.indeks, name: dto.name, qty_used: dto.qty_used, serial_number: dto.serial_number, remarks: dto.remarks, uom_id: dto.uom_id, free_item: dto.free_item, cost_price: dto.cost_price }
}
,map4db_fm_reports: function(dto) { 
 return {
id: dto.id, uuid: dto.uuid, date_added: dto.date_added, addedby: dto.addedby, call_id: dto.call_id, ereport: dto.ereport, report_date: dto.report_date, service_completed: dto.service_completed, system_left_operational: dto.system_left_operational, system_operational_remarks: dto.system_operational_remarks, further_services_needed: dto.further_services_needed, work_executed_text: dto.work_executed_text, zalecane_prace_dodatkowe: dto.zalecane_prace_dodatkowe, execution_issues: dto.execution_issues, execution_issues_text: dto.execution_issues_text, sendreportbyemail: dto.sendreportbyemail, custrefusal2sign: dto.custrefusal2sign, custrefulasreason: dto.custrefulasreason, custacceptname: dto.custacceptname, custacceptteleph: dto.custacceptteleph, custacceptemail: dto.custacceptemail, prot_template: dto.prot_template, embedded_protocol: dto.embedded_protocol, quote_required: dto.quote_required }
}
,map4db_fm_reports_timing: function(dto) { 
 return {
id: dto.id, uuid: dto.uuid, category_id: dto.category_id, report_id: dto.report_id, call_id: dto.call_id, date_added: dto.date_added, added_by: dto.added_by, employee_id: dto.employee_id, leader_grupy: dto.leader_grupy, is_planning_row: dto.is_planning_row, start_time: dto.start_time, end_time: dto.end_time, uwagi: dto.uwagi, in_progress: dto.in_progress, subcontr_id: dto.subcontr_id }
}
,map4db_fm_site_tenants: function(dto) { 
 return {
id: dto.id, site_id: dto.site_id, tenant_name: dto.tenant_name, email: dto.email, contact_person: dto.contact_person, remarks: dto.remarks, uuid: dto.uuid, phone: dto.phone }
}
,map4db_fm_site_tenants_2_locations: function(dto) { 
 return {
id: dto.id, tenant_id: dto.tenant_id, location_id: dto.location_id }
}
,map4db_fm_site_2_fmmodul: function(dto) { 
 return {
id: dto.id, site_id: dto.site_id, area_id: dto.area_id, enabled: dto.enabled, changed_by: dto.changed_by, date_changed: dto.date_changed }
}
,map4db_fm_site_locations: function(dto) { 
 return {
id: dto.id, site_id: dto.site_id, loc_name: dto.loc_name, loc_level: dto.loc_level, loc_description: dto.loc_description, uuid: dto.uuid }
}
,map4db_fm_site_regions: function(dto) { 
 return {
id: dto.id, sort_id: dto.sort_id, name: dto.name, enabled: dto.enabled, employee_id: dto.employee_id }
}
,map4db_fqa_checklist: function(dto) { 
 return {
id: dto.id, added_by: dto.added_by, date_registered: dto.date_registered, changed_by: dto.changed_by, date_changed: dto.date_changed, b_unit: dto.b_unit, description: dto.description, name: dto.name }
}
,map4db_fqa_checklist_2_site: function(dto) { 
 return {
id: dto.id, fm_location_id: dto.fm_location_id, fqa_checklist_id: dto.fqa_checklist_id, changed_by: dto.changed_by, date_changed: dto.date_changed, description: dto.description, site_id: dto.site_id, active: dto.active }
}
,map4db_fqa_checklist_questions: function(dto) { 
 return {
id: dto.id, sort_id: dto.sort_id, parent_id: dto.parent_id, group_id: dto.group_id, type_id: dto.type_id, table_lp: dto.table_lp, question: dto.question, answer: dto.answer, aktywny: dto.aktywny, show_yesno_checkbox: dto.show_yesno_checkbox, show_remarks_edit: dto.show_remarks_edit, show_scale: dto.show_scale, scale_steps: dto.scale_steps, remarks_label: dto.remarks_label, zremarks: dto.zremarks, uuid: dto.uuid }
}
,map4db_fqa_question_group: function(dto) { 
 return {
id: dto.id, sort_id: dto.sort_id, parent_id: dto.parent_id, group_name: dto.group_name, answer: dto.answer, aktywny: dto.aktywny }
}
,map4db_fqa_question_type: function(dto) { 
 return {
id: dto.id, type_name: dto.type_name, is_chkyesno: dto.is_chkyesno, is_comment: dto.is_comment, is_chkbox: dto.is_chkbox, is_scale: dto.is_scale, is_list: dto.is_list, aktywny: dto.aktywny }
}
,map4db_fqaa_audit_attachments: function(dto) { 
 return {
id: dto.id, uuid: dto.uuid, parent_id: dto.parent_id, file_id: dto.file_id, mark_deleted: dto.mark_deleted }
}
,map4db_fqaa_audit_type: function(dto) { 
 return {
id: dto.id, type_name: dto.type_name, aktywny: dto.aktywny, is4client: dto.is4client }
}
,map4db_fqaa_audit: function(dto) { 
 return {
id: dto.id, uuid: dto.uuid, checklist_id: dto.checklist_id, date_registered: dto.date_registered, employee_id: dto.employee_id, date_changed: dto.date_changed, changed_by: dto.changed_by, site_id: dto.site_id, client_id: dto.client_id, client_contact_id: dto.client_contact_id, client_tel: dto.client_tel, client_email: dto.client_email, exec_remarks: dto.exec_remarks, remarks: dto.remarks, is_completed: dto.is_completed, location_id: dto.location_id, location_text: dto.location_text, audit_type_id: dto.audit_type_id }
}
,map4db_fqaa_audit_questions: function(dto) { 
 return {
id: dto.id, uuid: dto.uuid, sort_id: dto.sort_id, parent_id: dto.parent_id, group_id: dto.group_id, type_id: dto.type_id, table_lp: dto.table_lp, question: dto.question, answer: dto.answer, show_yesno_checkbox: dto.show_yesno_checkbox, show_remarks_edit: dto.show_remarks_edit, remarks_label: dto.remarks_label, remarks: dto.remarks, show_scale: dto.show_scale, scale_steps: dto.scale_steps, changed_by: dto.changed_by, date_changed: dto.date_changed, touched: dto.touched, answer_new: dto.answer_new }
}
,map4db_fqaa_audit_signature_client: function(dto) { 
 return {
id: dto.id, parent_id: dto.parent_id, uuid: dto.uuid, date_signed: dto.date_signed, opt_email: dto.opt_email, signature: dto.signature }
}
,map4db_fqaa_audit_signature_employee: function(dto) { 
 return {
id: dto.id, parent_id: dto.parent_id, uuid: dto.uuid, date_signed: dto.date_signed, opt_email: dto.opt_email, signature: dto.signature }
}
,map4db_import_clients_tmp: function(dto) { 
 return {
id_kontrah: dto.id_kontrah, nazwa: dto.nazwa, nazwa_pelna: dto.nazwa_pelna, nip: dto.nip, addres: dto.addres, miasto: dto.miasto, kod_poczt: dto.kod_poczt, customer: dto.customer, vendor: dto.vendor, pay_form: dto.pay_form, termin_nalezn: dto.termin_nalezn, termin_zobowiaz: dto.termin_zobowiaz, blokada: dto.blokada }
}
,map4db_fx_rates: function(dto) { 
 return {
id: dto.id, fx_date: dto.fx_date, currency: dto.currency, rate2pln: dto.rate2pln, remarks: dto.remarks, last_modified: dto.last_modified, added_by: dto.added_by }
}
,map4db_g_group_actors: function(dto) { 
 return {
id: dto.id, group_id: dto.group_id, employee_id: dto.employee_id, vendor_id: dto.vendor_id, dispatch_rules_id: dto.dispatch_rules_id, priority: dto.priority }
}
,map4db_g_group_dispatch_rules: function(dto) { 
 return {
id: dto.id, rule_name: dto.rule_name, use_sms: dto.use_sms, use_email: dto.use_email, use_voice: dto.use_voice }
}
,map4db_g_service_groups: function(dto) { 
 return {
id: dto.id, group_name: dto.group_name, group_memo: dto.group_memo, teamleader_id: dto.teamleader_id, coordinator_id: dto.coordinator_id, use_messaging: dto.use_messaging }
}
,map4db_import_hanza_clients_tmp: function(dto) { 
 return {
nazwa_klienta: dto.nazwa_klienta, numer_klienta: dto.numer_klienta, warunek_platnosci: dto.warunek_platnosci, nazwa_skrocona: dto.nazwa_skrocona, nip: dto.nip, addres1: dto.addres1, addres2: dto.addres2, addres3: dto.addres3, status: dto.status, customer: dto.customer, vendor: dto.vendor, fieldm: dto.fieldm }
}
,map4db_import_hanza_faktury_tmp: function(dto) { 
 return {
nr_faktury: dto.nr_faktury, obiekty: dto.obiekty, data_wystawienia: dto.data_wystawienia, kwota_netto: dto.kwota_netto, extra_1: dto.extra_1 }
}
,map4db_import_hanza_sites_tmp: function(dto) { 
 return {
nazwa_obiektu: dto.nazwa_obiektu, kod_obiektu: dto.kod_obiektu, typ_obiektu: dto.typ_obiektu, obiekt_hierarchiczny: dto.obiekt_hierarchiczny, other1: dto.other1 }
}
,map4db_kody_poczt: function(dto) { 
 return {
kod: dto.kod, miasto: dto.miasto, wojewodztwo: dto.wojewodztwo }
}
,map4db_log_table: function(dto) { 
 return {
id: dto.id, date_event: dto.date_event, severity: dto.severity, message: dto.message, source: dto.source, origin: dto.origin, username: dto.username }
}
,map4db_messages_sent: function(dto) { 
 return {
id: dto.id, date_registered: dto.date_registered, msg_type: dto.msg_type, call_id: dto.call_id, report_id: dto.report_id, project_id: dto.project_id, employee_id: dto.employee_id, m_template_id: dto.m_template_id, m_template_used: dto.m_template_used, m_subject: dto.m_subject, m_receipients: dto.m_receipients, m_message: dto.m_message, sms2dutyphone: dto.sms2dutyphone, smsapi_ret_message: dto.smsapi_ret_message, smsapi_points: dto.smsapi_points, document_id: dto.document_id, oferta_id: dto.oferta_id }
}
,map4db_mm_document_types: function(dto) { 
 return {
id: dto.id, type_name: dto.type_name, credit: dto.credit, internal: dto.internal, remarks: dto.remarks, gui_editable: dto.gui_editable, only4ekp_use: dto.only4ekp_use, use_from_wh: dto.use_from_wh, use_to_wh: dto.use_to_wh, use_external_party: dto.use_external_party, use_employee: dto.use_employee, internal_transfer: dto.internal_transfer }
}
,map4db_messages_sent_timing_ids: function(dto) { 
 return {
id: dto.id, message_sent_id: dto.message_sent_id, timing_id: dto.timing_id }
}
,map4db_mm_doc_status: function(dto) { 
 return {
id: dto.id, sort_id: dto.sort_id, status_name: dto.status_name, enabled: dto.enabled, domyslny: dto.domyslny, is_open: dto.is_open }
}
,map4db_mm_document_items: function(dto) { 
 return {
id: dto.id, parent_id: dto.parent_id, lp: dto.lp, mat_index: dto.mat_index, mat_name: dto.mat_name, qty: dto.qty, uom_id: dto.uom_id, cost_price: dto.cost_price, remarks: dto.remarks, material_id: dto.material_id }
}
,map4db_mm_master: function(dto) { 
 return {
id: dto.id, isservice: dto.isservice, isownproduct: dto.isownproduct, mat_index: dto.mat_index, mat_name: dto.mat_name, ean: dto.ean, longmaterialtext: dto.longmaterialtext, wght: dto.wght, uom_id: dto.uom_id, dateadded: dto.dateadded, dateupdated: dto.dateupdated, group_id: dto.group_id, unit_cost: dto.unit_cost, unit_cost_currency: dto.unit_cost_currency, sync_mobile: dto.sync_mobile, sales_organization_id: dto.sales_organization_id, distribution_channel_code: dto.distribution_channel_code, plant_id: dto.plant_id, serialno: dto.serialno, vendor_id: dto.vendor_id, brand: dto.brand, import_key: dto.import_key, systype_id: dto.systype_id, added_by: dto.added_by, update_by: dto.update_by, active_insearc: dto.active_insearc }
}
,map4db_mm_document_header: function(dto) { 
 return {
id: dto.id, addedby: dto.addedby, date_registered: dto.date_registered, document_no: dto.document_no, remarks: dto.remarks, type_id: dto.type_id, employee_id: dto.employee_id, kontrahent_id: dto.kontrahent_id, report_id: dto.report_id, from_warehouse_id: dto.from_warehouse_id, to_warehouse_id: dto.to_warehouse_id, status_id: dto.status_id, chnged_dby: dto.chnged_dby, date_changed: dto.date_changed }
}
,map4db_mm_erp_plan_assignment: function(dto) { 
 return {
id: dto.id, master_id: dto.master_id, plant_id: dto.plant_id }
}
,map4db_mm_erp_sales_org_assignment: function(dto) { 
 return {
id: dto.id, master_id: dto.master_id, sales_organization_id: dto.sales_organization_id, distribution_channel_code: dto.distribution_channel_code }
}
,map4db_mm_erp_valuation_assignment: function(dto) { 
 return {
id: dto.id, master_id: dto.master_id, valuation_area_id: dto.valuation_area_id, inventory_valuation_procedure_code: dto.inventory_valuation_procedure_code, price_unit_number_value: dto.price_unit_number_value, price_amount_value: dto.price_amount_value, currency_code: dto.currency_code }
}
,map4db_mm_legacy_stores: function(dto) { 
 return {
id: dto.id, legacy_id: dto.legacy_id, storage_name: dto.storage_name, is_employee: dto.is_employee }
}
,map4db_nps_surveys: function(dto) { 
 return {
id: dto.id, date_added: dto.date_added, autor_id: dto.autor_id, customer_id: dto.customer_id, call_id: dto.call_id, report_id: dto.report_id, contact_person: dto.contact_person, phone_number: dto.phone_number, survey_date: dto.survey_date, score: dto.score, client_remarks: dto.client_remarks }
}
,map4db_o_oferta_2_attachments: function(dto) { 
 return {
id: dto.id, oferta_id: dto.oferta_id, file_id: dto.file_id, mark_deleted: dto.mark_deleted, mark4index: dto.mark4index }
}
,map4db_mm_master_2_group: function(dto) { 
 return {
id: dto.id, mm_master_id: dto.mm_master_id, group_id: dto.group_id }
}
,map4db_mm_master_groups: function(dto) { 
 return {
id: dto.id, group_name: dto.group_name, is_active: dto.is_active, fgaz: dto.fgaz, sap_group_id: dto.sap_group_id }
}
,map4db_mm_tech_stock_imported: function(dto) { 
 return {
id: dto.id, legacy_tech_id: dto.legacy_tech_id, warehouse_id: dto.warehouse_id, mat_index: dto.mat_index, mat_name: dto.mat_name, qty: dto.qty, uom: dto.uom, uom_id: dto.uom_id, date_import: dto.date_import }
}
,map4db_mm_warehouses: function(dto) { 
 return {
id: dto.id, warehouse_name: dto.warehouse_name, address: dto.address, zipcity: dto.zipcity, remarks: dto.remarks, enabled: dto.enabled, is_car_stock: dto.is_car_stock, carstock_employee_id: dto.carstock_employee_id, sort_id: dto.sort_id, is_default: dto.is_default, legacy_store_id: dto.legacy_store_id }
}
,map4db_o_oferta_estymacja: function(dto) { 
 return {
id: dto.id, dateadded: dto.dateadded, added_by: dto.added_by, est_description: dto.est_description, type_id: dto.type_id, uuid: dto.uuid, is_blocked: dto.is_blocked }
}
,map4db_o_oferta_estymacja_linie: function(dto) { 
 return {
id: dto.id, added_by: dto.added_by, estimation_id: dto.estimation_id, item_lp: dto.item_lp, group_id: dto.group_id, mat_master_id: dto.mat_master_id, qty: dto.qty, uom_id: dto.uom_id, unit_cost: dto.unit_cost, unit_cost_currency: dto.unit_cost_currency, mat_index_alt: dto.mat_index_alt, mat_name_alt: dto.mat_name_alt, mat_long_text: dto.mat_long_text, free_item: dto.free_item, is_service: dto.is_service, hidden: dto.hidden, dostawca: dto.dostawca, type_id: dto.type_id, vendor_id: dto.vendor_id, create_po: dto.create_po, sap_wbs_id: dto.sap_wbs_id, send2erp: dto.send2erp, od_split_line_id: dto.od_split_line_id, erp_po_ref: dto.erp_po_ref, uuid: dto.uuid, l_probabil: dto.l_probabil }
}
,map4db_o_oferta_acceptance: function(dto) { 
 return {
id: dto.id, added_by: dto.added_by, dateadded: dto.dateadded, oferta_id: dto.oferta_id, acceptor_id: dto.acceptor_id, acceptor_decision_date: dto.acceptor_decision_date, remarks: dto.remarks, decision: dto.decision, uuid: dto.uuid, curr_acceptor: dto.curr_acceptor }
}
,map4db_o_oferta_2_estymacja: function(dto) { 
 return {
id: dto.id, added_by: dto.added_by, dateadded: dto.dateadded, oferta_id: dto.oferta_id, estymacja_id: dto.estymacja_id, version_no: dto.version_no, version_text: dto.version_text, is_current: dto.is_current, call_id: dto.call_id, uuid: dto.uuid, wf_call_id: dto.wf_call_id }
}
,map4db_o_oferta_acceptance_defs: function(dto) { 
 return {
id: dto.id, nazwa: dto.nazwa, is_new: dto.is_new, is_accepted: dto.is_accepted, is_rejected: dto.is_rejected, is_reedit: dto.is_reedit, ui_block: dto.ui_block }
}
,map4db_o_oferta_estym_line_conditions: function(dto) { 
 return {
id: dto.id, added_by: dto.added_by, date_added: dto.date_added, est_line_id: dto.est_line_id, condition_type_id: dto.condition_type_id, price_list_id: dto.price_list_id, mat_group_id: dto.mat_group_id, mat_index: dto.mat_index, cond_price: dto.cond_price, cond_currency: dto.cond_currency, cond_discount: dto.cond_discount, cond_remarks: dto.cond_remarks, is_active: dto.is_active, material_id: dto.material_id }
}
,map4db_o_oferta_head: function(dto) { 
 return {
id: dto.id, custom_id: dto.custom_id, date_registered: dto.date_registered, date_last_access: dto.date_last_access, date_last_change: dto.date_last_change, added_by: dto.added_by, owner_id: dto.owner_id, koordynator_id: dto.koordynator_id, status_id: dto.status_id, site_id: dto.site_id, installation_id: dto.installation_id, paymterm_id: dto.paymterm_id, warrantyterms_id: dto.warrantyterms_id, deliveryterms_id: dto.deliveryterms_id, terms_and_cond_id: dto.terms_and_cond_id, binding_term_id: dto.binding_term_id, client_id: dto.client_id, client_is_bill2: dto.client_is_bill2, bill_to_id: dto.bill_to_id, mpk_id: dto.mpk_id, delivery_time: dto.delivery_time, delivery_time_uom_ref: dto.delivery_time_uom_ref, time2exec_start: dto.time2exec_start, time2exec_start_uom_id: dto.time2exec_start_uom_id, valid_till: dto.valid_till, offer_currency_id: dto.offer_currency_id, main_text: dto.main_text, footer_text: dto.footer_text, print_rebates: dto.print_rebates, print_line_details: dto.print_line_details, client_rfq_reference: dto.client_rfq_reference, client_rfq_date: dto.client_rfq_date, project_id: dto.project_id, contract_id: dto.contract_id, doc_tags: dto.doc_tags, client_rfq_contact: dto.client_rfq_contact, client_rfq_telefon: dto.client_rfq_telefon, client_rfq_email: dto.client_rfq_email, client_rfq_our_contact_id: dto.client_rfq_our_contact_id, waste_handl_term_id: dto.waste_handl_term_id, openscope_terms_id: dto.openscope_terms_id, title: dto.title, document_date: dto.document_date, seller_id: dto.seller_id, hide_calculation: dto.hide_calculation, prefix: dto.prefix, print_title_field: dto.print_title_field, hdr_rebate: dto.hdr_rebate, zakres_oferty: dto.zakres_oferty, int_comments: dto.int_comments, hide_zero_prices: dto.hide_zero_prices, exp_decision_date: dto.exp_decision_date, probabil: dto.probabil, system_type_id: dto.system_type_id, bu_id: dto.bu_id, crm_reference_no: dto.crm_reference_no, le_id: dto.le_id }
}
,map4db_o_oferta_messages: function(dto) { 
 return {
id: dto.id, date_added: dto.date_added, oferta_id: dto.oferta_id, acceptor_id: dto.acceptor_id, header_hash: dto.header_hash }
}
,map4db_o_oferta_estymacja_linie_type: function(dto) { 
 return {
id: dto.id, type_name: dto.type_name, is_subcont: dto.is_subcont, is_materials: dto.is_materials, is_employee: dto.is_employee, is_travel: dto.is_travel, sales: dto.sales, costs: dto.costs, is_service: dto.is_service }
}
,map4db_o_oferta_estymacja_type: function(dto) { 
 return {
id: dto.id, type_name: dto.type_name, is_oferta: dto.is_oferta, is_pre_call: dto.is_pre_call, is_post_call: dto.is_post_call }
}
,map4db_o_oferta_extra_sites: function(dto) { 
 return {
id: dto.id, oferta_id: dto.oferta_id, site_id: dto.site_id }
}
,map4db_o_oferta_fxrates: function(dto) { 
 return {
id: dto.id, added_by: dto.added_by, dateadded: dto.dateadded, oferta_id: dto.oferta_id, currency: dto.currency, rate2pln: dto.rate2pln }
}
,map4db_p_contract_ext_definitions: function(dto) { 
 return {
id: dto.id, display_name: dto.display_name, component_name: dto.component_name, table_name: dto.table_name, is_sales: dto.is_sales, is_purchase: dto.is_purchase, is_poc: dto.is_poc, is_fm: dto.is_fm, key: dto.key, sort_id: dto.sort_id, is_active: dto.is_active }
}
,map4db_p_contract_ext_fm_dod: function(dto) { 
 return {
id: dto.id, uuid: dto.uuid, def_type_id: dto.def_type_id, contract_id: dto.contract_id, acc_to_offer: dto.acc_to_offer, remarks: dto.remarks, enabled: dto.enabled, hrate_enabled: dto.hrate_enabled, hrate_rate: dto.hrate_rate, hrate_curr: dto.hrate_curr, hrate_remarks: dto.hrate_remarks }
}
,map4db_o_oferta_status: function(dto) { 
 return {
id: dto.id, status_name: dto.status_name, is_enabled: dto.is_enabled, is_blocked: dto.is_blocked, cr_order: dto.cr_order }
}
,map4db_o_oferta_status_log: function(dto) { 
 return {
id: dto.id, date_registered: dto.date_registered, added_by: dto.added_by, oferta_id: dto.oferta_id, prev_status: dto.prev_status, new_status: dto.new_status, remarks: dto.remarks }
}
,map4db_o_oferta_terms: function(dto) { 
 return {
id: dto.id, dateadded: dto.dateadded, category_id: dto.category_id, t_display_name: dto.t_display_name, t_long_text: dto.t_long_text, is_enabled: dto.is_enabled, is_default: dto.is_default }
}
,map4db_o_oferta_terms_categories: function(dto) { 
 return {
id: dto.id, category_name: dto.category_name, is_enabled: dto.is_enabled, int_code: dto.int_code }
}
,map4db_p_contract_ext_zakup_gen: function(dto) { 
 return {
id: dto.id, uuid: dto.uuid, def_type_id: dto.def_type_id, contract_id: dto.contract_id, enabled: dto.enabled, suplier_id: dto.suplier_id, wbs: dto.wbs, purchase_amount: dto.purchase_amount, c_currency: dto.c_currency, scope_ofwork: dto.scope_ofwork, remarks: dto.remarks, has_warranty: dto.has_warranty, warr_expiry_date: dto.warr_expiry_date, warr_description: dto.warr_description }
}
,map4db_p_contract_ext_fm_ref: function(dto) { 
 return {
id: dto.id, uuid: dto.uuid, def_type_id: dto.def_type_id, contract_id: dto.contract_id, enabled: dto.enabled, markup_percnt: dto.markup_percnt, per_transaction_fixdfee: dto.per_transaction_fixdfee, c_currency: dto.c_currency, remarks: dto.remarks }
}
,map4db_p_contract_ext_fm_rycz: function(dto) { 
 return {
id: dto.id, uuid: dto.uuid, def_type_id: dto.def_type_id, contract_id: dto.contract_id, ryczalt: dto.ryczalt, c_billing_freq_id: dto.c_billing_freq_id, recurring_sales: dto.recurring_sales, c_currency: dto.c_currency, c_indx_enable: dto.c_indx_enable, c_indx_indextype_id: dto.c_indx_indextype_id, c_indx_first_date: dto.c_indx_first_date, c_indx_amount_prc: dto.c_indx_amount_prc, c_indx_remarks: dto.c_indx_remarks }
}
,map4db_p_contract_ext_poc: function(dto) { 
 return {
id: dto.id, uuid: dto.uuid, def_type_id: dto.def_type_id, contract_id: dto.contract_id, ryczalt: dto.ryczalt, c_poc: dto.c_poc, c_tvalue: dto.c_tvalue, c_tcost: dto.c_tcost, s_curr: dto.s_curr, c_curr: dto.c_curr, c_gm: dto.c_gm, remarks: dto.remarks, email_address: dto.email_address, deposit_1proc: dto.deposit_1proc, deposit_2proc: dto.deposit_2proc, deposit_3proc: dto.deposit_3proc, deposit_4proc: dto.deposit_4proc, deposit1_exp_date: dto.deposit1_exp_date, deposit2_exp_date: dto.deposit2_exp_date, deposit3_exp_date: dto.deposit3_exp_date, deposit4_exp_date: dto.deposit4_exp_date, deposit_notify_byemail: dto.deposit_notify_byemail, bank_warr: dto.bank_warr, bank_warr_amount: dto.bank_warr_amount, bank_warr_reminder: dto.bank_warr_reminder, bank_warr_date: dto.bank_warr_date, bank_warr_notify_byemail: dto.bank_warr_notify_byemail, insurance_warr: dto.insurance_warr, insurance_warr_amount: dto.insurance_warr_amount, insurance_warr_reminder: dto.insurance_warr_reminder, bank_warr_comments: dto.bank_warr_comments, insurance_warr_comments: dto.insurance_warr_comments, insurance_warr_date: dto.insurance_warr_date, insurance_warr_notify_byemail: dto.insurance_warr_notify_byemail, use_deposit: dto.use_deposit, use_kaucja: dto.use_kaucja, kaucja_notify_byemail: dto.kaucja_notify_byemail, kaucja_1proc: dto.kaucja_1proc, kaucja_2proc: dto.kaucja_2proc, kaucja_3proc: dto.kaucja_3proc, kaucja_4proc: dto.kaucja_4proc, kaucja1_exp_date: dto.kaucja1_exp_date, kaucja2_exp_date: dto.kaucja2_exp_date, kaucja3_exp_date: dto.kaucja3_exp_date, kaucja4_exp_date: dto.kaucja4_exp_date }
}
,map4db_p_contract_ext_subcontr: function(dto) { 
 return {
id: dto.id, uuid: dto.uuid, def_type_id: dto.def_type_id, contract_id: dto.contract_id, enabled: dto.enabled, suplier_id: dto.suplier_id, wbs: dto.wbs, purchase_amount: dto.purchase_amount, c_currency: dto.c_currency, scope_ofwork: dto.scope_ofwork, remarks: dto.remarks, c_poc: dto.c_poc, has_warranty: dto.has_warranty, warr_expiry_date: dto.warr_expiry_date, warr_description: dto.warr_description, email_address: dto.email_address, deposit_1proc: dto.deposit_1proc, deposit_2proc: dto.deposit_2proc, deposit_3proc: dto.deposit_3proc, deposit_4proc: dto.deposit_4proc, deposit1_exp_date: dto.deposit1_exp_date, deposit2_exp_date: dto.deposit2_exp_date, deposit3_exp_date: dto.deposit3_exp_date, deposit4_exp_date: dto.deposit4_exp_date, deposit_notify_byemail: dto.deposit_notify_byemail, bank_warr: dto.bank_warr, bank_warr_amount: dto.bank_warr_amount, bank_warr_reminder: dto.bank_warr_reminder, bank_warr_date: dto.bank_warr_date, bank_warr_notify_byemail: dto.bank_warr_notify_byemail, insurance_warr: dto.insurance_warr, insurance_warr_amount: dto.insurance_warr_amount, insurance_warr_reminder: dto.insurance_warr_reminder, bank_warr_comments: dto.bank_warr_comments, insurance_warr_comments: dto.insurance_warr_comments, insurance_warr_date: dto.insurance_warr_date, insurance_warr_notify_byemail: dto.insurance_warr_notify_byemail, use_deposit: dto.use_deposit, use_kaucja: dto.use_kaucja, kaucja_notify_byemail: dto.kaucja_notify_byemail, kaucja_1proc: dto.kaucja_1proc, kaucja_2proc: dto.kaucja_2proc, kaucja_3proc: dto.kaucja_3proc, kaucja_4proc: dto.kaucja_4proc, kaucja1_exp_date: dto.kaucja1_exp_date, kaucja2_exp_date: dto.kaucja2_exp_date, kaucja3_exp_date: dto.kaucja3_exp_date, kaucja4_exp_date: dto.kaucja4_exp_date, warr_len_months: dto.warr_len_months }
}
,map4db_p_contract_type: function(dto) { 
 return {
id: dto.id, type_name: dto.type_name, is_main: dto.is_main, is_annex: dto.is_annex, is_active: dto.is_active }
}
,map4db_p_project_collateral_type: function(dto) { 
 return {
id: dto.id, nazwa: dto.nazwa, def_send_email: dto.def_send_email }
}
,map4db_p_project_collaterals: function(dto) { 
 return {
id: dto.id, uuid: dto.uuid, project_id: dto.project_id, extention_id: dto.extention_id, extention_tab_name: dto.extention_tab_name, date_added: dto.date_added, added_by: dto.added_by, type_id: dto.type_id, cvalue: dto.cvalue, uomid: dto.uomid, target_date: dto.target_date, comments: dto.comments, send_email: dto.send_email, alt_email: dto.alt_email, contract_id: dto.contract_id, infotx: dto.infotx }
}
,map4db_p_project_contract_kind: function(dto) { 
 return {
id: dto.id, nazwa: dto.nazwa, is_purchase: dto.is_purchase, is_sales: dto.is_sales, is_active: dto.is_active }
}
,map4db_p_project_contracts: function(dto) { 
 return {
id: dto.id, uuid: dto.uuid, date_added: dto.date_added, added_by: dto.added_by, project_id: dto.project_id, contr_type_id: dto.contr_type_id, business_segment_id: dto.business_segment_id, c_manager_id: dto.c_manager_id, c_bus_owner_id: dto.c_bus_owner_id, client_id: dto.client_id, site_id: dto.site_id, c_name: dto.c_name, c_remarks: dto.c_remarks, c_date: dto.c_date, c_start_date: dto.c_start_date, c_end_date: dto.c_end_date, indefinite_term: dto.indefinite_term, c_actual_work_end: dto.c_actual_work_end, c_startup_date: dto.c_startup_date, c_handover_date: dto.c_handover_date, c_final_protocol_date: dto.c_final_protocol_date, c_currency: dto.c_currency, notice_period: dto.notice_period, notice_uom_id: dto.notice_uom_id, payterm_id: dto.payterm_id, pay_term_base_id: dto.pay_term_base_id, warrantyterms_id: dto.warrantyterms_id, deliveryterms_id: dto.deliveryterms_id, waste_handl_term_id: dto.waste_handl_term_id, last_mod: dto.last_mod, last_mod_by: dto.last_mod_by, contr_kind_id: dto.contr_kind_id, notification_email1: dto.notification_email1, notification_email2: dto.notification_email2 }
}
,map4db_p_project_fmcontract: function(dto) { 
 return {
id: dto.id, contract_id: dto.contract_id, ryczalt: dto.ryczalt, c_billing_freq_id: dto.c_billing_freq_id, c_extra_workmodel: dto.c_extra_workmodel, notice_period: dto.notice_period, notice_uom_id: dto.notice_uom_id, payterm_id: dto.payterm_id, pay_term_base_id: dto.pay_term_base_id, recurring_sales_value: dto.recurring_sales_value, c_v_currency: dto.c_v_currency, uuid: dto.uuid, one_time: dto.one_time, onetime_sales_value: dto.onetime_sales_value, ot_s_currency: dto.ot_s_currency, onetime_remarks: dto.onetime_remarks, has_hr_rate: dto.has_hr_rate, hrly_rate: dto.hrly_rate, hrate_curr: dto.hrate_curr, hrate_remarks: dto.hrate_remarks }
}
,map4db_p_project_messages: function(dto) { 
 return {
id: dto.id, date_added: dto.date_added, project_id: dto.project_id, header_hash: dto.header_hash, transfer2service: dto.transfer2service }
}
,map4db_p_project_log: function(dto) { 
 return {
id: dto.id, date_registered: dto.date_registered, added_by: dto.added_by, project_id: dto.project_id, contract_id: dto.contract_id, memo: dto.memo }
}
,map4db_p_project_participants: function(dto) { 
 return {
id: dto.id, project_id: dto.project_id, employee_id: dto.employee_id, group_id: dto.group_id, is_pm: dto.is_pm, ro: dto.ro, rw: dto.rw, active: dto.active, is_service_contact: dto.is_service_contact, is_finance_contact: dto.is_finance_contact }
}
,map4db_pr_price_list: function(dto) { 
 return {
id: dto.id, date_added: dto.date_added, addedby_id: dto.addedby_id, pricelist_name: dto.pricelist_name, valid_from: dto.valid_from, valid_to: dto.valid_to, pr_comments: dto.pr_comments, is_hidden: dto.is_hidden, is_default: dto.is_default }
}
,map4db_p_project_poc_contract: function(dto) { 
 return {
id: dto.id, date_added: dto.date_added, added_by: dto.added_by, contr_type_id: dto.contr_type_id, project_id: dto.project_id, c_date: dto.c_date, c_start_date: dto.c_start_date, c_end_date: dto.c_end_date, c_actual_work_end: dto.c_actual_work_end, c_startup_date: dto.c_startup_date, c_handover_date: dto.c_handover_date, c_final_protocol_date: dto.c_final_protocol_date, c_number: dto.c_number, c_remarks: dto.c_remarks, c_bus_owner_id: dto.c_bus_owner_id, c_manager_id: dto.c_manager_id, ryczalt: dto.ryczalt, notice_period: dto.notice_period, notice_uom_id: dto.notice_uom_id, payterm_id: dto.payterm_id, pay_term_base_id: dto.pay_term_base_id, c_value: dto.c_value, c_v_currency: dto.c_v_currency, deposit_1proc: dto.deposit_1proc, deposit_2proc: dto.deposit_2proc, deposit_3proc: dto.deposit_3proc, deposit_4proc: dto.deposit_4proc, deposit1_exp_date: dto.deposit1_exp_date, deposit2_exp_date: dto.deposit2_exp_date, deposit3_exp_date: dto.deposit3_exp_date, deposit4_exp_date: dto.deposit4_exp_date, uuid: dto.uuid }
}
,map4db_p_project_status: function(dto) { 
 return {
id: dto.id, status_name: dto.status_name, is_open: dto.is_open, is_visible: dto.is_visible }
}
,map4db_p_project_type: function(dto) { 
 return {
id: dto.id, type_name: dto.type_name, is_poc: dto.is_poc, is_fm: dto.is_fm, is_service: dto.is_service, is_active: dto.is_active }
}
,map4db_payment_terms: function(dto) { 
 return {
id: dto.id, days_count: dto.days_count, name: dto.name, long_description: dto.long_description, is_enabled: dto.is_enabled }
}
,map4db_p_projects: function(dto) { 
 return {
id: dto.id, date_added: dto.date_added, added_by: dto.added_by, project_type_id: dto.project_type_id, client_id: dto.client_id, site_id: dto.site_id, contract_sign_date: dto.contract_sign_date, pr_status_id: dto.pr_status_id, pr_start_date: dto.pr_start_date, pr_end_date: dto.pr_end_date, pr_number: dto.pr_number, pr_manager_id: dto.pr_manager_id, pr_remarks: dto.pr_remarks, pr_value: dto.pr_value, pr_value_currency: dto.pr_value_currency, pr_name: dto.pr_name, billing_freq_id: dto.billing_freq_id, final_protocol_date: dto.final_protocol_date, private: dto.private, public: dto.public, transferred_2_service: dto.transferred_2_service, date_tranf2service: dto.date_tranf2service, tranfered_by: dto.tranfered_by, transf_remarks: dto.transf_remarks, pr_inspector_name: dto.pr_inspector_name, pr_inspector_phone: dto.pr_inspector_phone, pr_inspector_email: dto.pr_inspector_email, pr_salesman_id: dto.pr_salesman_id, pr_other_participants: dto.pr_other_participants, client2_id: dto.client2_id, client1_name: dto.client1_name, client1_telephone: dto.client1_telephone, client1_email: dto.client1_email, client2_person: dto.client2_person, client2_telephone: dto.client2_telephone, client2_email: dto.client2_email, deposit_1proc: dto.deposit_1proc, deposit_2proc: dto.deposit_2proc, deposit_3proc: dto.deposit_3proc, deposit_4proc: dto.deposit_4proc, deposit1_exp_date: dto.deposit1_exp_date, deposit2_exp_date: dto.deposit2_exp_date, deposit3_exp_date: dto.deposit3_exp_date, deposit4_exp_date: dto.deposit4_exp_date, deposit_notify_byemail: dto.deposit_notify_byemail, bank_warr: dto.bank_warr, bank_warr_amount: dto.bank_warr_amount, bank_warr_reminder: dto.bank_warr_reminder, bank_warr_date: dto.bank_warr_date, bank_warr_notify_byemail: dto.bank_warr_notify_byemail, insurance_warr: dto.insurance_warr, insurance_warr_amount: dto.insurance_warr_amount, insurance_warr_reminder: dto.insurance_warr_reminder, bank_warr_comments: dto.bank_warr_comments, insurance_warr_comments: dto.insurance_warr_comments, insurance_warr_date: dto.insurance_warr_date, insurance_warr_notify_byemail: dto.insurance_warr_notify_byemail, use_deposit: dto.use_deposit, use_kaucja: dto.use_kaucja, kaucja_notify_byemail: dto.kaucja_notify_byemail, kaucja_1proc: dto.kaucja_1proc, kaucja_2proc: dto.kaucja_2proc, kaucja_3proc: dto.kaucja_3proc, kaucja_4proc: dto.kaucja_4proc, kaucja1_exp_date: dto.kaucja1_exp_date, kaucja2_exp_date: dto.kaucja2_exp_date, kaucja3_exp_date: dto.kaucja3_exp_date, kaucja4_exp_date: dto.kaucja4_exp_date, bank_warr_uomid: dto.bank_warr_uomid, insurance_warr_uomid: dto.insurance_warr_uomid, deposit_1_uomid: dto.deposit_1_uomid, deposit_2_uomid: dto.deposit_2_uomid, deposit_3_uomid: dto.deposit_3_uomid, deposit_4_uomid: dto.deposit_4_uomid, kaucja_1_uomid: dto.kaucja_1_uomid, kaucja_2_uomid: dto.kaucja_2_uomid, kaucja_3_uomid: dto.kaucja_3_uomid, kaucja_4_uomid: dto.kaucja_4_uomid, deposit_comments: dto.deposit_comments, kaucja_comments: dto.kaucja_comments }
}
,map4db_pr_conditions_def: function(dto) { 
 return {
id: dto.id, short: dto.short, c_name: dto.c_name, c_descriptions: dto.c_descriptions, is_pricelist_discount: dto.is_pricelist_discount, is_group_discount: dto.is_group_discount, is_special_price: dto.is_special_price, is_manual_price: dto.is_manual_price, is_manual_discount: dto.is_manual_discount, is_price_list: dto.is_price_list, is_mat_markup: dto.is_mat_markup, erp_condition_id: dto.erp_condition_id }
}
,map4db_pr_pricelist_details: function(dto) { 
 return {
id: dto.id, price_list_id: dto.price_list_id, mat_index: dto.mat_index, price: dto.price, currency: dto.currency, inherit_currency: dto.inherit_currency, material_id: dto.material_id, cond_type_id: dto.cond_type_id, price_unit: dto.price_unit, uom: dto.uom, valid_from: dto.valid_from, valid_to: dto.valid_to, uom_id: dto.uom_id }
}
,map4db_pr_purchase_info: function(dto) { 
 return {
id: dto.id, erp_condition_id: dto.erp_condition_id, condition_type_id: dto.condition_type_id, material_id: dto.material_id, supplier_id: dto.supplier_id, purchasing_org: dto.purchasing_org, plant: dto.plant, valid_from: dto.valid_from, valid_to: dto.valid_to, price: dto.price, currency: dto.currency, prunit: dto.prunit, prunit_uom_id: dto.prunit_uom_id }
}
,map4db_q_checklist_templ_head: function(dto) { 
 return {
id: dto.id, uuid: dto.uuid, added_by: dto.added_by, type_id: dto.type_id, segment_id: dto.segment_id, tname: dto.tname }
}
,map4db_q_checklist_templ_item_type: function(dto) { 
 return {
id: dto.id, item_type: dto.item_type, is_yn: dto.is_yn, is_score: dto.is_score, scale_min: dto.scale_min, scale_max: dto.scale_max, has_text_reponse: dto.has_text_reponse }
}
,map4db_q_checklist_templ_items: function(dto) { 
 return {
id: dto.id, uuid: dto.uuid, parent_id: dto.parent_id, item_type_id: dto.item_type_id, item_text: dto.item_text, is_yn: dto.is_yn, is_score: dto.is_score, scale_min: dto.scale_min, scale_max: dto.scale_max }
}
,map4db_rozl_klasy_czasu: function(dto) { 
 return {
id: dto.id, nazwa: dto.nazwa, wrktime_from_hrs: dto.wrktime_from_hrs, wrktime_to_hrs: dto.wrktime_to_hrs, remarks: dto.remarks }
}
,map4db_rozl_klasy_wynagrodzen: function(dto) { 
 return {
id: dto.id, nazwa_klasy: dto.nazwa_klasy, weekend_bonus: dto.weekend_bonus, nigh_work_bonus: dto.nigh_work_bonus, inst_comission_bonus: dto.inst_comission_bonus, remarks: dto.remarks }
}
,map4db_rozl_stawki_protokoly: function(dto) { 
 return {
id: dto.id, class_id: dto.class_id, protocol_bonus: dto.protocol_bonus, remarks: dto.remarks, time_class_id: dto.time_class_id }
}
,map4db_rws_acceptance: function(dto) { 
 return {
id: dto.id, uuid: dto.uuid, added_by: dto.added_by, dateadded: dto.dateadded, parent_id: dto.parent_id, acceptor_id: dto.acceptor_id, accepted: dto.accepted, acceptor_decision_date: dto.acceptor_decision_date, remarks: dto.remarks, step: dto.step }
}
,map4db_rws_comments: function(dto) { 
 return {
id: dto.id, uuid: dto.uuid, parent_id: dto.parent_id, added_by: dto.added_by, date_added: dto.date_added, memo: dto.memo, mark_deleted: dto.mark_deleted, typ: dto.typ }
}
,map4db_rws_cost_split: function(dto) { 
 return {
id: dto.id, uuid: dto.uuid, added_by: dto.added_by, parent_id: dto.parent_id, lp: dto.lp, wnetto: dto.wnetto, sap_wbs_id: dto.sap_wbs_id, gl_account_id: dto.gl_account_id, cost_cat_id: dto.cost_cat_id }
}
,map4db_rws_fxrates: function(dto) { 
 return {
id: dto.id, added_by: dto.added_by, dateadded: dto.dateadded, parent_id: dto.parent_id, currency: dto.currency, rate2pln: dto.rate2pln }
}
,map4db_rws_service_calls_split: function(dto) { 
 return {
id: dto.id, uuid: dto.uuid, added_by: dto.added_by, parent_id: dto.parent_id, call_id: dto.call_id, lp: dto.lp, wnetto: dto.wnetto, mpk_id: dto.mpk_id, category_id: dto.category_id }
}
,map4db_rws_line_2_attachments: function(dto) { 
 return {
id: dto.id, parent_id: dto.parent_id, file_id: dto.file_id, mark_deleted: dto.mark_deleted }
}
,map4db_rws_lines: function(dto) { 
 return {
id: dto.id, uuid: dto.uuid, added_by: dto.added_by, parent_id: dto.parent_id, item_lp: dto.item_lp, item_date: dto.item_date, supplier_docno: dto.supplier_docno, description: dto.description, amount: dto.amount, amount_curr: dto.amount_curr, category_id: dto.category_id, paymethod_id: dto.paymethod_id, is_allowance: dto.is_allowance, alt_fx_rate: dto.alt_fx_rate, use_split: dto.use_split, call_id: dto.call_id, vat_rate: dto.vat_rate, sap_wbs_id: dto.sap_wbs_id, use_call_split: dto.use_call_split }
}
,map4db_rws_paym_methods: function(dto) { 
 return {
id: dto.id, sort_id: dto.sort_id, name: dto.name, active: dto.active, is_default: dto.is_default, is_private: dto.is_private, is_company: dto.is_company }
}
,map4db_rws_rozliczenia: function(dto) { 
 return {
id: dto.id, uuid: dto.uuid, date_registered: dto.date_registered, last_updated: dto.last_updated, last_updated_by: dto.last_updated_by, added_by: dto.added_by, employee_id: dto.employee_id, status_id: dto.status_id, remarks: dto.remarks, title: dto.title, is_booked: dto.is_booked, book_date: dto.book_date, book_ref: dto.book_ref, accountant_id: dto.accountant_id, legal_ent_id: dto.legal_ent_id }
}
,map4db_rws_status: function(dto) { 
 return {
id: dto.id, sort_id: dto.sort_id, status_name: dto.status_name, enabled: dto.enabled, domyslny: dto.domyslny, is_open: dto.is_open }
}
,map4db_s_asset_2_project: function(dto) { 
 return {
id: dto.id, asset_id: dto.asset_id, project_id: dto.project_id }
}
,map4db_s_asset_vendors: function(dto) { 
 return {
id: dto.id, erp_id: dto.erp_id, vendorname: dto.vendorname, address1: dto.address1, address2: dto.address2, address3: dto.address3, remarks: dto.remarks }
}
,map4db_s_asset_2_contract: function(dto) { 
 return {
id: dto.id, asset_id: dto.asset_id, contract_id: dto.contract_id, date_added: dto.date_added, added_by: dto.added_by, billing_freq_id: dto.billing_freq_id, first_billing: dto.first_billing, asset_revenue: dto.asset_revenue, currency: dto.currency, costs: dto.costs, cost_currency: dto.cost_currency, labour_hours: dto.labour_hours }
}
,map4db_s_assets_device_groups: function(dto) { 
 return {
id: dto.id, group_name: dto.group_name, description: dto.description, is_active: dto.is_active }
}
,map4db_s_assets_device_maintenance_lists: function(dto) { 
 return {
id: dto.id, created_by_id: dto.created_by_id, date_created: dto.date_created, machine_id: dto.machine_id, interval_id: dto.interval_id, item_no: dto.item_no, activity_text: dto.activity_text, mandatory: dto.mandatory, comment_reqired: dto.comment_reqired }
}
,map4db_s_assets_device_maintenance_schedule: function(dto) { 
 return {
id: dto.id, created_by_id: dto.created_by_id, date_created: dto.date_created, machine_id: dto.machine_id, interval_id: dto.interval_id, is_active: dto.is_active, task_name: dto.task_name }
}
,map4db_s_assets_device_maintenance_tasks: function(dto) { 
 return {
id: dto.id, created_by_id: dto.created_by_id, date_created: dto.date_created, schedule_id: dto.schedule_id, mandatory: dto.mandatory, comment_required: dto.comment_required, item_no: dto.item_no, activity_text: dto.activity_text }
}
,map4db_s_assets_devices: function(dto) { 
 return {
id: dto.id, created_by_id: dto.created_by_id, date_created: dto.date_created, site_id: dto.site_id, asset_id: dto.asset_id, dev_group_id: dto.dev_group_id, device_name: dto.device_name, device_identification: dto.device_identification, device_number: dto.device_number, serial_no: dto.serial_no, device_type: dto.device_type, device_technical_props: dto.device_technical_props, device_comments: dto.device_comments, vendor_id: dto.vendor_id, manufacturer_id: dto.manufacturer_id, date_purchased: dto.date_purchased, date_installed: dto.date_installed, installed_by: dto.installed_by, installed_by_id: dto.installed_by_id, statutory_warranty: dto.statutory_warranty, vendor_warranty: dto.vendor_warranty, manufacturer_warranty: dto.manufacturer_warranty, warranty_start_date: dto.warranty_start_date, warranty_expiry_date: dto.warranty_expiry_date, maintenance_comments: dto.maintenance_comments, site_comments: dto.site_comments, tech_data_details: dto.tech_data_details, tech_data_details_type_id: dto.tech_data_details_type_id, parent_id: dto.parent_id, cc_id: dto.cc_id, withdrawn_from_service: dto.withdrawn_from_service, date_withdrawn: dto.date_withdrawn, replacement_id: dto.replacement_id, maintenance_interval_id: dto.maintenance_interval_id, location_name: dto.location_name, date_commisioned: dto.date_commisioned, uuid: dto.uuid, qty_installed: dto.qty_installed, uom_id: dto.uom_id }
}
,map4db_s_assets_service_main: function(dto) { 
 return {
id: dto.id, created_by_id: dto.created_by_id, date_created: dto.date_created, site_id: dto.site_id, instal_type_id: dto.instal_type_id, name_instal: dto.name_instal, project_start_date: dto.project_start_date, warranty_start_date: dto.warranty_start_date, warranty_end_date: dto.warranty_end_date, main_project_closed_date: dto.main_project_closed_date, project_manager_id: dto.project_manager_id, salesman_id: dto.salesman_id, customer_free_text: dto.customer_free_text, other_project_remarks: dto.other_project_remarks, ehs_requirement: dto.ehs_requirement, otherremarks: dto.otherremarks, fixed_travel_rate: dto.fixed_travel_rate, travel_rate: dto.travel_rate, project_id: dto.project_id, vendor_id: dto.vendor_id, manufacturer: dto.manufacturer, dostawca_id: dto.dostawca_id, uuid: dto.uuid, location_name: dto.location_name, wip_in_project: dto.wip_in_project, extended_props: dto.extended_props, dostawca2_id: dto.dostawca2_id }
}
,map4db_s_assets_site: function(dto) { 
 return {
id: dto.id, date_added: dto.date_added, added_by: dto.added_by, sitename: dto.sitename, address1: dto.address1, zip_code: dto.zip_code, city: dto.city, site_comments: dto.site_comments, aktywny: dto.aktywny, lattitude: dto.lattitude, longitude: dto.longitude, projektant_id: dto.projektant_id, vertical_mkt_id: dto.vertical_mkt_id, erp_code: dto.erp_code, salesman_id: dto.salesman_id, parent_id: dto.parent_id, project_manager_id: dto.project_manager_id, uuid: dto.uuid, teamleader_id: dto.teamleader_id, s_group_id: dto.s_group_id, default_client_id: dto.default_client_id, client_code: dto.client_code, site_email: dto.site_email, default_bu_id: dto.default_bu_id, reaction_time_hrs: dto.reaction_time_hrs, accept_fm_calls: dto.accept_fm_calls, fm_allow_generic_users: dto.fm_allow_generic_users }
}
,map4db_s_assets_types: function(dto) { 
 return {
id: dto.id, name: dto.name, acitve: dto.acitve }
}
,map4db_s_assets_warranty_types: function(dto) { 
 return {
id: dto.id, warranty_type_name: dto.warranty_type_name, is_statutory: dto.is_statutory, is_vendor: dto.is_vendor, is_client: dto.is_client, is_manufacturer: dto.is_manufacturer, enabled: dto.enabled }
}
,map4db_s_device_2_contract: function(dto) { 
 return {
id: dto.id, machine_id: dto.machine_id, contract_id: dto.contract_id, date_added: dto.date_added, added_by: dto.added_by }
}
,map4db_s_assets_warranties: function(dto) { 
 return {
id: dto.id, created_by_id: dto.created_by_id, date_created: dto.date_created, site_id: dto.site_id, asset_id: dto.asset_id, machine_id: dto.machine_id, war_type_id: dto.war_type_id, client_id: dto.client_id, client_statutory_warranty: dto.client_statutory_warranty, warranty_name: dto.warranty_name, warranty_description: dto.warranty_description, warranty_start_date: dto.warranty_start_date, warranty_expiry_date: dto.warranty_expiry_date, statutory_warr_expiry_date: dto.statutory_warr_expiry_date, date_sold: dto.date_sold, date_installed: dto.date_installed, installed_by_id: dto.installed_by_id, installed_by: dto.installed_by, client_maintenance_orders_required: dto.client_maintenance_orders_required, vendor_id: dto.vendor_id, vendor_warranty: dto.vendor_warranty, vendor_statutory_warranty: dto.vendor_statutory_warranty, vendor_warranty_start_date: dto.vendor_warranty_start_date, vendor_warranty_expiry_date: dto.vendor_warranty_expiry_date, vendor_statutory_warr_expiry_date: dto.vendor_statutory_warr_expiry_date, date_purchased: dto.date_purchased, manufacturer_id: dto.manufacturer_id, manufacturer_warranty: dto.manufacturer_warranty, manfct_warranty_start_date: dto.manfct_warranty_start_date, manfct_warranty_expiry_date: dto.manfct_warranty_expiry_date, vendor_stat_warranty_limitations: dto.vendor_stat_warranty_limitations, client_stat_warranty_limitations: dto.client_stat_warranty_limitations, client_warranty: dto.client_warranty, project_id: dto.project_id }
}
,map4db_s_site_erp: function(dto) { 
 return {
id: dto.id, erp_code: dto.erp_code, site_type: dto.site_type, hierarchical_site: dto.hierarchical_site, site_name: dto.site_name, use4_fm: dto.use4_fm, use4_counters: dto.use4_counters }
}
,map4db_s_site_erp_sap_cc_assign: function(dto) { 
 return {
id: dto.id, site_id: dto.site_id, company_code_id: dto.company_code_id, blocked_company_code: dto.blocked_company_code }
}
,map4db_s_site_erp_sap_sales_assign: function(dto) { 
 return {
id: dto.id, site_id: dto.site_id, sales_organisation_id: dto.sales_organisation_id, blocked_for_ordering: dto.blocked_for_ordering }
}
,map4db_sap_building: function(dto) { 
 return {
id: dto.id, code: dto.code, nazwa: dto.nazwa }
}
,map4db_sap_cost_centers: function(dto) { 
 return {
id: dto.id, ccerp_id: dto.ccerp_id, cc_name: dto.cc_name, active: dto.active }
}
,map4db_sap_integration_log: function(dto) { 
 return {
id: dto.id, date_added: dto.date_added, added_by: dto.added_by, business_partner_id: dto.business_partner_id, call_id: dto.call_id, wf_call_id: dto.wf_call_id, wbs_id: dto.wbs_id, endpoint: dto.endpoint, level: dto.level, subject: dto.subject, payload: dto.payload }
}
,map4db_sap_order_2_bill: function(dto) { 
 return {
id: dto.id, salesdocument: dto.salesdocument, salesdocumentitem: dto.salesdocumentitem, billingdocument: dto.billingdocument, billingdocumentitem: dto.billingdocumentitem, netamount: dto.netamount, transactioncurrency: dto.transactioncurrency, overallsdprocessstatus: dto.overallsdprocessstatus, overallbillingstatus: dto.overallbillingstatus }
}
,map4db_sap_projects_wbs: function(dto) { 
 return {
id: dto.id, project_id: dto.project_id, customer: dto.customer, profit_center: dto.profit_center, project_name: dto.project_name, added_by: dto.added_by, date_modified: dto.date_modified, org_id: dto.org_id, project_stage: dto.project_stage, stage_description: dto.stage_description }
}
,map4db_se_employee_groups: function(dto) { 
 return {
id: dto.id, group_name: dto.group_name, is_active: dto.is_active, special_system_group: dto.special_system_group, access_group: dto.access_group, enable_in_calendar: dto.enable_in_calendar, sort_id: dto.sort_id }
}
,map4db_sap_projects_work_package: function(dto) { 
 return {
id: dto.id, work_package_id: dto.work_package_id, work_package_name: dto.work_package_name, sap_project_id: dto.sap_project_id, is_wbs: dto.is_wbs, is_cc: dto.is_cc, added_by: dto.added_by, date_modified: dto.date_modified }
}
,map4db_se_employee_qualifications: function(dto) { 
 return {
id: dto.id, employee_id: dto.employee_id, title: dto.title, short_name: dto.short_name, issuer: dto.issuer, issue_date: dto.issue_date, expiry_date: dto.expiry_date, print_on_protocol: dto.print_on_protocol, formal_number: dto.formal_number, neverexpires: dto.neverexpires }
}
,map4db_se_employee_segments: function(dto) { 
 return {
id: dto.id, employee_id: dto.employee_id, segment_id: dto.segment_id }
}
,map4db_se_employees_2_groups: function(dto) { 
 return {
id: dto.id, employee_id: dto.employee_id, group_id: dto.group_id }
}
,map4db_se_ppm: function(dto) { 
 return {
id: dto.id, date_added: dto.date_added, contract_id: dto.contract_id, plan_id: dto.plan_id, asset_id: dto.asset_id, machine_id: dto.machine_id, timing_id: dto.timing_id, remarks: dto.remarks }
}
,map4db_se_ppm_events: function(dto) { 
 return {
id: dto.id, uuid: dto.uuid, date_added: dto.date_added, added_by: dto.added_by, contract_id: dto.contract_id, site_id: dto.site_id, asset_id: dto.asset_id, machine_id: dto.machine_id, category_id: dto.category_id, t_start: dto.t_start, t_end: dto.t_end }
}
,map4db_se_employees: function(dto) { 
 return {
id: dto.id, department_id: dto.department_id, manager_id: dto.manager_id, is_active: dto.is_active, app_enabled: dto.app_enabled, fname: dto.fname, lname: dto.lname, phone: dto.phone, email: dto.email, fax: dto.fax, stanowisko: dto.stanowisko, region: dto.region, miejsce: dto.miejsce, contra_rate: dto.contra_rate, contra_rate_currency: dto.contra_rate_currency, quotation_limit: dto.quotation_limit, is_internal: dto.is_internal, cost_center_id: dto.cost_center_id, is_manager: dto.is_manager, date_added: dto.date_added, date_modified: dto.date_modified, color: dto.color, erp_id: dto.erp_id, loccode: dto.loccode, employee_bonus_class: dto.employee_bonus_class, enable_in_calendar: dto.enable_in_calendar, calendar_group_id: dto.calendar_group_id, is_external: dto.is_external, proxy_id: dto.proxy_id, proxy_deadline: dto.proxy_deadline, vendor_id: dto.vendor_id, use4_product_stat: dto.use4_product_stat, mpk: dto.mpk, selected: dto.selected, bu_id: dto.bu_id, le_id: dto.le_id, cost_level: dto.cost_level, erp_status: dto.erp_status, contract_start: dto.contract_start, contract_end: dto.contract_end, def_tl_id: dto.def_tl_id, def_opiekun_id: dto.def_opiekun_id, last_import_dt: dto.last_import_dt, manual_block: dto.manual_block, is_proxy_user: dto.is_proxy_user, require_timesheets: dto.require_timesheets }
}
,map4db_se_protocol_templates: function(dto) { 
 return {
id: dto.id, company_id: dto.company_id, type_id: dto.type_id, filename: dto.filename, email_subject: dto.email_subject, html_footer_filename: dto.html_footer_filename }
}
,map4db_se_protocol_template_2_calltype: function(dto) { 
 return {
id: dto.id, call_type_id: dto.call_type_id, template_id: dto.template_id }
}
,map4db_se_service_call_billing_comments: function(dto) { 
 return {
id: dto.id, date_added: dto.date_added, addedby: dto.addedby, call_id: dto.call_id, invoice_remarks: dto.invoice_remarks }
}
,map4db_se_service_call_conditions: function(dto) { 
 return {
id: dto.id, date_added: dto.date_added, added_by: dto.added_by, title: dto.title, cond_name: dto.cond_name, call_id: dto.call_id, contract_id: dto.contract_id, project_id: dto.project_id, asset_id: dto.asset_id, oferta_id: dto.oferta_id, device_id: dto.device_id, is_user_added: dto.is_user_added, link_2_call: dto.link_2_call, valid_from: dto.valid_from, valid_to: dto.valid_to, indefinite_contract: dto.indefinite_contract, contr_value: dto.contr_value, contr_currency: dto.contr_currency, billing_freq_id: dto.billing_freq_id, is_lump_sum_billing: dto.is_lump_sum_billing, reaction_time_2_acknldg: dto.reaction_time_2_acknldg, reaction_time_2_fix: dto.reaction_time_2_fix, day_hrs_from: dto.day_hrs_from, day_hrs_to: dto.day_hrs_to, day_labour_rate: dto.day_labour_rate, night_time_from: dto.night_time_from, night_time_to: dto.night_time_to, night_labour_rate: dto.night_labour_rate, free_hours: dto.free_hours, has_travel_acc2_quote: dto.has_travel_acc2_quote, has_travel_lumpsum: dto.has_travel_lumpsum, has_travel_rate: dto.has_travel_rate, travel_lumpsum_amount: dto.travel_lumpsum_amount, travel_rate_amount: dto.travel_rate_amount, type: dto.type, object_id: dto.object_id, object: dto.object }
}
,map4db_se_service_call_notes_internal: function(dto) { 
 return {
id: dto.id, call_id: dto.call_id, added_by: dto.added_by, date_added: dto.date_added, is_hq: dto.is_hq, memo: dto.memo, mark_deleted: dto.mark_deleted, uuid: dto.uuid }
}
,map4db_se_service_call_status: function(dto) { 
 return {
id: dto.id, sort_id: dto.sort_id, status_name: dto.status_name, enabled: dto.enabled, domyslny: dto.domyslny, is_open: dto.is_open, is_billed: dto.is_billed, is_rozlicz: dto.is_rozlicz }
}
,map4db_se_service_call_tasks: function(dto) { 
 return {
id: dto.id, call_id: dto.call_id, added_by: dto.added_by, date_added: dto.date_added, task_title: dto.task_title, task_memo: dto.task_memo, deadline: dto.deadline, closed: dto.closed, mark_deleted: dto.mark_deleted }
}
,map4db_se_service_call_tech_receipts: function(dto) { 
 return {
id: dto.id, date_added: dto.date_added, added_by: dto.added_by, technician_id: dto.technician_id, call_id: dto.call_id, accept: dto.accept, reject: dto.reject, remarks: dto.remarks }
}
,map4db_se_service_calls_2_attachments: function(dto) { 
 return {
id: dto.id, call_id: dto.call_id, file_id: dto.file_id, mark_deleted: dto.mark_deleted, mark4ekp: dto.mark4ekp, mark4erp: dto.mark4erp }
}
,map4db_se_service_calls_2_machines: function(dto) { 
 return {
id: dto.id, call_id: dto.call_id, device_id: dto.device_id, client_request_text: dto.client_request_text, attach2call: dto.attach2call }
}
,map4db_se_service_calls_2_new_assets: function(dto) { 
 return {
id: dto.id, call_id: dto.call_id, asset_id: dto.asset_id, attach2call: dto.attach2call }
}
,map4db_se_service_calls_events: function(dto) { 
 return {
id: dto.id, date_registered: dto.date_registered, added_by: dto.added_by, call_id: dto.call_id, evlevel: dto.evlevel, msg: dto.msg, origin: dto.origin }
}
,map4db_se_service_calls_protoc_corrections: function(dto) { 
 return {
id: dto.id, date_registered: dto.date_registered, added_by: dto.added_by, call_id: dto.call_id, property: dto.property, memo: dto.memo, block_edit: dto.block_edit }
}
,map4db_se_service_calls: function(dto) { 
 return {
id: dto.id, date_registered: dto.date_registered, added_by: dto.added_by, call_type_id: dto.call_type_id, team_leader_id: dto.team_leader_id, site_id: dto.site_id, asset_id: dto.asset_id, equipment_id: dto.equipment_id, equipment_name: dto.equipment_name, equipment_sn: dto.equipment_sn, erp_reference: dto.erp_reference, oferta_id: dto.oferta_id, lob_id: dto.lob_id, status_id: dto.status_id, date_expected_by_customer: dto.date_expected_by_customer, deadline_internal: dto.deadline_internal, client_order_no: dto.client_order_no, client_id: dto.client_id, client_name: dto.client_name, client_adress: dto.client_adress, client_city: dto.client_city, client_caller_name: dto.client_caller_name, client_caller_telephone: dto.client_caller_telephone, client_email: dto.client_email, client_notifyvia_email: dto.client_notifyvia_email, client_notifyvia_sms: dto.client_notifyvia_sms, client_is_billto: dto.client_is_billto, billto_id: dto.billto_id, client_issue_description: dto.client_issue_description, internal_memo: dto.internal_memo, lcc_id: dto.lcc_id, notify_techn_v_email: dto.notify_techn_v_email, notify_techn_v_sms: dto.notify_techn_v_sms, vendorclaimreqired: dto.vendorclaimreqired, revenue_expected: dto.revenue_expected, cost_expected: dto.cost_expected, date_invoicing_request: dto.date_invoicing_request, invoice_instructions: dto.invoice_instructions, invoice_sent_quotation_with_invoice: dto.invoice_sent_quotation_with_invoice, rez_gwar_typ: dto.rez_gwar_typ, rez_gwa_wartosc: dto.rez_gwa_wartosc, rez_gwa_powod: dto.rez_gwa_powod, invice_no: dto.invice_no, invoice_date: dto.invoice_date, cost_center_id: dto.cost_center_id, condit_lbr_per_hour: dto.condit_lbr_per_hour, date_client_submission: dto.date_client_submission, client_priority: dto.client_priority, client_type: dto.client_type, portal_origin: dto.portal_origin, seller_id: dto.seller_id, client_call_recepit_email: dto.client_call_recepit_email, technician_origin: dto.technician_origin, uuid: dto.uuid, imap_origin: dto.imap_origin, client_caller_id: dto.client_caller_id, use_html: dto.use_html, client_visit_plan_email: dto.client_visit_plan_email, our_priority: dto.our_priority, coordinator_memo: dto.coordinator_memo, last_updated: dto.last_updated, last_updated_by: dto.last_updated_by, fmid: dto.fmid, kind: dto.kind, block_protocoltime_display: dto.block_protocoltime_display, opiekun_id: dto.opiekun_id, bu_id: dto.bu_id, system_type_id: dto.system_type_id, dev_type_id: dto.dev_type_id, sap_wbs_id: dto.sap_wbs_id, sap_project_id: dto.sap_project_id, sap_order_no: dto.sap_order_no, le_id: dto.le_id, block4erp: dto.block4erp, transfr_pending: dto.transfr_pending, transf_time: dto.transf_time, fault_type_id: dto.fault_type_id, maintnce_intrv_id: dto.maintnce_intrv_id }
}
,map4db_se_service_calls_status_log: function(dto) { 
 return {
id: dto.id, date_registered: dto.date_registered, added_by: dto.added_by, call_id: dto.call_id, prev_status: dto.prev_status, new_status: dto.new_status }
}
,map4db_se_service_calls_types: function(dto) { 
 return {
id: dto.id, context: dto.context, nazwa: dto.nazwa, enabled: dto.enabled, is_warranty: dto.is_warranty, is_maintenance: dto.is_maintenance, kod: dto.kod, is_default: dto.is_default, disable_protmsg: dto.disable_protmsg, sort_key: dto.sort_key, call_prefix: dto.call_prefix, hcolor: dto.hcolor, dark_font: dto.dark_font }
}
,map4db_se_service_report_acceptance_2_level: function(dto) { 
 return {
id: dto.id, report_id: dto.report_id, date_added: dto.date_added, date_decision: dto.date_decision, decision: dto.decision, decision_name: dto.decision_name, decision_maker_id: dto.decision_maker_id, remarks: dto.remarks }
}
,map4db_se_service_calls_zones: function(dto) { 
 return {
id: dto.id, call_id: dto.call_id, asset_id: dto.asset_id, name: dto.name, client_request_text: dto.client_request_text, remarks: dto.remarks, attach2call: dto.attach2call }
}
,map4db_se_service_contr_biill_periods: function(dto) { 
 return {
id: dto.id, nazwa: dto.nazwa, period_months: dto.period_months, is_active: dto.is_active, nazwa_n: dto.nazwa_n }
}
,map4db_se_service_contract_2_attachments: function(dto) { 
 return {
id: dto.id, contract_id: dto.contract_id, file_id: dto.file_id, mark_deleted: dto.mark_deleted }
}
,map4db_se_service_maintenance_plan: function(dto) { 
 return {
id: dto.id, contract_id: dto.contract_id, project_id: dto.project_id, from_date: dto.from_date, to_date: dto.to_date }
}
,map4db_se_service_contracts: function(dto) { 
 return {
id: dto.id, date_added: dto.date_added, added_by: dto.added_by, contract_type_id: dto.contract_type_id, client_id: dto.client_id, valid_from: dto.valid_from, valid_to: dto.valid_to, indefinite_contract: dto.indefinite_contract, contract_memo: dto.contract_memo, contract_no: dto.contract_no, contr_value: dto.contr_value, contr_currency: dto.contr_currency, billing_freq_id: dto.billing_freq_id, is_lump_sum_billing: dto.is_lump_sum_billing, reaction_time_2_acknldg: dto.reaction_time_2_acknldg, reaction_time_2_fix: dto.reaction_time_2_fix, day_hrs_from: dto.day_hrs_from, day_hrs_to: dto.day_hrs_to, day_labour_rate: dto.day_labour_rate, night_labour_rate: dto.night_labour_rate, free_hours: dto.free_hours, has_travel_acc2_quote: dto.has_travel_acc2_quote, has_travel_lumpsum: dto.has_travel_lumpsum, has_travel_rate: dto.has_travel_rate, travel_lumpsum_amount: dto.travel_lumpsum_amount, travel_rate_amount: dto.travel_rate_amount, weekend_rate: dto.weekend_rate, discount: dto.discount, has_discount: dto.has_discount, travel_cond_remarks: dto.travel_cond_remarks }
}
,map4db_se_service_report_acceptance_signatures: function(dto) { 
 return {
id: dto.id, report_id: dto.report_id, date_signed: dto.date_signed, sign_type: dto.sign_type, custacceptname: dto.custacceptname, custacceptteleph: dto.custacceptteleph, custacceptemail: dto.custacceptemail, signature: dto.signature }
}
,map4db_se_service_report_activities: function(dto) { 
 return {
id: dto.id, report_id: dto.report_id, urzadzenie: dto.urzadzenie, activity_text: dto.activity_text }
}
,map4db_se_service_report_ehs: function(dto) { 
 return {
id: dto.id, report_id: dto.report_id, date_added: dto.date_added, employee_id: dto.employee_id, ehs_risks_identified: dto.ehs_risks_identified, ehs_remeedies: dto.ehs_remeedies, can_work_be_safe: dto.can_work_be_safe, additional_permit_required: dto.additional_permit_required, client_employee_name: dto.client_employee_name, client_employee_telephone: dto.client_employee_telephone, client_employee_email: dto.client_employee_email }
}
,map4db_se_service_report_machines: function(dto) { 
 return {
id: dto.id, created_by_id: dto.created_by_id, date_created: dto.date_created, report_id: dto.report_id, machine_id: dto.machine_id, alt_device_name: dto.alt_device_name, alt_device_type: dto.alt_device_type, alt_serial_no: dto.alt_serial_no, alt_device_comments: dto.alt_device_comments, alt_location_name: dto.alt_location_name, technician_comment: dto.technician_comment, data_merged: dto.data_merged, checked: dto.checked }
}
,map4db_se_service_report_ehs_signatures: function(dto) { 
 return {
id: dto.id, report_id: dto.report_id, date_signed: dto.date_signed, sign_type: dto.sign_type, signature: dto.signature }
}
,map4db_se_service_report_materials: function(dto) { 
 return {
id: dto.id, report_id: dto.report_id, indeks: dto.indeks, name: dto.name, qty_used: dto.qty_used, serial_number: dto.serial_number, remarks: dto.remarks, uom_id: dto.uom_id, free_item: dto.free_item, cost_price: dto.cost_price, material_id: dto.material_id }
}
,map4db_se_service_report_newassets: function(dto) { 
 return {
id: dto.id, created_by_id: dto.created_by_id, date_created: dto.date_created, report_id: dto.report_id, asset_id: dto.asset_id, technician_comment: dto.technician_comment, checked: dto.checked, uuid: dto.uuid }
}
,map4db_se_service_reports_2_attachments: function(dto) { 
 return {
id: dto.id, report_id: dto.report_id, file_id: dto.file_id, mark_deleted: dto.mark_deleted }
}
,map4db_se_service_reports_acceptance: function(dto) { 
 return {
id: dto.id, report_id: dto.report_id, date_updated: dto.date_updated, employee_id: dto.employee_id, acc_level: dto.acc_level, acceptance: dto.acceptance, date_accepted: dto.date_accepted, user_accepting: dto.user_accepting, remarks: dto.remarks }
}
,map4db_se_service_report_photos: function(dto) { 
 return {
id: dto.id, report_uuid: dto.report_uuid, uuid: dto.uuid, picture_date: dto.picture_date, picture: dto.picture, added_by: dto.added_by, mark_deleted: dto.mark_deleted, description: dto.description }
}
,map4db_se_service_report_technician_signatures: function(dto) { 
 return {
id: dto.id, report_id: dto.report_id, date_signed: dto.date_signed, employee_id: dto.employee_id, employee: dto.employee, signature: dto.signature }
}
,map4db_se_service_report_timing: function(dto) { 
 return {
id: dto.id, report_id: dto.report_id, call_id: dto.call_id, date_added: dto.date_added, added_by: dto.added_by, employee_id: dto.employee_id, uwagi: dto.uwagi, is_planning_row: dto.is_planning_row, distance_km_travel: dto.distance_km_travel, work_start: dto.work_start, work_end: dto.work_end, category_id: dto.category_id, leader_grupy: dto.leader_grupy, contract_id: dto.contract_id, project_id: dto.project_id, travel_time_hrs: dto.travel_time_hrs, uuid: dto.uuid, notify_email: dto.notify_email, cc_id: dto.cc_id, business_partner_resource_id: dto.business_partner_resource_id, trvl_start: dto.trvl_start, trvl_end: dto.trvl_end, retr_start: dto.retr_start, retr_end: dto.retr_end, inactive: dto.inactive, return_km_travel: dto.return_km_travel }
}
,map4db_se_service_report_timing_categories: function(dto) { 
 return {
id: dto.id, text: dto.text, color: dto.color, fontColor: dto.fontColor, user_can_select: dto.user_can_select, is_active: dto.is_active, link2call_or_rep: dto.link2call_or_rep, normalize_time: dto.normalize_time, cc_enable: dto.cc_enable, default_cc_id: dto.default_cc_id, in_call_editable: dto.in_call_editable, in_main_editable: dto.in_main_editable, default4call: dto.default4call, usein_worktime_report: dto.usein_worktime_report, plus_in_reprt: dto.plus_in_reprt, sort_id: dto.sort_id }
}
,map4db_se_service_reports: function(dto) { 
 return {
id: dto.id, date_added: dto.date_added, addedby: dto.addedby, call_id: dto.call_id, ereport: dto.ereport, report_date: dto.report_date, end_state_status: dto.end_state_status, teamleader_final_mark: dto.teamleader_final_mark, work_executed_text: dto.work_executed_text, materials_used_text: dto.materials_used_text, zalecane_prace_dodatkowe: dto.zalecane_prace_dodatkowe, execution_issues: dto.execution_issues, execution_issues_text: dto.execution_issues_text, technical_status_postreport: dto.technical_status_postreport, sendreportbyemail: dto.sendreportbyemail, custrefusal2sign: dto.custrefusal2sign, custrefulasreason: dto.custrefulasreason, custacceptname: dto.custacceptname, custacceptteleph: dto.custacceptteleph, custacceptemail: dto.custacceptemail, service_completed: dto.service_completed, paid_services: dto.paid_services, system_left_operational: dto.system_left_operational, approved_for_operations: dto.approved_for_operations, substitutes_used: dto.substitutes_used, system_operational_remarks: dto.system_operational_remarks, invoice_no: dto.invoice_no, further_services_needed: dto.further_services_needed, waive_warranty: dto.waive_warranty, call_reason_fixed: dto.call_reason_fixed, uuid: dto.uuid, prot_template: dto.prot_template, embedded_protocol: dto.embedded_protocol, client_request_technician_comments: dto.client_request_technician_comments, cust_sign_required: dto.cust_sign_required, signed_bytechn_no_custreqired: dto.signed_bytechn_no_custreqired, quote_required: dto.quote_required }
}
,map4db_se_service_reports_protocols_pdf: function(dto) { 
 return {
id: dto.id, date_generated: dto.date_generated, generated_by: dto.generated_by, remarks: dto.remarks, report_id: dto.report_id, file_id: dto.file_id, mark_deleted: dto.mark_deleted }
}
,map4db_se_service_reports_temp: function(dto) { 
 return {
protocol_templ_key: dto.protocol_templ_key, question: dto.question, subcat: dto.subcat, klucz: dto.klucz }
}
,map4db_se_service_timetable: function(dto) { 
 return {
id: dto.id, date_added: dto.date_added, added_by: dto.added_by, category_id: dto.category_id, project_id: dto.project_id, cc_id: dto.cc_id, uuid: dto.uuid, employee_id: dto.employee_id, ev_start: dto.ev_start, ev_end: dto.ev_end, all_day: dto.all_day, title: dto.title, uwagi: dto.uwagi, t_chnged: dto.t_chnged, t_chnged_date: dto.t_chnged_date, t_chnge_accepted: dto.t_chnge_accepted, t_chnge_accept_autor: dto.t_chnge_accept_autor, t_chnge_accept_date: dto.t_chnge_accept_date }
}
,map4db_se_service_reports_combined_reports: function(dto) { 
 return {
id: dto.id, date_added: dto.date_added, added_by: dto.added_by, client_id: dto.client_id, site_id: dto.site_id, remarks: dto.remarks, period: dto.period, title: dto.title, uuid: dto.uuid }
}
,map4db_se_service_reports_combined_reports_rep_links: function(dto) { 
 return {
id: dto.id, parent_id: dto.parent_id, report_id: dto.report_id }
}
,map4db_se_service_reports_log: function(dto) { 
 return {
id: dto.id, date_added: dto.date_added, severity: dto.severity, typ: dto.typ, employee_id: dto.employee_id, r_latitude: dto.r_latitude, r_longitude: dto.r_longitude, remarks: dto.remarks, uuid: dto.uuid, exception_remarks: dto.exception_remarks, report_uuid: dto.report_uuid }
}
,map4db_se_t_dyn_protoc_disclaimers: function(dto) { 
 return {
id: dto.id, aktywny: dto.aktywny, protocol_templ_key: dto.protocol_templ_key, f_diclaimer_line: dto.f_diclaimer_line, lbltxt_disclaimer: dto.lbltxt_disclaimer }
}
,map4db_se_t_dyn_protoc_headers: function(dto) { 
 return {
id: dto.id, aktywny: dto.aktywny, protocol_templ_key: dto.protocol_templ_key, lbltxt_main_title: dto.lbltxt_main_title, lbltxt_sub_title: dto.lbltxt_sub_title, lbltxt_vendors_line: dto.lbltxt_vendors_line, lbltxt_testin_gear_line: dto.lbltxt_testin_gear_line }
}
,map4db_se_t_protoc_question_group_properties: function(dto) { 
 return {
id: dto.id, group_id: dto.group_id, visible_no: dto.visible_no, prop_name: dto.prop_name, show_checkboxes: dto.show_checkboxes, show_remarks_edit: dto.show_remarks_edit, remarks_label: dto.remarks_label, default_value: dto.default_value }
}
,map4db_se_t_protoc_question_group_tabcolumns: function(dto) { 
 return {
id: dto.id, group_id: dto.group_id, sort_id: dto.sort_id, column_label: dto.column_label, show_label: dto.show_label }
}
,map4db_se_t_protoc_question_groups: function(dto) { 
 return {
id: dto.id, question_id: dto.question_id, group_name: dto.group_name, aktywny: dto.aktywny, sort_id: dto.sort_id, protocol_key: dto.protocol_key, group_name_visible: dto.group_name_visible, section_id: dto.section_id, default_value: dto.default_value }
}
,map4db_se_t_protoc_question_section: function(dto) { 
 return {
id: dto.id, visible_no: dto.visible_no, section_name: dto.section_name, aktywny: dto.aktywny, is_visible: dto.is_visible, protocol_key: dto.protocol_key }
}
,map4db_se_t_protoc_templates: function(dto) { 
 return {
id: dto.id, install_type_id: dto.install_type_id, protocol_templ_key: dto.protocol_templ_key, nazwa_protokolu: dto.nazwa_protokolu, aktywny: dto.aktywny, ngcomp_name: dto.ngcomp_name, sign_edit_in_template: dto.sign_edit_in_template, sort_id: dto.sort_id, customer_signat_required: dto.customer_signat_required, html_templ_filename: dto.html_templ_filename, allow_add_machines: dto.allow_add_machines, internal_document: dto.internal_document, show_line_no: dto.show_line_no, display_name: dto.display_name, rep2cro: dto.rep2cro, allow_checkall: dto.allow_checkall, is_embeded: dto.is_embeded, is_default: dto.is_default, mark_def_completed: dto.mark_def_completed, html_footer_filename: dto.html_footer_filename, block_timing: dto.block_timing, block_materials: dto.block_materials, ui_group: dto.ui_group, is_dyn_chklist: dto.is_dyn_chklist }
}
,map4db_se_t_protoc_template_question_options: function(dto) { 
 return {
id: dto.id, question_id: dto.question_id, question: dto.question, show_checkboxes: dto.show_checkboxes, show_remarks_edit: dto.show_remarks_edit, answer: dto.answer, remarks: dto.remarks, remarks_label: dto.remarks_label, aktywny: dto.aktywny, sort_id: dto.sort_id, group_id: dto.group_id }
}
,map4db_se_t_protoc_template_questionaire: function(dto) { 
 return {
id: dto.id, protocol_templ_key: dto.protocol_templ_key, question: dto.question, answer: dto.answer, remarks: dto.remarks, subcat: dto.subcat, aktywny: dto.aktywny, section: dto.section, sort_id: dto.sort_id, group_id: dto.group_id, show_remarks_edit: dto.show_remarks_edit, show_checkboxes: dto.show_checkboxes, remarks_label: dto.remarks_label, rep_field_name2copy: dto.rep_field_name2copy, machine_field_name2copy: dto.machine_field_name2copy, call_field_name2copy: dto.call_field_name2copy, table_lp: dto.table_lp }
}
,map4db_se_t_protoc_templates_sectab_headers: function(dto) { 
 return {
id: dto.id, protocol_templ_key: dto.protocol_templ_key, section: dto.section, col1: dto.col1, col2: dto.col2, col3: dto.col3, col4: dto.col4, col5: dto.col5 }
}
,map4db_se_timesheets_cats_types: function(dto) { 
 return {
id: dto.id, type_key: dto.type_key, remarks: dto.remarks, force8_16hrs: dto.force8_16hrs, exclus4day: dto.exclus4day, editable: dto.editable }
}
,map4db_se_timesheets: function(dto) { 
 return {
id: dto.id, uuid: dto.uuid, cat_id: dto.cat_id, date_added: dto.date_added, added_by: dto.added_by, employee_id: dto.employee_id, start_time: dto.start_time, end_time: dto.end_time, uwagi: dto.uwagi, in_progress: dto.in_progress, report_id: dto.report_id, call_id: dto.call_id, date_update: dto.date_update, lastupdate_by: dto.lastupdate_by }
}
,map4db_se_timesheet_acceptance: function(dto) { 
 return {
id: dto.id, uuid: dto.uuid, added_by: dto.added_by, dateadded: dto.dateadded, parent_id: dto.parent_id, acceptor_id: dto.acceptor_id, accepted: dto.accepted, acceptor_decision_date: dto.acceptor_decision_date, remarks: dto.remarks, step: dto.step }
}
,map4db_se_timesheets_calendar: function(dto) { 
 return {
id: dto.id, cdate: dto.cdate, is_workday: dto.is_workday, is_pubholiday: dto.is_pubholiday, is_weekend: dto.is_weekend, week_no: dto.week_no, is_ui_editable: dto.is_ui_editable }
}
,map4db_se_timesheets_cats: function(dto) { 
 return {
id: dto.id, cat_name: dto.cat_name, cat_type: dto.cat_type }
}
,map4db_sec_access_objects: function(dto) { 
 return {
id: dto.id, object_name: dto.object_name, super_owner_id: dto.super_owner_id, sys_id: dto.sys_id, licence_type_id: dto.licence_type_id }
}
,map4db_sec_access_perm: function(dto) { 
 return {
id: dto.id, usergroup_id: dto.usergroup_id, accessobject_id: dto.accessobject_id, ro: dto.ro, rw: dto.rw }
}
,map4db_sec_licence_type: function(dto) { 
 return {
id: dto.id, licence_name: dto.licence_name, client_limit: dto.client_limit, short_name: dto.short_name, is_default: dto.is_default, client_lic_limit: dto.client_lic_limit, show_on_reports: dto.show_on_reports }
}
,map4db_site_2_contact: function(dto) { 
 return {
id: dto.id, contact_id: dto.contact_id, site_id: dto.site_id, active: dto.active, role_id: dto.role_id }
}
,map4db_sn_assets_checklist_item_groups: function(dto) { 
 return {
id: dto.id, sort_id: dto.sort_id, section_id: dto.section_id, group_name: dto.group_name, aktywny: dto.aktywny, group_name_visible: dto.group_name_visible, default_value: dto.default_value, checklist_id: dto.checklist_id }
}
,map4db_sn_assets: function(dto) { 
 return {
id: dto.id, uuid: dto.uuid, added_by: dto.added_by, date_added: dto.date_added, asset_type_id: dto.asset_type_id, sub_type_id: dto.sub_type_id, systemdet_type_id: dto.systemdet_type_id, site_id: dto.site_id, vendor_id: dto.vendor_id, producer_id: dto.producer_id, name: dto.name, descritption: dto.descritption, is_dummy: dto.is_dummy, asset_group_id: dto.asset_group_id, sn: dto.sn, locationtxt: dto.locationtxt, location_id: dto.location_id, parent_asset_id: dto.parent_asset_id, ppm_freq_m: dto.ppm_freq_m, tt_react_h: dto.tt_react_h, tt_fix_h: dto.tt_fix_h, subcontr_contact: dto.subcontr_contact, asset_kind_id: dto.asset_kind_id }
}
,map4db_sn_assets_2_checklist: function(dto) { 
 return {
id: dto.id, parent_id: dto.parent_id, checklist_id: dto.checklist_id, aktywny: dto.aktywny, uuid: dto.uuid, interval_id: dto.interval_id, is_default: dto.is_default }
}
,map4db_sn_assets_2_contacts: function(dto) { 
 return {
id: dto.id, uuid: dto.uuid, parent_id: dto.parent_id, contact_id: dto.contact_id, contact_type_id: dto.contact_type_id, remarks: dto.remarks }
}
,map4db_sn_assets_checklist: function(dto) { 
 return {
id: dto.id, uuid: dto.uuid, sort_id: dto.sort_id, type_id: dto.type_id, is_default: dto.is_default, ui_group: dto.ui_group, name: dto.name, display_name: dto.display_name, aktywny: dto.aktywny, ngcomp_name: dto.ngcomp_name, html_templ_filename: dto.html_templ_filename, sign_edit_in_template: dto.sign_edit_in_template, customer_signat_required: dto.customer_signat_required, allow_machines: dto.allow_machines, allow_timing: dto.allow_timing, allow_materials: dto.allow_materials, allow_checkall: dto.allow_checkall, internal_document: dto.internal_document, show_line_no: dto.show_line_no, rep2cro: dto.rep2cro, mark_def_completed: dto.mark_def_completed, html_footer_filename: dto.html_footer_filename, legacy_info: dto.legacy_info, last_mod_date: dto.last_mod_date, last_mod: dto.last_mod }
}
,map4db_sn_assets_2_attachments: function(dto) { 
 return {
id: dto.id, uuid: dto.uuid, parent_id: dto.parent_id, file_id: dto.file_id, mark_deleted: dto.mark_deleted, category_id: dto.category_id }
}
,map4db_sn_assets_2_partners: function(dto) { 
 return {
id: dto.id, uuid: dto.uuid, parent_id: dto.parent_id, bp_id: dto.bp_id, contact_type_id: dto.contact_type_id, remarks: dto.remarks }
}
,map4db_sn_assets_contact_type: function(dto) { 
 return {
id: dto.id, group_id: dto.group_id, name: dto.name, active: dto.active }
}
,map4db_sn_assets_custom_field_types: function(dto) { 
 return {
id: dto.id, type_name: dto.type_name, is_string: dto.is_string, is_text: dto.is_text, is_numeric: dto.is_numeric, is_date: dto.is_date, grupa: dto.grupa }
}
,map4db_sn_assets_extlst: function(dto) { 
 return {
id: dto.id, uuid: dto.uuid, parent_id: dto.parent_id, group_type_id: dto.group_type_id, fld_template_id: dto.fld_template_id, field_value: dto.field_value, check4protoc: dto.check4protoc }
}
,map4db_sn_assets_group: function(dto) { 
 return {
id: dto.id, name: dto.name, active: dto.active, is_installation: dto.is_installation, is_machine: dto.is_machine, import_keywords: dto.import_keywords, asset_kind_id: dto.asset_kind_id }
}
,map4db_sn_assets_group_custom_fields: function(dto) { 
 return {
id: dto.id, parent_id: dto.parent_id, field_name: dto.field_name, f_length: dto.f_length, f_label: dto.f_label, fill_required: dto.fill_required, required_in_protocols: dto.required_in_protocols, sort_id: dto.sort_id, field_type_id: dto.field_type_id, uuid: dto.uuid, grupa: dto.grupa }
}
,map4db_sn_assets_checklist_items_options: function(dto) { 
 return {
id: dto.id, sort_id: dto.sort_id, question_id: dto.question_id, q_type_id: dto.q_type_id, group_id: dto.group_id, question: dto.question, answer: dto.answer, remarks: dto.remarks, remarks_label: dto.remarks_label, aktywny: dto.aktywny }
}
,map4db_sn_assets_checklist_items: function(dto) { 
 return {
id: dto.id, aktywny: dto.aktywny, q_type_id: dto.q_type_id, parent_id: dto.parent_id, group_id: dto.group_id, sort_id: dto.sort_id, question: dto.question, remarks: dto.remarks, custom_q_label: dto.custom_q_label, custom_rem_label: dto.custom_rem_label, custom_lp: dto.custom_lp, last_mod_by: dto.last_mod_by, last_mod: dto.last_mod, uuid: dto.uuid }
}
,map4db_sn_assets_checklist_q_types: function(dto) { 
 return {
id: dto.id, name: dto.name, show_yn: dto.show_yn, show_comm: dto.show_comm }
}
,map4db_sn_assets_installation: function(dto) { 
 return {
id: dto.id, uuid: dto.uuid, parent_id: dto.parent_id, sub_grp_id: dto.sub_grp_id, name_instal: dto.name_instal, subcontractor_id: dto.subcontractor_id, vendor_id: dto.vendor_id, ehs_remarks: dto.ehs_remarks, remarks: dto.remarks }
}
,map4db_sn_assets_kind: function(dto) { 
 return {
id: dto.id, name: dto.name, active: dto.active, is_installation: dto.is_installation, is_machine: dto.is_machine }
}
,map4db_sn_assets_machine: function(dto) { 
 return {
id: dto.id, uuid: dto.uuid, parent_id: dto.parent_id, dev_group_id: dto.dev_group_id, device_name: dto.device_name, device_type: dto.device_type, serial_no: dto.serial_no, producer: dto.producer, subcontractor_id: dto.subcontractor_id, vendor_id: dto.vendor_id, qty_installed: dto.qty_installed, uom_id: dto.uom_id, ehs_remarks: dto.ehs_remarks, remarks: dto.remarks }
}
,map4db_sn_assets_group_import_mapping: function(dto) { 
 return {
id: dto.id, parent_id: dto.parent_id, keyword: dto.keyword }
}
,map4db_sn_assets_group_sub: function(dto) { 
 return {
id: dto.id, group_id: dto.group_id, name: dto.name, active: dto.active }
}
,map4db_sn_assets_project: function(dto) { 
 return {
id: dto.id, parent_id: dto.parent_id, uuid: dto.uuid, pr_name: dto.pr_name, pr_number: dto.pr_number, pr_pm: dto.pr_pm, norma: dto.norma, client_id: dto.client_id, ordered_by_id: dto.ordered_by_id, le_id: dto.le_id, data_odbioru: dto.data_odbioru, remarks_pm: dto.remarks_pm }
}
,map4db_sn_assets_service_standards: function(dto) { 
 return {
id: dto.id, uuid: dto.uuid, last_mod_by: dto.last_mod_by, last_mod_date: dto.last_mod_date, parent_id: dto.parent_id, in_service: dto.in_service, serv_reason: dto.serv_reason, contract_id: dto.contract_id, contract_no: dto.contract_no, contract_date: dto.contract_date, contract_end: dto.contract_end, termination_lnght: dto.termination_lnght, termination_uom_id: dto.termination_uom_id, estima_srv_time_hrs: dto.estima_srv_time_hrs, ppm_freq_id: dto.ppm_freq_id, has_sla: dto.has_sla, tt_react_h: dto.tt_react_h, tt_startfx_h: dto.tt_startfx_h, tt_compl_h: dto.tt_compl_h, remarks: dto.remarks, ppm_remarks: dto.ppm_remarks, billing_condit: dto.billing_condit, ppm_yearly_price: dto.ppm_yearly_price, ppm_biyearly_price: dto.ppm_biyearly_price, ppm_quaterly_price: dto.ppm_quaterly_price, ppm_monthly_price: dto.ppm_monthly_price, hrly_rate_week_8_16: dto.hrly_rate_week_8_16, hrly_rate_week_16_18: dto.hrly_rate_week_16_18, hrly_rate_wkend_8_16: dto.hrly_rate_wkend_8_16, hrly_rate_wkend_16_8: dto.hrly_rate_wkend_16_8, trvl_rycz: dto.trvl_rycz, trvl_perkm: dto.trvl_perkm, billing_remarks: dto.billing_remarks }
}
,map4db_sn_assets_subcontractors: function(dto) { 
 return {
id: dto.id, uuid: dto.uuid, parent_id: dto.parent_id, modified_by_id: dto.modified_by_id, date_modified: dto.date_modified, type_id: dto.type_id, business_partn_id: dto.business_partn_id, remarks: dto.remarks }
}
,map4db_sn_assets_warranties: function(dto) { 
 return {
id: dto.id, uuid: dto.uuid, parent_id: dto.parent_id, modified_by_id: dto.modified_by_id, date_modified: dto.date_modified, assetn_id: dto.assetn_id, type_id: dto.type_id, business_partn_id: dto.business_partn_id, warr_name: dto.warr_name, warr_description: dto.warr_description, warr_limitations: dto.warr_limitations, warr_start_date: dto.warr_start_date, warr_end_date: dto.warr_end_date, date_sold: dto.date_sold, date_purchased: dto.date_purchased, date_installed: dto.date_installed, tt_react_h: dto.tt_react_h, tt_startfx_h: dto.tt_startfx_h, tt_compl_h: dto.tt_compl_h }
}
,map4db_sn_assets_warranty_types: function(dto) { 
 return {
id: dto.id, uuid: dto.uuid, warr_name: dto.warr_name, enabled: dto.enabled, sales_side: dto.sales_side, purchase_side: dto.purchase_side, is_statutory: dto.is_statutory, is_contractual: dto.is_contractual }
}
,map4db_st_activity_line_type: function(dto) { 
 return {
id: dto.id, name: dto.name, is_active: dto.is_active }
}
,map4db_st_activity_type: function(dto) { 
 return {
id: dto.id, name: dto.name, is_active: dto.is_active, show_insurance: dto.show_insurance, show_milage: dto.show_milage, show_purchase: dto.show_purchase, use_details: dto.use_details }
}
,map4db_st_asset_2_attachments: function(dto) { 
 return {
id: dto.id, parent_id: dto.parent_id, file_id: dto.file_id, mark_deleted: dto.mark_deleted }
}
,map4db_st_asset_types: function(dto) { 
 return {
id: dto.id, name: dto.name, is_active: dto.is_active }
}
,map4db_st_asset_kind: function(dto) { 
 return {
id: dto.id, name: dto.name, is_active: dto.is_active, is_machine: dto.is_machine, is_computer: dto.is_computer, is_car: dto.is_car, is_tool: dto.is_tool, is_other: dto.is_other, is_default: dto.is_default, welcome_card: dto.welcome_card, icon: dto.icon }
}
,map4db_st_assets: function(dto) { 
 return {
id: dto.id, uuid: dto.uuid, parent_id: dto.parent_id, date_registered: dto.date_registered, added_by: dto.added_by, last_updated: dto.last_updated, last_updated_by: dto.last_updated_by, sap_wbs_id: dto.sap_wbs_id, sap_project_id: dto.sap_project_id, asset_name: dto.asset_name, brand: dto.brand, serial_no: dto.serial_no, sticker_inventory_no: dto.sticker_inventory_no, iscala_no: dto.iscala_no, qty: dto.qty, description: dto.description, type_id: dto.type_id, status_id: dto.status_id, is_booked: dto.is_booked, book_date: dto.book_date, book_ref: dto.book_ref, accountant_id: dto.accountant_id, outof_erp: dto.outof_erp }
}
,map4db_st_assets_acceptance: function(dto) { 
 return {
id: dto.id, uuid: dto.uuid, added_by: dto.added_by, dateadded: dto.dateadded, parent_id: dto.parent_id, acceptor_id: dto.acceptor_id, accepted: dto.accepted, acceptor_decision_date: dto.acceptor_decision_date, remarks: dto.remarks, step: dto.step }
}
,map4db_st_comments: function(dto) { 
 return {
id: dto.id, uuid: dto.uuid, parent_id: dto.parent_id, added_by: dto.added_by, date_added: dto.date_added, memo: dto.memo, mark_deleted: dto.mark_deleted, typ: dto.typ }
}
,map4db_st_main_2_attachments: function(dto) { 
 return {
id: dto.id, uuid: dto.uuid, parent_id: dto.parent_id, mtype: dto.mtype, sub_id: dto.sub_id, file_id: dto.file_id, mark_deleted: dto.mark_deleted }
}
,map4db_st_main: function(dto) { 
 return {
id: dto.id, uuid: dto.uuid, parent_id: dto.parent_id, date_registered: dto.date_registered, added_by: dto.added_by, wbs_id: dto.wbs_id, kind_id: dto.kind_id, status_id: dto.status_id, asset_name: dto.asset_name, brand: dto.brand, model: dto.model, typ: dto.typ, serial_no: dto.serial_no, sticker_inventory_no: dto.sticker_inventory_no, erp_id: dto.erp_id, date_purchase: dto.date_purchase, date_warranty_end: dto.date_warranty_end, date_disposed: dto.date_disposed, is_leasing: dto.is_leasing, leas_contract: dto.leas_contract, leas_date_start: dto.leas_date_start, leas_date_end: dto.leas_date_end, leas_remarks: dto.leas_remarks, next_car_inspection_date: dto.next_car_inspection_date, next_maintenance_date: dto.next_maintenance_date, description: dto.description, last_updated_by: dto.last_updated_by, last_updated: dto.last_updated, car_remarks: dto.car_remarks, is_booked: dto.is_booked, book_date: dto.book_date, book_ref: dto.book_ref, car_maint_interv_km: dto.car_maint_interv_km, car_reg_plates: dto.car_reg_plates, car_fuel_crd: dto.car_fuel_crd, car_telem_crd: dto.car_telem_crd, car_is_warranty: dto.car_is_warranty, car_warr_expiry: dto.car_warr_expiry, tool_remarks: dto.tool_remarks }
}
,map4db_st_main_activities: function(dto) { 
 return {
id: dto.id, uuid: dto.uuid, date_added: dto.date_added, last_updated_by: dto.last_updated_by, last_updated: dto.last_updated, added_by: dto.added_by, parent_id: dto.parent_id, activity_type_id: dto.activity_type_id, activity_date: dto.activity_date, nazwa: dto.nazwa, document_no: dto.document_no, ins_policy_date: dto.ins_policy_date, ins_expiry_date: dto.ins_expiry_date, supplier_id: dto.supplier_id, net_cost: dto.net_cost, mileage_km: dto.mileage_km, remarks: dto.remarks, is_cancelled: dto.is_cancelled }
}
,map4db_st_main_transfers: function(dto) { 
 return {
id: dto.id, uuid: dto.uuid, parent_id: dto.parent_id, lp: dto.lp, d_date: dto.d_date, target_owner_id: dto.target_owner_id, remarks: dto.remarks, last_updated_by: dto.last_updated_by, last_updated: dto.last_updated, date_added: dto.date_added }
}
,map4db_st_main_activities_lines: function(dto) { 
 return {
id: dto.id, uuid: dto.uuid, date_added: dto.date_added, added_by: dto.added_by, last_updated_by: dto.last_updated_by, last_updated: dto.last_updated, parent_id: dto.parent_id, line_type_id: dto.line_type_id, lp: dto.lp, qty: dto.qty, item_name: dto.item_name, net_cost: dto.net_cost }
}
,map4db_st_status: function(dto) { 
 return {
id: dto.id, sort_id: dto.sort_id, status_name: dto.status_name, enabled: dto.enabled, domyslny: dto.domyslny, is_open: dto.is_open }
}
,map4db_tmp_z_local_tables: function(dto) { 
 return {
nazwa: dto.nazwa, pole: dto.pole }
}
,map4db_wf_acceptance: function(dto) { 
 return {
id: dto.id, uuid: dto.uuid, added_by: dto.added_by, dateadded: dto.dateadded, parent_id: dto.parent_id, acceptor_id: dto.acceptor_id, accepted: dto.accepted, acceptor_decision_date: dto.acceptor_decision_date, remarks: dto.remarks, step: dto.step }
}
,map4db_tmp_z_remote_tables: function(dto) { 
 return {
nazwa: dto.nazwa, pole: dto.pole }
}
,map4db_wf_call_log: function(dto) { 
 return {
id: dto.id, parent_id: dto.parent_id, date_added: dto.date_added, added_by: dto.added_by, event_text: dto.event_text }
}
,map4db_wf_call_status: function(dto) { 
 return {
id: dto.id, sort_id: dto.sort_id, status_name: dto.status_name, enabled: dto.enabled, domyslny: dto.domyslny, is_open: dto.is_open }
}
,map4db_wf_calls_2_attachments: function(dto) { 
 return {
id: dto.id, parent_id: dto.parent_id, file_id: dto.file_id, mark_deleted: dto.mark_deleted, mark4ekp: dto.mark4ekp, mark4erp: dto.mark4erp }
}
,map4db_wf_zlecenia_notes: function(dto) { 
 return {
id: dto.id, uuid: dto.uuid, parent_id: dto.parent_id, added_by: dto.added_by, date_added: dto.date_added, is_hq: dto.is_hq, memo: dto.memo, mark_deleted: dto.mark_deleted }
}
,map4db_wf_zlecenia: function(dto) { 
 return {
id: dto.id, uuid: dto.uuid, date_registered: dto.date_registered, added_by: dto.added_by, call_type_id: dto.call_type_id, team_leader_id: dto.team_leader_id, site_id: dto.site_id, erp_reference: dto.erp_reference, status_id: dto.status_id, client_order_no: dto.client_order_no, client_id: dto.client_id, client_caller_name: dto.client_caller_name, client_caller_telephone: dto.client_caller_telephone, client_email: dto.client_email, client_issue_description: dto.client_issue_description, internal_memo: dto.internal_memo, date_invoicing_request: dto.date_invoicing_request, invoice_instructions: dto.invoice_instructions, coordinator_memo: dto.coordinator_memo, last_updated: dto.last_updated, last_updated_by: dto.last_updated_by, opiekun_id: dto.opiekun_id, le_id: dto.le_id, bu_id: dto.bu_id, sap_wbs_id: dto.sap_wbs_id, sap_project_id: dto.sap_project_id, sap_order_no: dto.sap_order_no, block4erp: dto.block4erp, prefix: dto.prefix, custom_no: dto.custom_no, to_month: dto.to_month, to_year: dto.to_year, transfr_pending: dto.transfr_pending, transf_time: dto.transf_time }
}
,map4db_z_temp1: function(dto) { 
 return {
column1: dto.column1 }
}
,map4db_z_temp10: function(dto) { 
 return {
column1: dto.column1, column2: dto.column2, column3: dto.column3, column4: dto.column4, column5: dto.column5, column6: dto.column6, column7: dto.column7, column8: dto.column8, column9: dto.column9, column10: dto.column10 }
}
,map4db_z_temp100: function(dto) { 
 return {
column1: dto.column1, column2: dto.column2, column3: dto.column3, column4: dto.column4, column5: dto.column5, column6: dto.column6, column7: dto.column7, column8: dto.column8, column9: dto.column9, column10: dto.column10, column11: dto.column11, column12: dto.column12 }
}
,map4db_z_temp11: function(dto) { 
 return {
column1: dto.column1, column2: dto.column2, column3: dto.column3, column4: dto.column4, column5: dto.column5, column6: dto.column6, column7: dto.column7, column8: dto.column8, column9: dto.column9, column10: dto.column10, column11: dto.column11 }
}
,map4db_z_temp13: function(dto) { 
 return {
column1: dto.column1, column2: dto.column2, column3: dto.column3, column4: dto.column4, column5: dto.column5, column6: dto.column6, column7: dto.column7, column8: dto.column8, column9: dto.column9, column10: dto.column10, column11: dto.column11, column12: dto.column12, column13: dto.column13 }
}
,map4db_z_temp12: function(dto) { 
 return {
column1: dto.column1, column2: dto.column2, column3: dto.column3, column4: dto.column4, column5: dto.column5, column6: dto.column6, column7: dto.column7, column8: dto.column8, column9: dto.column9, column10: dto.column10, column11: dto.column11, column12: dto.column12 }
}
,map4db_z_temp2: function(dto) { 
 return {
column1: dto.column1, column2: dto.column2 }
}
,map4db_z_temp21: function(dto) { 
 return {
column1: dto.column1, column2: dto.column2, column3: dto.column3, column4: dto.column4, column5: dto.column5, column6: dto.column6, column7: dto.column7, column8: dto.column8, column9: dto.column9, column10: dto.column10, column11: dto.column11, column12: dto.column12, column13: dto.column13, column14: dto.column14, column15: dto.column15, column16: dto.column16, column17: dto.column17, column18: dto.column18, column19: dto.column19, column20: dto.column20, column21: dto.column21 }
}
,map4db_z_temp21w: function(dto) { 
 return {
column1: dto.column1, column2: dto.column2, column3: dto.column3, column4: dto.column4, column5: dto.column5, column6: dto.column6, column7: dto.column7, column8: dto.column8, column9: dto.column9, column10: dto.column10, column11: dto.column11, column12: dto.column12, column13: dto.column13, column14: dto.column14, column15: dto.column15, column16: dto.column16, column17: dto.column17, column18: dto.column18, column19: dto.column19, column20: dto.column20, column21: dto.column21 }
}
,map4db_z_temp2a: function(dto) { 
 return {
column1: dto.column1, column2: dto.column2 }
}
,map4db_z_temp3: function(dto) { 
 return {
column1: dto.column1, column2: dto.column2, column3: dto.column3 }
}
,map4db_z_temp35: function(dto) { 
 return {
column1: dto.column1, column2: dto.column2, column3: dto.column3, column4: dto.column4, column5: dto.column5, column6: dto.column6, column7: dto.column7, column8: dto.column8, column9: dto.column9, column10: dto.column10, column11: dto.column11, column12: dto.column12, column13: dto.column13, column14: dto.column14, column15: dto.column15, column16: dto.column16, column17: dto.column17, column18: dto.column18, column19: dto.column19, column20: dto.column20, column21: dto.column21, column22: dto.column22, column23: dto.column23, column24: dto.column24, column25: dto.column25, column26: dto.column26, column27: dto.column27, column28: dto.column28, column29: dto.column29, column30: dto.column30, column31: dto.column31, column32: dto.column32, column33: dto.column33, column34: dto.column34, column35: dto.column35 }
}
,map4db_z_temp4: function(dto) { 
 return {
column1: dto.column1, column2: dto.column2, column3: dto.column3, column4: dto.column4 }
}
,map4db_z_temp5: function(dto) { 
 return {
column1: dto.column1, column2: dto.column2, column3: dto.column3, column4: dto.column4, column5: dto.column5 }
}
,map4db_z_temp6: function(dto) { 
 return {
column1: dto.column1, column2: dto.column2, column3: dto.column3, column4: dto.column4, column5: dto.column5, column6: dto.column6 }
}
,map4db_z_temp7: function(dto) { 
 return {
column1: dto.column1, column2: dto.column2, column3: dto.column3, column4: dto.column4, column5: dto.column5, column6: dto.column6, column7: dto.column7 }
}
,map4db_z_temp8: function(dto) { 
 return {
column1: dto.column1, column2: dto.column2, column3: dto.column3, column4: dto.column4, column5: dto.column5, column6: dto.column6, column7: dto.column7, column8: dto.column8 }
}
,map4db_z_temp8a: function(dto) { 
 return {
column1: dto.column1, column2: dto.column2, column3: dto.column3, column4: dto.column4, column5: dto.column5, column6: dto.column6, column7: dto.column7, column8: dto.column8 }
}
,map4db_z_temp9: function(dto) { 
 return {
column1: dto.column1, column2: dto.column2, column3: dto.column3, column4: dto.column4, column5: dto.column5, column6: dto.column6, column7: dto.column7, column8: dto.column8, column9: dto.column9 }
}
,map4db_z_temp_csv: function(dto) { 
 return {
question: dto.question, column2: dto.column2, col3: dto.col3 }
}
,map4db_z_temp_import5: function(dto) { 
 return {
col1: dto.col1, col2: dto.col2, col3: dto.col3, col4: dto.col4, col5: dto.col5 }
}
,map4db_z_type: function(dto) { 
 return {
fname: dto.fname, lname: dto.lname, work_start: dto.work_start, work_end: dto.work_end, empl_department: dto.empl_department, mpk: dto.mpk, total_hours: dto.total_hours }
}
,
}