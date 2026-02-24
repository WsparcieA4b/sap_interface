'use strict';

module.exports = {

  selectPracownikMinimal: `id, fname||' '||lname as "name", enable_in_calendar`,

  selectPracownikShot4Autocomplete: `id, fname, lname,department_id, phone, email, enable_in_calendar, manager_id, stanowisko, fname||' '||lname as "name"   `,
  selectPracownCalResource: ` id,'EMPL' as restype, coalesce(trim(fname),'')||' '||coalesce(trim(lname),'') as "name", department_id, phone, 
  email,enable_in_calendar, manager_id, stanowisko`,

  selectPrac4CalResources: `id, fname, lname, phone, email,enable_in_calendar, manager_id, stanowisko, fname||' '||lname as "name" , region
  ,department_id, (select nazwa from catalogue c where c.id=department_id) as "departm"
  ,(select erp_name from business_partner_erp g where g.id=vendor_id) as "vendor" 
  ,(select short_name from cust_master_vendor_ext t where t.parent_id=(select id from business_partner_erp g where g.id=vendor_id) ) as "vendorshort"
`,



  selectPracownikWithManager: `id, fname, lname,  fname||' '||lname as "name" ,department_id, phone, email, stanowisko, 
 manager_id,(select  fname||' '||lname from se_employees ee where ee.id=se_employees.manager_id) as "manager" `,
  selectPracownicyLista: ` 
  id,  fname, lname, coalesce(fname,'')||' '||coalesce(lname,'') as name,  phone, email, fax, manager_id, stanowisko, is_external, 
(select e.fname||' '||e.lname from se_employees e where e.id =  se_employees.manager_id limit 1 ) as "manager", enable_in_calendar,
(SELECT nazwa FROM catalogue c  where c.id = cost_center_id) as "costcenter", 
(SELECT nazwa FROM catalogue c  where c.id = department_id) as "org_dept", 
(select count(*) from se_employees_2_groups e2g where e2g.employee_id=se_employees.id) as "grp_count", 
( select string_agg(group_name,', ') from se_employee_groups  where se_employee_groups.id in 
(select group_id from se_employees_2_groups e2g where e2g.employee_id =se_employees.id)) as "grupy",date_added, date_modified 
,coalesce((select se_enable=true from app_logins al where al.employee_id=se_employees.id), false) as "can_log2se"
,coalesce((select ekp_enable=true from app_logins al where al.employee_id=se_employees.id), false) as "can_log2ekp" 
,coalesce((select od_enable=true from app_logins al where al.employee_id=se_employees.id), false) as "can_log2od" 
,coalesce((select login_block=true from app_logins al where al.employee_id=se_employees.id), false) as "login_block" 
,(select count(*) from se_employee_qualifications q where q.employee_id=se_employees.id) as "comp_cnt"
,(SELECT date_event FROM log_table l where l.username=se_employees.email order by id desc  limit 1) as last_login
,(select group_name from se_employee_groups g where g.id=calendar_group_id) as "cal_grp"
,(select erp_name from business_partner_erp g where g.id=vendor_id) as "vendor"

`,
  //, asset_id, (select name_instal from s_assets_service_main ob where ob.id=asset_id) as "asset_name" ,client_caller_name, client_caller_telephone
  selCallsQueryStr: `
  id, date_registered ,portal_origin,added_by,call_type_id
,(select fname ||' ' || lname from se_employees e where e.id=added_by) as "added_by_name" 
, (SELECT nazwa FROM se_service_calls_types cc where cc.id=call_type_id) as call_type
, status_id, (select status_name from se_service_call_status st where st.id=status_id) as "status"
, team_leader_id,(select fname ||' ' || lname from se_employees e where e.id=team_leader_id) as "team_leader" 
,(select count(*)>0 from se_service_call_tech_receipts rr where (rr.accept=true) and (rr.call_id=se_service_calls.id)) as "tch_confirm" 
,(select count(*)>0 from se_service_call_tech_receipts rr where (rr.reject=true) and (rr.call_id=se_service_calls.id)) as "tch_reject" 
,(select string_agg( case when accept=true then 'Przyjęte: ' else 'Odrzucone: ' END ||': '|| (select substring(fname from 1 for 1)||'.'||trim(lname) from se_employees e where e.id=added_by)||': '|| to_char(date_added,'DD.MM.YYYY HH24:MI'),', ')  
 from se_service_call_tech_receipts r where r.call_id =se_service_calls.id) as "tch_conf"
, left(client_issue_description,60) as "call_summary"  
, client_issue_description, site_id
, (select site_name from s_site_erp ob where ob.id=site_id) as "site" 
, (select site_type  from s_site_erp ob where ob.id=site_id) as "s_type" 
, (select coalesce(address1,'') || ', '|| coalesce(zip_code,'') ||' '|| coalesce(city,'') from s_assets_site sa where sa.parent_id=site_id limit 1) as "s_adres" 
, date_expected_by_customer, deadline_internal 
, case when date_part('minute',current_timestamp -date_expected_by_customer)>0 THEN true ELSE false END  as "is_delayed" 
, (select string_agg(substring(fname from 1 for 1)||'.'||lname,', ') from se_employees ee where ee.id in 
(select employee_id from se_service_report_timing tt where  tt.call_id=se_service_calls.id order by coalesce(leader_grupy, false) desc  limit 1 ) ) as "technicy" 
, client_id, (select erp_name from business_partner_erp cm where cm.id=client_id) as client
, (select address3 from business_partner_erp cm where cm.id=client_id) as client_city 
, (Select cast(count(*) as int) from se_service_reports sr where sr.call_id=se_service_calls.id) as "report_cnt" 
, (Select cast(count(*) as int) from se_service_calls_zones sz where sz.call_id=se_service_calls.id) as "instal_cnt" 
, (Select count(*) from se_service_calls_2_attachments a where (a.mark_deleted=false) and (a.call_id=se_service_calls.id)) as "attachm_cnt" 
, (Select 0) as "delay"  
, (select cast(count(*) as integer) from se_service_report_timing t where t.call_id=se_service_calls.id) as "planner_cnt"
, (select cast(count(*) as integer) from se_service_report_timing t where t.call_id=se_service_calls.id and t.work_end > current_timestamp) as "planner_futcnt"
, (select work_end from se_service_report_timing t where t.call_id=se_service_calls.id order by work_end limit 1  ) as "frst_plan_wk_end"
, case when status_id in(200, 300, 400) then true else false end as "isOpen" 
, case when (status_id <500) and (select count(*) from se_service_report_timing t where t.call_id=se_service_calls.id)=0 then true else false end as "missTechnSched"
, round(extract(epoch from current_timestamp - date_registered)/(3600)) as "hrs_f_scli_subm"
, (select string_agg(nazwa,', ') from catalogue cc where cc.id in (select instal_type_id  from s_assets_service_main ass where ass.id IN 
     (select asset_id from se_service_calls_zones z where (z.attach2call=true) and z.call_id = se_service_calls.id)))
as "z_rodz_inst" 
,(select case when count(*)>0 then true else false end from se_service_call_billing_comments scc where scc.call_id=se_service_calls.id) as "has_bill_cmnts" 
,(select string_agg(invoice_remarks,'; ') from se_service_call_billing_comments bc where bc.call_id =se_service_calls.id) as "bill_cmnts"
,cast((select  count(*) from fin_faktury f where f.nr_zlec=se_service_calls.id) as int) as "invoice_count"
,(select  case when count(*)>1 then true else false end  from fin_faktury f where f.nr_zlec=se_service_calls.id)   as "invoice_oneplus"
,(select cast(nr_faktury as character varying) from fin_faktury f where f.nr_zlec=se_service_calls.id order by id desc limit 1) as "invoice_first"
,(select cast(kwota as character varying) from fin_faktury f where f.nr_zlec=se_service_calls.id order by id desc limit 1) as "invoice_val_first"
,(select  string_agg(cast(nr_faktury as character varying)||' ('||cast(kwota as character varying)||'zł ) ',',') from fin_faktury f where f.nr_zlec=se_service_calls.id) as "invoices"
,(select report_date from se_service_reports r where r.call_id=se_service_calls.id  and r.report_date is not null order by report_date desc  limit 1) as "last_report_date"
,(select string_agg(file_name,','|| CHR(10)) from file_attachments fa where fa.id in (select file_id  from attachment_4_invoices_4_calls where mark_deleted!=true and  parent_id =se_service_calls.id ))  as "atch_invoices"
,technician_origin,imap_origin,uuid 
,(SELECT cast(count(*) as int) FROM public.se_service_call_notes_internal ni where ni.call_id = se_service_calls.id) as note_cnt
,(SELECT cast(count(estymacja_id) as int)  FROM public.o_oferta_2_estymacja where call_id=se_service_calls.id) as "estim_cnt"
, (select count(*) from se_service_report_materials s2a where s2a.report_id in (select id from se_service_reports r where r.call_id=se_service_calls.id)) as "materials"
,(select case when a4_p=true then 1 else case when a4_t=true then 2 else case when a4_f=true then 3 else 0 end end end as task_status
from ( select bool_or( (coalesce(closed, false)=false) AND (((deadline is not null) AND deadline::date = current_timestamp::date) or (deadline is null)) ) as a4_t,
bool_or((deadline is not null) AND (current_timestamp::date > deadline::date) AND  coalesce(closed, false)=false ) as a4_p, 
bool_or ((deadline is not null) AND (current_timestamp::date < deadline::date) AND  coalesce(closed, false)=false) as a4_f  
from se_service_call_tasks t where t.call_id= se_service_calls.id 
) as x )  ,
(select string_agg(task_memo,','|| CHR(10)) from se_service_call_tasks t where t.call_id= se_service_calls.id) as tasks

`,
  selPortalCallsList: `
id, date_registered ,portal_origin,call_type_id
,(select fname ||' ' || lname from se_employees e where e.id=added_by) as "added_by_name" 
, (SELECT nazwa FROM se_service_calls_types cc where cc.id=call_type_id) as call_type
,case when status_id<200 THEN 'Zarejestrowane' ELSE
case when status_id>=200 and status_id<=400 then 'W realizacji' else 'Zakończone' end end  as "status"
,case when status_id<200 THEN 1 ELSE
case when status_id>=200 and status_id<=400 then 2 else 3 end end  as "status_num"
, case when status_id=105 then true else false end as "editable"
, team_leader_id,(select fname ||' ' || lname from se_employees e where e.id=team_leader_id) as "team_leader" 
, (select phone from se_employees e where e.id=team_leader_id) as "team_leader_phone" 
, site_id
, (select site_name ||'('||site_type||')' from s_site_erp ob where ob.id=site_id) as "site"   
, client_id
, (select erp_name from business_partner_erp cm where cm.id=client_id) as client
, (select address3 from business_partner_erp cm where cm.id=client_id) as client_city
, client_caller_name, client_caller_telephone
, (Select cast(count(*) as int) from se_service_reports sr where sr.call_id=se_service_calls.id) as "report_cnt" 
, (Select count(*) from se_service_calls_zones sz where sz.call_id=se_service_calls.id) as "instal_cnt" 
, (Select count(*) from se_service_calls_2_attachments a where a.call_id=se_service_calls.id) as "attachm_cnt" 
, (Select 3) as "delay" 
, (select count(*) from se_service_report_timing t where t.call_id=se_service_calls.id) as "planner_cnt"
, case when status_id in(200, 300, 400) then true else false end as "isOpen"

`,
  selCallsQueryStr4EKP: `
 id, date_registered ,added_by
,(select fname ||' ' || lname from se_employees e where e.id=added_by) as "added_by_name" 
, call_type_id, site_id
, (SELECT nazwa FROM se_service_calls_types cc where cc.id=call_type_id) as call_type
, status_id, (select status_name from se_service_call_status st where st.id=status_id) as "status"
, team_leader_id,(select fname ||' ' || lname from se_employees e where e.id=team_leader_id) as "team_leader" 
, (select site_name || coalesce(' ('||site_type||')','') from s_site_erp ob where ob.id=site_id) as "site"
, asset_id, (select name_instal from s_assets_service_main ob where ob.id=asset_id) as "asset_name" 
, case when date_part('minute',current_timestamp -date_expected_by_customer)>0 THEN true ELSE false END  as "is_delayed"
, deadline_internal , date_expected_by_customer, client_id
, (select erp_name from business_partner_erp cm where cm.id=client_id) as client
, (select address3 from business_partner_erp cm where cm.id=client_id) as client_city
, client_caller_name, client_caller_telephone, client_email,client_order_no
, cast((select count(*) from se_service_calls_2_machines c2m where c2m.attach2call=true and c2m.call_id=se_service_calls.id) as integer)  as "machine_cnt" 
, cast((select count(*) from se_service_reports sr where sr.call_id=se_service_calls.id) as integer) as "report_cnt" 
, (select count(*)>0 from  se_service_reports sr where sr.call_id=se_service_calls.id and service_completed=true) as "has_reports_completed" 
, (select count(*)>0 from  se_service_reports sr where sr.call_id=se_service_calls.id) as "has_reports" 
, cast((select count(*) from se_service_calls_zones sz where sz.call_id=se_service_calls.id) as integer) as "instal_cnt" 
, cast((select count(*) from se_service_calls_2_attachments a where a.call_id=se_service_calls.id) as integer) as "attachm_cnt" 
, cast((select count(*) from se_service_report_timing t where t.call_id=se_service_calls.id) as integer) as "planner_cnt"
, (select 0) as "delay" 
, case when status_id in(200, 300, 400) then true else false end as "isOpen" 
, (select string_agg(fname||' '||lname,', ') from se_employees ee where ee.id in 
	  (select employee_id from se_service_report_timing tt where  tt.call_id=se_service_calls.id and tt.category_id=1)
  ) as "technicy"
  , client_issue_description,internal_memo 
  , (select string_agg(nazwa,', ') from catalogue cc where cc.id in (select instal_type_id  from s_assets_service_main ass where ass.id IN 
     (select asset_id from se_service_calls_zones z where (z.attach2call=true) and z.call_id = se_service_calls.id))) as "z_rodz_inst" 
, technician_origin , uuid

`,
  selServCalls4PlannerRef: `id, date_registered 
,(select fname ||' ' || lname from se_employees e where e.id=added_by) as "added_by_name" 
, (SELECT nazwa FROM se_service_calls_types cc where cc.id=call_type_id) as call_type
, status_id, (select status_name from se_service_call_status st where st.id=status_id) as "status"
, client_issue_description
, (select fname ||' ' || lname from se_employees e where e.id=team_leader_id) as "team_leader"  
, (select site_name ||'('||site_type||')' from s_site_erp ob where ob.id=site_id) as "site"  
, case when date_part('minute',current_timestamp -date_expected_by_customer)>0 THEN true ELSE false END  as "is_delayed"
, (select erp_name from business_partner_erp cm where cm.id=client_id) as client 
, (Select count(*) from se_service_reports sr where sr.call_id=se_service_calls.id) as "report_cnt" 
, (Select count(*) from se_service_calls_zones sz where sz.call_id=se_service_calls.id) as "instal_cnt"  
, (select count(*) from se_service_report_timing t where t.call_id=se_service_calls.id) as "planner_cnt"

`,
  selServCalls4PlannerOptim: `id, date_registered,client_caller_name, call_type_id, client_caller_telephone, client_issue_description
, (select fname ||' ' || lname from se_employees e where e.id=added_by) as "added_by_name" 
, (SELECT nazwa FROM se_service_calls_types cc where cc.id=call_type_id) as call_type
, status_id, (select status_name from se_service_call_status st where st.id=status_id) as "status"
, (select fname ||' ' || lname from se_employees e where e.id=team_leader_id) as "team_leader"  
, (select site_name || coalesce('('||site_type||')','')  from s_site_erp ob where ob.id=site_id) as "site" 
, (SELECT CASE WHEN address1 is not null then address1||', ' ELSE '' END || 
   CASE WHEN zip_code is not null then zip_code||' ' ELSE '' END || coalesce(city,'')   
   FROM public.s_assets_site ssa  WHERE ssa.parent_id=site_id) as "saddr" 
, (select erp_name from business_partner_erp cm where cm.id=client_id) as client 
, (Select cast(count(*) as int) from se_service_reports sr where sr.call_id=se_service_calls.id) as "report_cnt" 
, (Select count(*)>0 from se_service_reports sr where (service_completed=true) and sr.call_id=se_service_calls.id) as "rep_compl" 
 
`,
  selProjectsListQuery: `
  id, date_added, added_by,pr_manager_id, pr_name
, project_type_id, (select nazwa from catalogue c where c.id=p_projects.project_type_id) as "typ_projektu"
, pr_status_id, (select status_name from p_project_status st where st.id=p_projects.pr_status_id) as "status"
, client_id, (select erp_name from business_partner_erp bp where bp.id=p_projects.client_id) as "client"
, site_id,(select site_name from s_site_erp ob where ob.id=p_projects.site_id) as "obiekt"
, pr_number, contract_sign_date, pr_start_date, pr_end_date
, (select cast(count(*) as int) from d_documents d where d.folder_id in (select id from d_document_folder df where df.project_id=p_projects.id)) as "doc_count"   
, (select cast(count(*) as int)  from d_document_folder df where df.project_id=p_projects.id)  as "folder_count" 
, (select cast(count(*) as int)  from p_project_contracts c where c.project_id=p_projects.id)  as "contr_count"  
, cast((select cast(count(*) as int) from s_assets_service_main sas where sas.site_id=p_projects.site_id) as integer) as "install_count"  
, pr_value, pr_value_currency  
, private, public
, (select cast(count(*) as int) from d_document_folder df where df.project_id=p_projects.id) as "folder_count"  
, (select cast(count(*) as int) from d_documents d where d.folder_id in (select id from d_document_folder df where df.project_id=p_projects.id) ) as "doc_count" 
, (select SUBSTRING ( fname ,1 , 1 )||'.' || lname from se_employees e where e.id=p_projects.pr_manager_id) as "pm_single"   
, (select string_agg(SUBSTRING ( fname ,1 , 1 )||'.'|| lname,', ') from se_employees e where e.id in (select employee_id from p_project_participants p where p.is_pm=true and p.active=true and p.project_id=p_projects.id) )  as "pms" 
, (select  is_open from p_project_status ps where ps.id=p_projects.pr_status_id) as "is_active"   
,(select cast(count(*) as int) from attachment_2_pr_contract pa where  (mark_deleted is null or mark_deleted=false) and pa.project_id in (select id from  p_project_contracts pc where pc.project_id=p_projects.id))  as "pctr_att_count"
  

    `,
  selProContractsMainList: `
    id,date_added, last_mod
    , added_by ,(select fname||' '||lname from se_employees e where e.id=p_project_contracts.added_by) as autor
    , last_mod_by ,(select fname||' '||lname from se_employees e where e.id=p_project_contracts.last_mod_by) as modifier
    , project_id, (select pr_name from p_projects p where p.id= p_project_contracts.project_id) as "project_name"
    , contr_kind_id, (select nazwa from p_project_contract_kind c where c.id =p_project_contracts.contr_kind_id) as "kind"
    , contr_type_id, (select type_name from p_contract_type t where t.id=p_project_contracts.contr_type_id) as "typ"
    , business_segment_id, (select nazwa from catalogue c where c.id =business_segment_id) as segment
    , c_manager_id, (select fname||' '||lname from se_employees e where e.id=p_project_contracts.c_manager_id) as kierownik
    , c_bus_owner_id, (select fname||' '||lname from se_employees e where e.id=p_project_contracts.c_bus_owner_id) as bussowner 
    , client_id,  (select erp_name from business_partner_erp cm where cm.id=client_id) as kontr 
    , (select address2 from business_partner_erp cm where cm.id=client_id) as kontr_city, site_id 
    ,CASE WHEN project_id is null 
    THEN (select site_name from s_site_erp ob where ob.id=site_id)  
    ELSE (select site_name ||' (Proj)' from s_site_erp ob where ob.id=(select site_id from p_projects p where p.id=p_project_contracts.project_id))
    END as "site", c_name, c_remarks, c_date
    , c_start_date, c_end_date, indefinite_term  
    , coalesce(extract(epoch from current_timestamp - c_start_date)/3600,0) > 0 AND (coalesce(indefinite_term,false)=true OR coalesce(extract(epoch from c_end_date-current_timestamp)/3600,0) >0 ) as "active"
    
    , round(coalesce(extract(epoch from c_end_date-current_timestamp)/(3600*12) ,-1))  as days2expire
    
    , c_actual_work_end, c_startup_date, c_handover_date, c_final_protocol_date, c_currency
    , notice_period, notice_uom_id
    , payterm_id, pay_term_base_id, warrantyterms_id, deliveryterms_id, waste_handl_term_id
    ,(select cast(count(*) as int) from p_contract_ext_fm_dod e where e.contract_id=p_project_contracts.id) as exfmdod
  ,(select cast(count(*) as int) from p_contract_ext_fm_ref e where e.contract_id=p_project_contracts.id) as exfmref
  ,(select cast(count(*) as int) from p_contract_ext_fm_rycz e where e.contract_id=p_project_contracts.id) as exfmrycz
  ,(select cast(count(*) as int) from p_contract_ext_poc e where e.contract_id=p_project_contracts.id) as exfmpoc
  ,(select cast(count(*) as int) from p_contract_ext_zakup_gen e where e.contract_id=p_project_contracts.id) as exzakg
  ,(select cast(count(*) as int) from attachment_2_pr_contract at where at.contract_id=p_project_contracts.id and (not at.mark_deleted=true)) as "att_count"
    

  `
  , selServContractsListquery: `
 id, date_added, added_by
, (select string_agg(site_name,', ') from s_site_erp s 
  where s.id in (select site_id from s_assets_service_main n where n.id in (select asset_id from s_asset_2_contract ac where ac.contract_id=se_service_contracts.id))
   or   s.id in (select site_id from s_assets_devices n where n.id in (select machine_id from s_device_2_contract ac where ac.contract_id=se_service_contracts.id))
) as "obiekty"
, contract_type_id, (select nazwa from catalogue c where c.id=se_service_contracts.contract_type_id) as "contract_type"
, client_id, (select erp_name from business_partner_erp bp where bp.id=se_service_contracts.client_id) as "client"
, valid_from, valid_to, indefinite_contract, contract_no, contract_memo 
, CASE WHEN indefinite_contract=true THEN  'bezterminowy' 
 ELSE CASE WHEN EXTRACT(day from (current_date - valid_to))<=0 THEN cast(EXTRACT(day from ( valid_to-current_date)) as character varying)||' dni' END END as "days_left"   
, coalesce(extract(epoch from valid_to-current_date),-1)>=0 or (indefinite_contract=true) as "is_active"
, cast((select count(*) from s_asset_2_contract s2c where s2c.contract_id=se_service_contracts.id) as integer) as "install_count" 
, cast((select count(*) from s_device_2_contract d2c where d2c.contract_id=se_service_contracts.id) as integer) as "device_count"

, (select CASE WHEN count(*)>0 THEN TRUE ELSE false END  from se_service_report_timing smp where smp.contract_id=se_service_contracts.id) as "has_maint_plan"
, cast((select count(*) from se_service_contract_2_attachments s2a where s2a.contract_id = se_service_contracts.id) as integer) as "attachm_count"
, (select string_agg(nazwa,', ') from catalogue  where catalogue.id 
	in (select instal_type_id from s_assets_service_main asm where asm.id in (select asset_id from s_asset_2_contract a2c where a2c.contract_id=se_service_contracts.id))
) as "rodzaje_inst"
 `,

  contractPPMlist: `
 
  t.id as "timing_id", p.id as "ppm_id",  work_start as "from_date" ,work_end  as "to_date" , work_end-work_start  as "duration",
  p.machine_id, p.asset_id , p.contract_id
  ,CASE WHEN p.machine_id is not null THEN true ELSE false end as "is_machine"
  ,CASE WHEN p.asset_id is not null THEN true ELSE false end as "is_installation"
  ,CASE WHEN p.machine_id is not null THEN 'Urządzenie' ELSE  CASE WHEN asset_id is not null THEN 'Instalacja' ELSE 'nieznany!' END END as "rodzaj" 
  ,CASE WHEN p.machine_id is not null 
   THEN (select device_name from s_assets_devices ad where ad.id=p.machine_id)  
  ELSE CASE WHEN p.asset_id is not null THEN (select name_instal from s_assets_service_main ad where ad.id=p.asset_id) ELSE '-----' END END as "nazwa"
  , (select site_name from s_site_erp e where e.id=(select site_id from s_assets_devices ad where ad.id=p.machine_id) ) as "site"
  , CASE WHEN  extract(epoch from work_start-current_timestamp) <0 
  THEN CASE WHEN extract(epoch from work_end-current_timestamp) <0 THEN 'PAST' ELSE 'CURRENT' END ELSE 'FUTURE' END  as "sch_status"

 `
  ,
  selectServContractSingle: `  id, date_added, added_by,  (select fname||' '||lname from se_employees e where e.id=added_by) as "addedbyName" 
       ,CASE WHEN EXTRACT(day from (current_date - valid_to))<=0 or (indefinite_contract=true)   THEN true ELSE false END as "is_active"
       , contract_type_id, client_id, valid_from, 
       valid_to, indefinite_contract, contract_memo, contract_no, contr_value, 
       contr_currency, billing_freq_id, is_lump_sum_billing, reaction_time_2_acknldg, 
       reaction_time_2_fix, day_hrs_from, day_hrs_to, day_labour_rate, 
       night_labour_rate, free_hours, has_travel_acc2_quote, has_travel_lumpsum, 
       has_travel_rate, travel_lumpsum_amount, travel_rate_amount, weekend_rate 
       ,has_discount, discount,travel_cond_remarks
    `,
  selServContractsLookUpList: `
        id , contract_no, contract_type_id,  (select nazwa from catalogue c where c.id=se_service_contracts.contract_type_id) as "contract_type"
        , client_id, (select erp_name from business_partner_erp bp where bp.id=se_service_contracts.client_id) as "client" 
        , valid_from, valid_to, indefinite_contract
        ,CASE WHEN EXTRACT(day from (current_date - valid_to))<=0 or (indefinite_contract=true)   THEN true ELSE false END as "is_active"
        ,case when indefinite_contract=true THEN 'Umowa bezterminowa' ELSE
        CASE WHEN EXTRACT(day from (current_date - valid_to))>0 THEN 'Umowa zakończona ' || to_char(valid_to, 'YYYY-MM-dd') 
        ELSE 'Umowa do ' || to_char(valid_to, 'YYYY-MM-dd') END  END as "validity"  
        , (select string_agg(name_instal,', ')  from s_assets_service_main a where a.id in (select sc.asset_id from s_asset_2_contract sc where sc.contract_id =  se_service_contracts.id)) as "instalacje"
      , (select  string_agg(site_name,', ')  from s_site_erp se where se.id in 
        (select site_id from s_assets_service_main a where a.id in (select sc.asset_id from s_asset_2_contract sc where sc.contract_id =  se_service_contracts.id))) as "sites" 
      , (select count(*) from s_asset_2_contract sc where sc.contract_id =  se_service_contracts.id) as "instal_count"
    `,
  selSingleCallQueryString: ` * 
,  (select fname||' '||lname from se_employees e where e.id=added_by) as "addedby"  
, (select string_agg(to_char(work_start,'yyyy/MM/dd HH24:MI'),', ') from se_service_report_timing t where t.call_id=se_service_calls.id) as "visit_plan" 
, (select count(*)>0 from se_service_report_timing t where t.call_id=se_service_calls.id) as "has_planvisit"  
, (select cast(count(*) as int) from se_service_report_timing t where t.call_id=se_service_calls.id) as "plan_visits"  
, cast(seller_id as character varying) as "seller_id" 
, (select count(*)>0 from se_service_reports r where r.call_id= se_service_calls.id) as "has_reports"
, (select cast(count(*) as int) from se_service_reports r where r.call_id= se_service_calls.id) as "rep_count"
,(select cast(count(*) as int) from se_service_report_photos p where ((mark_deleted is null) or (mark_deleted=false)) AND (report_uuid in (select  uuid from se_service_reports r where r.call_id=se_service_calls.id))) as "photo_cnt"



`,

  selSingleCallQuery4Portal: ` 
"id","date_registered"
,"date_client_submission"
,"added_by", (select fname||' '||lname from se_employees e where e.id=added_by) as "addedby" 
, "client_id","site_id","call_type_id","cost_center_id","team_leader_id"  
, case when status_id<200 THEN 'Zarejestrowano' ELSE
 case when status_id>=200 and status_id<=400 then 'W realizacji' else 'Zakończone' end end  as "status"
, case when status_id<200 THEN 1 ELSE
  case when status_id>=200 and status_id<=400 then 2 else 3 end end  as "status_num"
, case when status_id=105 then true else false end as "ce"
, "client_order_no","client_caller_name","client_caller_telephone"
, "client_email", "client_type", "client_priority"
, "client_issue_description"
,"client_is_billto", "billto_id" 
,"date_expected_by_customer"
 
  
`,

  selectCalls4TechnicianConfirm: `
 "id","date_registered","date_client_submission" 
, (select status_name from se_service_call_status st where st.id=status_id) as "status"
, (SELECT nazwa FROM catalogue cc where cc.id=client_priority) as cli_prio
, (SELECT nazwa FROM catalogue cc where cc.id=client_type) as cli_type
, case when status_id<200 THEN 'Zarejestrowano' ELSE case when status_id>=200 and status_id<=400 then 'W realizacji' else 'Zakończone' end end  as "status"
  , (select erp_name ||' '||coalesce(address1,'') ||' ' ||coalesce(address2,'')   
  from business_partner_erp cm where cm.id=client_id) as client
, (select site_name ||'('||site_type||')' from s_site_erp ob where ob.id=site_id) as "site"
, client_caller_name,client_caller_telephone
, client_email, client_type, client_priority
, client_issue_description 
, date_expected_by_customer
, (select case when count(*)>0 then true else false end  from se_service_report_timing st where st.call_id=se_service_calls.id) as "has_timerec"
, (select string_agg(fname||' '||lname,', ') from se_employees ee where ee.id in 
	  (select employee_id from se_service_report_timing tt where  tt.call_id=se_service_calls.id and tt.category_id=1)
  ) as "technicy"
   `,
  selReportsQueryString: `
id, date_added, report_date, addedby, (select fname ||' ' || lname from se_employees e where e.id=addedby) as "addedby_name" 
, call_id, (select date_registered from se_service_calls c where c.id=call_id) as "data_zlecenia"
, case when ereport=true then true else false end as "ereport" 
, coalesce((select case  when length(signature)>30 then true else false end from se_service_report_acceptance_signatures cs where cs.report_id=se_service_reports.id   limit 1  ), false) as "is_signed"
, case when custrefusal2sign=true then true else false end as "self_signed"
, custrefulasreason ,service_completed
, (select erp_name from business_partner_erp bp where bp.id IN (select client_id from se_service_calls c where c.id=call_id) limit 1 ) as "client"
, (select status_id from se_service_calls c where c.id=call_id) as "status_id"
, (select status_name from se_service_call_status st where st.id in (select status_id from se_service_calls c where c.id=call_id) limit 1 ) as "status"
, (select site_name from s_site_erp ob where ob.id IN (select site_id from se_service_calls c where c.id=call_id) limit 1) as "site" 
, (select site_type  from s_site_erp ob where ob.id IN (select site_id from se_service_calls c where c.id=call_id) limit 1) as "s_type"  
, (select coalesce(address1,'') || ', '|| coalesce(zip_code,'') ||' '|| coalesce(city,'') from s_assets_site sa where sa.parent_id=(select site_id from se_service_calls c where c.id=call_id))  as "s_adres"
,  end_state_status, teamleader_final_mark, execution_issues, invoice_no 
, (select count(*)>0 from se_service_report_timing tt where tt.report_id=se_service_reports.id and tt.is_planning_row=true) as "hasPlanHrs"
, (select count(*)>0 from se_service_report_timing tt where tt.report_id=se_service_reports.id and tt.is_planning_row=false) as "hasVisit" 
, (select SUM(round(10*extract(epoch from work_end- work_start)/(3600))/10)  from se_service_report_timing tt 
where tt.report_id=se_service_reports.id and tt.is_planning_row != true) as "workHours"   
, (select SUM(travel_time_hrs)  from se_service_report_timing tt where tt.report_id=se_service_reports.id and tt.is_planning_row != true) as "travelHours" 

, (select cast(count(*) as int) from se_service_reports_2_attachments s2a where s2a.mark_deleted=false and s2a.report_id=se_service_reports.id) as "attachments"
, (select count(*) from se_service_report_materials s2a where s2a.report_id=se_service_reports.id) as "materials"
, (select string_agg(substring(fname from 1 for 1)||'.'||lname,', ') from se_employees ee where ee.id in 
	  (select employee_id from se_service_report_timing tt where  tt.report_id=se_service_reports.id ) ) as "technicy" 
, (select nazwa from se_service_calls_types cc where cc.id =(select call_type_id from se_service_calls sc where sc.id=se_service_reports.call_id)) as "z_rodzaj"  
, (select string_agg(nazwa,', ') from catalogue cc where cc.id in (select instal_type_id  from s_assets_service_main ass where ass.id IN 
  (select asset_id from se_service_calls_zones z where (z.attach2call=true) and z.call_id =(select id from se_service_calls sc where sc.id=se_service_reports.call_id)) )) as "z_rodz_inst"
, custrefusal2sign
,(select length(coalesce(signature,'')) > 30 from se_service_report_technician_signatures rs where rs.report_id=se_service_reports.id limit 1)  as "has_tech_signed"
,(select employee from se_service_report_technician_signatures rs where rs.report_id=se_service_reports.id limit 1)  as "tech_sign_name"
,(select date_signed from se_service_report_technician_signatures rs where rs.report_id=se_service_reports.id limit 1)  as "tech_sign_date"
, coalesce((select customer_signat_required  from se_t_protoc_templates tt where tt.protocol_templ_key=se_service_reports.prot_template), true) as "tmpl_cli_sign_required"  
,(select length(coalesce(signature,'')) > 30 from se_service_report_acceptance_signatures rs where rs.report_id=se_service_reports.id limit 1)  as "has_cli_signed"
,(select custacceptname from se_service_report_acceptance_signatures rs where rs.report_id=se_service_reports.id limit 1)  as "cli_sign_name"
,(select date_signed from se_service_report_acceptance_signatures rs where rs.report_id=se_service_reports.id limit 1)  as "cli_sign_date"
,(select cast(count(*) as integer) from se_service_reports_protocols_pdf pd where pd.report_id=se_service_reports.id) as "pdf_count"
,(SELECT cast(count(*) as int) FROM public.messages_sent ms where msg_type='EMAIL' and ms.report_id=se_service_reports.id) as "email_cnt" 
,(SELECT string_agg(m_receipients ||': '|| m_subject,'; ')  FROM public.messages_sent ms where msg_type='EMAIL' and ms.report_id=se_service_reports.id) as "email_info" 
,(SELECT cast(count(*) as int) FROM se_service_report_photos p where p.report_uuid=se_service_reports.uuid) as "photo_cnt" 

,CASE WHEN prot_template is not null THEN (select display_name from se_t_protoc_templates pt where pt.protocol_templ_key=se_service_reports.prot_template limit 1) 
ELSE 'Standardowy' END as "template"
,(select rep2cro from se_t_protoc_templates pt where pt.protocol_templ_key=se_service_reports.prot_template limit 1) as "rep2cro"
`,
  selSingleReportMain: `  id, date_added, addedby, call_id, ereport, report_date,teamleader_final_mark, work_executed_text, waive_warranty,
materials_used_text, end_state_status, sendreportbyemail, invoice_no,  zalecane_prace_dodatkowe, execution_issues, execution_issues_text, 
technical_status_postreport, custrefusal2sign, custrefulasreason, custacceptname, custacceptteleph, custacceptemail, 
service_completed, paid_services, system_left_operational, approved_for_operations, call_reason_fixed,
substitutes_used, system_operational_remarks, further_services_needed,uuid,prot_template,embedded_protocol
,client_request_technician_comments 
,(select case when count(*)>0 then true else false end  from se_service_report_materials m where m.report_id=se_service_reports.id) as "has_materials"       
, coalesce((select case  when length(signature)>30 then true else false end from se_service_report_acceptance_signatures cs where cs.report_id=se_service_reports.id   limit 1  ), false) as "is_signed"
, case when custrefusal2sign=true then true else false end as "self_signed"
,(select status_id from se_service_calls se where se.id = se_service_reports.call_id) as "call_status_id"
,(select string_agg(to_char(work_start,'yyyy.MM.dd'),'; ')  from se_service_report_timing tt where  tt.report_id=se_service_reports.id ) as "work_days" 
,(select string_agg(to_char(work_start, 'HH24:MI')||'-'||to_char(work_end, 'HH24:MI') , '; ')  from se_service_report_timing tt where  tt.report_id=se_service_reports.id )  as "work_hours" 
`,
  callLookUpdShort: ` 
id,date_registered, call_type_id,
coalesce((select is_warranty from se_service_calls_types cc where cc.id=se_service_calls.call_type_id), false) as "is_call_type_warranty", 
coalesce((select is_maintenance from se_service_calls_types cc where cc.id=se_service_calls.call_type_id), false) as "is_call_type_maintenance", 
status_id,(select status_name from se_service_call_status st where st.id=se_service_calls.status_id) as "status",
site_id, (select site_name from  s_site_erp s where s.id=se_service_calls.site_id) as "site" 
,(select erp_code from  s_site_erp s where s.id=se_service_calls.site_id) as "erp_code" 
,(SELECT coalesce(address1||', ','') || coalesce(zip_code||' ','') || city  FROM public.s_assets_site sa  where sa.parent_id=se_service_calls.site_id limit 1) as "site_addr"
,(SELECT client_code  FROM public.s_assets_site sa  where sa.parent_id=se_service_calls.site_id limit 1) as "site_client_code"
, client_caller_name,client_id, client_order_no
,(select erp_name from  business_partner_erp b where b.id=se_service_calls.client_id) as "client"
,(select erp_id from  business_partner_erp b where b.id=se_service_calls.client_id) as "erp_id"

,(select trim(coalesce(address1,'')||','|| coalesce(address2,'')) from  business_partner_erp b where b.id=se_service_calls.client_id) as "address"
,condit_lbr_per_hour,client_issue_description
,(select nazwa from se_service_calls_types cc where cc.id= se_service_calls.call_type_id) as "call_type"
, (select string_agg(nazwa,', ') from catalogue cc where cc.id in (select instal_type_id  from s_assets_service_main ass where ass.id IN 
     (select asset_id from se_service_calls_zones z where (z.attach2call=true) and z.call_id = se_service_calls.id))) as "z_rodz_inst" 
,block_protocoltime_display
`,
  selectAttachmentsView: ` 
  file_id as file_id
, file_id as id 
, id as link_id
, (SELECT file_name from file_attachments fa where fa.id=file_id) as "file_name"
, (SELECT date_added from file_attachments fa where fa.id=file_id) as "date_added"
, (SELECT file_size from file_attachments fa where fa.id=file_id) as "file_size"
, (SELECT file_size/1024 from file_attachments fa where fa.id=file_id) as "file_size_kb"
, '' as "parent_id" 
 `,
  selectAttachmentsView4Projekt: ` 
  id, file_id, doc_type_id
, (SELECT file_name from file_attachments fa where fa.id=file_id) as "file_name"
, (SELECT date_added from file_attachments fa where fa.id=file_id) as "date_added"
, (SELECT file_size from file_attachments fa where fa.id=file_id) as "file_size"
, (SELECT file_size/1024 from file_attachments fa where fa.id=file_id) as "file_size_kb"
, '' as "parent_id" 
 `,
  selectAttachmentsView4Oferta: ` 
  file_id as file_id
, file_id as id 
, id as link_id
, mark4index
, (SELECT file_name from file_attachments fa where fa.id=file_id) as "file_name"
, (SELECT date_added from file_attachments fa where fa.id=file_id) as "date_added"
, (SELECT file_size from file_attachments fa where fa.id=file_id) as "file_size"
, (SELECT file_size/1024 from file_attachments fa where fa.id=file_id) as "file_size_kb"
, '' as "parent_id" 
 `,
  selReportTimingObject: `
  id , work_start ,work_end ,employee_id ,travel_time_hrs, trvl_start, trvl_end, retr_start, retr_end  
  , (select COALESCE(fname,'')||' '||COALESCE(lname,'') from se_employees ee where ee.id=employee_id) as employee  
  , round(100*extract(epoch from work_end- work_start)/(3600))/100 as "workHours" 
  , round(100*extract(epoch from trvl_end- trvl_start)/(3600))/100 as "trvHours" 
  , round(100*extract(epoch from retr_end- retr_start)/(3600))/100 as "retrHours" 
  , coalesce(distance_km_travel,0) as distance_km_travel 
  , coalesce(return_km_travel,0) as return_km_travel     
  , coalesce(distance_km_travel,0)+coalesce(return_km_travel,0) as total_distance
  , CASE WHEN not travel_time_hrs is null THEN  travel_time_hrs 
    ELSE coalesce(round(100*extract(epoch from trvl_end- trvl_start)/(3600))/100,0) + coalesce(round(100*extract(epoch from retr_end- retr_start)/(3600))/100 ,0) END 
    as "travel_time_hrs"  
  , is_planning_row,date_added,uuid,inactive
  , (select  contra_rate from se_employees ee where ee.id=employee_id) as contra_rate 
  , (select  contra_rate_currency from se_employees ee where ee.id=employee_id) as contra_rate_curr
`
  //, (select COALESCE(fname,'')||' '||COALESCE(lname,'') from se_employees ee where ee.id=added_by) as addedby_name 
  ,
  callReportSectionSelect: ` 
 id, date_added
, (select fname||' '||lname from se_employees ee where ee.id=se_service_reports.addedby) as "added_by_name"
, ereport, report_date
, work_executed_text as "work_exec"
, case when length(work_executed_text)>30 THEN left(work_executed_text,50)||'...' else work_executed_text end as "work_exec_short"
, service_completed, paid_services, system_left_operational, call_reason_fixed ,call_reason_fixed, system_operational_remarks
, CASE WHEN length(system_operational_remarks)>0 THEN true ELSE false END as "hasRemarks"
, approved_for_operations,substitutes_used
, (select count(*) from se_service_report_timing tt where tt.report_id=se_service_reports.id   ) as "timingCnt"
, COALESCE((select  sum(COALESCE(EXTRACT(HOUR FROM work_end-work_start)*60+ EXTRACT(MINUTE FROM work_end - work_start),0 ))/60 
   from se_service_report_timing tt where tt.report_id=se_service_reports.id ),0)  as "totalWorkTime"
, (select count(*) from se_service_reports_2_attachments s2a where s2a.report_id=se_service_reports.id) as "attachmCnt"
                        
 `,

  selZlecenieZonesInnerAssetSelect: ` 
   id ,  name_instal 
, (select site_name from s_site_erp sr where sr.id=s_assets_service_main.site_id) as "obiekt" 
, (select nazwa FROM catalogue cc where cc.id=instal_type_id) as "typinstalacji" 
, (select vendorname from s_asset_vendors v where v.id=s_assets_service_main.vendor_id) as "dostawca"  
,  0 as days2WarrExp     
,  0 as daysOnWarr  
, (select fname||' '||lname from se_employees e where e.id = (select pr_manager_id from p_projects p where p.id 
     in (select project_id from s_asset_2_project s2p where s2p.asset_id=s_assets_service_main.id order by id desc limit 1)) ) as project_manager  
, false  as onWarr    
, cast((select count(*) from se_service_calls_zones z where z.asset_id=s_assets_service_main.id) as integer) as "callCount" 
, cast((select count(*) from s_asset_2_contract a2c where a2c.asset_id=s_assets_service_main.id) as integer)::integer as "contractsCount"   
, (select coalesce(sum(case when extract(epoch from valid_to-current_date)>=0 or (indefinite_contract=true) THEN 1 ELSE 0 END),0)
  from se_service_contracts sc where sc.id in (select contract_id from s_asset_2_contract a2c where a2c.asset_id=s_assets_service_main.id))::integer  as "contractsActive"
`,

  selectRepTimingLista: `id, report_id, date_added, added_by, employee_id,  
  work_start,work_start_test, work_end, travel_time_hrs, uwagi,uuid `,

  selContractBilling4List: `
    id, date_added
  , added_by, (select fname ||' ' || lname from se_employees e where e.id=added_by) as "addedbyName" 
  , contract_id, asset_id, billing_freq_id
  , (select nazwa from catalogue_time_periods c where c.id=s_asset_2_contract.billing_freq_id) as "billing_freq"
  , first_billing, asset_revenue, currency, costs, cost_currency, labour_hours 
    `,
  selectSitesLista: ` 
  id, erp_code
  , CASE WHEN COALESCE(site_type,'')='' THEN '' ELSE  COALESCE(site_type,'') ||'/'||COALESCE(hierarchical_site,'') END  as "type_hier"
  , site_name as "sitename"
  , (select id from s_assets_site s where s.parent_id=s_site_erp.id limit 1) as "ext_id" 
  , (select address1 from s_assets_site s where s.parent_id=s_site_erp.id limit 1) as "address"
  , (select  COALESCE(zip_code,'') ||' '|| COALESCE(city,'') from s_assets_site s where s.parent_id=s_site_erp.id limit 1) as "city"
  , (select nazwa from catalogue c where c.id=(Select vertical_mkt_id from s_assets_site s where s.parent_id=s_site_erp.id limit 1) ) as "segment"
  ,(select teamleader_id from s_assets_site ts where ts.parent_id= s_site_erp.id) as tlid
  ,(select fname||' '||lname from se_employees e where e.id = (select teamleader_id from s_assets_site ts where ts.parent_id= s_site_erp.id)) as tl
  ,(select s_group_id from s_assets_site ts where ts.parent_id=s_site_erp.id) as grp_id
  ,(select group_name    from g_service_groups g where g.id=(select s_group_id from s_assets_site ts where ts.parent_id=s_site_erp.id)) as s_grp
  ,(select fname||' '||lname from se_employees e where e.id =(select teamleader_id from g_service_groups g where g.id=(select s_group_id from s_assets_site ts where ts.parent_id=s_site_erp.id)) ) as sgrp_leader
  , cast((select count(*) from s_assets_site s where s.parent_id=s_site_erp.id) as integer) as "childRec"
  , cast((select count(*) from site_2_contact sc where sc.site_id=s_site_erp.id) as integer) as "contacts_cnt"
  , cast((select count(*) from se_service_calls cc where cc.site_id=s_site_erp.id) as integer) as  "calls_cnt"
  , cast((select count(*) from s_assets_service_main sas where sas.site_id=s_site_erp.id) as integer) as "install_count"  
  , cast((select count(*) from s_assets_devices ad where ad.site_id=s_site_erp.id) as integer) as "device_count" 
  , (select string_agg(nazwa,', ') from catalogue  where catalogue.id in (select instal_type_id from s_assets_service_main asm where asm.site_id= s_site_erp.id)
  ) as "rodzaje_inst"
  ,(
  select string_agg( (select erp_name||'' from business_partner_erp bpr where bpr.id=sc.client_id), ', ') 
      from se_service_contracts sc 
    where sc.id in (
      (select contract_id from s_asset_2_contract a2c where a2c.asset_id in (select id from s_assets_service_main sas where sas.site_id=s_site_erp.id) group by contract_id) 
    ) 
    and (((EXTRACT(day from (current_date - valid_to)) <=0) and (EXTRACT(day from (valid_from-current_date))<=0))  or ((indefinite_contract=true) and (EXTRACT(day from (valid_from-current_date))<=0)) )=true
  )
  as "clients_w_contracts"
, (select default_client_id  from s_assets_site o where o.id = (select id from s_assets_site s where s.parent_id=s_site_erp.id limit 1)) as "def_client_id" 

 

`,
  selectSites4EKPCalls: ` 
  id, erp_code, site_name as "sitename" 
, (select address1 from s_assets_site s where s.parent_id=s_site_erp.id) as "address"
, (select  COALESCE(zip_code,'') ||' '|| COALESCE(city,'') from s_assets_site s where s.parent_id=s_site_erp.id) as "city"  
`
  ,

  selectSiteShort: ` id, sitename, address1 as adress, zip_code, city, 
       aktywny, (SELECT nazwa FROM catalogue c Where c.id =vertical_mkt_id ) as "segment", 
       (SELECT count(*) FROM se_service_calls sc where sc.site_id = s_assets_site.id)  as calls_count
     `,

  assetsList: ` 
    id ,(select fname ||' ' || lname from se_employees e where e.id=created_by_id) as "addedby", date_created
    , (select site_name  from s_site_erp ob where ob.id=site_id) as "site"
    , (select erp_code from s_site_erp ob where ob.id=site_id) as "erp_code"
    , instal_type_id, (SELECT nazwa FROM catalogue cc where cc.id=instal_type_id) as "typinstalacji"
    , name_instal, wip_in_project    
    ,(select fname ||' ' || lname from se_employees e where e.id=salesman_id) as "salesman" 
    , case when not project_id is null then true else false end as "has_project"
    ,(select count(*) from s_assets_devices dev where dev.asset_id=s_assets_service_main.id) as "device_count"
    ,coalesce((select p.pr_name from p_projects p where p.id=s_assets_service_main.project_id),'') as "projekt_n" 
    ,(select count(*) from s_asset_2_contract a2r where a2r.asset_id=s_assets_service_main.id)::integer as "contracts_count"  
    , (select coalesce(sum(case when extract(epoch from valid_to-current_date)>=0 or (indefinite_contract=true) THEN 1 ELSE 0 END),0)
    from se_service_contracts sc where sc.id in (select contract_id from s_asset_2_contract a2c where a2c.asset_id=s_assets_service_main.id))::integer  as "contractsActive"
    ,(select erp_name from business_partner_erp bp where bp.id=s_assets_service_main.dostawca_id) as "podw_name"
    ,(select coalesce(address1,'') ||' ' || coalesce(address2,'') from business_partner_erp bp where bp.id=s_assets_service_main.dostawca_id) as "podw_adres"
    ,(select count(*)>0 from se_service_calls c where c.asset_id=s_assets_service_main.id) OR
(select count(*)>0 from s_asset_2_contract c where c.asset_id=s_assets_service_main.id) OR  
(select count(*)>0 from s_asset_2_project c where c.asset_id=s_assets_service_main.id) OR
(select count(*)>0 from se_service_call_conditions c where c.asset_id=s_assets_service_main.id) OR
(select count(*)>0 from s_assets_devices c where c.asset_id=s_assets_service_main.id) OR
(select count(*)>0 from s_assets_warranties c where c.asset_id=s_assets_service_main.id) OR
(select count(*)>0 from s_asset_2_contract c where c.asset_id=s_assets_service_main.id) OR
(select count(*)>0 from  attachment_2_asset  c where c.parent_id=s_assets_service_main.id)  as "is_refcd"
,(select cast(count(*) as int) from se_service_calls_zones z where z.asset_id=s_assets_service_main.id and attach2call=true) as call_cnt
,(select cast(count(*) as int) from se_service_reports sr where sr.call_id in (select call_id from se_service_calls_zones z where attach2call=true and z.asset_id=s_assets_service_main.id)) as report_cnt
 
`,

  projectSelect4Asset: `
    id, date_added, added_by
, project_type_id,(select nazwa from catalogue c where c.id=p_projects.project_type_id) as "typ"
, client_id, (select erp_name from business_partner_erp ce where ce.id=p_projects.client_id) as "client"
, pr_manager_id, (select fname||' '||lname from se_employees ee where ee.id= p_projects.pr_manager_id) as "pm"
, site_id, (select site_name from s_site_erp o where o.id=p_projects.site_id) 
, contract_sign_date, pr_status_id, pr_start_date, pr_end_date
, pr_number , pr_remarks 
, pr_value, pr_value_currency, pr_name
    `,

  schedTimingRaw4List: `*
            , (select fname||' '||lname from se_employees ee where ee.id=se_service_report_timing.added_by) as "autor"
            , (select fname||' '||lname from se_employees ee where ee.id=se_service_report_timing.employee_id) as "employee"
            , (select phone from se_employees ee where ee.id=se_service_report_timing.employee_id) as "phone"    
            , (select status_id from se_service_Calls sc where sc.id=se_service_report_timing.call_id) as "status_id"     
            , COALESCE((select status_name from se_service_call_status scs where scs.id =(Select status_id from se_service_Calls sc where sc.id=se_service_report_timing.call_id)),'') as "status"  
            , COALESCE((select site_name from s_site_erp sr where sr.id =(Select site_id from se_service_Calls sc where sc.id=se_service_report_timing.call_id)),'') as "obiekt" 
            , case when (extract(epoch from work_end-current_timestamp)>0) then true else false end as "trwa" 
            , round(extract(epoch from work_end-current_timestamp)/(3600)) as "hrs_remain"
            , round(extract(epoch from work_end-work_start)/(3600)) as "duration_hrs"
            , (select text from se_service_report_timing_categories tc where tc.id= se_service_report_timing.category_id) as "category"       
          
        `,
  schedTiming4CallView: `
           id, date_added, added_by
            , employee_id,(select fname||' '||lname from se_employees ee where ee.id=se_service_report_timing.employee_id) as "employee"
            ,(select phone from se_employees ee where ee.id=se_service_report_timing.employee_id) as "phone"
            , report_id, call_id  
            , distance_km_travel
            , work_start as "StartTime"
            , work_end as "EndTime"
            , travel_time_hrs  
            , (select status_id from se_service_Calls sc where sc.id=se_service_report_timing.call_id) as "status_id"     
            , uwagi 
            , category_id,leader_grupy, contract_id, project_id 
            , round(extract(epoch from work_end-current_timestamp)/(3600)) as "hrs_remain"       
        `,
  ekp_report_list: `
id, date_added, ereport,call_id,addedby
,(select fname||' '||lname from se_employees ee where ee.id = se_service_reports.addedby) as "autor"
,work_executed_text ,service_completed, paid_services, system_left_operational,call_reason_fixed, approved_for_operations
,substitutes_used, further_services_needed
,(select string_agg(  substring(fname from 1 for 1)||'.'||lname,', ') from se_employees ee where ee.id in (select employee_id from se_service_report_timing tt where  tt.report_id=se_service_reports.id  ) ) as "technicy"
,(select round(cast(SUM(COALESCE(EXTRACT(HOUR FROM work_end-work_start)*60+ EXTRACT(MINUTE FROM work_end - work_start),0) )/60 as numeric(10,2))  ,2) 
from se_service_report_timing tt where tt.report_id=se_service_reports.id and tt.is_planning_row<>true) as "workHours"  
,coalesce((select length(signature)>30   from se_service_report_ehs_signatures seh where seh.report_id=se_service_reports.id),false) as "isSignedEHS" 
,coalesce((select length(signature)>30 from se_service_report_acceptance_signatures seh where seh.report_id= se_service_reports.id),false) as "isSignedFin"    
,coalesce((select length(signature)>30 from se_service_report_technician_signatures seh where seh.report_id= se_service_reports.id), false) as "isSignedTech"  
,coalesce((select nazwa_protokolu from se_t_protoc_templates t where t.protocol_templ_key=se_service_reports.prot_template),'Standardowy') as "prot_templ_n"
     
        `,
  ekp_report_lst_info_object: `
  id,(select string_agg(substring(fname from 1 for 1)||'.'||lname,', ') from se_employees ee where ee.id in (select employee_id from se_service_report_timing tt where  tt.report_id=se_service_reports.id  ) ) as "technicy"
, (select fname||' '||lname from se_employees ee where ee.id = se_service_reports.addedby) as "autor"
,(select sum(round(10*extract(epoch from work_end- work_start)/(3600))/10)
 from se_service_report_timing tt where tt.report_id=se_service_reports.id and tt.is_planning_row<>true) as "workHours"   
    `,
  ekp_siteList4techn: `
  id, erp_code,
  (select cast(count(*) as int) from se_service_calls scc where scc.site_id=s_site_erp.id) as "call_cnt",
  (select cast(count(*) as int) from se_service_reports sr where sr.call_id in (select id from se_service_calls scc where scc.site_id=s_site_erp.id)) as "report_cnt"
  `,
  //site_name,
  mat_mast_get: `* 
  ,(select case when count(*)>0 then true else false end  from mm_document_items it where it.mat_index=mm_master.mat_index) OR (Select case when count(*)>0 then true else false end  from o_oferta_estymacja_linie e where e.mat_master_id=mm_master.id)
   as "has_transactions"   
`,
  mat_master_list_w_stock: ` 
  id, mat_index, isservice, mat_name ,sync_mobile 
  ,group_id,(select group_name from mm_master_groups g where g.id=mm_master.group_id) as "grupa"
  ,uom_id,(select nazwa from catalogue c where c.id=uom_id) as "uom"
  ,dateadded,dateupdated
  ,unit_cost, unit_cost_currency
  ,trim(longmaterialtext) as "longmaterialtext"
  ,coalesce((select sum(qty*case when t.credit=true then 1 else -1 end)
  from public.mm_document_header h join mm_document_items i on h.id=i.parent_id join mm_document_types t on t.id=h.type_id 
  where i.mat_index=mm_master.mat_index) ,0) as "zapas" 
  ,cast((select count(*) from public.mm_document_header h join mm_document_items i on h.id=i.parent_id join mm_document_types t on t.id=h.type_id 
  where i.mat_index=mm_master.mat_index) as integer) as "trans_cnt"
  ,(select count(*) from pr_pricelist_details pd where pd.mat_index= mm_master.mat_index) as "pricelst_count"
  ,(select sum(qty) from mm_tech_stock_imported pd where pd.mat_index= mm_master.mat_index) as "stock_slave"
  , round((select sum(qty) from mm_tech_stock_imported pd where pd.mat_index= mm_master.mat_index)*unit_cost,1) as "sto_slv_val"
    `,
  sms_api_plan_timing: `
  employee_id,(select fname||' '||lname from se_employees ee where ee.id=se_service_report_timing.employee_id) as "employee"
  ,(select phone from se_employees ee where ee.id=se_service_report_timing.employee_id) as "phone"
  ,(select email from se_employees ee where ee.id=se_service_report_timing.employee_id) as "email"
  ,leader_grupy
  ,call_id,to_char(work_start, 'DD.MM.YYYY HH24:MI') as "work_start_str"  
  `,
  oferty_list_main: ` id, prefix
, id || coalesce('-'||(select version_no from o_oferta_2_estymacja o2e where o2e.oferta_id=o_oferta_head.id and o2e.is_current=true limit 1),'') as "full_id"
, (select version_no from o_oferta_2_estymacja o2e where o2e.oferta_id=o_oferta_head.id and o2e.is_current=true limit 1) as "cur_version"
, (select count(*) from o_oferta_2_estymacja o2e where o2e.oferta_id=o_oferta_head.id) as "ver_count"
, custom_id, date_registered,   date_last_change, title, document_date
, added_by, (select substring(fname,1,1) ||'.'||lname from se_employees ee where ee.id=o_oferta_head.added_by) as "autor"
, owner_id, (select substring(fname,1,1) ||'.'||lname from se_employees ee where ee.id=o_oferta_head.owner_id) as "owner"
, koordynator_id, (select fname||' '||lname from se_employees ee where ee.id=o_oferta_head.koordynator_id) as "koordynator"
, status_id, (select status_name from o_oferta_status s where s.id=o_oferta_head.status_id) as "status"
, site_id, (select site_name from s_site_erp sr where sr.id = o_oferta_head.site_id) as "site"
, (select coalesce(address1,'') || ', '|| coalesce(zip_code,'') ||' '|| coalesce(city,'') from s_assets_site sa where sa.parent_id= o_oferta_head.site_id)  as "s_adres"
, installation_id, (select name_instal from s_assets_service_main m where m.id = o_oferta_head.installation_id) as "installation"  
, client_id,(select erp_name from business_partner_erp cm where cm.id=o_oferta_head.client_id) as client
, client_is_bill2
, bill_to_id,(select erp_name from business_partner_erp cm where cm.id=o_oferta_head.client_id) as bill2  
, case when (extract(epoch from valid_till-current_timestamp)<0) and status_id=100 then true else false end as "validity_expired"  
, case when  (extract(epoch from valid_till-current_timestamp)>0) and 
  extract(epoch from (valid_till - interval '7 days' )-current_timestamp)/(24*3600) <0 and status_id=100
  then true else false end as "validity_expiring_7"
, client_rfq_reference, client_rfq_date , client_rfq_contact, client_rfq_telefon, client_rfq_email, client_rfq_our_contact_id 
, (select count(*) from o_oferta_2_attachments oa where oa.oferta_id=o_oferta_head.id and mark_deleted=false) as attachm_cnt 
, (select count(*) from se_service_calls sc where sc.oferta_id=o_oferta_head.id) as "calls_cnt"
, (select string_agg(cast(id as character varying),', ') from se_service_calls sc where sc.oferta_id=o_oferta_head.id) as "call_nos"
, hdr_rebate, to_char(valid_till, 'YYYY-MM-DD') as "valid_till" 
    `,
  oferty_list_4BI: ` id, prefix, custom_id 
, id || coalesce('-'||(select version_no from o_oferta_2_estymacja o2e where o2e.oferta_id=o_oferta_head.id and o2e.is_current=true limit 1),'') as "full_id"
, (select cast(count(*) as int) from o_oferta_2_estymacja o2e where o2e.oferta_id=o_oferta_head.id) as "ver_count"
, date_registered,  date_last_change,exp_decision_date,probabil, title, document_date
, added_by, (select substring(fname,1,1) ||'.'||lname from se_employees ee where ee.id=o_oferta_head.added_by) as "autor"
, owner_id, (select substring(fname,1,1) ||'.'||lname from se_employees ee where ee.id=o_oferta_head.owner_id) as "owner"
, koordynator_id, (select substring(fname,1,1) ||'.'||lname from se_employees ee where ee.id=o_oferta_head.koordynator_id) as "koordynator"
, status_id, (select status_name from o_oferta_status s where s.id=o_oferta_head.status_id) as "status"
, site_id , client_id, client_is_bill2, bill_to_id  
, case when (extract(epoch from valid_till-current_timestamp)<0) and status_id=100 then true else false end as "validity_expired"  
, client_rfq_reference, client_rfq_date , client_rfq_contact, hdr_rebate, valid_till 
, (select version_no from o_oferta_2_estymacja o2e where o2e.oferta_id=o_oferta_head.id and o2e.is_current=true limit 1) as "curr_version"
, (select estymacja_id from o_oferta_2_estymacja o2e where o2e.oferta_id=o_oferta_head.id and o2e.is_current=true limit 1) as "curr_estimation"
  `,
  oferta_main_select_line_item: `
  *, (select nazwa from catalogue c where c.id=o_oferta_estymacja_linie.uom_id) as "uom"
   , (select mat_index from mm_master mm where mm.id=o_oferta_estymacja_linie.mat_master_id) as "mm_index" 
   , (select mat_name from mm_master mm where mm.id=o_oferta_estymacja_linie.mat_master_id) as "mm_name"  
  ` ,
  oferta_single: `
   *, coalesce(hdr_rebate,0) as "hdr_rebate",  cast(seller_id as character varying) as "seller_id"
  
  `
  ,
  device_list:
    ` id ,date_created
, (select fname||' '||lname from se_employees se where se.id= created_by_id) as "autor"
,  asset_id,site_id, dev_group_id, coalesce((select group_name from s_assets_device_groups dg where dg.id=dev_group_id),'n/a')  as "device_group"
, (select name_instal from s_assets_service_main m where m.id =s_assets_devices.asset_id) as "asset" 
, CASE WHEN site_id is not null THEN  (select site_name from s_site_erp sr where sr.id =s_assets_devices.site_id) ELSE 
(select site_name from s_site_erp sr where sr.id=(select site_id from s_assets_service_main ar where ar.id=s_assets_devices.asset_id)) END as "site" 
, installed_by,device_name, device_identification, device_number,device_type,serial_no,date_installed
, date_installed, date_purchased ,location_name
,vendor_id, (select erp_name from business_partner_erp b where b.id=s_assets_devices.vendor_id) as "vendor"
,manufacturer_id, (select vendorname from s_asset_vendors v where v.id=s_assets_devices.manufacturer_id) as "manufacturer"
,CASE WHEN length(device_technical_props)>0 THEN true ELSE false END as "has_techprops"
,CASE WHEN length(device_comments)>0 THEN true ELSE false END as "has_comments" 
,cast((select count(*) from s_device_2_contract d2c where d2c.machine_id=s_assets_devices.id) as integer) as "contracts_count"
,tech_data_details
,(select count(*) from se_service_report_machines s2m where s2m.machine_id=s_assets_devices.id and s2m.checked=true) as "report_cnt"
`
  ,
  single_device: `
*, (select cast(count(id) as int) from se_service_report_machines m where m.checked=true and m.machine_id = s_assets_devices.id) as "proto_cnt"
 ,(select fname||' '||lname from se_employees ee where ee.id=created_by_id) as "autor",
case when (extract(epoch from warranty_expiry_date-current_timestamp)>0 AND extract(epoch from current_timestamp-warranty_start_date)>0) THEN true ELSE false END as "on_warranty"
`
  ,
  lista_cenowa: `
 id, mat_index
,(select mat_name from mm_master mm where mm.mat_index=pr_pricelist_details.mat_index) as "mat_name"
,(select longmaterialtext from mm_master mm where mm.mat_index=pr_pricelist_details.mat_index) as "longmaterialtext"
,(select length(longmaterialtext)>0 from mm_master mm where mm.mat_index=pr_pricelist_details.mat_index) as "has_longtxt"
,(select nazwa from catalogue c where c.id=(select uom_id from mm_master mm where mm.mat_index=pr_pricelist_details.mat_index)) as "jm"
, price, currency, inherit_currency
, price_list_id
,(select pricelist_name from pr_price_list pl where pl.id=price_list_id) as "price_list_name"
,(select is_default from pr_price_list pl where pl.id=price_list_id) as "is_default" 
  ` ,
  lista_cennikow: `
   id, date_added, addedby_id, pricelist_name, valid_from, valid_to, pr_comments, is_hidden, is_default
 ,(select count(*) from pr_pricelist_details pd where pd.price_list_id=pr_price_list.id) as "item_cnt"  
  `,
  cena_getsingle: `
  id, price_list_id, mat_index, price, currency, inherit_currency
,(select pricelist_name from pr_price_list pr where pr.id=pr_pricelist_details.price_list_id) as "pricelist_name"
, (select mat_name from mm_master mm where mm.mat_index=pr_pricelist_details.mat_index) as "mat_name"
, (select isservice from mm_master mm where mm.mat_index=pr_pricelist_details.mat_index) as "usluga"
, (select longmaterialtext from mm_master mm where mm.mat_index=pr_pricelist_details.mat_index) as "longmaterialtext"
, (select nazwa from catalogue c where c.id=(select uom_id from mm_master mm where mm.mat_index=pr_pricelist_details.mat_index)) as "uom"
  
  `,
  condition2client: `
  id, cust_mast_id, condition_type_id
, (select c_name from pr_conditions_def cd where cd.id=customer_2_conditions.condition_type_id) as "c_name"
, (select is_pricelist_discount from pr_conditions_def cd where cd.id=customer_2_conditions.condition_type_id) as "is_pricelist_discount"
, (select is_group_discount from pr_conditions_def cd where cd.id=customer_2_conditions.condition_type_id) as "is_group_discount"
, (select is_special_price from pr_conditions_def cd where cd.id=customer_2_conditions.condition_type_id) as "is_special_price"
, (select is_manual_price from pr_conditions_def cd where cd.id=customer_2_conditions.condition_type_id) as "is_manual_price"
, (select is_manual_discount from pr_conditions_def cd where cd.id=customer_2_conditions.condition_type_id) as "is_manual_discount"
, (select is_price_list from pr_conditions_def cd where cd.id=customer_2_conditions.condition_type_id) as "is_price_list"
, mat_index
, (select mat_name from mm_master m where m.mat_index=customer_2_conditions.mat_index) as "mat_name"
, c_val_price, c_waluta
, c_val_group_id
, (select group_name from mm_master_groups g where g.id=customer_2_conditions.c_val_group_id) as "mat_group"
, c_val_discount
, c_remarks
  `
  ,
  conditonLine4Estimation: `
  id, added_by, date_added, est_line_id, condition_type_id
, (select c_name from pr_conditions_def cd where cd.id=o_oferta_estym_line_conditions.condition_type_id) as "c_name"
, price_list_id, (select pricelist_name from pr_price_list p where p.id=o_oferta_estym_line_conditions.price_list_id) as "price_list_name"
, mat_group_id, (select group_name from mm_master_groups g where g.id=o_oferta_estym_line_conditions.mat_group_id) as "mat_group"
, mat_index, (select mat_name from mm_master m where m.mat_index=o_oferta_estym_line_conditions.mat_index) as "mat_name"
, cond_price, cond_currency, cond_discount, cond_remarks, is_active
, (select is_pricelist_discount from pr_conditions_def cd where cd.id=o_oferta_estym_line_conditions.condition_type_id) as "is_pricelist_discount"
, (select is_group_discount from pr_conditions_def cd where cd.id=o_oferta_estym_line_conditions.condition_type_id) as "is_group_discount"
, (select is_special_price from pr_conditions_def cd where cd.id=o_oferta_estym_line_conditions.condition_type_id) as "is_special_price"
, (select is_manual_price from pr_conditions_def cd where cd.id=o_oferta_estym_line_conditions.condition_type_id) as "is_manual_price"
, (select is_manual_discount from pr_conditions_def cd where cd.id=o_oferta_estym_line_conditions.condition_type_id) as "is_manual_discount"
, (select is_price_list from pr_conditions_def cd where cd.id=o_oferta_estym_line_conditions.condition_type_id) as "is_price_list"
  `
  ,
  listaGwarancji: `
  id, created_by_id, date_created
, site_id , (select site_name ||coalesce('('|| site_type||')','') from s_site_erp ob where ob.id=site_id) as "site"
, asset_id,(select name_instal from s_assets_service_main ob where ob.id=asset_id) as "asset_name" 
, machine_id, (select substring(device_name,0,60) from s_assets_devices ad where ad.id=machine_id) as "machine_name" 
, war_type_id, client_id, client_statutory_warranty, warranty_name, warranty_description
, warranty_start_date, warranty_expiry_date, statutory_warr_expiry_date, date_sold, date_installed, installed_by_id
,installed_by, client_maintenance_orders_required, vendor_id
,vendor_warranty, vendor_statutory_warranty, vendor_warranty_start_date
,vendor_warranty_expiry_date, vendor_statutory_warr_expiry_date
,date_purchased, manufacturer_id, manufacturer_warranty, manfct_warranty_start_date, manfct_warranty_expiry_date 
, case when (extract(epoch from statutory_warr_expiry_date-current_timestamp)>0 AND client_statutory_warranty=true) THEN true ELSE false END as "on_cli_stat_warranty" 
, case when (extract(epoch from warranty_start_date-current_timestamp)>0 AND extract(epoch from current_timestamp-warranty_expiry_date)>0) THEN true ELSE false END as "on_cli_warranty" 
, case when (extract(epoch from vendor_statutory_warr_expiry_date-current_timestamp)>0 AND vendor_statutory_warranty=true) THEN true ELSE false END as "on_vendor_stat_warranty" 
, case when (extract(epoch from vendor_warranty_start_date-current_timestamp)>0 AND extract(epoch from current_timestamp-vendor_warranty_expiry_date)>0) THEN true ELSE false END as "on_vendor_warranty" 
, case when (manufacturer_warranty=true) AND (extract(epoch from manfct_warranty_start_date-current_timestamp)>0 AND extract(epoch from current_timestamp-manfct_warranty_expiry_date)>0) THEN true ELSE false END as "on_manufact_warranty" 
  `
  ,
  listGwarancje4Site: `
      id, created_by_id, date_created 
    , site_id,  (select site_name  from s_site_erp ob where ob.id=site_id) as "site" 
    , asset_id , (select name_instal from s_assets_service_main m where m.id =  asset_id) as "asset_name"   
    , machine_id
    , (select device_name from s_assets_devices d where d.id=machine_id) as "device" 
    , CASE WHEN machine_id is not null THEN 'Urządzenie' ELSE
      CASE WHEN asset_id is not null THEN 'Instalacja' ELSE
      CASE WHEN site_id is not null THEN 'Obiekt' ELSE '---' END END END as "warranty_subject"

    , war_type_id, client_id, client_statutory_warranty, warranty_name, 
    warranty_description, warranty_start_date, warranty_expiry_date, 
    statutory_warr_expiry_date, date_sold, date_installed, installed_by_id, 
    installed_by, client_maintenance_orders_required, vendor_id, 
    vendor_warranty, vendor_statutory_warranty, vendor_warranty_start_date, 
    vendor_warranty_expiry_date, vendor_statutory_warr_expiry_date, 
    date_purchased, manufacturer_id, manufacturer_warranty, manfct_warranty_start_date, 
    manfct_warranty_expiry_date, vendor_stat_warranty_limitations, 
    client_stat_warranty_limitations 
  `,
  maintScheduleList: `
    *,(select nazwa from catalogue_time_periods tp where tp.id=interval_id) as "okres"
  `
  ,
  maintScheduleTask: `
    id, created_by_id, date_created, schedule_id, mandatory, comment_required, item_no, activity_text
    , (select e.fname||' '||e.lname from se_employees e where e.id =created_by_id limit 1 ) as "autor"
  `,
  oferty_terms_list: `
  id, dateadded, category_id,(select category_name from o_oferta_terms_categories tc where tc.id=o_oferta_terms.category_id) as "category"
, t_display_name, t_long_text, is_enabled,is_default
  `,
  oferta_accept_sel: `id, uuid, added_by, dateadded, acceptor_id, (select fname||' '||lname from se_employees se where se.id=o_oferta_acceptance.acceptor_id) as "acceptor"
, acceptor_decision_date, decision, remarks , curr_acceptor
  `
  ,
  employee_qualifications: `*,(coalesce(extract(epoch from expiry_date-current_date),0)>=0) or (neverexpires=true)   as "isValid" 
  ,case when extract(epoch from expiry_date-current_timestamp ) <0
  then 0 else round(extract(epoch from expiry_date-current_timestamp )/(3600*24)) 
  end  as "day2expire"
  `
  , call_2_mach_sel: `
   id, call_id, device_id,   attach2call
  `,

  document_list: `
id, date_registered, last_modified
, (select type_name from d_doc_folder_types ft where ft.id=(select type_id from d_document_folder df where df.id=d_documents.folder_id)) as "f_type"
, (select folder_aux_name from d_document_folder df where df.id=d_documents.folder_id) as "f_name" 
, added_by, (select fname||' '||lname from se_employees e where e.id=d_documents.added_by) as "autor"
, owner_id, (select fname||' '||lname from se_employees e where e.id=d_documents.owner_id) as "owner"
, doc_name,doc_tags, doc_type_id
, (select type_name from d_doc_types c where c.id= d_documents.doc_type_id  ) as "type" 
, cast((select count(*) from d_document_2_attachments da where (da.mark_deleted=false) and  da.document_id=d_documents.id) as integer) as "attachm_cnt" 
, (select string_agg(nazwa, ',') from catalogue cc where cc.id in (select category_id from d_document_2_category d2c where d2c.document_id=d_documents.id)) as "doc_categories" 
, mark_deleted
, private, public

  `,
  doc_folder_list: `
id, date_added, added_by, owner_id 
, (select fname||' '||lname from se_employees e where e.id=d_document_folder.added_by) as "autor"
, (select fname||' '||lname from se_employees e where e.id=d_document_folder.owner_id) as "owner"
, type_id, (select type_name from d_doc_folder_types c where c.id= d_document_folder.type_id  ) as "type" 
,
CASE when project_id is not null THEN (select pr_name from p_projects p where p.id= d_document_folder.project_id)
ELSE CASE when contract_id is not null THEN (select contract_no from se_service_contracts p where p.id= d_document_folder.contract_id)
ELSE CASE when client_id is not null THEN (select erp_name from business_partner_erp p where p.id=d_document_folder.client_id)
ELSE CASE when call_id is not null THEN 'Zlecenie nr '||call_id
ELSE CASE when report_id is not null THEN 'Protokół nr '|| report_id
ELSE CASE when machine_id is not null THEN (select device_name from s_assets_devices p where p.id=d_document_folder.machine_id)
ELSE CASE when asset_id is not null THEN (select name_instal from s_assets_service_main p where p.id=d_document_folder.asset_id)
END  END END END END END END as   "linked_obj_name"
,
CASE when project_id is not null THEN 'Projekt' 
ELSE CASE when contract_id is not null THEN 'Umowa serwisowa' 
ELSE CASE when client_id is not null THEN 'Klient' 
ELSE CASE when call_id is not null THEN 'Zlecenie serwisowe' 
ELSE CASE when report_id is not null THEN 'Protokół serwisowy' 
ELSE CASE when machine_id is not null THEN 'Urządzenie' 
ELSE CASE when asset_id is not null THEN 'Instalacja' 
END END END END END END END as "linked_obj_type"
, folder_aux_name , folder_tags
, project_id, contract_id, report_id, call_id, client_id, machine_id, asset_id
, mark_deleted, private, public
, (select cast(count(*) as int) from d_documents d where d.folder_id = d_document_folder.id) as doc_count
, (select count(*) from d_document_2_attachments da where da.document_id in (select id from d_documents d where d.folder_id = d_document_folder.id)) as attm_count `
  ,
  mm_master_w_total_stock: `
  mat_index as i, mat_name as n, uom_id,(select nazwa from catalogue c where c.id= uom_id) as "uom",
  0 as "q",   0 as "lc", (SELECT  sum(qty_sign) FROM  ( SELECT CASE  WHEN t.internal_transfer=true THEN CASE WHEN h.from_warehouse_id=h.to_warehouse_id 
THEN CASE WHEN t.credit=true and t.internal=true and h.to_warehouse_id=1 THEN i.qty ELSE 0 END  
ELSE case when h.from_warehouse_id = null then -1*i.qty  -- znak "-" bo wydanie z magazynu raportowania 
else case when h.to_warehouse_id=null then i.qty  -- znak "+" bo przyjęcie na magazyn raportowania 
else 0 end end	END
ELSE case when t.credit=true then i.qty else i.qty*-1 end 
END as "qty_sign"  
FROM public.mm_document_items i join mm_document_header h on i.parent_id=h.id join mm_document_types t on t.id=h.type_id
where (lower(mat_index) = lower(mm_master.mat_index)) 
) as x
) as "t" 
, true as  sm 
,(select group_name from mm_master_groups g where g.id=mm_master.group_id) as "g" 

`
  ,
  fm_ppm_def4asset_list: `
id, date_added, added_by,  (select COALESCE(fname,'')||' '||COALESCE(lname,'') from se_employees ee where ee.id=added_by) as autor  
, empl_resp_id,   (select COALESCE(fname,'')||' '||COALESCE(lname,'') from se_employees ee where ee.id=empl_resp_id) as e_respon 
, CASE WHEN asset_id is not null THEN 'INST' ELSE 'MACH' END as "asset_type" 
, asset_id, (select name_instal from s_assets_service_main m where m.id = asset_id) as "installation" 
, machine_id,(select substring(device_name,0,60) from s_assets_devices ad where ad.id=machine_id) as "machine_name" 
, freq_id, (select nazwa from fm_ppm_frequencies f where f.id=freq_id) as "okres"
, hourly_budget
, remarks
`,
  fm_ppm_plan_list: `
id, ppm_def4asset_id
,(select nazwa from fm_ppm_frequencies f where f.id=(select freq_id from fm_ppm_def4asset def where def.id= ppm_def4asset_id)
) as "okres"
,(select substring(device_name,0,60) from s_assets_devices ad where ad.id=(select machine_id from fm_ppm_def4asset def where def.id= ppm_def4asset_id)) as "machine"
,(select name_instal from s_assets_service_main m where m.id = (select asset_id from fm_ppm_def4asset def where def.id= ppm_def4asset_id)) as "install"
,contract_id, project_id,from_date, to_date,status_static 
`

  ,
  doc_invoice_list: `
 id, date_added, added_by, type_id, status_id, legal_ent_id, bunit_id, gl_account_id, mpk_id, b_partner_id, bp_name, bp_address
        ,bp_zip, bp_city, vatid, fa_number, fa_date, fa_sales_date, fa_cost_month, date_received, net_value, vat_amount, curr , einvoice
        ,customno 
        ,(date_part('epoch'::text, current_timestamp - date_added::date)/3600 < 72) and (from_imap =true) and (b_partner_id is null) and (mpk_id is null) and (einvoice=true) as new_imap_warn
        ,from_imap,is_booked,book_date,book_ref,accountant_id,(select fname||' '||lname from se_employees e where e.id=accountant_id) as "booked_by"
        ,(select fname||' '||lname from se_employees e where e.id=added_by) as autor  
        ,(select entity_name from fdoc_legal_ent s where s.id=fdoc_documents.legal_ent_id) as entity
        ,(select code from fdoc_mpk s where s.id=fdoc_documents.mpk_id) as mpk
        ,(select nazwa from fdoc_mpk s where s.id=fdoc_documents.mpk_id) as mpk_nazwa
        ,(select acc_code from fdoc_gl_accounts s where s.id=fdoc_documents.gl_account_id) as glacc
        ,(select acc_name from fdoc_gl_accounts s where s.id=fdoc_documents.gl_account_id) as glacc_n
        ,(select code from fdoc_buinits s where s.id=fdoc_documents.bunit_id) as bu_c
        ,(select nazwa from fdoc_buinits s where s.id=fdoc_documents.bunit_id) as bu_cn
        ,(select cast(count(*) as int) from attachment_2_doc_invoice a where a.parent_id=fdoc_documents.id) as "att_cnt"
        ,(select left(fname,1)||'.'||lname from se_employees e where e.id=
        (SELECT acceptor_id FROM fdoc_acceptance a where a.invoice_id=fdoc_documents.id and coalesce(accepted,false)=false order by step limit 1)
        ) as "curr_acceptor" 
        ,(SELECT bool_and(coalesce(accepted,false)=true) FROM fdoc_acceptance a where a.invoice_id=fdoc_documents.id)  as "all_acc"
        ,(select string_agg((select left(fname,1)||'.'||lname from se_employees e where e.id=acceptor_id),', ')
           FROM  fdoc_acceptance a where (a.invoice_id=fdoc_documents.id) and (coalesce(accepted,false)=false) limit 1) as "open_acc"
        ,(select string_agg((select left(fname,1)||'.'||lname from se_employees e where e.id=acceptor_id),', ')
           FROM  fdoc_acceptance a where (a.invoice_id=fdoc_documents.id) and (coalesce(accepted,false)=true) limit 1) as "closed_acc"

       , ( (legal_ent_id is null) or (mpk_id is null) or (gl_account_id is null) or (b_partner_id is null) or (net_value is null) or (fa_number is null)) as "incomplete"    
`



}


