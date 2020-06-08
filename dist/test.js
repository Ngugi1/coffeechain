function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const easychain = require('easychain');

class Person {
  constructor() {
    _defineProperty(this, "isLoggedIn", 120);

    this.location = 100;
  }

  setLocation(data) {
    console.log(data);
  }

  __decorators__() {
    return ["{\"type\":\"class\",\"name\":\"Asset\",\"args\":\"addCargo\"}", "{\"type\":\"class\",\"name\":\"Lazy\",\"args\":1000}", "{\"type\":\"method\",\"contract\":\"setLocation\",\"method\":\"setLocation\"}", "{\"type\":\"property\",\"name\":\"isLoggedIn\"}"];
  }

}

console.log(typeof Person); // class Student extends Person {}

async function start() {
  var person = new Person();
  var proxy = await easychain.init(person);
  console.log(proxy.isLoggedIn); //   if (await proxy.save()) {
  //   }
  //   setTimeout(() => {
  //     proxy.userid = 200
  //     proxy.userid = 200
  //     proxy.userid = 200
  //     proxy.userid = 200
  //   },
  //     10000)
  //   await proxy.setLocation(1000, console.log)
}

start(); // person.save()
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