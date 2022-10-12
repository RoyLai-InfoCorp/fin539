const { BigNumber } = require("ethers");
const { ethers } = require("hardhat");

describe("test uniswap", () => {
    let factory, uniswap, tokenA, tokenB, pool, poolAddr, account;

    it("test add liquidity 2", async () => {
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

        //--- extended
        const pool = await ethers.getContractAt("UniswapV2Pair", poolAddr);

        const getReserves = async (tokenA, tokenB) => {
            const { _reserve0, _reserve1 } = await pool.getReserves();
            return tokenA.address < tokenB.address
                ? { reserveA: _reserve0, reserveB: _reserve1 }
                : { reserveA: _reserve1, reserveB: _reserve0 };
        };

        // Check reserves
        const reservesBefore = await getReserves(tokenA, tokenB);
        console.log(
            "Reserves Before funding 20,000 TokenA and 50,000 TokenB:",
            reservesBefore
        );

        //Add Liquidity Again (20,000 TokenA and 50,000 TokenB)
        await tokenA.approve(uniswap.address, 20_000);
        await tokenB.approve(uniswap.address, 50_000);
        await uniswap.addLiquidity(
            tokenA.address,
            tokenB.address,
            20_000,
            50_000,
            0,
            0,
            account.address,
            ts
        );

        //Check reserves
        const reservesAfter = await getReserves(tokenA, tokenB);
        console.log(
            "Reserves After funding 20,000 TokenA and 50,000 TokenB:",
            reservesAfter
        );
    });
});
