pragma solidity ^0.4.11;

contract Server {

  /*****************************************************************************
  * CONTRACT DATA
  *****************************************************************************/

  // USER DATA
  // Holds user data secret shares for each worker. Encrypted with worker pk.
  // user_data_<user_id>_<worker_id>
  string user_data_0_0;
  string user_data_0_1;
  string user_data_0_2;
  string user_data_1_0;
  string user_data_1_1;
  string user_data_1_2;
  string user_data_2_0;
  string user_data_2_1;
  string user_data_2_2;

  // Holds workers' share sums. Encrypted with company pk.
  // worker_shares_sum_<worker_id>
  string worker_shares_sum_0;
  string worker_shares_sum_1;
  string worker_shares_sum_2;

  // Worker public keys. Retrieved by users when encrypting shares for workers.
  // worker_public_key_<worker_id>
  string worker_public_key_0;
  string worker_public_key_1;
  string worker_public_key_2;

  // Comapny public key. Retrieved by workers when encrypting share sums.
  string company_public_key;

  // Constructor. Not used.
  function Server() public {}

  /*****************************************************************************
  * CONTRACT METHODS
  *****************************************************************************/

  // USER DATA SETTERS

  // User 0
  function setUserData_0_0(string data) public {user_data_0_0 = data;}
  function setUserData_0_1(string data) public {user_data_0_1 = data;}
  function setUserData_0_2(string data) public {user_data_0_2 = data;}
  // User 1
  function setUserData_1_0(string data) public {user_data_1_0 = data;}
  function setUserData_1_1(string data) public {user_data_1_1 = data;}
  function setUserData_1_2(string data) public {user_data_1_2 = data;}
  // User 2
  function setUserData_2_0(string data) public {user_data_2_0 = data;}
  function setUserData_2_1(string data) public {user_data_2_1 = data;}
  function setUserData_2_2(string data) public {user_data_2_2 = data;}

  // USER DATA GETTERS

  // User 0
  function getUserData_0_0() public constant returns(string) {return user_data_0_0;}
  function getUserData_0_1() public constant returns(string) {return user_data_0_1;}
  function getUserData_0_2() public constant returns(string) {return user_data_0_2;}
  // User 1
  function getUserData_1_0() public constant returns(string) {return user_data_1_0;}
  function getUserData_1_1() public constant returns(string) {return user_data_1_1;}
  function getUserData_1_2() public constant returns(string) {return user_data_1_2;}
  // User 2
  function getUserData_2_0() public constant returns(string) {return user_data_2_0;}
  function getUserData_2_1() public constant returns(string) {return user_data_2_1;}
  function getUserData_2_2() public constant returns(string) {return user_data_2_2;}

  // WORKER SHARE SUM SETTERS

  // Worker 0
  function setWorkerSharesSum_0(string share_sum) public {worker_shares_sum_0 = share_sum;}
  // Worker 1
  function setWorkerSharesSum_1(string share_sum) public {worker_shares_sum_1 = share_sum;}
  // Worker 2
  function setWorkerSharesSum_2(string share_sum) public {worker_shares_sum_2 = share_sum;}

  // WORKER SHARE SUM GETTERS

  // Worker 0
  function getWorkerSharesSum_0() public constant returns(string) {return worker_shares_sum_0;}
  // Worker 1
  function getWorkerSharesSum_1() public constant returns(string) {return worker_shares_sum_1;}
  // Worker 2
  function getWorkerSharesSum_2() public constant returns(string) {return worker_shares_sum_2;}

  // WORKER PUBLIC KEY SETTERS

  // Worker 0
  function setWorkerPublicKey_0(string key) public {worker_public_key_0 = key;}
  // Worker 1
  function setWorkerPublicKey_1(string key) public {worker_public_key_1 = key;}
  // Worker 2
  function setWorkerPublicKey_2(string key) public {worker_public_key_2 = key;}

  // WORKER PUBLIC KEY GETTERS

  // Worker 0
  function getWorkerPublicKey_0() public constant returns(string) {return worker_public_key_0;}
  // Worker 1
  function getWorkerPublicKey_1() public constant returns(string) {return worker_public_key_1;}
  // Worker 2
  function getWorkerPublicKey_2() public constant returns(string) {return worker_public_key_2;}

  // COMPANY PUBLIC KEY SETTER

  function setCompanyPublicKey(string key) public {company_public_key = key;}

  // COMPANY PUBLIC KEY GETTER

  function getCompanyPublicKey() public constant returns(string) {return company_public_key;}

}
