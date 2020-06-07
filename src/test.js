const easychain = require('easychain')
@Asset("create")
class Person {
    constructor() {
        this.id = 1
    }

  me() { console.log("None") }
}

console.log(typeof Person)

// class Student extends Person {}
var person = new Person()

var proxy = new Proxy(person, {
    construct: async function (target, a, b) {
        Reflect.defineProperty(target, "save", easychain.connect)
        console.log(Object.values(target))
    },
    get: function (target, name, receiver) {
        console.log(Reflect.getPrototypeOf(person))
        new_name = "__decorators__"
        const targetValue = Reflect.get(target, "__decorators__", receiver);
        if (typeof targetValue === 'function') {
                return function (...args) {
                    console.log('CALL', new_name , args);
                    return targetValue.apply(this, args); // (A)
                }
            } else {
                return targetValue;
            }
    }
})

proxy.me()
proxy.save()
