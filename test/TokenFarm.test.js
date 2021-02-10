const { assert } = require("chai");

// eslint-disable-next-line no-undef
const DappToken = artifacts.require("DappToken");
// eslint-disable-next-line no-undef
const DaiToken = artifacts.require("DaiToken");
// eslint-disable-next-line no-undef
const TokenFarm = artifacts.require("TokenFarm");

require("chai").use(require("chai-as-promised")).should();
/**+-For Knowing more about Chai-Testing, go to:_ https://www.chaijs.com .*/

const tokens = (n) => {
  // eslint-disable-next-line no-undef
  return web3.utils.toWei(n, "ether");
};

// eslint-disable-next-line no-undef
contract("TokenFarm", ([owner, investor]) => {
  //+-Write Tests here:_
  let daiToken, dappToken, tokenFarm;

  // eslint-disable-next-line no-undef
  before(async () => {
    //+-Load Contracts:_
    daiToken = await DaiToken.new();
    dappToken = await DappToken.new();
    tokenFarm = await TokenFarm.new(dappToken.address, daiToken.address);

    //+-Transfer all DappTokens to Farm(1 million):_
    await dappToken.transfer(tokenFarm.address, tokens("1000000"));

    //+-Send Tokens to Investor:_
    await daiToken.transfer(investor, tokens("100"), { from: owner });
  });

  describe("Mock DAI deployment", async () => {
    it("has a name", async () => {
      const name = await daiToken.name();
      assert.equal(name, "Mock DAI Token");
    });
  });

  describe("Dapp Token deployment", async () => {
    it("has a name", async () => {
      const name = await dappToken.name();
      assert.equal(name, "DApp Token");
    });
  });

  describe("Token Farm deployment", async () => {
    it("has a name", async () => {
      const name = await tokenFarm.name();
      assert.equal(name, "Dapp Token Farm");
    });

    it("contract has tokens", async () => {
      let balance = await dappToken.balanceOf(tokenFarm.address);
      assert.equal(balance.toString(), tokens("1000000"));
    });
  });

  describe("Farming tokens", async () => {
    it("rewards investors for staking mDai tokens", async () => {
      let result;

      //+-Check Investor's Balance before staking:_
      result = await daiToken.balanceOf(investor);
      assert.equal(
        result.toString(),
        tokens("100"),
        "investor Mock DAI wallet balance correct before staking."
      );

      //+-Stake Mock DAI Tokens:_
      await daiToken.approve(tokenFarm.address, tokens("100")) {
        form: investor,
      });
      await tokenFarm.stakeTokens(tokens("100"), { form: investor });

      //+-Check staking result:_
      result = await daiToken.balanceOf(investor);
      assert.equal(
        result.toString(),
        tokens("0"),
        "investor Mock DAI wallet balance correct after staking."
      );

      result = await daiToken.balanceOf(tokenFarm.address);
      assert.equal(
        result.toString(),
        tokens("100"),
        "Token Farm Mock DAI balance correct after staking."
      );

      result = await tokenFarm.stakingBalance(investor);
      assert.equal(
        result.toString(),
        tokens("100"),
        "investor staking balance correct after staking."
      );

      result = await tokenFarm.isStaking(investor);
      assert.equal(
        result.toString(),
        "true",
        "investor staking status correct after staking."
      );

      //+-Issue Tokens.
      await tokenFarm.issueTokens({ from: owner });

      //+-Check balances after issuance.
      result = await dappToken.balanceOf(investor);

      //+-Ensure that only owner can issue tokens.
      await tokenFarm.issueTokens({ from: investor }).should.be.rejected;

      //+-Unstake tokens.
      await tokenFarm.unstakeTokens({ from: investor });

      //+-Check results after unstaking.
      result = await daiToken.balanceOf(investor);
      assert.equal(result.toString(), tokens('100'), 'investor Mock DAI wallet balance correct after staking');

      result = await daiToken.balanceOf(tokenFarm.address);
      assert.equal(result.toString(), tokens('0'), 'Token Farm Mock DAI balance correct after staking.');

      result = await tokenFarm.stakingBalance(investor);
      assert.equal(result.toString(), tokens('0'), 'investor staking balance correct after staking.');

      result = await tokenFarm.isStaking(investor);
      assert.equal(result.toString(), 'false', 'investor staking status correct after staking.');

    });
  });
});
