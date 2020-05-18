module.exports = {
    /**
     * Get annotations assciated with a class
     * @param {ASTNode (Node)} node
     */
    get_decorators: function (node) {
        return node.decorators
    },

     /**
     * Is a decorator an asset
     * @param {Node} node
     */
    is_asset_node: function (decorators) {
        return decorators.filter((annotation) =>
            annotation.expression.name == "Asset").length > 0
    }
}