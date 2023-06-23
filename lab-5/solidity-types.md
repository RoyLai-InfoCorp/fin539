---
id: solidity-5-solidity-types
title: Lesson 5 - Solidity Types
---

# Lesson 5 - Solidity Types

In this session, we will review and understand the types that were used in the ERC20 smart contract from the previous session.

---

## 1. Understanding Data Location

https://docs.soliditylang.org/en/v0.8.8/types.html?highlight=data%20location#data-location

-   According to the ERC20 specification (https://ethereum.org/en/developers/docs/standards/tokens/erc-20/) the following functions returns string data type.

    ```sol
    function name() public view returns (string)
    function symbol() public view returns (string)
    ```

-   However, the contract will fail to compile in later compilers with the error message `TypeError: Data location must be "memory" or "calldata" for return parameter in function, but none was given.`

-   The ERC20 standard was defined in 2016. Since then, the Solidity syntax has gotten stricter with its syntax and has undergone massive changes. Since compiler version 0.5.0, one of the requirements for declaring **reference type** is explicitly declare the **data location**.

-   What exactly is data location?

-   A **variable** is an alias for a storage location (storage address as opposed to wallet address). If the location contains the actual value of the variable, then it is called a **value type**. If the location contains, a reference to another location that contains the actual value, then it is called a **reference type**, which is generally used for variable length data types.

-   In Solidity, the reference type can be stored in 3 different locations. The bottom line is, different storage locations has different cost implications and performance implications. A more detailed explanation on reference type will be provided at the later session.

    -   **storage** - is the most expensive data location option and is the default data location for **state variables**. Anything stored in storage will be persisted on the blockchain. Certain data type can only use storage location, eg. mapping. (Gsset=20000)

    -   **memory** - is non-persistent and is the most commonly used as local variables. (Gmemory=3)

    -   **calldata** - is the least expensive data location and is commonly used for storing readonly arguments from transaction call. (Gmemory=3)

-   As a rule of thumb:
    -   read operations cost less than write operations.
    -   Writing to storage location cost 20000 gas per 32 bytes.
    -   Writing to memory location cost 3 gas per 32 bytes.
    -   If you can access data from calldata location, then you save on the cost of copying from calldata to memory.

---

## 2. Fixed-Size Types

### EVM Word Size

-   The size of a word in computer sense, the number of bits used for standard computations. For example, a 64-bit operating systems, uses 8-byte word. For solidity, each word (called 'slot') size is **32-byte** (256 bit). That means, the cost of storing and processing data are based on chunks of 32 bytes.

-   In solidity, using a smaller type can be more expensive if its size is not in multiples of 32 bytes. This is because the EVM has to run extra operations to transform a 1-byte type (uint8) into a 32-byte type(uint256) before it can run operations using it.

    For example, consider the following contracts.

    ```
    contract ContractA {
        uint256 public UInt256;
    }
    contract ContractB {
        uint8 public UInt8;
    }
    ```

    The cost of deploying ContractA is `92079` but the cost of ContractB is `95097`.

-   This is the reason why it is more common to find data types such as uint256 or bytes32 due to **gas optimization**.

---

### Integer types

-   **int** refers to a 256-bit signed integer and **uint** refers to a 256-bit unsigned integer.

-   An integer can be defined for any size up to 256, can be created using the syntax **int`n`** or **uint`n`** where n is a number between 8 to 256.

    For example, **uint8** is an uinsigned 1-byte integer and **uint256** is an unsigned 32-byte integer. Therefore, **uint** is equivalent to **uint256** but it is common practise to use **int256** instead for consistency sake.

-   A signed integer occupies the same storage space as the unsigned integer but the range of value differs.

    For example, uint8 ranges from 0 to 255 while int8 is from -128 to 127.

-   You can declare an integer as state variable or use integer in functions
    **In Solidity**

    ```solidity
    uint256 a;  //initialise to 0
    uint256 b=123 // initialise to 123

    function Add(uint256 a, uint256 b) public pure returns (uint256)
    {
        return a + b;
    }
    ```

    **In Javascript**
    An uint256 will be returned as a BigNumber object.
    You can call a solidity function with uint256 parameters by passing in integer literal, BigNumber, or Hexadecimal string.

    ```js
    const b = await contract.Add2(15, 13);
    const c = await contract.Add2(
        ethers.BigNumber.from("15"),
        ethers.BigNumber.from("13")
    );
    const d = await contract.Add2("0xf", "0xd");
    // BigNumber { value: "28" }
    ```

---

## 3. Lab 5a - Setup

Refer to "lab-5.ipynb" for the lab exercise

---

## 4. Lab 5b - Uint256 is cheaper than UIn8

Refer to "lab-5.ipynb" for the lab exercise

---

## 5. Complex Types

### Address

-   A solidity **address** is made up of 20 bytes.
-   A solidity **address payable** is same as address but has additional members **transfer** and **send**. **address payable** is an address that you can send Ether to.
-   In solidity, you can specify an address explicitly using its hexadecimal without quotation.

    **In Solidity:**

    ```solidity
    address public addr = 0x5FbDB2315678afecb367f032d93F642f64180aa3;
    function setAddr(address a) public
    {
        addr = a;
    }
    ```

    **In Javascript:**
    In javascript, you represent an address as a hexadecimal string, ie. a string prefixed with '0x'.

    ```js
    console.log(await contract.addr());
    // 0x5FbDB2315678afecb367f032d93F642f64180aa3
    await contract.setAddr("0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199");
    const result = await contract.addr();
    console.log(typeof result);
    // string
    console.log(result);
    // 0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199
    ```

---

### Bytes32

-   A **byte32** is a fixed length 32-byte array.
-   **bytes32** is little-endian when interpreted as number

    **In Solidity**

    ```sol
    bytes32 public b32;
    function setUInt256(uint256 b) public
    {
        Bytes32 = bytes32(b);
    }
    ```

    **In Javascript**

    ```js
    await contract.setUInt256(1);
    bytes32 = await contract.Bytes32();
    console.log("Bytes32: setUInt256", bytes32);
    // Bytes32: setUInt256 0x0000000000000000000000000000000000000000000000000000000000000001
    ```

-   **bytes32** is big-endian when interpreted as string or byte array

    **In Solidity**

    ```sol
    function setString(string memory b) public
    {
        Bytes32 = bytes32(bytes(b));
    }
    ```

    **In Javascript**

    ```js
    await contract.setString("1");
    bytes32 = await contract.Bytes32();
    console.log("Bytes32: setString", bytes32);
    // Bytes32: setString 0x3100000000000000000000000000000000000000000000000000000000000000
    ```

---

## 6. Lab 5c - Little Endian vs Big Endian

Refer to "lab-5.ipynb" for the lab exercise

---

## 7. Reference Types

### Mapping Type

https://docs.soliditylang.org/en/v0.8.8/types.html#mapping-types

-   It can be treated as a hashtable for accessing and storage of key-value pairs but unlike traditional hashtable it is a collection of non-contiguous storage space.

-   This is one of the most important complex type used in Solidity the reason being the cost associated with using Mapping is cheaper than Array.

-   The syntax of mapping data type is: **mapping(\_KeyType => \_ValueType)**. The \_KeyType can be any built-in **value type**, eg. bytes, string, or any contract or enum type. \_ValueType can be any type, including mappings, arrays and structs.

    #### Example

    In the example below, \_balanceOf is a mapping that maps any **address** variable to any **uint256** variable.
    \_allowance is a mapping that maps any **address** variable to another mapping, and the second mapping is a mapping of **address** to **uint256**

    ```
    mapping(address=>uint256)                   _balanceOf;
    mapping(address=>mapping(address=>uint256)) _allowance;
    ```

-   A mapping can only have **storage** data location. That means, it incurs storage cost even when it is not used as a state variable (incurring the gas of storage cost).

    #### Example

    In the example below, the mapping is declared as a local variable but must be explicitly declared as storage.

    ```sol
    function testA() {
        mapping(address=>address) storage varA;
    }
    ```

-   A mapping type does not have a length and will map all available values in its key space to the initial value of 0.

-   A mapping cannot be deleted, set the value to 0 when deleting a mapping.

-   A mapping Type is not iterable. That means it cannot be looped through like an array since the size is unknown.

    #### Example

    In the example below, we create a mapping that maps an address to a tokenId and we use an array to track the address keys called \_owners.
    To iterate the mapping, you can iterate \_owners and for each element in \_owners, use it to find the tokenId in \_addressToTokenId mapping.

    ```sol
    address[] _owners;
    mapping(address=>uint256) _addressToTokenId;
    ```

---

## 8. Lab 5d - Mapping

Refer to "lab-5.ipynb" for the lab exercise

---

## 9. Bytes and Strings

### bytes

-   **bytes** is a dynamically-sized byte array.
-   When bytes is longer than 31 bytes, it will occupy at least 2 slots with the first slot storing the size of the byte array + 1.

    **NOTE:**

    -   **bytes1[]** is different from **bytes**. **bytes1[]** is a byte array with each byte element occupying a 32-byte slot. Due to this, **bytes1[]** should not be used whenever possible.

---

### string

https://docs.soliditylang.org/en/v0.8.8/internals/layout_in_storage.html?highlight=string#bytes-and-string

-   **bytes** and **string** are encoded identitically.

-   strings in Solidity are UTF-8 encoded. That means a character can take between 1-4 bytes. The size of a string does not equate the size of its underlying bytes.

-   If a string is less than 32 bytes, the lowest order byte stores the size of the string and the remaining bytes stores the bytes for the string.

-   If it is more than 32 bytes, it will occupy at least 2 slots with the first slot storing the size of the string + 1.

**NOTE:** Performing string manipulation in Solidity is expensive because the EVM does not support string operations natively. Therefore, unlike traditional languages, string does not support basic functions such as length(). String manipulations typically converts a string to a byte array and operations is performed at the byte array level.

---

## 10. Lab 5e - Bytes and Strings

Refer to "lab-5.ipynb" for the lab exercise

---

## 11. Visibility Specifiers

https://docs.soliditylang.org/en/v0.8.8/cheatsheet.html?highlight=visibility#function-visibility-specifiers

-   The ERC20 functions created in the previous lab are **function** functions because they are declared with a **public** specifier.

    ###

    function name() **public** view returns (string)
    function symbol() **public** view returns (string)
    function decimals() **public** view returns (uint8)
    function totalSupply() **public** view returns (uint256)
    function balanceOf(address \_owner) **public** view returns (uint256 balance)
    function transfer(address \_to, uint256 \_value) **public** returns (bool success)
    function transferFrom(address \_from, address \_to, uint256 \_value) **public** returns (bool success)
    function approve(address \_spender, uint256 \_value) **public** returns (bool success)
    function allowance(address \_owner, address \_spender) **public** view returns (uint256 remaining)

    ###

-   A visibility specifier limits the scope of access to a function and the keyword is declared after the function name. There are 4 visibility specifiers in Solidity using the following keywords:

    -   **public** - The scope is accessible from external to or within the contract itself.

    -   **private** - The scope is accessible only within the contract itself.

    -   **external** - The scope is accessible from external only. This is mainly used for interface only. After 0.6.9, there is negligible gas cost difference between calling an external and public function.

    -   **internal** - (Default) The scope is accessible from within the contract as well as by its derived contracts.

-   **NOTE:** A private variable only prevents the variable from being accessible by contracts but does not mean the variable is not readable by the public. Any on-chain data are readable and should not be used as storage for confidential items.

---

## 12. Compiler Generated Getter

-   When using public state variables, the compiler will automatically generate an extra getter function in order for the state to be called externally.
-   If you check the ABI file in the artifacts directory, you will find the interface generated for state variables that looks like this:

    ```json
    {
    "inputs": [],
    "name": "symbol",
    "outputs": [
        {
        "internalType": "string",
        "name": "",
        "type": "string"
        }
    ],
    "stateMutability": "view",
    "type": "function"
    },
    ```

-   This additional function results in additional cost.

    For example, consider the following contracts.

    ```
    contract ContractA {
        uint256 public UInt256;
    }
    contract ContractB {
        uint256 private UInt256;
    }
    ```

    The deployment cost for ContractA is `92079` and ContractB is `67066`.
