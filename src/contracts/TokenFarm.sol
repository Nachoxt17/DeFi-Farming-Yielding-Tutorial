pragma solidity ^0.5.0;

import './DappToken.sol';
import './DaiToken.sol';

contract TokenFarm {
  string public name = "Dapp Token Farm";
  DappToken public dappToken;
  DaiToken public daiToken;

  address[] public stakers;
  mapping(address => uint) public stakingBalance;
  mapping(address => bool) public hasStaked;
  mapping(address => bool) public isStaking;

  constructor(DappToken _dappToken, DaiToken _daiToken) public {
    dappToken = _dappToken;
    daiToken = _daiToken;
  }

  /**+-1-Stakes Tokens(Deposit):_*/
    function stakeTokens(uint _amount) public {
      //+-Transfer Mock Dai Tokens to this contract for staking:_
      daiToken.transferFrom(msg.sender, address(this)/**+-"this" makes reference to the Smart Contract Address.*/, _amount);
      //+-Update Staking Balance:_
      stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;
      //+-Add user to Stakers Array *only* if they have not staked already:_
      if(!hasStaked[msg.sender]) {
        stakers.push(msg.sender);
      }

      //+-Update Staking Status:_
      isStaking[msg.sender] = true;
      hasStaked[msg.sender] = true;

    }
  /**+-2-Unstaking Tokens(Withdraw):_*/

  /**+-3-Issuing Tokens(Earn Interests):_*/

}