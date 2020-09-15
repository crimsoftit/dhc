const DuaraToken = artifacts.require("DuaraToken");


contract('DuaraToken', function (accounts) {

	var tokenInstance;

	it ('initializes the contract with the correct token values', function () {
		return DuaraToken.deployed().then(function(instance) {
			tokenInstance = instance;
			return tokenInstance.name();
		}).then(function(name) {
			assert.equal(name, "Duara Token", "token has the correct name");
			return tokenInstance.symbol();
		}).then(function(symbol) {
			assert.equal(symbol, "DHC", "token has the correct symbol");
			return tokenInstance.standard();
		}).then(function(standard) {
			assert.equal(standard, "DHC v1.0.0", "token has the correct standard");
		});
	});

	it ('allocates the initial supply of tokens upon deployment', function () {
		return DuaraToken.deployed().then(function(instance) {
			tokenInstance = instance;
			return tokenInstance.totalSupply();
		}).then(function(totalSupply) {
			assert.equal(totalSupply.toNumber(), 1000000, 'sets the total supply of tokens to 1,000,000');
			return tokenInstance.balanceOf(accounts[0]);
		}).then(function(adminBalance) {
			assert.equal(adminBalance.toNumber(), 1000000, 'allocates the initial supply to the admin account');
		});
	});

	it ('transfers token ownership', function() {
		return DuaraToken.deployed().then(function(instance) {
			tokenInstance = instance;

			// test require statement first by transfering a value larger than the sender balance
			return tokenInstance.transfer.call(accounts[1], 1000001);
		}).then(assert.fail).catch(function (error) {
			assert(error.message.indexOf('revert') >= 0, "error msg must contain revert");
			return tokenInstance.transfer.call(accounts[1], 250000, { from: accounts[0] });
		}).then (function (success) {
			assert.equal(success, true, "should return true");
			return tokenInstance.transfer(accounts[1], 250000, { from: accounts[0] });
		}).then(function (receipt) {
			assert.equal(receipt.logs.length, 1, "triggers one event");
			assert.equal(receipt.logs[0].event, "Transfer", "should be the Transfer event");
			assert.equal(receipt.logs[0].args._from, accounts[0], "logs the sender account");
			assert.equal(receipt.logs[0].args._to, accounts[1], "logs the receiver account");
			assert.equal(receipt.logs[0].args._value, 250000, "logs the transfer amount");
			return tokenInstance.balanceOf(accounts[1]);
		}).then (function (receiverBal) {
			assert.equal(receiverBal.toNumber(), 250000, "adds transfer amount to the receiving account");
			return tokenInstance.balanceOf(accounts[0]);
		}).then (function (senderBal) {
			assert.equal(senderBal.toNumber(), 750000, "deducts transfer amount from sender account");
		});
	});
});
