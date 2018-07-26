let contract = require('./modify_contract');

module.exports = {

  setUserData: function(shares, user_id) {

    let options = {
      partyType: 'user',
      method: 'setUserData',
      shares: shares,
      user_id: user_id
    }

    return contract.modifyContract(options);
  },

  getWorkerPublicKeys: function() {

    let options = {
      partyType: 'user',
      method: 'getWorkerPublicKeys'
    }

    return contract.modifyContract(options);
  }

}
