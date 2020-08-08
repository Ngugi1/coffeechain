#!/bin/bash
node src/enrollAdmin.js cooperative
node src/enrollAdmin.js transporter
node src/enrollAdmin.js miller
node src/enrollAdmin.js insurance

node src/registerUser.js cooperative
node src/registerUser.js transporter
node src/registerUser.js miller
node src/registerUser.js insurance

echo "***********************************"
echo "       You are ready!!         "
echo "***********************************"
npm start