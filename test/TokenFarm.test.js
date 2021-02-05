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
});
