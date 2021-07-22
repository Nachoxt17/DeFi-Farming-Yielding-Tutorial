pragma solidity ^0.5.0;
//+-Made with This Tutorial in Minute 00:01:05 :\_ https://www.youtube.com/watch?v=XLahq4qyors&list=PL0FXkz5ILg9aaZuEB4RUOClau9RBRJVZ3&index=10&t=65s .

import './DappToken.sol';
import './DaiToken.sol';

contract TokenFarm {
  string public name = "Dapp Token Farm";
  address public owner;
  DappToken public dappToken;
  DaiToken public daiToken;

  address[] public stakers;
  mapping(address => uint) public stakingBalance;
  mapping(address => bool) public hasStaked;
  mapping(address => bool) public isStaking;

  constructor(DappToken _dappToken, DaiToken _daiToken) public {
    dappToken = _dappToken;
    daiToken = _daiToken;
    owner = msg.sender;
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
  function unstakeTokens() public {

    //+-Fetch staking balance.
    uint balance = stakingBalance[msg.sender];

    //+-Require amount larger than 0.
    require(balance > 0, "staking balance cannot be 0");

    //+-Transfer Mock Dai tokens to the User as a Withdrawal.
    daiToken.transfer(msg.sender, balance);

    //+-Reset staking balance.
    stakingBalance[msg.sender] = 0;

    //+-Update staking status.
    isStaking[msg.sender] = false;
  }

  /**+-3-Issuing Tokens(Earn Interests):_*/
  function issueTokens() public {
    //+-Only owner can call this function.
    require(msg.sender == owner, "caller must be the owner");

    //+-Issues tokens to all stakers.
    for (uint i=0; i<stakers.length; i++) {
      address recipient = stakers[i];
      uint balance = stakingBalance[recipient];
      if(balance > 0) {
        dappToken.transfer(recipient, balance);
      }
    }
  }
}
