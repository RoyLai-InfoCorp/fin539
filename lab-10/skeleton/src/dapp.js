import { ethers, BigNumber } from "ethers";
const UNISWAP_ROUTER_ADDRESS = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
const UNISWAP_FACTORY_ADDRESS = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f";
const DAI_ADDRESS = "0x6A9865aDE2B6207dAAC49f8bCba9705dEB0B0e6D";
const TUT_ADDRESS = "0xf4da4f86D35CFA69f56c5cc7f357Ad03634d7a0F"; // From
const provider = new ethers.providers.Web3Provider(window.ethereum);

const getAccount = async () => {
    await provider.send("eth_requestAccounts", []); // Login to metamask
    const account = provider.getSigner();
    return account;
};

const getAddressA = () => DAI_ADDRESS;

const getAddressB = () => TUT_ADDRESS;

const getBalance = async (tokenAddrA, tokenAddrB, account) => {
    const address = await account.getAddress();

    const tokenA = new ethers.Contract(
        tokenAddrA,
        ["function balanceOf(address) view returns(uint)"],
        account
    );

    const tokenB = new ethers.Contract(
        tokenAddrB,
        ["function balanceOf(address) view returns(uint)"],
        account
    );

    // Pool
    const factory = new ethers.Contract(
        UNISWAP_FACTORY_ADDRESS,
        ["function getPair(address,address) view returns(address)"],
        account
    );
    const poolAddress = await factory.getPair(tokenAddrA, tokenAddrB);
    const pool = new ethers.Contract(
        poolAddress,
        [
            "function getReserves() view returns(uint112 reserve0,uint112 reserve1,uint32)",
            "function balanceOf(address) view returns(uint)",
        ],
        account
    );

    // Get Reserves
    const { reserve0, reserve1 } = await pool.getReserves();
    const reservesA = tokenAddrA < tokenAddrB ? reserve0 : reserve1;
    const reservesB = tokenAddrA > tokenAddrB ? reserve0 : reserve1;

    return {
        balanceA: (await tokenA.balanceOf(address))?.toString(),
        balanceB: (await tokenB.balanceOf(address))?.toString(),
        liquidity: (await pool.balanceOf(address))?.toString(),
        reservesA: reservesA.toString(),
        reservesB: reservesB.toString(),
    };
};

const GetAmountOut = (amountIn, reserveIn, reserveOut) => {
    amountIn = BigNumber.from(amountIn);
    const amountInWithFee = amountIn.mul(997);
    const numerator = amountInWithFee.mul(reserveOut);
    const denominator = reserveIn.mul(1000).add(amountInWithFee);
    const amountOut = numerator / denominator;
    return BigNumber.from(Math.floor(amountOut));
};

const sellTokens = async (inputAmt, inputAddr, outputAddr, account) => {
    // Get Reserves
    const factory = new ethers.Contract(
        UNISWAP_FACTORY_ADDRESS,
        ["function getPair(address,address) view returns(address)"],
        account
    );
    const poolAddress = await factory.getPair(inputAddr, outputAddr);
    const pool = new ethers.Contract(
        poolAddress,
        [
            "function getReserves() view returns(uint112 reserve0,uint112 reserve1,uint32)",
        ],
        account
    );
    const { reserve0, reserve1 } = await pool.getReserves();
    const inputReserves = inputAddr < outputAddr ? reserve0 : reserve1;
    const outputReserves = inputAddr > outputAddr ? reserve0 : reserve1;

    // Get OutputAmt
    const outputAmt = GetAmountOut(
        BigNumber.from(inputAmt),
        BigNumber.from(inputReserves),
        BigNumber.from(outputReserves)
    );

    // Load contract A and contract B
    const uniswap = new ethers.Contract(
        UNISWAP_ROUTER_ADDRESS,
        [`function swapExactTokensForTokens(uint,uint,address[],address,uint)`],
        account
    );

    // Approve router to withdraw 2000 TokenA from trader account
    const inputToken = new ethers.Contract(
        inputAddr,
        ["function approve(address,uint)"],
        account
    );
    const response = await inputToken.approve(UNISWAP_ROUTER_ADDRESS, inputAmt);
    await response.wait();
    console.log("trade: approved. receipt=", response.hash);

    // Trade 2000 TokenA for 1662 TokenB using trader account
    const ts = (await provider.getBlock()).timestamp + 1000;
    await uniswap.swapExactTokensForTokens(
        inputAmt,
        outputAmt,
        [inputAddr, outputAddr],
        await account.getAddress(),
        ts
    );

    return outputAmt;
};

const buyTokens = async (outputAmt, outputAddr, inputAddr, account) => {
    throw new Error("ECA");
};

export {
    getAddressA,
    getAddressB,
    getBalance,
    getAccount,
    sellTokens,
    buyTokens,
};
