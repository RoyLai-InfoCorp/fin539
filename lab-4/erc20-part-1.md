---
id: solidity-4-ERC20-I
title: Lesson 4 - ERC20 (Part I)
---

# Lesson 4 - ERC20 Fungible Token Standard (Part I)

Solidity is a language for writing Ethereum smart contracts, i.e., programs that run on the Ethereum blockchain. The official language syntax can be found at this link https://docs.soliditylang.org/en/v0.8.8/grammar.html.

In this lesson, we will learn how to write smart contracts, using the ERC20 token as an example.

---

## 1. Introduction to ERC20 Token Standard

A token, in the Ethereum context, is a generic term for smart contracts representing digital assets. A native token or currency refers to the built-in cryptocurrency used for operating the blockchain, also known as protocol tokens. In Ethereum's case, this is ETH.

Beyond protocol tokens are tokens that are synthesized from smart contracts serving different purposes. The most common type of tokens on Ethereum is known as the ERC20 token.

ERC stands for Ethereum Request for Comment, which is a way of setting standards for smart contracts on Ethereum. This standard is necessary to allow smart contracts on Ethereum to interact with each other. The official specification for the ERC20 token can be found here **https://eips.ethereum.org/EIPS/eip-20**.

An ERC20 token is a template for building fungible tokens. Fungibility means all tokens within the contract always have the same value and are fully interchangeable, just like currency. This token standard gained its popularity in 2017 during the peak of the ICO era of Ethereum history and is still core to present-day contract design.

**Note:** There are many variants of ERC20 tokens with new features added to them, but all ERC20 tokens must implement the same basic specification.

