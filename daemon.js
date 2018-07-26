// ***** Connect web3 to the blockchain *****
Web3 = require('web3');
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

// ***** Read and compile the "Voting" Solidity contract *****
fs = require('fs');
code = fs.readFileSync('Foo.sol').toString();
solc = require('solc');
compiledCode = solc.compile(code);

let n = 60;
let i = 0;

let text = '';

function update() {

  // ***** Deploy the contract to the block chain *****
  web3.eth.getAccounts()
  .then(accounts => {

    abiDefinition = JSON.parse(compiledCode.contracts[':Foo'].interface);
    byteCode = compiledCode.contracts[':Foo'].bytecode;

    address = '0xB9DdAdBA3a4a4a07dCE6A9C838249379C3A91810';

    createOptions =   {
      from: accounts[1],
      gas: 4700000
    };

    //console.log('From: ', accounts[1]);

    return new web3.eth.Contract(abiDefinition, address, createOptions);
  })
  .then(VotingContract => {

    return VotingContract.methods.getFoo()
    .call()
    .then(foo => {
      console.log();
      return web3.utils.hexToAscii(foo);
    });
  })
  .then(newText => {
    if (newText != text) {
      console.log('Updated: ', newText);
      text = newText;
    } else {
      console.log('...');
    }
    setTimeout(() => {
      i++;
      if (i < n) update();
      //else logFinalResults();
    }, 1000);
  })
  .catch(console.err);
}

update();
