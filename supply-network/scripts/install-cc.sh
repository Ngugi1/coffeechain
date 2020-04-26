#!/bin/bash

echo "Installing chaincode for cooperative..."
docker exec -it cli ./scripts/install-cc/install-peer.sh peer0 cooperative CooperativeMSP 7051 1.0
echo "Installing chaincode for transporter..."
docker exec -it cli ./scripts/install-cc/install-peer.sh peer0 transporter TransporterMSP 9051 1.0
echo "Installing chaincode for miller..."
docker exec -it cli ./scripts/install-cc/install-peer.sh peer0 miller MillerMSP 10051 1.0
echo "Installing chaincode for insurance..."
docker exec -it cli ./scripts/install-cc/install-peer.sh peer0 insurance InsuranceMSP 11051 1.0
echo "Instanciating the chaincode..."
docker exec -it cli ./scripts/install-cc/instanciate.sh