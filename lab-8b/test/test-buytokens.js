const { BigNumber } = require("ethers");
const { ethers } = require("hardhat");

describe("test uniswap", () => {
    let factory, uniswap, tokenA, tokenB, pool, poolAddr, account;

    it("test add liquidity", async () => {
        account = await ethers.getSigner();

        // Deploy uniswap contracts
        const Factory = await ethers.getContractFactory("UniswapV2Factory");
        factory = await Factory.deploy(account.address);
        const Weth = await ethers.getContractFactory("WETH9");
        const weth = await Weth.deploy();
        const Uniswap = await ethers.getContractFactory("UniswapV2Router02");
        uniswap = await Uniswap.deploy(factory.address, weth.address);

        // Deploy TokenA and TokenB
        const ERC20 = await ethers.getContractFactory("ERC20");
        tokenA = await ERC20.deploy(ethers.utils.parseEther("2"));
        tokenB = await ERC20.deploy(ethers.utils.parseEther("2"));

        // Add Liquidity (10,000 TokenA and 10,000 TokenB)
        await tokenA.approve(uniswap.address, 10_000);
        await tokenB.approve(uniswap.address, 10_000);
        const ts = (await ethers.provider.getBlock()).timestamp + 1000;
        await uniswap.addLiquidity(
            tokenA.address,
            tokenB.address,
            10_000,
            10_000,
            0,
            0,
            account.address,
            ts
        );

        const logs = await factory.queryFilter(
            factory.filters.PairCreated(null)
        );
        poolAddr = logs[0].args.pair;
        console.log(poolAddr);
    });

    const getReserves = async (tokenA, tokenB) => {
        pool = await ethers.getContractAt("UniswapV2Pair", poolAddr);
        const { _reserve0, _reserve1 } = await pool.getReserves();
        return tokenA.address < tokenB.address
            ? { reserveA: _reserve0, reserveB: _reserve1 }
            : { reserveA: _reserve1, reserveB: _reserve0 };
    };

    const getAmountIn = (amountOut, reserveIn, reserveOut) => {
        amountOut = BigNumber.from(amountOut);
        const numerator = reserveIn.mul(amountOut).mul(1000);
        const denominator = reserveOut.sub(amountOut).mul(997);
        //const amountIn = (numerator / denominator).add(1);
        const amountIn = BigNumber.from(
            Math.floor(numerator / denominator)
        ).add(1);
        return amountIn;
    };

    // ECA: TokenA is INPUT and TokenB is OUTPUT
    it("Pay TokenA for 2000 TokenB", async () => {
        const amtB = 2000;

        // Create a mock trader and transfer some tokenA and tokenB to it
        const trader = await ethers.getSigner(1);
        await tokenA.transfer(trader.address, ethers.utils.parseEther("1"));
        await tokenB.transfer(trader.address, ethers.utils.parseEther("1"));
        console.log(
            `Trader: tokenA before=`,
            await tokenA.balanceOf(trader.address)
        );
        console.log(
            `Trader: tokenB before=`,
            await tokenB.balanceOf(trader.address)
        );

        // Find TokenA Amount to Pay
        const reservesBefore = await getReserves(tokenA, tokenB);
        console.log("trade: reservesBefore=", reservesBefore);
        const amtA = getAmountIn(
            amtB,
            reservesBefore.reserveA,
            reservesBefore.reserveB
        );

        // Reserves Before

        // Approve router to withdraw 2000 TokenA from trader account
        await tokenA.connect(trader).approve(uniswap.address, amtA);

        // Trade 2000 TokenA for 1662 TokenB using trader account
        const ts = (await ethers.provider.getBlock()).timestamp + 1000;
        await uniswap
            .connect(trader)
            .swapTokensForExactTokens(
                amtB,
                amtA,
                [tokenA.address, tokenB.address],
                trader.address,
                ts
            );

        // Check Balance After
        console.log(
            `Trader: tokenA after=`,
            await tokenA.balanceOf(trader.address)
        );
        console.log(
            `Trader: tokenB after=`,
            await tokenB.balanceOf(trader.address)
        );

        // Check reserves after
        const reservesAfter = await getReserves(tokenA, tokenB);
        console.log("trade: reservesAfter=", reservesAfter);

        // Result: Reserves for TokenB should be 8000
    });
});
