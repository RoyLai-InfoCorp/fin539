pragma solidity 0.8.8;
import './MintableERC20.sol';
import './Ownable.sol';

contract CrowdSale {
    
    uint256 private _unitPrice;
    MintableERC20 _token;
    address payable _withdrawer;

    constructor(MintableERC20 token, uint256 unitPrice, address payable withdrawer)
    {
        _token = token;
        _unitPrice = unitPrice;
        _withdrawer = withdrawer;
    }

    event Buy(address buyer, uint256 amount);

    function buy(uint256 amount) public payable{
        require(msg.value >= _unitPrice * amount, "Insufficient payment");
        address buyer = msg.sender;
        _token.mint(buyer, amount);
        emit Buy(buyer, amount);
    }

    function drawDown(uint256 value_) public
    {
        if (msg.sender == _withdrawer)
            _withdrawer.send(value_);
    }


}