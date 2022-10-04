// transfer-ownership.js

const { ethers } = require("hardhat");
(async () => {
  const sale = await ethers.getContractAt(
    "Crowdsale",
    "0xa25BaB9DA021BFEdA33418d915388e2313484979"
  );
  console.log(sale.address);
  const tut = await ethers.getContractAt(
    "TutorialERC20",
    "0x6b164f0702E8F2316146BA6D13E4Ed8eb2bae264"
  );
  const response = await tut.transferOwnership(sale.address);
  console.log("RESPONSE:", response);
  const receipt = await response.wait();
  console.log("RECEIPT:", receipt);
})();
