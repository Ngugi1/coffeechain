#!/bin/bash
PEER=$1
ORG=$2
MSP=$3
PORT=$4
VERSION=$5

ORDERER_CA=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/coffeechain.com/orderers/orderer.coffeechain.com/msp/tlscacerts/tlsca.coffeechain.com-cert.pem
CORE_PEER_LOCALMSPID=$MSP
CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/$ORG.coffeechain.com/peers/$PEER.$ORG.coffeechain.com/tls/ca.crt
CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/$ORG.coffeechain.com/users/Admin@$ORG.coffeechain.com/msp
CORE_PEER_ADDRESS=$PEER.$ORG.coffeechain.com:$PORT
CHANNEL_NAME=mychannel
CORE_PEER_TLS_ENABLED=true
peer chaincode install -l node -n supcc -v $VERSION -p /opt/gopath/src/github.com/chaincode >&log.txt
cat log.txt