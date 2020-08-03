function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const easychain = require('easychain');

class Product {
  constructor(productCode) {
    _defineProperty(this, "id", void 0);

    // Establish connection
    this.productcode = productCode;
  }

  __decorators__() {
    return ["{\"type\":\"class\",\"decorator\":\"Asset\",\"key\":\"name\",\"value\":\"addCargo\"}", "{\"type\":\"class\",\"decorator\":\"Provenance\",\"key\":\"name\",\"value\":\"getHistory\"}", "{\"type\":\"property\",\"name\":\"id\",\"decorator\":\"key\",\"args\":[\"auto\"]}"];
  }

}

async function test() {
  // Initialize a local coffee object
  let product = new Product(1);
  let product_proxy = await easychain.init(product);
  await product_proxy.getHistory(history => {// Consume history
  });
}

test();