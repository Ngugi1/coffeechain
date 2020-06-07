const { FileSystemWallet, Gateway } = require('fabric-network');
const fs = require("fs")
const path = require("path")
module.exports = {
  connect: async function () {
      try {
          console.log("**************** Connection Invoked ******************")
        // Get the configuration file
        const config_path = path.resolve(process.cwd(), '.fabric-config.json')
        // Get the wallet path
        const config_file = JSON.parse(fs.readFileSync(config_path))
        // Update the wallet path
        config_file.wallet_path = path.resolve(process.cwd(), config_file.wallet_path)
        // Load the wallet from a path
        const wallet = new FileSystemWallet(config_file.wallet_path);
        config_file.ccp_profile_path  = path.resolve(process.cwd(), config_file.ccp_profile_path)
        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists(config_file.identity);
        if (!userExists) {
          throw "An identity for the user " + config_file.identity  + " does not exist in the wallet";
        }
        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(config_file.ccp_profile_path, {
          wallet,
          identity: config_file.identity,
          discovery: {
            enabled: config_file.discovery_enabled,
            asLocalhost: config_file.discovery_asLocalhost
          }
        });
        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork(config_file.channel);
        // Get the contract from the network.
        const contract = network.getContract(config_file.contract);
        // return { "contract": contract, "network": network, "gateway": gateway };
        return contract
    } catch (error) {
      throw error
    }
  }
}
