// eslint-disable-next-line no-undef
const TokenFarm = artifacts.require("TokenFarm");

module.exports = async function (callback) {
  let tokenFarm = await TokenFarm.deployed();
  await tokenFarm.issueTokens();

  //+-Code Goes Here.
  console.log("Tokens issued!");
  callback();
};