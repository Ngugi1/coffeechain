# coffeechain-supply-chain
Supply chain scenario in Hyperledger Fabric. Network with four companies and a specific chaincode exposed as rest API

This repository is based on works that can be found in the links below
* [English](https://medium.com/coinmonks/creating-a-hyperledger-fabric-network-from-scratch-part-i-designing-the-network-23d803bbdb61) 

# Installation instructions

1. Install Hyperledger fabric dependencies:
https://hyperledger-fabric.readthedocs.io/en/release-1.4/prereqs.html

2. Donwload fabric binaries and samples:
`curl -sSL http://bit.ly/2ysbOFE | bash -s 1.4.3`

3. Go to fabric samples:
`cd fabric-samples`

4. Download the template:
`git clone https://github.com/Ngugi1/coffeechain.git`

6. Go to 
`cd coffeechain`

5. Install node-js dependencies
`./network.sh install`



# Start the network
1. Generate the crypto material and start the network
`./network.sh start`
This will create the crypto material for all the orgs, start the network and register it's admins and users. Then will start the API at localhost:3000


# Re-start the API server
`npm start`

# Stop the network
`./network.sh stop`


