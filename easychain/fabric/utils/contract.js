const connection = require('../utils/connection')
module.exports = {
    invoke_contract: async function (contract_name, id, args) {
        var results = null
        try {
            contract = await connection.connect()
            string_args = [id]
            for (arg of args) {
                string_args.push(JSON.stringify(arg))
            }
            results = await contract.submitTransaction(contract_name, ...string_args)
            console.log("Contract invoked")
            return results
        } catch (error) {
            throw error
        }
        return results
    },
    evaluate_transaction: async function (name, args) {
        var results = null
        try {
            contract = await connection.connect()
            var string_args = []
            for (arg of args) {
                string_args.push(JSON.stringify(arg))
            }
            results = await contract.submitTransaction(name, ...string_args)
            console.log("Contract evaluated" + results.toString())
            return results
        } catch (error) {
            throw error
        }
    }
}