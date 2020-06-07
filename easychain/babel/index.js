const ast_visitor = require("./utils/annotations")
module.exports = function () {
    return {
        visitor: ast_visitor.visitor
    }
}