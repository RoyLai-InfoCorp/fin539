// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.8;
import './TutorialERC20.sol';

contract Crowdsale {
    uint256 _unitPrice;
    TutorialERC20 _token;

    constructor(TutorialERC20 token, uint256 unitPrice) {
        _token = token;
        _unitPrice = unitPrice;
    }

    event Buy(address buyer, uint256 amount);

    function buy(uint256 amount) public payable{
        require(msg.value >= _unitPrice * amount, "Insufficient payment");
        address buyer = msg.sender;
        _token.mint(buyer, amount);
        emit Buy(buyer, amount);
    }


}

