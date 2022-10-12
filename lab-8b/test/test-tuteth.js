const { ethers } = require("hardhat");

describe("test ERC20-ETH pool", () => {
    let factory, uniswap, tokenA, account;

    it("test add liquidity", async () => {
        account = await ethers.getSigner();

        // Deploy uniswap contracts
        const Factory = await ethers.getContractFactory("UniswapV2Factory");
        factory = await Factory.deploy(account.address);
        const Weth = await ethers.getContractFactory("WETH9");
        const weth = await Weth.deploy();
        const Uniswap = await ethers.getContractFactory("UniswapV2Router02");
        uniswap = await Uniswap.deploy(factory.address, weth.address);

        // Deploy TokenA
        const ERC20 = await ethers.getContractFactory("ERC20");
        tokenA = await ERC20.deploy(ethers.utils.parseEther("2"));

        // Add Liquidity (10,000 TokenA and 10,000 TokenB)
        await tokenA.approve(uniswap.address, 10_000);
        const ts = (await ethers.provider.getBlock()).timestamp + 1000;
        await uniswap.addLiquidityETH(
            tokenA.address,
            10_000,
            0,
            0,
            account.address,
            ts,
            {
                value: ethers.utils.parseEther("0.001"),
            }
        );

        const logs = await factory.queryFilter(
            factory.filters.PairCreated(null)
        );
        poolAddr = logs[0].args.pair;
        console.log(poolAddr);
    });
});
