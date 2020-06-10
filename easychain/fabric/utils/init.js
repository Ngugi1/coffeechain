const { FileSystemWallet, Gateway } = require('fabric-network');
const fs = require("fs")
const path = require("path")
const uuid = require('uuid')
const validate = require('../utils/validation')
const events = require('../utils/events')
const smart_contract = require('../utils/contract')
const annotations = require('../utils/annotations')
const persist = require('../utils/persist')
const lazy = require('./lazy')


module.exports = {
  init: async function (target) {
        // Register for events
        // await events.register_event("", target)
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

            if (validate.is_contract(target, targetValue, name)) {
              return async function (...args) {
                const results = await smart_contract.invoke_contract(name, target.__id, args)
                // callback(results)
                console.log("Method contract invoked")
              }
            }


              if (validate.is_provenance(target, targetValue, name)) {
                // smart_contract.invoke_contract("", targetValue.)
                return async function (...args) {
                  const provenance_annotatiton = (annotations.getannotations(target).class).filter((a) => { return a.decorator.toLowerCase() == "provenance"})
                  const results = await smart_contract.evaluate_transaction(provenance_annotatiton[0].value, args)
                  // callback(results)
                  console.log("Method contract invoked")
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
            if (validate.is_lazy(target)) {
              lazy.update_write_count(target, proxy)
            }
          }
        })
        // Initialize
        await persist.save(target)
        // Register for lazy evaluation
    if (validate.is_lazy(target)) {
              const class_annotations = annotations.getannotations(target).class
              lazy.register_periodic_updates(target, proxy, class_annotations)
        }
    return proxy
  }
}
