# #!/bin/bash
export ORDERER_CA=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/coffeechain.com/orderers/orderer.coffeechain.com/msp/tlscacerts/tlsca.coffeechain.com-cert.pem

export COMPOSE_PROJECT_NAME=supplynetwork

peer chaincode upgrade -o orderer.coffeechain.com:7050 --tls true --cafile $ORDERER_CA -C mychannel -l node -n supcc -v $1 -c '{"Args":[]}' >&log.txt

cat log.txt
