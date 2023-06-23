---
id: solidity-10-dapp
title: Lesson 10 - DApp
---

# Lesson 10 - DApp - Decentralized App

Decentralized App basically refers to a front-end interface to the backend smart contract. The logic for the front-end is usually rendered entirely and runs on the browser-side with integration to a client-side wallet (eg. metamask). In this session, we will create a DAPP to interact with the DAI/TUT uniswap pool created in Lab-10.

---

## Metamask

In the previous lab, we have been using a back-end wallet running off node.js. That means, your private keys were stored on the backend. For client-side applications, we will need to store the key using a secure wallet. Metamask is a browser-plugin that is designed for this purpose.

### Step 1. Connecting to Metamask using browser Javascript

    If metamask is installed on the browser, the Javascript can access the wallet using the `window.ethereum` provider. If this object is null, that means Metamask cannot be detected by the browser.

    ```js
    if (window.ethereum) throw new Error("Metamask not detected.");
    ```

### Step 2. Get account from Metamask

    In previous labs, we configure the provider to connect to a network using the mnemonic and network configuration either directly or indirectly via the hardhat.config.js file. But when using Metamask, the connection has to be configured through Metamask itself with Metamask as the provider. For ethers.js to interact with the Metamask, we need to wrap it with as a Web3Provider. To connect to a different network, you will need to select the network and the account using the Metamask plugin in your browser.

    ```js
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    ```

### Step 3. Metamask Login

    In previous labs, there is no need to login because you control the provider using the mnemonic phrase and network configuration. In Metamask case, the key is controlled by the Metamask app. That is why you need to send a JSON RPC command to the wallet to unlock it before it can be used.

    ```js
    await provider.send("eth_requestAccounts", []); // Popup metamask login
    ```

4.  Get address of active Metamask account

    To get the currently selected account in Metamask, you can the provider's `getSigner()` function. To get the accounts' address, you will need to call the `getAddress()` function as opposed to getting it from `signer.address`.

    ```js
    const account = provider.getSigner();
    const accountAddr = await account.getAddress();
    ```

    If metamask is not logged in, the above will throw `unknown account #0 error`.

---

## 2. Lab 10 - DApp

Refer to "lab-10.ipynb" for the lab exercise

---

<center>
<h1>
    The End
</h1>
</center>
