const { FileSystemWallet, Gateway } = require('fabric-network');
const fs = require("fs")
const path = require("path")
const uuid = require('uuid')
const validate = require('../utils/validation')
const persist = require('../utils/persist')
const events = require('../utils/events')
const smart_contract = require('../utils/contract')
module.exports = {
  init: async function (target) {
        await persist.save(target)
        // Register for events
        await events.register_event("", target)
        return new Proxy(target, {
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
          }
        })
  }
}