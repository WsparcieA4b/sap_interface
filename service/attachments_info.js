'use strict';
var api = require('./attachments_dbapi.js');
const logger = require('../log-config')

module.exports = {
    prepareAttachmentInfo: async function (reqObject) {
        let billingDocItemType = reqObject.to_Item.A_BillingDocumentItemType
        let retObj = {
            ...reqObject, to_URL: {
                A_BillingDocumentURLType: []
            }
        }
        // logger.info("prepareAttachmentInfo: " + reqObject.BillingDocument)
        let docsArr = (billingDocItemType.constructor === Array) ? billingDocItemType : [billingDocItemType]
        for (let i = 0; i < docsArr.length; i++) {
            let fNameDesc = await api.listAttachments4ERPCall(docsArr[i].ReferenceSDDocument)
            if (fNameDesc.constructor == Array) {
                retObj.to_URL.A_BillingDocumentURLType.push(...fNameDesc)
            }
        };
        return retObj
    }
}