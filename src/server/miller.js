const { BCBacked } = require('./blockchainbacked')
class Order extends BCBacked {
    constructor(id, orderId) {
        super()
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
    let order = new Order(1, 12)
    await order.session()
    await order.setStatus({ status: 'Delivered' })
    await order.getHistory('getHistory', { id: 1 })
}

test()

////Total 22
// Connectivity 33
// Contract Mangement 25
// Event Management  9 //
// Business Logic  14  //
// SUM: 81