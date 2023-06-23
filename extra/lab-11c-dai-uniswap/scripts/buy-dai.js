const ethers = require("ethers");
require("dotenv").config();

const UNISWAP_ROUTER_ADDRESS = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
const DAI_ADDRESS = "0x6A9865aDE2B6207dAAC49f8bCba9705dEB0B0e6D";
const WETH_ADDRESS = "0xc778417E063141139Fce010982780140Aa0cD5Ab";

(async () => {
    // Load account
    const provider = new ethers.providers.JsonRpcProvider(
        process.env.RINKEBY_APIURLKEY
    );
    const account = new ethers.Wallet(
        ethers.Wallet.fromMnemonic(process.env.RINKEBY_MNEMONIC),
        provider
    );

    //Buy 0.001 ETH worth of DAI at market price
    const uniswap = new ethers.Contract(
        UNISWAP_ROUTER_ADDRESS,
        [
            "function swapExactETHForTokens(uint, address[], address, uint) payable",
        ],
        account
    );
    const ts = (await provider.getBlock()).timestamp + 10 * 60 * 1000;
    const response = await uniswap.swapExactETHForTokens(
        0,
        [WETH_ADDRESS, DAI_ADDRESS],
        account.address,
        ts,
        {
            value: ethers.utils.parseEther("0.001"),
        }
    );
    const receipt = await response.wait();
    console.log(receipt);

    // Check DAI balance
    const dai = new ethers.Contract(
        DAI_ADDRESS,
        ["function balanceOf(address) view returns(uint)"],
        account
    );
    const balance = await dai.balanceOf(account.address);
    console.log("DAI: balance=", balance.toString());
})();
