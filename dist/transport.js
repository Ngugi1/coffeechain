function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const easychain = require('easychain');

class Cargo {
  constructor(coopId, weight, humidity, location) {
    _defineProperty(this, "id", void 0);

    _defineProperty(this, "isloggedin", void 0);

    // Establish connection
    this.coopId = coopId;
    this.weight = weight;
    this.humidity = humidity;
    this.location = location; // Control flow variable

    this.isloggedin = false;
    this.status = "Dispatched";
  }

  setLocation(newLocation) {// Make local effects
  }

  __decorators__() {
    return ["{\"type\":\"class\",\"decorator\":\"Asset\",\"key\":\"name\",\"value\":\"addCargo\"}", "{\"type\":\"class\",\"decorator\":\"Lazy\",\"key\":\"timeout\",\"value\":10}", "{\"type\":\"class\",\"decorator\":\"Provenance\",\"key\":\"name\",\"value\":\"getHistory\"}", "{\"type\":\"method\",\"decorator\":\"contract\",\"contract\":\"setLocation\",\"method\":\"setLocation\"}", "{\"type\":\"property\",\"name\":\"id\",\"decorator\":\"key\",\"args\":[\"auto\"]}", "{\"type\":\"property\",\"name\":\"isloggedin\",\"decorator\":\"transient\",\"args\":[]}"];
  }

}

async function test() {
  var cargo = new Cargo(10, 15, 20, 30);
  var proxy = await easychain.init(cargo);
  const saved = await proxy.save();
  var history = await proxy.provenance(cargo.id);
  await proxy.setLocation(newLoc);
}

test(); // person.save()
// var proxy = new Proxy(person, {
//   construct: async function (target, a, b) {
//     Reflect.defineProperty(target, "save", easychain.connect);
//     console.log(Object.values(target));
//   },
//   get: function (target, name, receiver) {
//     console.log(Reflect.getPrototypeOf(person));
//     new_name = "__decorators__";
//     const targetValue = Reflect.get(target, "__decorators__", receiver);
//     if (typeof targetValue === 'function') {
//       return function (...args) {
//         console.log('CALL', new_name, args);
//         return targetValue.apply(this, args); // (A)
//       };
//     } else {
//       return targetValue;
//     }
//   }
// });
// proxy.me();