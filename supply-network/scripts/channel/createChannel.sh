#!/bin/bash
echo "Creating channel..."
ORDERER_CA=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/coffeechain.com/orderers/orderer.coffeechain.com/msp/tlscacerts/tlsca.coffeechain.com-cert.pem
CORE_PEER_LOCALMSPID=CooperativeMSP
CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/cooperative.coffeechain.com/peers/peer0.cooperative.coffeechain.com/tls/ca.crt
CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/cooperative.coffeechain.com/users/Admin@cooperative.coffeechain.com/msp
CORE_PEER_ADDRESS=peer0.cooperative.coffeechain.com:7051
CHANNEL_NAME=mychannel
CORE_PEER_TLS_ENABLED=true
ORDERER_SYSCHAN_ID=syschain
peer channel create -o  orderer.coffeechain.com:7050 -c $CHANNEL_NAME -f ./channel-artifacts/channel.tx --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA >&log.txt
cat log.txt


#peer channel create -o orderer.coffeechain.com:7050 /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/coffeechain.com/orderers/orderer.coffeechain.com/msp/tlscacerts/tlsca.coffeechain.com-cert.pem -c mychannel -f ./channel-artifacts/channel.tx

echo
echo "Channel created, joining Cooperative..."
peer channel join -b mychannel.block