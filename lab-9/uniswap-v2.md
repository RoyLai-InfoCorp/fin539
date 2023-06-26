# DEFI(Uniswap V2)

Decentralized Exchange (DEX) refers to token exchanges that are fully decentralized and on-chain as opposed to centralized exchanges like Binance.

In this session, you will learn about creating and funding liquidity pools, how a constant function is used to price trades, and executing trades using Uniswap contracts using your Development Network. The version of Uniswap contract used for this lab is based on version 2 (current version is 3).

---

## 1. Concept

### A. Constant Product Function

Uniswap uses a 'Constant Function Market Maker' (CFMM) model, which keeps a constant function of reserves to derive asset prices. Trades adjust these reserves, consisting of two tokens, token0 ($x$) and token1 ($y$), in the liquidity pool. Their product, represented by $k$, is always constant. This relationship forms Uniswap's core, known as the **constant product function**.

<center>

$x * y = k$

</center>

---

### B. Trade Function

a) When we pay token0 for token1, we are increasing some $x$ reserve and decreasing some $y$ reserve but $k$ remains the same.

   <center>
   
   $x' * y' = k$
   
   </center>
   
   where $x' = x + \Delta{x}$ and $y' = y - \Delta{y}$

b) Uniswap charges a 0.3% trading fee; hence, the effective percentage of $\Delta{x}$ transferred after fee deduction is $r$.

   <center>
   
   $r = 1 - trading fee$
   
   $x' = (1 - trading fee)\Delta{x} = r\Delta{x}$
   
   </center>

c) The final equation is as follows:

   <center>
   
   $x' * y' = (x + r\Delta{x}) * (y - \Delta{y}) = k$
   
   </center>

---

### C. Spot Price

Token prices are the ratio of reserves. The following equations shows how the **spot price** of token0 and token1 is derived.

<center>

$P_x$ = $y/x$

$P_y$ = $x/y$

</center>

where $P_x$ and $P_y$ are prices of tokens in terms of the other token.

However, the spot price cannot be used for trading because y will decrease when x is increased and instantly invalidating the spot price.

---

### D. Trading Price

Since

<center>

$(x + r\Delta{x}) * (y - \Delta{y}) = x * y$

</center>

We can express $\Delta{y}$ and $\Delta{x}$ as follows:

<center>

$\Delta{y} = \frac{yr\Delta{x}}{x + r\Delta{x}}$

$\Delta{x} = \frac{x\Delta{y}}{r(y-\Delta{y})}$

</center>

-   **sell formula**: $\Delta{y}$ represents the token1 we can receive for selling exact amount $\Delta{x}$ of token0.

-   **buy formula**: $\Delta{x}$ represents the token0 we need to pay in order to buy exact amount $\Delta{y}$ of token1.

### Example

Let's consider a simple example of a hypothetical Uniswap liquidity pool where:

-   The trading fee is 0.3%.
-   The initial amount of token0 ($x$) is 1000.
-   The initial amount of token1 ($y$) is 5000.
-   $k$, the constant product, equals $x * y = 1000 * 5000 = 5,000,000$.

We will consider two trades:

1. Trade1: We will pay 100 token0 to get token1.
2. Trade2: We want to get 500 token1.

#### Trade1

We are adding 100 token0 to the pool, so $r = 1 - trading fee = 1 - 0.003 = 0.997$.

So, $x' = x + r\Delta{x} = 1000 + 0.997 * 100 = 1099.7$.

To find $\Delta{y}$, we use the equation

$\Delta{y} = \frac{yr\Delta{x}}{x + r\Delta{x}} = \frac{5000 * 0.997 * 100}{1000 + 0.997 * 100} \approx 311.62$.

So, we receive approximately 311.62 token1.

#### Trade2

We want to receive 500 token1, so the equation is

$\Delta{x} = \frac{x\Delta{y}}{r(y-\Delta{y})} = \frac{1000 * 500}{0.997 * (5000 - 500)} \approx 111.48$.

So, we need to pay approximately 111.48 token0 to get 500 token1.

This example provides a clear illustration of how Uniswap uses the constant product function to determine trading prices and quantities in its liquidity pools. The actual figures can vary slightly due to rounding errors and the continuous nature of trades on the platform.

