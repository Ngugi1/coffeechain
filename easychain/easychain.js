const fab_connect = require("./fabric/utils/connection")
const fab_init = require("./fabric/utils/init")

module.exports = {
    connect: fab_connect.connect,
    init: fab_init.init
}