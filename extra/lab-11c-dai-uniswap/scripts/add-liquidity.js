const { ethers } = require("ethers");
require("dotenv").config();

const UNISWAP_ROUTER_ADDRESS = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
const DAI_ADDRESS = "0x6A9865aDE2B6207dAAC49f8bCba9705dEB0B0e6D";
const TUT_ADDRESS = "0xf4da4f86D35CFA69f56c5cc7f357Ad03634d7a0F"; // from lab 6

(async () => {
    // Load Account
    const provider = new ethers.providers.JsonRpcProvider(
        process.env.RINKEBY_APIURLKEY
    );
    const account = new ethers.Wallet(
        ethers.Wallet.fromMnemonic(process.env.RINKEBY_MNEMONIC),
        provider
    );

    // Approve Router to withdraw 10,000 DAI and 10,000 TUT
    const dai = new ethers.Contract(
        DAI_ADDRESS,
        ["function approve(address,uint)"],
        account
    );
    const tut = new ethers.Contract(
        TUT_ADDRESS,
        ["function approve(address,uint)"],
        account
    );
    await dai.approve(UNISWAP_ROUTER_ADDRESS, 10_000);
    await tut.approve(UNISWAP_ROUTER_ADDRESS, 10_000);

    // Fund the pool without considering slippage, ie. amountMinA =0 and amountMinB=0
    const uniswap = new ethers.Contract(
        UNISWAP_ROUTER_ADDRESS,
        [
            "function addLiquidity(address,address,uint,uint,uint,uint,address,uint) returns (uint, uint, uint)",
            "function quote(uint,uint,uint) view returns(uint)",
        ],
        account
    );
    const ts = (await provider.getBlock()).timestamp + 10 * 60 * 1000;
    let response;
    response = await uniswap.addLiquidity(
        dai.address,
        tut.address,
        10_000,
        10_000,
        0,
        0,
        account.address,
        ts,
        {
            gasLimit: 2_700_000,
            gasPrice: 8_000_000_000,
        }
    );
    const receipt = await response.wait();
    console.log(receipt);
})();
