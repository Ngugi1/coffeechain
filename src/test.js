const easychain = require('easychain');
@Asset(name="addCargo")
@Lazy(writes = 3)
@Provenance(name="getHistory")
class Person {
  constructor() {
    this.location = 100;
  }
  @key("auto") id
  @transient isLoggedIn
  @contract(name="setLocation") setLocation(data) {
    console.log(data);
  }
}

// console.log(typeof Person); // class Student extends Person {}

async function start() {
  var person = new Person();
  var proxy = await easychain.init(person)
  const saved = await proxy.save()
  var history = await proxy.provenance(person.id)
  // console.log(proxy.isLoggedIn)
  await proxy.setLocation(1000, console.log)
}

start()

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
