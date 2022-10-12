pragma solidity 0.8.8;
import './IERC20.sol';

contract VanillaERC20 is IERC20 {
    string                                      _name;
    string                                      _symbol;
    uint256                                     _totalSupply;
    mapping(address=>uint256)                   _balanceOf;
    mapping(address=>mapping(address=>uint256)) _allowance;

    constructor(string memory name_, string memory symbol_, uint256 totalSupply_, address recipient)
    {
        _name=name_;
        _symbol=symbol_;
        _balanceOf[recipient]=totalSupply_;
    }

    function name() external view returns (string memory)
    {
        return _name;
    }
    function symbol() external view returns (string memory)
    {
        return _symbol;
    }
    function decimals() external pure returns (uint8)
    {
        return 18;
    }
    function totalSupply() external view returns (uint256)
    {
        return _totalSupply;
    }
    function balanceOf(address _owner) external view returns (uint256 balance)
    {
        return _balanceOf[_owner];
    }
    function allowance(address _owner, address _spender) external view returns (uint256 remaining)
    {
        return _allowance[_owner][_spender];
    }

    function transfer(address _to, uint256 _value) external returns (bool success) {
        uint256 fromBalance = _balanceOf[msg.sender];
        require(fromBalance >= _value, "Insufficient balance");
        _balanceOf[msg.sender] = fromBalance - _value;
        _balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function approve(address _spender, uint256 _value) external returns (bool success) {
        address owner = msg.sender;
        _allowance[owner][_spender] = _value;
        emit Approval(owner, _spender, _value);
        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) external returns (bool success) {
        address spender = msg.sender;

        uint256 currentAllowance = _allowance[_from][_to];
        require(currentAllowance >= _value, "Insufficient allowance");
        _allowance[_from][spender] = currentAllowance - _value;

        uint256 fromBalance = _balanceOf[_from];
        require(fromBalance >= _value, "Insufficient balance");
        _balanceOf[_from] = fromBalance - _value;
        _balanceOf[_to] += _value;
        emit Transfer(_from, _to, _value);
       
        return true;
    }

}
