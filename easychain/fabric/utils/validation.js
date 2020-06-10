const { FileSystemWallet, Gateway } = require('fabric-network');
const fs = require("fs")
const path = require("path")
const annotations = require('./annotations')
module.exports = {
    is_save: function (targetValue, name) {
        const is_undefined = targetValue === undefined
        const is_function = (typeof targetValue) === 'function'
        const is_name_save = name === 'save'
        return (is_function || is_undefined) && is_name_save
    },

    is_contract: function (target, targetValue, name) {
        // Find a matching contract
        const method_annotations = annotations.getannotations(target).method
        var matching_annotation = undefined
        for (method_annotation of method_annotations) {
             if (method_annotation.type == 'method' && method_annotation.decorator.toLowerCase() == 'contract' &&method_annotation.contract != undefined && method_annotation.method == name) {
                matching_annotation = method_annotation
                break
            }
        }
        return matching_annotation != undefined
    },

    is_asset: function (annotations) {
        const lazy_annotation = 'lazy'
        const asset_annotation = 'asset'
        const provenance_annotation = 'provenance'
        var isasset = false
        class_annotations = annotations.filter((annotation) => {
            return (annotation.decorator.toLowerCase() === lazy_annotation
                || annotation.decorator.toLowerCase() === asset_annotation)
        })
        if (class_annotations.length > 0) {
            for (annotation of annotations) {
                if (annotation.decorator.toLowerCase() === asset_annotation) {
                    // Register the target with the blockchain
                    isasset = true
                }

                if (annotation.decorator.toLowerCase() != asset_annotation && annotation.decorator.toLowerCase() != lazy_annotation && annotation.decorator.toLowerCase() != provenance_annotation) {
                    throw "Unsupported annotation " + annotation.decorator
                }
            }
        } else {
            throw "No class annotations found"
        }
        return isasset
    }, 
    is_lazy: function (target) {
        const method_annotations = annotations.getannotations(target).class
        var lazy_annotation = undefined
        for (annotation of method_annotations) {
            if (annotation.type == "class" && annotation.decorator.toLowerCase() == "lazy") {
                lazy_annotation = annotation
                break
            }
        }
        return lazy_annotation != undefined
    }
}
