const fabricNetwork = require('./fabricNetwork')
const { BCBacked } = require('./blockchainbacked')

class Product extends BCBacked {
    constructor(id, productCode) {
        super()
            // Establish connection
        this.id = id;
        this.productcode = productCode
    }
}

async function test() {
    // Initialize a local coffee object
    let product = new Product(1)
    await product.session()
    await product.getHistory('getHistory', JSON.stringify({ id: 1 }))
}

test()