---

### E. Impermanent Loss

Let's revisit the same example, but this time, we will consider the token's dollar value in relation to the market.

a) Initially:

-   Reserve of token0 ($x$) is 1000 and dollar value of token0 is \$5.
-   Reserve of token1 ($y$) is 5000 and dollar value of token1 is \$1.

Therefore:

-   Value of reserve0 = \$5 \* 1000 = \$5000
-   Value of reserve1 = \$1 \* 5000 = \$5000
-   Value of pool = value of reserve0 + value of reserve1 = USD 10000

b) One month later, the price of token0 has doubled but token1 remains the same. It is cheaper to buy token0 in the pool since the spot price is \$5 instead of \$10 in the market.

-   Assume 100 token0 were bought,

Based on this formula,

$\Delta{y} = \frac{y\Delta{x}}{r(x-\Delta{x})} = \frac{5000 * 100}{0.997 * (1000 - 100)} \approx 557.23$ token1 is paid.

-   Reserve0 = 900
-   Reserve1 = 5557.23

Therefore:

-   Value of reserve0 = USD 10 \* 900 = USD 9000
-   Value of reserve1 = USD 1 \* 5557.23 = USD 5557.23
-   Value of the pool = USD 14,557.23

c) If you have held onto the 1000 token0 and 5000 token1 instead of using it as liquidity, you would have:

-   value of token0 = 1000 \* USD10 = USD 10,000
-   value of token1 = 5000 \* USD1 = USD 5,000
-   Portfolio = USD15,000

Note: The new spot price is now \$6.1747 which is still cheaper than the market price of $10. That means the impermanent loss can go even higher until the spot price of the pool reflects the market price.

