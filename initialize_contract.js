// ***** Connect web3 to the blockchain *****
Web3 = require('web3');
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

// ***** Show the accounts on the blockchain *****
//web3.eth.getAccounts().then(accounts => { console.log('Accounts:\n', accounts) });

// ***** Read and compile the Solidity contract *****
fs = require('fs');
source = fs.readFileSync('Server.sol').toString();
solc = require('solc');
compiledCode = solc.compile(source);

//console.log(compiledCode);

// ***** Deploy the contract to the block chain *****
web3.eth.getAccounts()
.then(accounts => {

  account = accounts[9];

  abiDefinition = JSON.parse(compiledCode.contracts[':Server'].interface);
  byteCode = compiledCode.contracts[':Server'].bytecode;

  createOptions = {
    from: account,
    gas: 4700000
  };

  return new web3.eth.Contract(abiDefinition, createOptions);
})
.then(VotingContract => {

  deployOptions = {
    data: byteCode
  }

  return VotingContract.deploy(deployOptions)
  .send();

})
// ***** Use the Contract Instance to interact with the contract *****
.then(ContractInstance => {
  console.log(ContractInstance.options.address);
  /*
  ContractInstance.methods.setFoo(web3.utils.asciiToHex("hello"))
  .send()
  .then(() => {
    ContractInstance.methods.getFoo()
    .call()
    .then(result => {
      console.log(web3.utils.hexToAscii(result));
    })
  })
  */

})
.catch(console.log);
