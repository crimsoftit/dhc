pragma solidity ^0.5.0;

import "./DuaraToken.sol";


contract DuaraTokenSale {

	address admin;
	DuaraToken public tokenContract;
	uint256 public tokenPrice;


  	constructor(DuaraToken _tokenContract, uint256 _tokenPrice) public {
    	// assign an admin
    	admin = msg.sender;

    	// add token contract (to purchase tokens)
    	tokenContract = _tokenContract;

    	// token price
    	tokenPrice = _tokenPrice;
  	}
}

