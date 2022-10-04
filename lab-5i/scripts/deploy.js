// deploy.js
const { ethers } = require("hardhat");
(async () => {
  let account = await ethers.getSigner();
  let Tut = await ethers.getContractFactory("TutorialERC20");
  let tut = await Tut.deploy("TUT", "TUT", account.address);
  console.log("TUT successfully deployed. TUT address=", tut.address);
  let Sales = await ethers.getContractFactory("Crowdsale");
  let sales = await Sales.deploy(tut.address, 100, {
    gasPrice: 10_000_000_000,
  });
  console.log(
    "Crowdsale succcessfully deployed. Crowdsale address=",
    sales.address
  );
})();
