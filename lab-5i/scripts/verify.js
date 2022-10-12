//https://hardhat.org/hardhat-runner/plugins/nomiclabs-hardhat-etherscan#complex-arguments
// Run this script to verify chronium programmatically

const hre = require("hardhat");
const contracts = require("../contracts.json");

(async () => {
  const accounts = await ethers.getSigners();

  // VERIFY TUTORIAL TOKEN
  await hre.run("verify:verify", {
    contract: "contracts/TutorialERC20.sol:TutorialERC20",
    address: contracts.erc20,
    constructorArguments: ["TUT", "TUT", accounts[0].address],
  });

  // VERIFY SALES CONTRACT
  await hre.run("verify:verify", {
    contract: "contracts/Crowdsale.sol:Chrowdsale",
    address: contracts.sale,
    constructorArguments: [contracts.erc20, 100],
  });
})();
