// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.8;

contract Ownable {
    address private _owner;
    
    function owner() external view returns(address) {
        return _owner;
    }

    constructor(address owner_) {
        _owner=owner_;
    }

    modifier onlyOwner() {
        require(_owner == msg.sender, 'Ownable: caller is not the owner');
        _;
    }

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    function transferOwnership(address newOwner) public onlyOwner virtual {
        require(newOwner != address(0), 'Ownable: new owner cannot be zero');
        address oldOwner = _owner;
        _owner = newOwner;
        emit OwnershipTransferred(oldOwner,newOwner);
    }
}