const easychain = require('easychain');
@Asset(name = "addCargo")
    // @Lazy(timeout = 10)
@Provenance(name = "getHistory")
class Cargo {
    constructor(coopId, weight, humidity, location) {
        // Establish connection
        this.coopId = coopId
        this.weight = weight
        this.humidity = humidity
        this.location = location
            // Control flow variable
        this.isloggedin = false
        this.status = "Dispatched"
    }

    @key("auto") id
    @transient isloggedin
    @contract(name = "setLocation") setLocation(newLocation) {}
}

async function test() {
    var cargo = new Cargo(10, 15, 20, 30);
    var proxy = await easychain.init(cargo)
    const saved = await proxy.save()
    var history = await proxy.provenance(cargo.id)
    await proxy.setLocation(newLoc)
}

test()


// Connectivity 1
// Contract Mangement 7
// Event Management  0
// Business Logic 15
// Total = 23





// person.save()

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