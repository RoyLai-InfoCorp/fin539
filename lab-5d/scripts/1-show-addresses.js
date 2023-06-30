const { ethers } = require("hardhat");
(async () => {
  const accounts = await ethers.getSigners();
  const addresses = accounts.map((a) => a.address);
  console.log(addresses);
})();
