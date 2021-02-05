const { assert } = require("chai");

// eslint-disable-next-line no-undef
const DappToken = artifacts.require("DappToken");
// eslint-disable-next-line no-undef
const DaiToken = artifacts.require("DaiToken");
// eslint-disable-next-line no-undef
const TokenFarm = artifacts.require("TokenFarm");

require("chai").use(require("chai-as-promised")).should();
/**+-For Knowing more about Chai-Testing, go to:_ https://www.chaijs.com .*/

// eslint-disable-next-line no-undef
contract("TokenFarm", (accounts) => {
  //+-Write Tests here:_
  describe("Mock DAI deployment", async () => {
    it("has a name", async () => {
      let daiToken = await DaiToken.new();
      const name = await daiToken.name();
      assert.equal(name, "Mock DAI Token");
    });
  });
});
