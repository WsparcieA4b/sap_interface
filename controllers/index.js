const express = require('express');
const router = express.Router();
let apipref = '/api';


// routing dla integracji CAFM/SAP
router.use(apipref, require('./site'));
router.use(apipref, require('./customers'));
router.use(apipref, require('./vendors'));
router.use(apipref, require('./materials'));
router.use(apipref, require('./projects'));
router.use(apipref, require('./proxy'));
router.use(apipref, require('./batch'));
router.use(apipref, require('./sales_price_condition'));
router.use(apipref, require('./purchase_price_condition'));
router.use(apipref, require('./attachments'));
router.use(apipref, require('./attachments_info'));
router.use(apipref, require('./purchase_requisition'));

router.use(apipref, require('./proxy_wnioski_fakt')); //proxy wysyłania wniosków faktorowych do SAP (rozszerzenei modułu zleceń)
router.use(apipref, require('./proxy_doc_od')); //proxy wysyłania dokumentów OD DO SAP (integracja KSeF 12.2025)
//trasa domyślna dla /
router.get('/', function (req, res) {
  res.send({ message: 'You are connected to sandbox api!' });
})

module.exports = router
