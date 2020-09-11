const DuaraToken = artifacts.require("DuaraToken");


contract('DuaraToken', function (accounts) {

	it ('sets the total supply upon deployment', function () {
		return DuaraToken.deployed().then(function(instance) {
			tokenInstance = instance;
			return tokenInstance.totalSupply();
		}).then(function(totalSupply) {
			assert.equal(totalSupply.toNumber(), 1000000, 'sets the total supply of tokens to 1,000,000');
		});
	});	
})
