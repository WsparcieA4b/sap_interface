const express = require('express');
const router = express.Router();
const apipref = '/api';

// login nie wymaga authentykacji
router.use(apipref, require('./login'))


//router.use(apipref, require('../controllers/customers'))
//router.use(apipref, require('../controllers/vendors'))
//router.use(apipref, require('../controllers/projects'))
//router.use(apipref, require('../controllers/proxy'))
//router.use(apipref, require('../controllers/batch'))
//router.use(apipref, require('../controllers/sales_price_condition'))
//router.use(apipref, require('../controllers/materials'))


module.exports = router
