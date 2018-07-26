let mpc = require('./mpc_modules');
let user = require('./user_modules');
let crypto = require('./crypto_modules');

/************************
* Declare user_id and age
************************/
const USER_ID = process.argv[2];
const AGE = process.argv[3];

console.log('*** USER ' + USER_ID + ' ***');
console.log('AGE: ' + AGE);

// Generate shares
let shares = mpc.generateShares(AGE, 3);
console.log('Secret shares: ' + shares);

// Convert shares to strings
shares_str = [];
shares.forEach(share => {
  shares_str.push(share.toString());
})

// Get workers' public keys
user.getWorkerPublicKeys()

// Encrypt shares with workers' public keys
.then(publicKeys => {
  return Promise.all([
    crypto.encryptMessage(publicKeys[0], shares_str[0]),
    crypto.encryptMessage(publicKeys[1], shares_str[1]),
    crypto.encryptMessage(publicKeys[2], shares_str[2])
  ]);
})

// (simple reformating)
.then(result => {
  console.log('Secret shares encrypted');
  shares_enc = [];
  result.forEach(share_enc => {
    shares_enc.push(share_enc[0]);
  });

// Post encrypted shares to blockchain
  return user.setUserData(shares_enc, USER_ID);
})
.then(result => {
  if (result == 'User data posted') console.log('Encrypted secret shares posted');
})

// Catch any errors
.catch(console.log);
