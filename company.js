let company = require('./company_modules');
let crypto = require('./crypto_modules');
let fs = require('fs');

console.log('*** COMPANY ***');

// Load the company's private key
let privateKey = fs.readFileSync('company/privatekey.txt', 'utf8');

// Get the shares sums (currently encrypted)
company.getWorkerSharesSums()

// Decrypt the shares sums with the private key
.then(sharesSums_enc => {
  return Promise.all([
    crypto.decryptMessage(privateKey, sharesSums_enc[0]),
    crypto.decryptMessage(privateKey, sharesSums_enc[1]),
    crypto.decryptMessage(privateKey, sharesSums_enc[2])
  ]);
})

// (simple reformating of output)
.then(sharesSums_lst => {
  sharesSums = [];
  sharesSums_lst.forEach(sharesSum_lst => {
    sharesSums.push(sharesSum_lst[0]);
  });
  return sharesSums;
})

// Evaluate the mean!
.then(sharesSums => {
  console.log('Secret shares sums: ' + sharesSums);
  return company.evaluateMean(sharesSums);
})
.then(result => {
  console.log('The mean age is: ' + result);
})
.catch(console.log);
