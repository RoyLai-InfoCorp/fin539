// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.8;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract TutorialERC20_2 is ERC20, Ownable {

    constructor(string memory name_, string memory symbol_, address owner_) ERC20(name_,symbol_) {
    }

    function mint(address account, uint256 amount) onlyOwner() public {
        _mint(account,amount);
    }

}