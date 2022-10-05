// SPDX-License-Identifier: SEE LICENSE IN LICENSE

pragma solidity 0.8.8;
contract ERC20 {
    
    string _name;
    string _symbol;
    uint256 _totalSupply;
    mapping(address=>uint256) _balanceOf;
    mapping(address=>mapping(address=>uint256)) _allowance;
    
    function name() public view returns(string memory)
    {
        return _name;
    }

    function symbol() public view returns(string memory)
    {
        return _symbol;
    }

    function decimals() public pure returns (uint8)
    {
        return 18;
    }

    function totalSupply() public view returns (uint256)
    {
        return _totalSupply;
    }

    function balanceOf(address _owner) public view returns (uint256)
    {
        return _balanceOf[_owner];
    }

    function allowance(address _owner, address _spender) public view returns (uint256)
    {
        return _allowance[_owner][_spender];
    }

    constructor(string memory name_, string memory symbol_, uint256 totalSupply_, address owner)
    {
        _name=name_;
        _symbol=symbol_;
        _balanceOf[owner]=totalSupply_;
    }


}