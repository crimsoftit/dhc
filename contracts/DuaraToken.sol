pragma solidity ^0.5.0;

contract DuaraToken {

	// set the token name
	string public name = "Duara Token";

	// set the token symbol
	string public symbol = "DHC";

	// set the token standard
	string public standard = "DHC v1.0.0";

	// set the total no. of tokens
	uint256 public totalSupply;

	mapping (address => uint256) public balanceOf;

	// declare transfer event
	event Transfer(
		address indexed _from,
		address indexed _to,
		uint256 _value
	);
	
	

	// constructor
  	constructor(uint256 _initialSupply) public {
  		// allocate the initial supply to the admin account
  		balanceOf[msg.sender] =_initialSupply;
    	totalSupply = _initialSupply;
  	}

  	// transfer tokens function
  	function transfer (address _to, uint256 _value) public returns(bool success) {
  		// throw exception for insufficient funds
  		require (balanceOf[msg.sender] >= _value);
  		
  		// update the balances
  		balanceOf[msg.sender] -= _value;
  		balanceOf[_to] += _value;
	  	

	  	// emit transfer event
	  	emit Transfer (msg.sender, _to, _value);

	  	// return a boolean
	  	return true;
  	}
  	

  	
}

