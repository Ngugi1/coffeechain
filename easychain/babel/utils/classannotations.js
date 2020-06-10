const t = require("@babel/types")
module.exports = {
    extract_decorators: function (path) {
        console.log("Extracting")
        // A buffer for all annotations
        var literals = []
        // Collect all decorators and build string literals
        for (decorator of path.node.decorators) {
            // Get name
            var name = undefined
            var args = ""
            if (t.isCallExpression(decorator.expression)) {
                name = decorator.expression.callee.name
                for (arg of decorator.expression.arguments) {
                    console.log("Inside")
                    args = args + JSON.stringify({"type" : "class", "decorator" : name, "key": arg.left.name , "value": arg.right.value })
                }
            } else if (t.isIdentifier(decorator.expression)) {
                name = decorator.expression.name
                args = args + JSON.stringify({"type" : "class", "decorator" : name})

            }
            // create ast nodes for string literals
            literals.push(t.stringLiteral(args))
        }
        // Collect all decorators and build string literals
        // Build a return statement
        const return_statement = t.returnStatement(t.arrayExpression(literals))
        // Build a class method to return decorators
        const annotations_method = t.classMethod("method", t.identifier("__decorators__"), [], t.blockStatement([return_statement]))
        //  If new node is valid, append it to the body of the class
        if (t.isClassMethod(annotations_method)) {
            path.node.body.body.push(annotations_method)
        }
        // Remove the decorators
        path.node.decorators = []
    }
}

