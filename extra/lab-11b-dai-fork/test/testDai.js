const { expect } = require("chai");
const { ethers, network } = require("hardhat");

describe("Test DAI", () => {
    const MCD_DAI = "0x6A9865aDE2B6207dAAC49f8bCba9705dEB0B0e6D"; // Get from https://chainlog.makerdao.com/

    it("Impersonate whale and send DAI to account 0", async () => {
        const accounts = await ethers.getSigners();
        const whale = "0xc8e924510f8dab87cd53c4aeffde0ab4df5a87b8"; // Get from https://rinkeby.etherscan.io/token/0x6A9865aDE2B6207dAAC49f8bCba9705dEB0B0e6D#balances

        // Impersonate whale
        await network.provider.request({
            method: "hardhat_impersonateAccount",
            params: [whale],
        });
        const signer = await ethers.getSigner(whale);

        // Instantiate DAI contract
        const dai = new ethers.Contract(
            MCD_DAI,
            [
                "function transfer(address account, uint256 amount)",
                "function balanceOf(address account) view returns(uint256)",
            ],
            signer
        );

        // Get DAI balance before
        console.log("My address:", accounts[0].address);
        const before = await dai.balanceOf(accounts[0].address);
        console.log(`Balance Before: ${before.toNumber()} DAI`);

        // Transfer DAI From whale account to accounts[0]
        const response = await dai
            .connect(signer)
            .transfer(accounts[0].address, 1000000);
        await response.wait();

        // Get DAI balance after
        const after = await dai.balanceOf(accounts[0].address);
        console.log(`Balance After: ${after.toNumber()} DAI`);

        // ASSERT
        expect(after.toNumber()).equals(before.toNumber() + 1000000);
    });
});
