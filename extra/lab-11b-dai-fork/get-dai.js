const { ethers, network } = require("hardhat");

const MCD_DAI = "0x6A9865aDE2B6207dAAC49f8bCba9705dEB0B0e6D"; // Get from https://chainlog.makerdao.com/
const whale = "0xc8e924510f8dab87cd53c4aeffde0ab4df5a87b8"; // Get from https://rinkeby.etherscan.io/token/0x6A9865aDE2B6207dAAC49f8bCba9705dEB0B0e6D#balances
const myWallet = "0x167081A9f679a73ED3984265Ca84b91F8b19Cf15"; // recipient

(async () => {
    // Impersonate whale
    await network.provider.request({
        method: "hardhat_impersonateAccount",
        params: [whale],
    });
    const impersonator = await ethers.getSigner(whale);

    // Connect to DAI contract at Rinkeby
    const dai = await ethers.getContractAt("IERC20", MCD_DAI, impersonator);

    // Check balance before
    const before = await dai.balanceOf(whale);
    console.log(`impersonator: balance before=${before.toBigInt()} DAI`);

    // Transfer 1 ether of DAI From impersonator to accounts[0]
    const response = await dai
        .connect(impersonator)
        .transfer(myWallet, ethers.utils.parseUnits("1", "ether"));
    await response.wait();

    // Check balance after
    const after = await dai.balanceOf(whale);
    console.log(`impersonator: balance after=${after.toBigInt()} DAI`);
})();
