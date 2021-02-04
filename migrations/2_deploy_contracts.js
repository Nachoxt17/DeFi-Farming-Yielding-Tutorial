// eslint-disable-next-line no-undef
const DappToken = artifacts.require("DappToken");
// eslint-disable-next-line no-undef
const DaiToken = artifacts.require("DaiToken");
// eslint-disable-next-line no-undef
const TokenFarm = artifacts.require("TokenFarm");

module.exports = async function (deployer, network, accounts) {
  //+-Deploy Mock DAI Token:_
  await deployer.deploy(DaiToken);
  const daiToken = await DaiToken.deployed();
  //+-Deploy Mock Dapp Token:_
  await deployer.deploy(DappToken);
  const dappToken = await DappToken.deployed();

  //+-Deploy Mock Dapp Token:_
  await deployer.deploy(TokenFarm, dappToken.address, daiToken.address);
  const tokenFarm = await TokenFarm.deployed();

  //+-Transfer all Tokens to TokenFarm (1 Million DappTokens with 18 Decimals):_
  await dappToken.transfer(tokenFarm.address, "1000000000000000000000000");

  //+-Transfer 100 Mock DAI Tokens to the Investor:_
  await daiToken.transfer(accounts[1], "1000000000000000000000000");
};
