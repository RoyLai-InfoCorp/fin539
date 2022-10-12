pragma solidity ^0.8.6;

import 'hardhat/console.sol';

contract Withdrawable {
    address payable internal _withdrawer;

    constructor(address payable withdrawer) {
        _withdrawer = withdrawer;
    }

    modifier onlyWithdrawer() {
        require(_withdrawer == msg.sender, "Withdrawable: caller is not the withdrawer");
        _;
    }

    event Drawdown(address withdrawer, uint256 amount);

    function drawDown(uint256 value_) public 
        onlyWithdrawer
    {
        _withdrawer.send(value_);
    }

}
