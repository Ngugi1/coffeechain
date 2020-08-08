const easychain = require('easychain');
@Asset(name = "addCargo")
@Provenance(name = "getHistory")
class Order {
    constructor(orderId) {
        // Establish connection
        this.orderId = orderId
    }
    @key('auto') id
    @contract(name = "setStatus") setStatus(newStatus) {}
}

async function test() {
    // Initialize a local coffee object
    let order = new Order(1)
    order.id = 12
    let order_proxy = await easychain.init(order)
    await order_proxy.setStatus({ id: order.id, status: 'Delivered' })
    await order.getHistory()
}



// Connectivity 1
// Contract Mangement 5
// Event Management  0
// Business Logic 11
// Total = 17