const t = require("@babel/types")
module.exports = {
    extract_decorators: function (path) {
        console.log("Extracting")
        // A buffer for all annotations
        var literals = []
        // Collect all decorators and build string literals
        for (decorator of path.node.decorators) {
            // Get name
            const name = decorator.expression.callee.name
            //  Get arguments
            var args = ""
            for (arg of decorator.expression.arguments) {
                args = JSON.stringify({"type" : "class", "name" : name, "args": arg.right.value })
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

