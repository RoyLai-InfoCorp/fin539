const { ethers } = require("hardhat");
(async () => {
  let accounts = await ethers.getSigners();
  let before = await ethers.provider.getBalance(accounts[0].address);
  console.log(`before: ${accounts[0].address} has ${before} ETH`);
})().catch((err) => console.error(err));
