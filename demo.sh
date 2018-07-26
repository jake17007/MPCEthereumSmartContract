#!/bin/bash

# Set the ages (manipulate these to test)
export USER_0_AGE=10
export USER_1_AGE=20
export USER_2_AGE=35

# Initialize contract and save contract address
export SERVER_CONTRACT_ADDRESS="$(node initialize_contract.js)"
echo "Contract Initalized"
echo ""

# Initialize the company (create public/private keys and post public key to blockchain)
node company_init.js
echo ""

# Initialize the workers (create public/private keys and post public key to blockchain)
# node worker_init.js <id>
node worker_init.js 0
echo ""
node worker_init.js 1
echo ""
node worker_init.js 2
echo ""

# Initialize the users (Generate shares for workers and post to blockchain)
# node user.js <id> <age>
node user.js 0 $USER_0_AGE
echo ""
node user.js 1 $USER_1_AGE
echo ""
node user.js 2 $USER_2_AGE
echo ""

# Run the worker processes (Collect user data, sum, and post sums to blockchain)
# node worker.js <id>
node worker.js 0
echo ""
node worker.js 1
echo ""
node worker.js 2
echo ""

# Run the company process (Collect secret share sums, evaluate at 0, and calculate mean)
node company.js
