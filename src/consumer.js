const easychain = require('easychain');
@Asset(name = "addCargo")
@Provenance(name = "getHistory")
class Product {
    constructor(productCode) {
        this.productcode = productCode
    }

    @key('auto') id
}

async function test() {
    // Initialize a local coffee object
    let product = new Product(12)
    let product_proxy = await easychain.init(product)
    product_proxy.getHistory((history) => {
        // Consume history
    })
}

test()


// Connectivity 1
// Contract Mangement 4
// Event Management  0
// Business Logic  11
// Total 16