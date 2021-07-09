# TLDR

A smart contract that computes the average of 3 ages without revealing the user's age to anyone


# A Secure Multi-Party Computation Smart Contract on Ethereum

An application that demonstrates the use of secure multi-party computation on the Ethereum blockchain

## Introduction

In this demonstration, sMPC is used to calculate the mean of three user ages. Importantly: 
- The age is kept private thoughout the entire process; no one has access to an age other than the user itself.
- The mean is never revealed to anyone except the "company" who has contracted for the computation

## Getting Started

Requrements:
- testrpc
- Node.js

You can run the demonstration by executing the demo.sh script. Minipulate the three ages specified at the beginning to test different values.

The main files are: 

- Server.sol - the Solidity smart contract
- Crypto.py - the public/private key generation and encryption/decryption methods
- User.js
- Worker.js
- Company.js

## Example Output

The output of an example run:
```
Contract Initalized

Company's Keys Created - see company/
Company's Public Key Posted

Worker_0's Keys Created - see worker_0/
Worker_0's Public Key Posted

Worker_1's Keys Created - see worker_1/
Worker_1's Public Key Posted

Worker_2's Keys Created - see worker_2/
Worker_2's Public Key Posted

*** USER 0 ***
AGE: 10
Random Polynomial: 10x^0 + 18326x^1 + 44709x^2
Secret shares: 13494,57922,2252
Secret shares encrypted
Encrypted secret shares posted

*** USER 1 ***
AGE: 20
Random Polynomial: 20x^0 + 22458x^1 + 57634x^2
Secret shares: 15658,26400,32246
Secret shares encrypted
Encrypted secret shares posted

*** USER 2 ***
AGE: 35
Random Polynomial: 35x^0 + 42923x^1 + 54482x^2
Secret shares: 43427,41212,58911
Secret shares encrypted
Encrypted secret shares posted

*** WORKER 0 ***
Secret shares: 13494,15658,43427
Secret shares sum: 7058
Secret shares sum encrypted
Encrypted secret shares sum posted

*** WORKER 1 ***
Secret shares: 57922,26400,41212
Secret shares sum: 60013
Secret shares sum encrypted
Encrypted secret shares sum posted

*** WORKER 2 ***
Secret shares: 2252,32246,58911
Secret shares sum: 27888
Secret shares sum encrypted
Encrypted secret shares sum posted

*** COMPANY ***
Secret shares sums: 7058,60013,27888
The mean age is: 21.666666666666668
```
