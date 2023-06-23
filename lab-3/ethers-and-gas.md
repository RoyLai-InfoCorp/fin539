---
id: solidity-3-ethers
title: Lesson 3 - Ethers
---
# Ethers

## Ether (ETH)

- **Ether (ETH)** is the native cryptocurrency of Ethereum. While Bitcoin's (the cryptocurrency) primary purpose is for value transfer or peer-to-peer electronic cash on the Bitcoin network, Ether's main utility is for running computations on the Ethereum blockchain.

- When a block is mined, miners receive a **mining reward** in Ether (ETH). This is how ETH is minted and added to circulation.

- Besides the mining rewards, ETH is also used by transaction senders to compensate miners for the computational resources consumed to run their transactions.

---

### Check ETH Balance

You can use ethers.js to check an address' ETH balance.

#### Syntax:

```js
ethers.provider.getBalance(address[,blockTag=latest]) => Promise<BigNumber>
```

#### Example:

The following example is used to check the balance of accounts[0] in the network wallet.

```js
> accounts = await ethers.getSigners();
> await ethers.provider.getBalance(accounts[0].address);
BigNumber { value: "10000000000000000000000" }
```

---

### Transfer ETH

You can use ethers.js to transfer ETH from a given account.

#### Syntax:

```js
signer.sendTransaction(transactionRequest) =>  Promise<TransactionResponse>
```

**NOTE:**

- TransactionRequest
- TransactionResponse
- The Provider also has a sendTransaction() function, but that is used for `signed transactions`.

#### Example:

- The example below sends 1 wei from accounts[0] to accounts[1] of the network wallet.
    ```js
    > response = await accounts[0].sendTransaction(
        {
            to: accounts[1].address,
            value:1
        }
    )
    ```

---

## Ether Denominations

- The standard unit used in Ethereum is wei.
- ETH prices are quoted for Ether = 10^18 wei.
- Gas prices are quoted in Gwei = 10^9 wei.
- ERC20 units are generally quoted in wei = 1 wei.

<!-- prettier-ignore -->
| Unit                  |Wei    |Value  |Wei                        |
|-----------------------|-------|-------|---------------------------|
| wei                   |1      |wei    |1                          |
| Kwei (babbage)        |1e3    |wei    |1,000                      |
| Mwei (lovelace)       |1e6    |wei    |1,000,000                  |
| Gwei (shannon)        |1e9    |wei    |1,000,000,000              |
| microether (szabo)    |1e12   |wei    |1,000,000,000,000          |
| milliether (finney)   |1e15   |wei    |1,000,000,000,000,000      |
| ether                 |1e18   |wei    |1,000,000,000,000,000,000  |

---

### Using Big Numbers - BigNumber object

When calling the contract from Javascript, the ethers.js library uses its own **BigNumber** object to represent a 32-byte number from Solidity. That is why, when a transaction that returns **uint256** the Ethereum Client will be returned from a Javascript call as a BigNumber object.

### Convert to wei - parseUnits() function

You can use ethers.js to convert any ether denominations to wei. This is commonly used to convert human input based on `ether` to contract input based on `wei`.

#### Syntax:

```js
utils.parseUnits(valueString , decimalsOrUnitName) => BigNumber
```

**NOTE:** The result is a ethers BigNumber object.

#### Example:

```js
> ethers.utils.parseUnits("1", "ether");
// BigNumber { value: "1000000000000000000" }
```

---

### Convert from wei - formatUnits() function

You can use ethers.js to convert from wei to any ether denominations. This is commonly used to convert contract output based on `wei` to human output based on `ether`.

#### Syntax:

```js
utils.formatUnits(wei , decimalsOrUnitName) => string
```

**NOTE:** The result is a string

#### Example:

```js
> ethers.utils.formatUnits(1000000000000000000n, "ether");
// '1.0'
```

---

# Lab 3 - Ethers

Refer to "lab-3.ipynb" for the lab exercise.