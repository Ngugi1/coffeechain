function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const easychain = require('easychain');

class Coffee {
  constructor(transporterId, grade, weight, humidity, location) {
    _defineProperty(this, "id", void 0);

    this.transporterId = transporterId;
    this.grade = grade;
    this.weight = weight;
    this.humidity = humidity;
    this.location = location; // Control flow variable

    this.isloggedin = false;
  }

  setGradeContract(newGrade) {}

  locationChanged(newLocData) {// Make local effects
  }

  __decorators__() {
    return ["{\"type\":\"class\",\"decorator\":\"Asset\",\"key\":\"name\",\"value\":\"addCargo\"}", "{\"type\":\"class\",\"decorator\":\"Provenance\",\"key\":\"name\",\"value\":\"getHistory\"}", "{\"type\":\"method\",\"decorator\":\"contract\",\"contract\":\"setGrade\",\"method\":\"setGradeContract\"}", "{\"type\":\"method\",\"decorator\":\"event\",\"contract\":\"cargoLocationChanged\",\"method\":\"locationChanged\"}", "{\"type\":\"property\",\"name\":\"id\",\"decorator\":\"key\",\"args\":[\"auto\"]}"];
  }

}

async function test() {
  // Initialize a local coffee object
  let coffee = new Coffee("A", 12, 15, 10, {
    lat: 10,
    long: 20
  });
  coffee_proxy = await easychain.init(coffee); // propose to persist the object on the blockchain

  if (coffee.isloggedin) {
    const saved = await coffee.save();
    await coffee_proxy.setGradeContract('A-');
    await coffee.provenance().then(data => {// Consume history
    });
  }
}

test(); // Connectivity //
// Contract Mangement ////
// Event Management /
// Initialization //
//  Key Generation /
// Business Logic
// Miscleneaous