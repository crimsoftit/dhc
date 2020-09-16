const DuaraTokenSale = artifacts.require("DuaraTokenSale");

contract ("DuaraTokenSale", function(accounts) {
	var tokenSaleInstance;
	var tokenPrice = 1000000000000000; // in wei

	it("initializes the contract with the correct values", function() {
		return DuaraTokenSale.deployed().then(function(instance) {
			tokenSaleInstance = instance;
			return tokenSaleInstance.address;
		}).then(function(tokenSaleAddress) {
			assert.notEqual(tokenSaleAddress, 0x0, "token sale contract has address");
			return tokenSaleInstance.tokenContract();
		}).then(function(tokenAddress) {
			assert.notEqual(tokenAddress, 0x0, "token contract has address");
			return tokenSaleInstance.tokenPrice();
		}).then(function(price) {
			assert.equal(price, tokenPrice, "token price is correct");
		});
	});
});