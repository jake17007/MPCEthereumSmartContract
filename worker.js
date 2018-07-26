let mpc = require('./mpc_modules');
let worker = require('./worker_modules');
let fs = require('fs');
let crypto = require('./crypto_modules');

const WORKER_ID = process.argv[2];

console.log('*** WORKER ' + WORKER_ID + ' ***');

// Load worker's private key
let privateKey = fs.readFileSync('./worker_' + WORKER_ID + '/privatekey_' + WORKER_ID + '.txt', 'utf8');

// Get user data (currently encrypted)
worker.getUserData(WORKER_ID)

// Decrypt shares with private key
.then(shares_enc => {
  return Promise.all([
    crypto.decryptMessage(privateKey, shares_enc[0]),
    crypto.decryptMessage(privateKey, shares_enc[1]),
    crypto.decryptMessage(privateKey, shares_enc[2]),
  ]);
})

// (simple reformating of output)
.then(shares_lst => {
  shares = [];
  shares_lst.forEach(share_lst => {
    shares.push(share_lst[0]);
  });
  return shares;
})

// Add the shares
.then(shares => {
  console.log('Secret shares: ' + shares);
  return worker.sumShares(shares);
})

// Get the company's public key (pass the shares sum along with it)
.then(sharesSum => {
  console.log('Secret shares sum: ' + sharesSum);
  return worker.getCompanyPublicKey()
  .then(companyPublicKey => {
    return {
      sharesSum: sharesSum,
      companyPublicKey: companyPublicKey
    };
  });

})

// Encrypt the shares sum with the company's public key
.then(results => {
  return crypto.encryptMessage(results.companyPublicKey, results.sharesSum.toString());
})

// Post the encrypted shares sum to the blockchain
.then(sharesSum_enc => {
  console.log('Secret shares sum encrypted');
  return worker.setWorkerSharesSum(sharesSum_enc[0], WORKER_ID);
})
.then(result => {
  if (result == 'Shares sum posted') console.log('Encrypted secret shares sum posted');
})

// Catch any errors
.catch(console.log);
