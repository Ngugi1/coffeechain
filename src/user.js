const easychain = require('easychain');
@Asset(name = "addCargo")
@Provenance(name = "getHistory")
class Product {
    constructor(productCode) {
        // Establish connection
        this.productcode = productCode
    }

    @key('auto') id
}

async function test() {
    // Initialize a local coffee object
    let product = new Product(1)
    let product_proxy = await easychain.init(product)
    await product_proxy.getHistory((history) => {
        // Consume history
    })
}

test()