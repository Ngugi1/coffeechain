#!/bin/bash
export IMAGE_TAG=latest

echo "Creating containers... "
docker-compose -f ./supply-network/docker-compose-cli.yaml up -d
echo 
echo "Containers started" 
# echo 
# docker ps

docker exec -it cli ./scripts/channel/createChannel.sh

echo "Joining Miller to channel..."
docker exec -it cli ./scripts/channel/join-peer.sh peer0 miller MillerMSP 10051 1.0
echo "Joining Transporter to channel..."
docker exec -it cli ./scripts/channel/join-peer.sh peer0 transporter TransporterMSP 9051 1.0
echo "Joining Insurance to channel..." 
docker exec -it cli ./scripts/channel/join-peer.sh peer0 insurance InsuranceMSP 11051 1.0
