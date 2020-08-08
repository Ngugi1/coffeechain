const { BCBacked } = require('./blockchainbacked')

class Product extends BCBacked {
    constructor(id, productCode) {
        super()
        this.id = id;
        this.productcode = productCode
    }
}

async function test() {
    // Initialize a local coffee object
    let product = new Product(12, 1)
    await product.session()
    await product.getHistory('getHistory', { id: 1 })
}

test()


// Connectivity 33
// Contract Mangement 16
// Event Management  0
// Business Logic  15
// Total 14