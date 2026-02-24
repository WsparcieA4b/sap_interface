'use strict'

module.exports = {
    ensureArray: function (inputObject) {
        return (inputObject.constructor === Array || !inputObject) ? inputObject : [inputObject]
    }

}