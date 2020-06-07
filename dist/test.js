const easychain = require('easychain');
class Person {
  constructor() {
    this.location = 100;
  }

  setLocation(data) {
    console.log(data);
  }

  __decorators__() {
    return ["Asset$create"];
  }

}

console.log(typeof Person); // class Student extends Person {}

async function start() {
  var person = new Person();
  var proxy = await easychain.init(person)
  if (await proxy.save()) {

  }

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
