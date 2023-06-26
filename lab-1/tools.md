# Development Tools

Before we start learning about Ethereum and smart contracts, let's familiarise ourselves with the tools that we will be using. For smart contract development, you will need three types of tools: a development environment, a library, and a network.

---

## 1. Hardhat

https://hardhat.org/getting-started#overview

**Hardhat** (we will use **HH** for short in this course) is a **development environment** for Ethereum smart contracts. It provides a framework that handles infrastructure work such as compiling, deploying, starting up a development blockchain, and testing smart contracts. Because it's designed as an environment, it allows you to use your preferred smart contract libraries using plugins.

**Note:** There are other development frameworks besides **hardhat**, such as **truffle**. We will be using hardhat for this course because it is the current industry trend and hardhat offers more flexibility for integration with its design. You can also develop on remix, a fully web-based development tool from the Ethereum Foundation, but it may not be practical for more professional development. You are encouraged to try other tools on your own to understand and appreciate their differences and challenges.

---

## 2. Ethers.js

https://docs.ethers.io/v5/

**ethers.js** is a Javascript **library** for interacting with Ethereum smart contracts.

**Note:** You might have come across the term **web3** library. This is the legacy JavaScript library for Ethereum smart contracts, and the current industry trend is to use ethers.js.

---

## 3. Hardhat Network

https://hardhat.org/hardhat-network/reference

**Hardhat Network** is a **local development network** used to simulate the Ethereum network on your workstation. This is where you will deploy your smart contract for testing and interaction before deploying to a live network (such as a testnet or mainnet).

**Note**: The Hardhat Network is not the only development blockchain available; Ganache is another popular one. However, it is important to choose one that follows the latest Ethereum hard fork. At the time of writing, the latest hard fork is the **Shanghai** fork, and it is supported by the Hardhat Network.

---

## 4. Public Testnet (Goerli)

https://goerli.github.io/

In addition to the Hardhat Network, the current de facto testnet for the Ethereum Mainnet is Goerli. The Goerli Testnet is a proof-of-authority (PoA) cross-client testnet, designed to simulate the Ethereum network for development purposes. It's important to note that, like other testnets, the Goerli Testnet uses its version of Ether (referred to as "Goerli Ether"), which doesn't have any real-world value. It can be obtained for free from faucets for use in deploying and interacting with smart contracts within the testnet.

**Note:** Before deploying your smart contract to the main Ethereum network, it is generally recommended to thoroughly test it on the testnets. Mistakes in smart contracts can be costly, and these testnets provide a safe environment where no real assets are at risk.

---

## 5. Lab 1 - Development Tools

Refer to "lab-1.ipynb" for the lab exercise
