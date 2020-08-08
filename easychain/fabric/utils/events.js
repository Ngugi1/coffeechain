const connection = require('../utils/connection')
module.exports = {
    register_event: async function(event_name, target) {
        event_name = "cargoAdded"
        try {
            contract = await connection.connect()
            const listener = await contract.addContractListener('my-contract-listener', event_name, (err, event, blockNumber, transactionId, status) => {
                if (err) {
                    throw "Event " + event_name + " couldn't be registered" + err
                }
                target.event({ "err": err, "event": event, "blockno": blockNumber, "status": status })
                    // console.log(`Block Number: ${blockNumber} Transaction ID: ${transactionId} Status: ${status}`);
            })

            console.log("Event registered")
        } catch (error) {
            throw error
        }
    }
}