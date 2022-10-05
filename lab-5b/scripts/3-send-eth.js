const { ethers } = require("hardhat");
(async () => {
  let accounts = await ethers.getSigners();
  let before = await ethers.provider.getBalance(accounts[0].address);
  console.log(`before: ${accounts[0].address} has ${before} ETH`);

  let qty = 0.1;
  let wei = ethers.utils.parseUnits(qty.toString());
  console.log(`send: ${qty} ETH to ${accounts[1].address}`);
  let response = await accounts[0].sendTransaction({
    to: accounts[1].address,
    value: wei,
  });
})().catch((err) => console.error(err));
