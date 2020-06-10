function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const easychain = require('easychain');

class Person {
  constructor() {
    _defineProperty(this, "id", 10);

    _defineProperty(this, "isLoggedIn", 120);

    this.location = 100;
  }

  setLocation(data) {
    console.log(data);
  }

  __decorators__() {
    return ["{\"type\":\"class\",\"decorator\":\"Asset\",\"key\":\"name\",\"value\":\"addCargo\"}", "{\"type\":\"class\",\"decorator\":\"Lazy\",\"key\":\"writes\",\"value\":3}", "{\"type\":\"class\",\"decorator\":\"Provenance\"}", "{\"type\":\"method\",\"decorator\":\"contract\",\"contract\":\"setLocation\",\"method\":\"setLocation\"}", "{\"type\":\"property\",\"name\":\"id\",\"decorator\":\"key\",\"args\":[\"auto\"]}", "{\"type\":\"property\",\"name\":\"isLoggedIn\",\"decorator\":\"transient\",\"args\":[]}"];
  }

}

console.log(typeof Person); // class Student extends Person {}

async function start() {
  var person = new Person();
  var proxy = await easychain.init(person);
  console.log(proxy.isLoggedIn); //   if (await proxy.save()) {
  //   }

  setTimeout(() => {
    proxy.userid = 200;
    proxy.userid = 200;
    proxy.userid = 200;
    proxy.userid = 200;
  }, 10000); //   await proxy.setLocation(1000, console.log)
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