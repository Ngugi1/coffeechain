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
    let order_proxy = await easychain.init(order)
    await order_proxy.setStatus('Delivered')
    await order.getHistory()
}