let prime = 65521;

let contract = require('./modify_contract');
let crypto = require('./crypto_modules');

module.exports = {

  getUserData: function(worker_id) {

    let options = {
      partyType: 'worker',
      method: 'getUserData',
      worker_id: worker_id
    }

    return contract.modifyContract(options);
  },

  setWorkerSharesSum: function(sharesSum, worker_id) {

    //sharesSum = encryptSharesSum(sharesSum);

    let options = {
      partyType: 'worker',
      method: 'setWorkerSharesSum',
      worker_id: worker_id,
      sharesSum: sharesSum
    }

    return contract.modifyContract(options);

  },
  /*
  getSharesSums: function(worker_id) {

    let options = {
      partyType: 'worker',
      method: 'getSharesSums',
      worker_id: worker_id
    }

    return contract.modifyContract(options);

  },
  */
  sumShares: function(shares) {

    let sum = 0;

    for (i = 0; i < shares.length; i++) {

      sum += parseInt(shares[i]);
      sum %= prime;

    }

    return sum;

  },

  // Generates a public/private key pair
  // Saves the keys to publickey_<worker_id>.txt and privatekey_<worker_id>.txt
  // Returns the public key as a string
  generatePublicPrivate: function(worker_id) {
    return crypto.generatePublicPrivate(worker_id);
  },

  // Posts the public key to the blockchain for the given worker
  setWorkerPublicKey: function(publicKey, worker_id) {

    let options = {
      partyType: 'worker',
      method: 'setWorkerPublicKey',
      worker_id: worker_id,
      publicKey: publicKey
    }

    return contract.modifyContract(options);

  },

  // Gets the company public key from the blockchain
  getCompanyPublicKey: function() {

    let options = {
      partyType: 'worker',
      method: 'getCompanyPublicKey'
    };

    return contract.modifyContract(options);

  }

}

function encryptSharesSum(sharesSum) {
  // Eventually encrypt with public keys of workers
  return [sharesSum, sharesSum, sharesSum];
}
