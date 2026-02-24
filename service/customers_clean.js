'use strict';
var db = require('../helpers/db');
const logger = require('../log-config')

const query = "update business_partner_erp bpe set active=false, customer=false, vendor=false from s_site_erp sse where sse.erp_code=bpe.erp_id  and bpe.active = true"

module.exports = {
    clean: async function () {
        logger.info('[customer_clean.clean]')
        try {
            const result = await db.raw(query)
            const msg =  JSON.stringify(result)
            logger.info('[customer_clean.clean]: ' + msg)
            return {
                success: true,
                message: msg
            }
        }
        catch (error) {
            logger.info('[site.insertOrUpdate] error:' +JSON.stringify(error))
            return error
        }
    }
}

