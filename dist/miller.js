function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const easychain = require('easychain');

class Order {
    constructor(orderId) {
        _defineProperty(this, "id", void 0);

        // Establish connection
        this.orderId = orderId;
    }

    setStatus(newStatus) {}

    __decorators__() {
        return ["{\"type\":\"class\",\"decorator\":\"Asset\",\"key\":\"name\",\"value\":\"addCargo\"}", "{\"type\":\"class\",\"decorator\":\"Provenance\",\"key\":\"name\",\"value\":\"getHistory\"}", "{\"type\":\"method\",\"decorator\":\"contract\",\"contract\":\"setStatus\",\"method\":\"setStatus\"}", "{\"type\":\"property\",\"name\":\"id\",\"decorator\":\"key\",\"args\":[\"auto\"]}"];
    }

}

async function test() {
    // Initialize a local coffee object
    let order = new Order(1);
    let order_proxy = await easychain.init(order);
    await order_proxy.setStatus('Delivered');
    await order.getHistory();
}

test()