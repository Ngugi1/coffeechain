// Types to construct ast nodes

const class_annotations = require('./classannotations')
const method_annotations = require('./methodannotations')
const property_annotations = require('./propertyannotations')
module.exports = {
    visitor: {
        // Target a class declaration
        ClassDeclaration(path) {
            // Extract class decorators
            class_annotations.extract_decorators(path)
            method_annotations.extract_decorators(path)
            property_annotations.extract_decorators(path)
        }
    }
}