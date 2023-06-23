---
id: solidity-6-erc20-2
title: Lesson 6 - ERC20 (Part II)
---

# Lesson 6 - ERC20 Fungible Token Standard (Part 2)

## 1. Intro

In the previous lab, we have created a vanilla ERC20 token according to the ERC20 standards specification. However, there are some limitations. The total supply of tokens are fixed at contract creation time and are entirely minted into a single address. In this session, we will extend the functionality of the Vanilla ERC20 to allow minting and transfer of ownership so as to create a basic tradeable token. We will call this token the Tutorial ERC20 Token and the symbol is TUT.

---

## 2. Lab 6a - Setup

Refer to "lab-6.ipynb" for the lab exercise

---

## 3. Inheritance

-   Solidity contract derives from another contract using the **is** keyword.

    ### Example: Inheritance

    ```solidity
    contract BaseContract {
        string public name;
    }
    contract DeriveContract is BaseContract {
    }
    ```

-   For a derived contract to override a function from base contract, use **virtual** keyword for the base contract function and **override** keyword for the derived contract.

    ### Example: Virtual and Override

    ```solidity
    contract BaseContract {
        string public name='myName';
        function getName() public virtual view returns (string memory) {
            return name;
        }
    }
    contract DerivedContract is BaseContract {
        function getName() public override view returns (string memory) {
            return 'override';
        }
    }
    ```

-   To initialise the constructor of the base contract, use the name of the base contract as the constructor modifier.

    ### Example: Constructor

    ```solidity
    contract BaseContract {
        string public name;
        constructor(string memory name_)
        {
            name=name_;
        }
    }
    contract DerivedContract is BaseContract {
        constructor(string memory name_) BaseContract(name_){
        }
    }
    ```

---

## 4. Lab 6b - MintableERC20 Token

Refer to "lab-6.ipynb" for the lab exercise

---

## 5. Lab 6c - Test Mintable Contract

Refer to "lab-6.ipynb" for the lab exercise

---

## 6. Modifiers

-   Solidity's function declaration syntax can be exceedlingly long due to the variety of built-in modifiers available. Modifiers is used declaratively to give special meaning to functions.

    ### Example

    -   function name() public **view** returns (string)
    -   function mint(address to, uint256 amount) public **virtual**
    -   function mint(address to, uint256 amount) public **override**

-   Custom modifiers can be created using the **modifier** keyword followed by the modifier name and the code block.

    ### Example : Declaring a Modifier

    ```sol
    modifier onlyOwner() {
        require(owner == msg.sender, "Ownable: caller is not the owner");
        _;
    }
    ```

-   Once the modifier is declared, it can be used like built-in modifiers.

    ### Example : Using a Modifier

    1. Consider the following function.

        ```sol
        function mint(address to, uint256 amount) public override
        {
            _totalSupply += amount;
            _balanceOf[to] += amount;
        }
        ```

    2. Applying onlyOwner() modifier `function mint(address to, uint256 amount) public override onlyOwner` is equivalent to

        ```sol
        function mint(address to, uint256 amount) public override
        {
            require(owner == msg.sender, "Ownable: caller is not the owner");
            _totalSupply += amount;
            _balanceOf[to] += amount;
        }
        ```

-   Notice that `_;` is added to the end of the modifier. `_;` is used to tell the compiler where to substitute the rest of the function body for this modifier.

    ### Example: Position of \_;

    1. In this example, the `_;` is before the require expression, that means the function body will be executed before the require expression.

        ```sol
        modifier onlyOwner() {
            _;
            require(owner == msg.sender, "Ownable: caller is not the owner");
        }
        ```

    2. Applying onlyOwner() modifier `function mint(address to, uint256 amount) public override onlyOwner` is equivalent to

        ```sol
        function mint(address to, uint256 amount) public override
        {
            _totalSupply += amount;
            _balanceOf[to] += amount;
            require(owner == msg.sender, "Ownable: caller is not the owner");
        }
        ```

---

## 7. Lab 6d - Ownable Contract

Refer to "lab-6.ipynb" for the lab exercise

---

## 8. Multiple Inheritance

https://docs.soliditylang.org/en/v0.8.8/contracts.html?highlight=multiple%20inheritance#multiple-inheritance-and-linearization