According to the specification, a standard ERC20 token contract must expose the following nine functions (**https://ethereum.org/en/developers/docs/standards/tokens/erc-20/**):

```sol
function name() public view returns (string)
function symbol() public view returns (string)
function decimals() public view returns (uint8)
function totalSupply() public view returns (uint256)
function balanceOf(address _owner) public view returns (uint256 balance)
function transfer(address _to, uint256 _value) public returns (bool success)
function transferFrom(address _from, address _to, uint256 _value) public returns (bool success)
function approve(address _spender, uint256 _value) public returns (bool success)
function allowance(address _owner, address _spender) public view returns (uint256 remaining)
```

The standard also defines two events. Events contain information to be returned from a completed transaction.

```sol
event Transfer(address indexed _from, address indexed _to, uint256 _value);
event Approval(address indexed _owner, address indexed _spender, uint256 _value);
```

In the next section, we will create a contract using the specification described above.

---

## 2. Lab 4a - Setup

Refer to "lab-4.ipynb" for the lab exercise

---

## 3. Contract Structure

### a) Contracts

**Contracts** are similar to classes in object-oriented programming (OOP) languages like JS, Java, C#, and share many characteristics with them. Contracts are declared using the **contract** keyword.

```javascript
contract ERC20 {
}
```

### b) State Variables

**State variables** are storage within the contract much like members and properties in OOP. Unlike instances in OOP, contracts and state variables are permanent on the blockchain and, for that matter, creating state variables incurs a higher cost than other types of variables. State variables are declared at the contract level.

```javascript
contract ERC20 {
    string  _name;  // This is a state variable
}
```

### c) Functions

Interaction with contracts are done through its **functions**. There are 2 types of functions : read-only functions and state-changing functions.

#### Example: getName()

getName() is a readonly function

```javascript
contract ERC20 {
    string  _name;  // This is a state variable
    function getName() public view returns (string memory) {
        return _name;
    }
}
```

#### Example: setName()

setName() is a state-changing function

```javascript
contract ERC20 {
    string  _name;  // This is a state variable
    function getName() public view returns (string memory) {
        return _name;
    }
}
```

### d) Constructor

**constructor** is a special function that is only executed once when the contract is initially created (deployed).

```javascript
contract ERC20 {
    string  _name;  // This is a state variable

    constructor(string name)
    {
        _name = name;
    }
}
```

---

## 4. Lab 4b

Refer to "lab-4b.ipynb" for the lab exercise

---

## 5. Compiling Contracts

### Compiler

-   The blockchain runs on its own operating system called **EVM** (or Ethereum Virtual Machine) and the machine language it uses is known as the **bytecode**. In other words, the blockchain does not understand Solidity natively. Therefore, the solidity code has to be converted to bytecode and this process is known as compiling.

-   The solidity files can be compiled using Hardhat.

-   When compiling contracts, make sure the compiler is configured to match the pragma version of the contract.

    #### Example: Solidity

    ```javascript
    pragma solidity 0.8.8
    contract ERC20 {
        ...
    }
    ```

    #### Example: hardhat.config.js

    ```js
    module.exports = {
        solidity: "0.8.8",
    };
    ```

-   The main output from the compilation process are the **bytecode** and the **abi** files. The **bytecode** is deployed and will reside on the blockchain, the **abi** is what used to call the bytecode externally.

    #### Example: Output from HH compilation

    `/artifacts/contracts/ERC20.sol/ERC20.json`.

    ```json
    {
        "_format": "hh-sol-artifact-1",
        "contractName": "MeaninglessErc20",
        "sourceName": "contracts/MeaninglessErc20.sol",
        "abi": [...],
        "bytecode": "...",
        "deployedBytecode": "..."
    }
    ```

---

### ABI - Application Binary Interface

Because the contract only exists in the blockchain as **bytecode**, there needs to be a way to interact with it externally, for instance via Javascript code. The purpose of the **abi** is equivalent to an API that is exposed by the contract to the outside world. Think of it as the API for contracts.

-   The ABI contains specification on the function signature exposed by the contract.
    For example, a contract containing the following function

    ```javascript
    function totalSupply() public view returns (uint256)
    {
        return _totalSupply;
    }
    ```

    will generate an ABI that looks like the following.

    ```json
    {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
    ```

-   From the ABI alone, a developer can tell that the contract contains a function called `totalSupply` that returns a 256-bit unsigned integer as output. With this information, a blockchain transaction can be constructed externally and be sent to the blockchain to interact with it. For example, you can use Javascript to get the totalSupply from the contract on the blockchain.

    ```js
    > await contract.totalSupply()
    BigNumber { value: "1000000000000000000000000" }
    ```

---

## 6. Lab 4c

Refer to "lab-4c.ipynb" for the lab exercise

---

## 7. Read-Only Functions

-   Functions that contains `view` or `pure` keywords are read-only functions, that means they cannot change the state of a smart contract.
-   Read-Only Functions safe to implement as they do not affect the state of the contract when it is called.

    ##### Example: Declaring Read-Only Functions in Solidity

    -   This is a **view** function because is it reading but not writing to any state variable.

        ```js
        function name() public view returns(string memory)
        {
            return _name;
        }
        ```

    -   This is a **pure** function because is it not reading from or writing to any state variable.
        ```js
        function decimals() public pure returns (uint8)
        {
            return 18;
        }
        ```

-   Calling readonly functions will return the result immediately since they do not require blocks to be mined.
-   Calling readonly functions externally are usually free since the JSONRPC Clients are returning the state from memory without broadcasting anyting onto the network.
    **NOTE:** Calling readonly functions on-chain, eg. by another contract, is not free.

    ##### Example: Calling Read-Only Functions from Javascript

    ```js
    > address = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
    > before = await ethers.provider.getBalance(address);
    > const balance = await erc20.balanceOf(address);
    > after = await ethers.provider.getBalance(address);
    // before and after is the same
    ```

---

## 8. Lab 4c and Lab 4d

Refer to "lab-4.ipynb" for the lab exercise

---

## 9. State-Changing Functions

-   State changing functions cannot include the **view** or **pure** keyword.

    #### Example: Declaring State Changing Functions in Solidity

    This is state changing because it is updating the balance in the state variable.

    ```js
    function transfer(address _to, uint256 _value) public {
        _balanceOf[msg.sender] = _balanceOf[msg.sender] - _value;
        _balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
    }
    ```

-   State changing functions will always incur gas fee.
-   Unlike calling a readonly function, calling a state change function from `ethers.js` is equivalent to sending a transaction. Unlike calling a read-only function in the example above, calling a transaction will return a response and not the return value.

    ##### Example: Javascript

    The

    ```js
    > recipient = '0x70997970C51812dc3A010C7d01b50e0d17dc79C8';
    > const response = await erc20.transfer(address, 1_000_000_000);
    > const receipt = await response.wait();
    > receipt.gasUsed
    // ...
    ```

---

## 10. Events and Logs

https://docs.soliditylang.org/en/v0.8.8/contracts.html#events

-   Because a transaction cannot return value directly to an external library call before it is being mined, the result must be returned asynchronously. That is why, a special data structure is used in the blockchain for storing messages that are returned from contracts. This data structure is called the transaction's **log** and is associated with the contract's address. The messages in the logs are called the **events**.

-   The **event** keyword is used to define an Event with parameters much like how a function signature is defined.

    #### Solidity Example: Defining an event

    In the example below, an event called `Transfer` is defined containing 3 parameters from, to and value. There are 2 types of event parameters. The parameters declared with **indexed** are known as **topics** and are searchable. The remaining event parameters are returned as **data**.

    ```sol
    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    ```

-   The **emit** keyword is used to call the event which causes the arguments to be stored into the transaction's log.

    #### Solidity Example: Calling an event

    In the example below, the event Transfer is called at the end of a transfer transaction with 3 arguments.

    ```js
    function transfer(address _to, uint256 _value) public {
        _balanceOf[msg.sender] = _balanceOf[msg.sender] - _value;
        _balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
    }
    ```

*   Events created by transactions are designed for off-chain and not on-chain access which is why we will use ethers.js at this stage.

    -   Extracting the events is a 2-step process: **filter logs** and **decode event**.
    -   A filter is used to find all the events that you are interested in based on the event signature and matching topics, which returns an array of events (logs).
    -   Each event returns a structure below:

        ```js
        {
            topics: [
            '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925',
            '0x000000000000000000000000167081a9f679a73ed3984265ca84b91f8b19cf15',
            '0x0000000000000000000000005797b2170589f01573064f9683c035554d47ffd3'
            ],
            data: '0x0000000000000000000000000000000000000000000000000000000000002710'
        }
        ```

        -   **topics** corresponds to the event parameters declared with **indexed**, ie. `_from` and `_to`.
        -   **data** corresponds to the remaining parameters, ie. `_value`.

    *   Decoding the event requires the event signature `Transfer(address,address,uint256)` which comes from the contract's ABI.

        #### Javascript Example: Create filter from ABI

        https://docs.ethers.io/v5/concepts/events/#events--filters

        **topics[0]** of the topics array refers to corresponds to the keccak hash of the event signature, ie. `Transfer(address,address,uint256)`. We can use **ethers.utils.id()** to get the event signature hash.

        ```js
        const eventSigHash = utils.id("Transfer(address,address,uint256)");
        filter = {
            address: tokenAddress,
            topics: [eventSigHash, null],
        };
        ```

        #### Javascript Example: Get events from contract

        https://docs.ethers.io/v5/concepts/events/

        It is easier to get events from a contract because the events are decoded for you in `event.args`.

        ```js
        filter = await contract.filters.Transfer(null); // null will search for all Transfer events belonging to the contract.
        const logs = await contract.queryFilter(filter);
        const event = logs[0];
        const decoded = event.args;
        console.log(event.topics);
        ///[
        ///'0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925',
        ///'0x000000000000000000000000167081a9f679a73ed3984265ca84b91f8b19cf15',
        ///'0x0000000000000000000000005797b2170589f01573064f9683c035554d47ffd3'
        ///]
        console.log(event.data);
        // 0x0000000000000000000000000000000000000000000000000000000000002710
        console.log(decoded);
        //[
        //    owner: '0x167081A9f679a73ED3984265Ca84b91F8b19Cf15',
        //    spender: '0x5797b2170589F01573064F9683c035554d47ffd3',
        //    value: BigNumber { value: "10000" }
        //]
        ```

        #### Javascript Example: Get events using transaction hash

        If you are getting events without the contract address, then you will need to decode the events using ABI. Note: In this case, the event doesn't contain the decoded `event.args`.

        ```js
        const receipt = await provider.getTransactionReceipt(hash);
        const logs = receipt.logs;
        const ev = logs[0];
        const decoder = new ethers.utils.Interface([
            "event Approval(address indexed owner,address indexed spender,uint256 value)",
        ]);
        const decoded = decoder.parseLog({
            data: ev.data,
            event: ev.topics,
        });
        console.log(decoded);
        ```
