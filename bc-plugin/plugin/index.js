const asset_decorators = require("./decorators/class")
module.exports = function () {
    return {
        visitor: {
            ClassDeclaration(path) {
                if (asset_decorators.is_asset_node(asset_decorators.get_decorators(path.node))) {
                    console.log("--- Redirect to Asset processing --- ")
                }

            }
        }
    }
}