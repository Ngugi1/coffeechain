const connection = require('../utils/connection')
const annotation_helper = require('./annotations')
const validation = require('./validation')
const { v4: uuidv4 } = require('uuid');

module.exports = {
    save: async function(target) {
        try {
            var toSave = {}
            var response = {}
                // Validate availability of correct annotations
            const class_annotations = (annotation_helper.getannotations(target)).class
            if (validation.is_asset(annotation_helper.getannotations(target).class) == false) {
                throw "Asset annotation missing"
            }

            // Contract to be used to add new object
            var annotations = class_annotations.filter((annotation) => {
                return annotation.decorator.toLowerCase() === "asset"
            })

            // Load property annotations
            var property_annotations = annotation_helper.getannotations(target).property
            const key_annotation = (annotation_helper.getannotations(target).property).filter((p) => { return p.decorator.toLowerCase() == "key" })
            const saving_contract = annotations[0].value
            if (saving_contract != undefined) {
                contract = await connection.connect()
                    // Fetch transient props
                var transient_props = []
                for (prop of property_annotations) {
                    if (prop.decorator.toLowerCase() === "transient") {
                        transient_props.push(prop.name)
                    }
                }
                // Copy all non-function properties
                for (property of Object.getOwnPropertyNames(target)) {
                    if (typeof target[property] != 'function' &&
                        transient_props.includes(property) == false) {
                        toSave[property] = target[property]
                    }
                }

                if (key_annotation != undefined) {
                    if (key_annotation[0].args == 'auto') {
                        toSave[key_annotation[0].name] = uuidv4();
                    }
                } else {
                    throw "Provide the key property"
                }
                console.log(JSON.stringify(toSave))
                response = await contract.submitTransaction("addCargo", JSON.stringify(toSave))
                    // Add the object to the blockchain
                console.log(response.toString())
                return response
            } else {
                throw "No saving contract found, make sure it is in your Asset(name=contract_name)"
            }
        } catch (error) {
            throw error
        }
    }
}