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
    }
}