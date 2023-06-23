pragma solidity 0.8.8;
import './VanillaERC20.sol';
import './Ownable.sol';

contract MintableERC20 is VanillaERC20, Ownable {
    uint256 private _unitPrice;

    constructor(string memory name_, string memory symbol_, address owner_) 
        VanillaERC20(name_,symbol_,0,address(0)) 
        Ownable(owner_)
    {
    }

    function mint(address to, uint256 amount) 
    public 
    onlyOwner
    {
        _totalSupply += amount;
        _balanceOf[to] += amount;
        emit Transfer(address(0), to, amount);
    }

}