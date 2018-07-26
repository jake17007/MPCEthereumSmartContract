let contract = require('./modify_contract');
let mpc = require('./mpc_modules');
let PythonShell = require('python-shell');
let crypto = require('./crypto_modules');

module.exports = {

  getWorkerSharesSums: function() {

    let options = {
      partyType: 'company',
      method: 'getWorkerSharesSums'
    }

    return contract.modifyContract(options);
  },

  evaluateMean: function(sharesSums) {
    return new Promise(function(resolve, reject) {

      var options = {
        mode: 'text',
        args: sharesSums
      };

      PythonShell.run('polynomials-python/evaluate.py', options, function (err, result) {
        if (err) reject(err);
        resolve(parseInt(result) / 3);
      });

    });

  },

  // Generates a public/private key pair
  // Saves the keys to company/publickey.txt and company/privatekey.txt
  // Returns the public key as a string
  generatePublicPrivate: function() {
    return crypto.generatePublicPrivate();
  },

  // Posts the public key to the blockchain for the given worker
  setCompanyPublicKey: function(publicKey) {

    let options = {
      partyType: 'company',
      method: 'setCompanyPublicKey',
      publicKey: publicKey
    }

    return contract.modifyContract(options);

  },

}
