const DuaraToken = artifacts.require("DuaraToken");

module.exports = function (deployer) {
  	deployer.deploy(DuaraToken, 1000000);
};
