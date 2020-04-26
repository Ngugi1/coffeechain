#!/bin/bash

function one_line_pem {
    echo "`awk 'NF {sub(/\\n/, ""); printf "%s\\\\\\\n",$0;}' $1`"
}

function json_ccp {
    local PP=$(one_line_pem $5)
    local CP=$(one_line_pem $6)
    sed -e "s/\${ORG}/$1/" \
        -e "s/\${ORGMSP}/$2/" \
        -e "s/\${P0PORT}/$3/" \
        -e "s/\${CAPORT}/$4/" \
        -e "s#\${PEERPEM}#$PP#" \
        -e "s#\${CAPEM}#$CP#" \
        ./connections/ccp-template.json 
}


ORG=cooperative
ORGMSP=Cooperative
P0PORT=7051
CAPORT=7054
PEERPEM=./supply-network/crypto-config/peerOrganizations/cooperative.coffeechain.com/tlsca/tlsca.cooperative.coffeechain.com-cert.pem
CAPEM=./supply-network/crypto-config/peerOrganizations/cooperative.coffeechain.com/ca/ca.cooperative.coffeechain.com-cert.pem

echo "$(json_ccp $ORG $ORGMSP $P0PORT $CAPORT $PEERPEM $CAPEM)" > ./connections/connection-cooperative.json

ORG=transporter
ORGMSP=Transporter
P0PORT=9051
CAPORT=8054
PEERPEM=./supply-network/crypto-config/peerOrganizations/transporter.coffeechain.com/tlsca/tlsca.transporter.coffeechain.com-cert.pem
CAPEM=./supply-network/crypto-config/peerOrganizations/transporter.coffeechain.com/ca/ca.transporter.coffeechain.com-cert.pem

echo "$(json_ccp $ORG $ORGMSP $P0PORT $CAPORT $PEERPEM $CAPEM)" > ./connections/connection-transporter.json
ORG=miller
ORGMSP=Miller
P0PORT=10051
CAPORT=9054
PEERPEM=./supply-network/crypto-config/peerOrganizations/miller.coffeechain.com/tlsca/tlsca.miller.coffeechain.com-cert.pem
CAPEM=./supply-network/crypto-config/peerOrganizations/miller.coffeechain.com/ca/ca.miller.coffeechain.com-cert.pem

echo "$(json_ccp $ORG $ORGMSP $P0PORT $CAPORT $PEERPEM $CAPEM)" > ./connections/connection-miller.json

ORG=insurance
ORGMSP=Insurance
P0PORT=11051
CAPORT=10054
PEERPEM=./supply-network/crypto-config/peerOrganizations/insurance.coffeechain.com/tlsca/tlsca.insurance.coffeechain.com-cert.pem
CAPEM=./supply-network/crypto-config/peerOrganizations/insurance.coffeechain.com/ca/ca.insurance.coffeechain.com-cert.pem

echo "$(json_ccp $ORG $ORGMSP $P0PORT $CAPORT $PEERPEM $CAPEM)" > ./connections/connection-insurance.json
