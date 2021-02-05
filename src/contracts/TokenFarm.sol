pragma solidity ^0.5.0;

import './DappToken.sol';
import './DaiToken.sol';

contract TokenFarm {
  string public name = "Dapp Token Farm";
  DappToken public dappToken;
  DaiToken public daiToken;

  constructor(DappToken _dappToken, DaiToken _daiToken) public {
    dappToken = _dappToken;
    daiToken = _daiToken;
  }

  /**+-1-Stakes Tokens(Deposit):_*/
    function stakeTokens(uint _amount) public {
      
    }
  /**+-2-Unstaking Tokens(Withdraw):_*/

  /**+-2-Issuing Tokens(Earn Interests):_*/

}