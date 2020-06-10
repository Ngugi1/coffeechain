const t = require("@babel/types")
module.exports = {
    extract_decorators: function (path) {
        // A buffer for all annotations
        var literals = []
        class_body = path.node.body.body
        var decorator_store = undefined
        var decorated_methods = []
        for (member of class_body) {
            if (member.key.name === '__decorators__') {
                    decorator_store = member
                }
        }
        if (decorator_store != undefined) {
            for (member of class_body) {
                if (t.isClassMethod(member)) {
                    // See if the class was decorated as an asset
                    if (member.key.name === '__decorators__') {
                        decorator_store = member
                    }
                    if (Reflect.has(member, 'decorators')) {
                        decorated_methods.push(member)
                    }
                }
                var literals = []
                for (method of decorated_methods) {
                    // const extracted_literals = collect_decorators.collect(method)
                    // Collect all decorators and build string literals
                    for (decorator of method.decorators) {
                        // Get name
                        const decorator_name = decorator.expression.callee.name
                        const method_name = method.key.name
                        //  Get arguments
                        var args = ""
                        for (arg of decorator.expression.arguments) {
                            args = args + JSON.stringify({"type": "method", "decorator": decorator_name , "key": arg.left.value ,"contract": arg.right.value,  "method":method_name})
                        }
                        // create ast nodes for string literals
                        literals.push(t.stringLiteral(args))
                        method.decorators = []

                    }
                    decorator_store.body.body[0].argument.elements = decorator_store.body.body[0].argument.elements.concat(literals)

                }
            }
        }
    }
}