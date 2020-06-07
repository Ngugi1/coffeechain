const connection = require('../utils/connection')
module.exports = {
    save: async function (target) {
        try {
            var toSave = {}
            var response = {}
            contract = await connection.connect()
            // Copy all non-function properties
            for (property of Object.getOwnPropertyNames(target)) {
                if (typeof target[property] != 'function') {
                    Reflect.defineProperty(toSave, property, { value: target[property], writable:true})
                }
            }
            uniqueId = await contract.submitTransaction("addCargo", JSON.stringify(toSave))
            // Add a read only property to the target object
            if (Reflect.has(target, "__id") == false) {
                Reflect.defineProperty(target, '__id', {value: uniqueId.toString(), writable: false})
            }
            // Add the object to the blockchain
            return true
        } catch (error) {
            throw error
        }
    }
}