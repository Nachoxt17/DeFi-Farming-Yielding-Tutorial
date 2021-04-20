# DeFi-Tutorial

![Final Result]()

This DeFi App made for the Ethereum Blockchain in Solidity language consists of a Digital Bank in which you can deposit mockDAI ERC-20 Tokens (Which is a Fictitious Token made in the image of the Original DAI) and by doing so and keeping the mockDAIs in the Digital Bank you can earn Yield interest in Dapp ERC-20 Tokens(Made specifically for the Application) thanks to the TokenFarm.sol Contract.

To build this I used OpenZeppelin Contracts Library to make the development faster and safer and I made Unit Testing with Mocha & Chai.

Made with This Tutorial in Minute 00:01:05 :\_ https://www.youtube.com/watch?v=XLahq4qyors&list=PL0FXkz5ILg9aaZuEB4RUOClau9RBRJVZ3&index=10&t=65s .

+-To run the Project:_
+-(1)-Open, Configure and Execute Ganache and then Open the Project, open two terminals, and run the Command "truffle migrate --reset" in the First Console and then run the Command "npm run start" in the Second Console.
+-To Test:_
+-(2)-Connect Ganache with Metamask and create a Test Account:\_
https://www.linkedin.com/pulse/using-ganache-ethereum-emulator-metamask-farhan-khan/

+-(3)-Login with the Metamask-Ganache Trial Account on the Page and write a Number of Tokens to Staking, and then press the "STAKE!" Button and confirm the transaction in Metamask.

+-(4)-Open the Truffle Console and Run the Command "truffle exec scripts/issue-token.js" and all Ready ;).
