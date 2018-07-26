let company = require('./company_modules');

// Generate a public/private keypair
company.generatePublicPrivate()
.then(publicKey => {
  console.log('Company\'s Keys Created - see company/');
  return publicKey;
})

// Post public key to blockchain
.then(publicKey => {
  return company.setCompanyPublicKey(publicKey)
})
.then(result => {
  if (result == 'Public Key Posted')
    console.log('Company\'s Public Key Posted');
})

// Catch any errors
.catch(console.log);
