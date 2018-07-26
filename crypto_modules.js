var PythonShell = require('python-shell');

module.exports = {

  // Generates a public/private key pair
  // Saves the keys to publickey_<worker_id>.txt and privatekey_<worker_id>.txt
  // Returns the public key as a string
  generatePublicPrivate: function(worker_id) {
    return new Promise(function(resolve, reject) {

      // Create public/private keys
      var options = {
        mode: 'text',
        args: ['generatePublicPrivate', worker_id]
      };

      PythonShell.run('crypto.py', options, function (err, result) {
        if (err) reject(err);
        publicKey = result.join('\n');
        resolve(publicKey);
      });

    });
  },

  encryptMessage: function(publicKey, message) {
    return new Promise(function(resolve, reject) {

      var options = {
        mode: 'text',
        args: ['encryptMessage', publicKey, message]
      }

      PythonShell.run('crypto.py', options, function (err, result) {
        if (err) reject(err);
        encryptedMessage = result;
        resolve(encryptedMessage);
      });

    });
  },

  decryptMessage: function(privateKey, encryptedMessage) {
    return new Promise(function(resolve, reject) {

      var options = {
        mode: 'text',
        args: ['decryptMessage', privateKey, encryptedMessage]
      }

      PythonShell.run('crypto.py', options, function(err, result) {
        if (err) reject(err);
        decryptedMessage = result;
        resolve(decryptedMessage);
      });

    })
  }

}
