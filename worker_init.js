let worker = require('./worker_modules');

let worker_id = process.argv[2];

// Generate a public/private keypair
worker.generatePublicPrivate(worker_id)
.then(publicKey => {
  console.log('Worker_' + worker_id + '\'s Keys Created - see worker_' + worker_id + '/');
  return publicKey;
})

// Post public key to blockchain
.then(publicKey => {
  return worker.setWorkerPublicKey(publicKey, worker_id)
})
.then(result => {
  if (result == 'Public Key Posted')
    console.log('Worker_' + worker_id + '\'s Public Key Posted');
})

// Catch any errors
.catch(console.log);
