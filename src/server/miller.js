const fabricNetwork = require('./fabricNetwork')
const { BCBacked } = require('./blockchainbacked')
    // Utility functions for our scenario
    // Modeling a scenario
class Order extends BCBacked {
    constructor(id, orderId) {
        super()
            // Establish connection
        this.id = id
        this.orderId = orderId
    }
    async setStatus(newStatus) {
        try {
            const data = JSON.stringify({ id: this.id, status: newStatus })
            const result = await this.contract.submitTransaction('setStatus', data)
        } catch (err) {
            console.log(err)
        }
    }
}

async function test() {
    // Initialize a local coffee object
    let order = new Order(1, 2)
    await order.session()
        // await order.setStatus('Delivered')
    await order.getHistory('getHistory', JSON.stringify({ id: 1 }))
}

test()