const t = require("@babel/types")
module.exports = {
    extract_decorators: function (path) {
        // A buffer for all annotations
        var literals = []
        console.log("Extracting propety annotations")
        class_body = path.node.body.body
        var decorator_store = undefined
        var decorated_properties = []
        for (member of class_body) {
            if (member.key.name === '__decorators__') {
                    decorator_store = member
            }
            if (t.isClassProperty(member)) {
                if (Reflect.has(member, 'decorators')) {
                    decorated_properties.push(member)
                }
            }
        }
        if (decorator_store != undefined) {
            for (member of decorated_properties) {
                var literals = []
                for (decorator of member.decorators) {
                    // Get name
                    const decorator_name = decorator.expression.name
                    const property_name = member.key.name
                    const dec_object = JSON.stringify({"type": "property", "name": property_name, "decorator": decorator_name})
                    // create ast nodes for string literals
                    literals.push(t.stringLiteral(dec_object))
                    member.decorators = []

                }
                decorator_store.body.body[0].argument.elements = decorator_store.body.body[0].argument.elements.concat(literals)
                console.log(decorator_store.body.body[0].argument.elements)
                }
        }
    }
}