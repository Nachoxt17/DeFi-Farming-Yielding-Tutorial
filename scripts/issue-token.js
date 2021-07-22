// eslint-disable-next-line no-undef
const TokenFarm = artifacts.require("TokenFarm");

module.exports = async function (callback) {
  //+-Code Goes Here.
  let tokenFarm = await TokenFarm.deployed();
  await tokenFarm.issueTokens();
  
  console.log("Tokens issued!");
  callback();
};
