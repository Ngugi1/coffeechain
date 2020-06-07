// Types to construct ast nodes
const t = require("@babel/types")
module.exports = {
    visitor: {
        // Target a class declaration
            ClassDeclaration(path) {
                // A buffer for all annotations
                var literals = []
                // Collect all decorators and build string literals
                for (decorator of path.node.decorators) {
                    // Get name
                    const name = decorator.expression.callee.name
                    //  Get arguments
                    const args = decorator.expression.arguments[0].value
                    // create ast nodes for string literals
                    literals.push(t.stringLiteral(name + "$" + args))
                }
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
}