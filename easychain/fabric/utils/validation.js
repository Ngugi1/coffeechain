const { FileSystemWallet, Gateway } = require('fabric-network');
const fs = require("fs")
const path = require("path")
module.exports = {
    is_save: function (targetValue, name) {
        const is_undefined = targetValue === undefined
        const is_function = (typeof targetValue) === 'function'
        const is_name_save = name === 'save'
        return (is_function || is_undefined) && is_name_save
    },

    is_contract: function (targetValue, name) {
        return (((typeof targetValue) === 'function') && name == 'setLocation')
    }
}
