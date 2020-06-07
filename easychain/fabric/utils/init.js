const { FileSystemWallet, Gateway } = require('fabric-network');
const fs = require("fs")
const path = require("path")
const uuid = require('uuid')
const validate = require('../utils/validation')
const persist = require('../utils/persist')
const events = require('../utils/events')
const smart_contract = require('../utils/contract')

async function periodic_updates(proxy) {
  // Wait for timeout to elapse and save the object again
  setTimeout(() => { console.log("Timeout elapsed"); proxy.save(); periodic_updates(proxy) }, 10000)
}
module.exports = {
  init: async function (target) {
        await persist.save(target)
        // Register for events
        await events.register_event("", target)
        // do periodic updates
        var proxy = new Proxy(target, {
          get: function (target, name, receiver) {
            // Return requested property
            targetValue = Reflect.get(target, name, receiver)
            // Target normal method invocation - handle smart contracts later
            if (validate.is_save(targetValue, name)) {
              return async function (...args) {
                return await persist.save(target)
              }
            }

            if (validate.is_contract(targetValue, name)) {
              // smart_contract.invoke_contract("", targetValue.)
              return async function (...args) {
                const callback = args[(args.length - 1)]
                args.pop()
                const results = await smart_contract.invoke_contract(name, target.__id, args)
                callback(results)
                console.log("contract invoked")
              }
            }
            if (typeof targetValue == 'function') {
              return function(...args) {
                return targetValue.apply(target, args)
              }
            }
            return targetValue
          },

          set: function (target, property, value, receiver) {
            if (Reflect.has(target, "update_count") == false) {
              Reflect.defineProperty(target, "update_count", {value: 1, writable: true})
            } else {
              target.update_count += 1
              if (target.update_count > 2) {
                console.log("Update count exceeded!!!")
                proxy.save()
              }
            }
          }
        })
        periodic_updates(proxy)
    return proxy
  }
}