This is a loss seen by liquidity providers due to price volatility. In this case, as the price of token0 has increased in the external market, arbitrageurs will buy token0 from the Uniswap pool (as it's cheaper there due to the constant product formula). This action will increase the price of token0 in the Uniswap pool. However, the liquidity providers would have benefited more if they had just held onto their token0 instead of providing liquidity. This potential missed profit is known as impermanent loss.

The viability of a trading pool depends on the stability of each asset's value. For instance, when reserves are comprised of stable coins like DAI, the value remains predictable. Consequently, a consistent growth in value can be expected as trading fees accumulate from an increasing number of trades.

However, the risk lies in holding two exposures. If the combined dollar value of these assets depreciates, and the trading fees are inadequate to offset this drop in value, then the worth of your holdings in the pool could be less than the value prior to your deposit.

---

### F. Slippage

Although the trades are based on a product constant, the ratio of the reserves are constantly changing due to trade activities. Because transactions are not executed immediately, from the time the trade is submitted to the time it is mined, the reserve ratio could have changed resulting in your trade receiving less tokens than initially expected. This is what slippage means. That is why in

---

## 2. Uniswap Contracts

-   There are 3 Uniswap V2 Contracts that you should be familiar with:
    -   UniswapV2Factory
    -   UniswapV2Pair
    -   UniswapV2Router02

---

### UniswapV2Factory

https://docs.uniswap.org/protocol/V2/reference/smart-contracts/factory

This contract can be found in the **v2-core** [repository](https://github.com/Uniswap/v2-core/tree/816075049f811f1b061bca81d5d040b96f4c07eb) and the live network address is **0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f**.

This contract is mainly used to create a pool contract and also for finding the pool address.

-   The **createPair(tokenA,tokenB)** method can be used to deploy a pool contract using the address of 2 ERC20 tokens. In practise, this function is called externally by the **UniswapV2Router02** contract when adding liquidity to a non-existing pool.

    ```sol
    function createPair(address tokenA, address tokenB)
    ```

    The createPair() function will call the `event PairCreated()` upon completion.

    ```sol
    event PairCreated(address indexed token0, address indexed token1, address pair, uint);
    ```

-   The getter function **getPair(tokenA,tokenB)** is used for finding the address of the pool. This is a very commonly used function.

    ```sol
    mapping(address => mapping(address => address)) public getPair;
    ```

-   The **constructor** has one parameter for the account used to set the trading fee.

    ```sol
    constructor(address _feeToSetter);
    ```

---

### UniswapV2Pair

https://docs.uniswap.org/protocol/V2/reference/smart-contracts/pair

This contract can be found in **v2-core** [repository](https://github.com/Uniswap/v2-core/tree/816075049f811f1b061bca81d5d040b96f4c07eb).

**UniswapV2Pair** is an ERC20 contract that represents the liquidity pool designed to hold the reserves of two or more tokens, including the **Liquidity Token**. Liquidity is established when providers contribute tokens to the pool, earning them fees when other users engage in swaps within the pool. The pool is typically funded with two tokens in different quantities but with an equivalent total value to prevent arbitrage opportunities. The contract primarily determines the reserve to compute pricing, and also aids the factory and router indirectly in minting and updating reserve balances.

-   The most commonly used function is the **getReserves()** function which is used in pricing and trading.

    ```
    function getReserves() public view returns (uint112 _reserve0, uint112 _reserve1, uint32 _blockTimestampLast)
    ```

    What is important to note here, is that \_reserve0 and \_reserve1 corresponds to the lower order and higher order sorted address of the tokens respectively.

-   When a liquidity provider funded the pool, **Liquidity Tokens** will be minted by the pool contract.

    ```sol
    if (_totalSupply == 0) {
        liquidity = Math.sqrt(amount0.mul(amount1)).sub(MINIMUM_LIQUIDITY);
        _mint(address(0), MINIMUM_LIQUIDITY); // permanently lock the first MINIMUM_LIQUIDITY tokens
    } else {
        liquidity = Math.min(amount0.mul(_totalSupply) / _reserve0, amount1.mul(_totalSupply) / _reserve1);
    }
    ```

    -   If the pool is created for the first time, the contract will mint an amount equivalent to the the geometric mean of both tokens' quantities and send 1000 units of the liquidity token will be sent to address(0). This **MINMUM_LIQUIDITY** can never be recovered and is created created to prevent any division by zero error due to an empty pool.
    -   For example, funding the pool:

        -   A liquidity provider add liquidity to the pool by funding it with $10^4$ of TokenA and $10^6$ of TokenB.

        <center>

        $\sqrt{\frac{10^4}{10^6}} - 1000 = 99000$
        </center>

        -   He will receive sqrt(1e4 \* 1e6) - 1000 = 99000 Liquidity Tokens so effectively owns 99% of liquidity tokens minted.

    -   If the liquidity provider is funding a pre-existing pool, then the liquidity token received is based on the smaller of the percentages of token funding amount over existing reserve amount.

-   The liquidity tokens represents the share of the liquidity that they can withdraw from when they trade in their liquidity tokens.

    -   For example, liquidating the pool token:
        -   Assuming that the pool now has 100_000 tokenA and 100_000 tokenB, and the trader decides to liquidate all his Liquidity Tokens. He will get back 99% of both tokens from the pool.
        -   The reserves in the pool will be 1_000 tokenA and 1_000 tokenB attributed to the 1000 locked MINIMUM_LIQUIDITY. In other words, the pool will never be empty.

-   When a trade is executed using the pool, the pool will keep 0.3% of it as fees for the liquidity provider.

---

### UniswapV2Router02

https://docs.uniswap.org/protocol/V2/reference/smart-contracts/router-02

This contract can be found in the **v2-periphery** [repository](https://github.com/Uniswap/v2-periphery/tree/69617118cda519dab608898d62aaa79877a61004) and the live network address is **0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D**.

This contract is used for trading and funding. Below discusses some of the common functions but the contract contains variants of these functions that can be used in different context.

-   The **constructor** requires the factory address and the WETH token address to be provided for deployment. WETH is a ETH wrapper used for wrapping ETH into ERC20 token for used internally in uniswap.

    ```sol
    constructor(address _factory, address _WETH)
    ```

-   The **addLiquidity()** function is used for funding the pool.

    ```sol
    function addLiquidity(
        address tokenA,
        address tokenB,
        uint amountADesired,
        uint amountBDesired,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline
    ) external virtual override ensure(deadline) returns (uint amountA, uint amountB, uint liquidity)
    ```

    -   When a pool does not exist, the function will call the UniswapFactory to create the pool.

    -   When funding the pool, the ratio of tokenA and tokenB should match the reserve ratio, ie. price. This is to avoid arbitrage. The amountAMin and amountBMin is used to give allowance to slippage in case the ratio changes sharply while the funds are still in transit.

    -   The function will return the actual amount funded as amountA and amountB.

    -   For this function to work, the router contract must be approved to withdraw tokenA and tokenB amount from their respective ERC20 contracts for funding the pool.

-   The **removeLiquidity()** function is used for cashing out. The **liquidity** argument passed to this function is the amount of Liquidity Tokens to be traded in for the underlying tokens.

    -   For this to work, the router contract must be approved to withdraw the amount from the liquidity token contract.

    ```sol
    function removeLiquidity(
        address tokenA,
        address tokenB,
        uint liquidity,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline
    ) public virtual override ensure(deadline) returns (uint amountA, uint amountB)
    ```

*   The **swap{Input}For{Output}** functions are used to execute trades.

    -   It has 6 variants:

        -   swapTokensForExactTokens - Pay TokenB for exact amount of TokenA
        -   swapExactTokensForTokens - Pay exact amount of TokenA for TokenB
        -   swapExactETHForTokens - Pay exact amount of ETH for Tokens
        -   swapTokensForExactETH - Pay Tokens for exact amount of ETH
        -   swapExactTokensForETH - Pay exact amount of Tokens for ETH
        -   swapETHForExactTokens - Pay ETH for exact amount of Tokens

    -   Each function also requires a `path` which is an array of addresses where path[0] is the address of the input token and path[n] is the address of the output token. The path usually contains only 2 addresses but can have more than 2 addresses when there is no direct market for the pair.

    -   For example:

        -   **swapTokensForExactTokens** is used when you are expecting to **receive** the exact amount but the offer amount depends on the price this is a **buy** function.

            ```sol
            function swapTokensForExactTokens(
                uint amountOut,
                uint amountInMax,
                address[] calldata path,
                address to,
                uint deadline
            ) external virtual override ensure(deadline) returns (uint[] memory amounts)
            ```

        -   **swapExactTokensForTokens** is used when you are expecting to **offer** the exact amount but the receive amount depends on the price - this is a **sell** function

            ```sol
            function swapExactTokensForTokens(
                uint amountIn,
                uint amountOutMin,
                address[] calldata path,
                address to,
                uint deadline
            ) external virtual override ensure(deadline) returns (uint[] memory amounts)
            ```

-   **getAmountOut(amountIn,reserveIn,reserveOut)** is used to find the output amount for a given input amount. NOTE: Pay attention to the exact order of the parameters.

    ```sol
    function getAmountOut(uint amountIn, uint reserveIn, uint reserveOut) internal pure returns (uint amountOut) {
        uint amountInWithFee = amountIn.mul(997);
        uint numerator = amountInWithFee.mul(reserveOut);
        uint denominator = reserveIn.mul(1000).add(amountInWithFee);
        amountOut = numerator / denominator;
    }
    ```

-   **getAmountIn(amountOut,reserveIn,reserveOut)** is used to find the input amount for a given output amount. NOTE: Pay attention to the exact order of the parameters.

    ```sol
    function getAmountIn(uint amountOut, uint reserveIn, uint reserveOut) internal pure returns (uint amountIn) {
        uint numerator = reserveIn.mul(amountOut).mul(1000);
        uint denominator = reserveOut.sub(amountOut).mul(997);
        amountIn = (numerator / denominator).add(1);
    }
    ```

---

## 3. Lab 9 - DEFI

Refer to "lab-9.ipynb" for the lab exercise

---

## Troubleshooting

### EVM Error: function call to a non-contract account

-   Reason: The hash in pairFor() function in UniswapV2Library.sol is wrong.
-   Fix:

    ```js
    > const json = require("./artifacts/contracts/v2-core/UniswapV2Pair.sol/UniswapV2Pair.json");
    > console.log(ethers.utils.keccak256(json.bytecode));
    ```

### EVM Error: reverted with reason string 'TransferHelper::transferFrom: transferFrom failed'

-   Reason: Possible cause
    -   Router not approve().
-   Fix:
    -   token.approve(routerAddress,amt)
