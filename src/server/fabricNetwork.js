// Connectivity = 28
const { FileSystemWallet, Gateway } = require('fabric-network');
const path = require('path');
const fs = require('fs')


async function connectNetwork() {
    // Get a connection session
    const config_path = path.resolve('./.conn.json')
    const config = JSON.parse(fs.readFileSync(config_path))
    const walletPath = path.join(process.cwd(), config.wallet_path);
    const wallet = new FileSystemWallet(walletPath);
    const ccpPath = path.join(process.cwd(), config.ccp_profile_path);
    // Check to see if we've already enrolled the user.
    const userExists = await wallet.exists(config.identity);
    if (!userExists) {
        console.log('An identity for the user "user1" does not exist in the wallet');
        console.log('Run the registerUser.js application before retrying');
        return;
    }
    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    await gateway.connect(config.ccp_profile_path, {
        wallet,
        identity: config.identity,
        discovery: {
            enabled: true,
            asLocalhost: true
        }
    });
    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork(config.channel);
    // Get the contract from the network.
    const contract = network.getContract(config.contract);
    return contract;
}

module.exports = { connectNetwork }