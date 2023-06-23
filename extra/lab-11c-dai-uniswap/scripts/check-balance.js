const ethers = require("ethers");
require("dotenv").config();
const DAI_ADDRESS = "0x6A9865aDE2B6207dAAC49f8bCba9705dEB0B0e6D";
const UNISWAP_FACTORY_ADDRESS = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f";
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

    // Check DAI Balance
    const dai = new ethers.Contract(
        DAI_ADDRESS,
        ["function balanceOf(address) view returns(uint)"],
        account
    );
    const daiBalance = await dai.balanceOf(account.address);
    console.log("Account: DAI=", daiBalance.toString());

    // Check TUT Balance
    const tut = new ethers.Contract(
        TUT_ADDRESS,
        ["function balanceOf(address) view returns(uint)"],
        account
    );
    const tutBalance = await tut.balanceOf(account.address);
    console.log("Account: TUT=", tutBalance.toString());

    // Load Pool Contract
    const factory = new ethers.Contract(
        UNISWAP_FACTORY_ADDRESS,
        ["function getPair(address,address) view returns(address)"],
        account
    );
    const poolAddress = await factory.getPair(dai.address, tut.address);
    const pool = new ethers.Contract(
        poolAddress,
        [
            "function getReserves() view returns(uint112 reserve0, uint112 reserve1, uint32)",
            "function balanceOf(address) view returns(uint)",
        ],
        account
    );

    // Check Liquidity Balance
    const balance = await pool.balanceOf(account.address);
    console.log("Account: Liquidity=", balance.toString());

    // Check Pool reserves
    const { reserve0, reserve1 } = await pool.getReserves();
    console.log(
        "DAI Reserves:",
        DAI_ADDRESS < TUT_ADDRESS ? reserve0.toString() : reserve1.toString()
    );
    console.log(
        "TUT Reserves:",
        TUT_ADDRESS < DAI_ADDRESS ? reserve0.toString() : reserve1.toString()
    );
})();
