// deploy.js
const fs = require("fs");

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

  fs.writeFileSync(
    "./contracts.json",
    JSON.stringify(
      {
        erc20: tut.address,
        sales: sales.address,
      },
      null,
      4
    )
  );
})();