-   A Solidity contract can support multiple inheritance from base contracts using [C3 linearization](https://en.wikipedia.org/wiki/C3_linearization) algorithm, that means the order of deriving from contract matters.

-   It can be suitable when used to derive a new class from highly decoupled and small classes with low likelihood for name conflicts. It is not recommended for multiple complex classes, as the resulting errors can be difficult to troubleshoot.

-   Multiple inheritance function overriding

    ### Example: Function Overriding

    -   Consider the following parent classes, A and B, with a function that shares the same name.

        ```solidity
        contract A {
            function conflict() public virtual {
            }
        }
        contract B {
            function conflict() public virtual {
            }
        }
        ```

    -   The child contract C of A and B cannot compile because the parents contains a same name function. The child is forced to implement conflict() even if its not using it.
        ```solidity
        contract C is A,B {
        }
        ```

    *   Contract D will not compile even though the child overrides the conflict() function. Unlike single inheritance, the **override** keyword when used for multiple inheritance must be declared with the parent class names.
        ```solidity
        contract D is A,B {
            function conflict() public override {
            }
        }
        ```
    *   Contract E can compile.
        ```solidity
        contract E is A,B {
            function conflict() public override(A,B) {
            }
        }
        ```

-   Multiple inheritance constructor

    -   The order of constructor calls follows the order in which the base contracts are defined,ie. left to right.

    ### Example: Multiple Inheritance Constructor

    -   Consider the following parent classes, A and B.

        ```solidity
        contract TestParentA is TestGrantParent {
            string public name;
            constructor(string memory name_) {
                name=name_;
            }
        }

        contract TestParentB is TestGrantParent {
            uint public age;
            constructor(uint age_) {
                age=age_;
            }
        }
        ```

    -   The constructor for base contracts are specified explicitly using their names as modifier.
        ```solidity
        contract TestChildA is TestParentA, TestParentB {
            constructor() TestParentA('A') TestParentB(100) {
            }
        }
        ```

---

## 9. Lab 6e - TutorialERC20 Token

Refer to "lab-6.ipynb" for the lab exercise

---

## 10. Lab 6f - Deploy to Testnet

Refer to "lab-6.ipynb" for the lab exercise

---

## 11. Address Payable

In the previous sessions, we have created ERC20 token and was able to transfer the token using `transfer()` and `transferFrom()` functions. In this session, we will learn about transferring ETH to a contract.

### **payable** keyword

-   For a contract to receive ETH, it needs to have a function declared using the **payable** keyword

    #### Example : Payable function

    For example, the buy() function below is able to receive ETH from the caller. The amount of ETH it received can be extracted from `msg.value`

    ```sol
    function buy(uint256 amount) public payable {
        require(msg.value >= 0, "Insufficient payment");
    }
    ```

-   To send ETH to the contract using ethers.js, include the option { **value**: amt } to the call.

    #### Example: Sending ETH to a contract

    In the example below,

    ```js
    await contract.buy(100, { value: 10000 });
    ```

---

## 12. External Call

-   A contract can interact with other contracts by making an external call.

    ### Example

    In the code below, a contract Crowdsale is given the address to a mintable ERC20 contrace and can create a instance of the token contract using `erc20=ERC20(erc20_)` and call the mint function of the erc20 token externally `erc20.mint(_msg.sender,amt)`

    ```sol
    contract ERC20 {
        ...
    }

    contract CrowdSale {
        EERC20 erc20;
        constructor (address erc20_)
        {
            erc20 = ERC20(erc20_);
        }
        function mint(uint256 amt) public {
            erc20.mint(_msg.sender,amt);
        }
    }
    ```

-   When a contract is called indirectly via another contract, the **msg.sender** variable is the calling contract's address.

    -   Consider the following:

        ```sol
        pragma solidity 0.8.8;
        import 'hardhat/console.sol';

        contract A {
            function whoami() public {
                console.log(msg.sender);
            }

            function whoami2() public {
                this.whoami();
            }
        }

        contract B {
            A a;

            constructor (A a_)
            {
                a = A(a_);
            }

            function whoami() public {
                a.whoami();
            }

            function whoami2() public {
                a.whoami2();
            }
        }
        ```

    -   Create a test to call whoami() and whoami2() of A and B.

        ```js
        const A = await ethers.getContractFactory("A");
        const a = await A.deploy();
        await a.whoami();
        // This returns 0x167081a9f679a73ed3984265ca84b91f8b19cf15 (accounts[0])

        const B = await ethers.getContractFactory("B");
        const b = await B.deploy(a.address);
        await b.whoami();
        // This returns 0x5797b2170589f01573064f9683c035554d47ffd3 (a.address)

        await a.whoami2();
        await b.whoami2();
        // This returns 0x5797b2170589f01573064f9683c035554d47ffd3 (b.address)
        ```

---

## 13. Lab 6g - Create Crowdsale Token

Refer to "lab-6.ipynb" for the lab exercise

---

## 14. Lab 6h - Verify Contract

Refer to "lab-6.ipynb" for the lab exercise
