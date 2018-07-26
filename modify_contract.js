module.exports = {

  modifyContract: function(options) {
    return new Promise(function(resolve, reject) {
      const CONTRACT_ADDRESS = process.env.SERVER_CONTRACT_ADDRESS;

      //const CONTRACT_ADDRESS = '0xB2572E6DcF605DF752093cA73DA00B9CDF12F5fE';

      // ***** Connect web3 to the blockchain *****
      Web3 = require('web3');
      web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

      // ***** Read and compile the "Voting" Solidity contract *****
      fs = require('fs');
      code = fs.readFileSync('Server.sol').toString();
      solc = require('solc');
      compiledCode = solc.compile(code);

      // ***** Deploy the contract to the block chain *****
      web3.eth.getAccounts()
      .then(accounts => {

        if (options.partyType == 'user') id = parseInt(options.user_id);
        if (options.partyType == 'worker') id = parseInt(options.worker_id) + 3;
        else id = 7;

        account = accounts[id];

        abiDefinition = JSON.parse(compiledCode.contracts[':Server'].interface);
        byteCode = compiledCode.contracts[':Server'].bytecode;

        address = CONTRACT_ADDRESS;

        createOptions =   {
          from: account,
          gas: 4700000
        };

        return new web3.eth.Contract(abiDefinition, address, createOptions);
      })
      .then(ContractInstance => {
;
        switch(options.method) {

          case 'setUserData':

            switch(options.user_id) {
              case '0':
                return Promise.all([
                  ContractInstance.methods.setUserData_0_0(options.shares[0])
                  .send(),
                  ContractInstance.methods.setUserData_0_1(options.shares[1])
                  .send(),
                  ContractInstance.methods.setUserData_0_2(options.shares[2])
                  .send()
                ])
                .then(() => {
                  resolve('User data posted');
                })
                .catch(reject);
                break;
              case '1':
                return Promise.all([
                  ContractInstance.methods.setUserData_1_0(options.shares[0])
                  .send(),
                  ContractInstance.methods.setUserData_1_1(options.shares[1])
                  .send(),
                  ContractInstance.methods.setUserData_1_2(options.shares[2])
                  .send()
                ])
                .then(() => {
                  resolve('User data posted');
                })
                .catch(reject);
                break;
              case '2':
                return Promise.all([
                  ContractInstance.methods.setUserData_2_0(options.shares[0])
                  .send(),
                  ContractInstance.methods.setUserData_2_1(options.shares[1])
                  .send(),
                  ContractInstance.methods.setUserData_2_2(options.shares[2])
                  .send()
                ])
                .then(() => {
                  resolve('User data posted');
                })
                .catch(reject);
                break;
            }
            break;

          // GET USER DATA
          case 'getUserData':

            switch(options.worker_id) {
              case '0':
                return Promise.all([
                  ContractInstance.methods.getUserData_0_0()
                  .call(),
                  ContractInstance.methods.getUserData_1_0()
                  .call(),
                  ContractInstance.methods.getUserData_2_0()
                  .call()
                ])
                .then(resolve)
                .catch(reject);
                break;
              case '1':
                return Promise.all([
                  ContractInstance.methods.getUserData_0_1()
                  .call(),
                  ContractInstance.methods.getUserData_1_1()
                  .call(),
                  ContractInstance.methods.getUserData_2_1()
                  .call()
                ])
                .then(resolve)
                .catch(reject);
                break;
              case '2':
                return Promise.all([
                  ContractInstance.methods.getUserData_0_2()
                  .call(),
                  ContractInstance.methods.getUserData_1_2()
                  .call(),
                  ContractInstance.methods.getUserData_2_2()
                  .call()
                ])
                .then(resolve)
                .catch(reject);
                break;
            }
            break;

          // SET WORKER SHARE SUM
          case 'setWorkerSharesSum':

            switch(options.worker_id) {
              case '0':
                ContractInstance.methods.setWorkerSharesSum_0(options.sharesSum)
                .send()
                .then(() => {
                  resolve('Shares sum posted');
                })
                .catch(reject);
                break;
              case '1':
                ContractInstance.methods.setWorkerSharesSum_1(options.sharesSum)
                .send()
                .then(() => {
                  resolve('Shares sum posted');
                })
                .catch(reject);
                break;
              case '2':
                ContractInstance.methods.setWorkerSharesSum_2(options.sharesSum)
                .send()
                .then(() => {
                  resolve('Shares sum posted');
                })
                .catch(reject);
                break;
            }
            break;

          // GET WORKER SHARES SUMS
          case 'getWorkerSharesSums':
            return Promise.all([
              ContractInstance.methods.getWorkerSharesSum_0()
              .call(),
              ContractInstance.methods.getWorkerSharesSum_1()
              .call(),
              ContractInstance.methods.getWorkerSharesSum_2()
              .call()
            ])
            .then(resolve)
            .catch(reject);
            break;

          // SET WORKER PUBLIC KEY
          case 'setWorkerPublicKey':
            switch(options.worker_id) {
              case '0':
                ContractInstance.methods.setWorkerPublicKey_0(options.publicKey)
                .send()
                .then(resolve('Public Key Posted'))
                .catch(reject);
                break;
              case '1':
                ContractInstance.methods.setWorkerPublicKey_1(options.publicKey)
                .send()
                .then(resolve('Public Key Posted'))
                .catch(reject);
                break;
              case '2':
                ContractInstance.methods.setWorkerPublicKey_2(options.publicKey)
                .send()
                .then(resolve('Public Key Posted'))
                .catch(reject);
                break;
            }
            break;

          // GET WORKER PUBLIC KEY
          case 'getWorkerPublicKeys':
            Promise.all([
              ContractInstance.methods.getWorkerPublicKey_0()
              .call(),
              ContractInstance.methods.getWorkerPublicKey_1()
              .call(),
              ContractInstance.methods.getWorkerPublicKey_2()
              .call()
            ])
            .then(resolve)
            .catch(reject);
            break;

          // SET COMPANY PUBLIC KEY
          case 'setCompanyPublicKey':
            ContractInstance.methods.setCompanyPublicKey(options.publicKey)
            .send()
            .then(resolve('Public Key Posted'))
            .catch(reject);
            break;

          // GET COMPANY PUBLIC KEY
          case 'getCompanyPublicKey':
            ContractInstance.methods.getCompanyPublicKey()
            .call()
            .then(resolve)
            .catch(reject);
            break;
          }
      })
      .catch(console.log);
    });
  }

}
