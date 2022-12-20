/**
 * HRE = Hardhat Runtime Environment
 *   programmatic access to task runner and config system
 *   export EIP-1193-compatible Ethereum provider
 *   can be extended using plug-ins eg hardhat-ethers
 *
 *   node <script> : run standalone script
 *   npx hardhat run <script> : compile contracts, add HRE to global scope, execute script, then remove HRE from global scope
 */
const hre = require("hardhat");

async function main() {
  // const Token = await hre.ethers.getContractFactory("Token");
  // const token = await Token.deploy();
  // await token.deployed();
  // console.log(`Token deployed to: ${token.address}`);

  // const accounts = await hre.ethers.provider.listAccounts();
  // console.log(accounts);

  const address = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";
  const Token = await hre.ethers.getContractFactory("Token");
  const token = Token.attach(address);

  // call balanceOf() function of deployed Token contract
  const balance = await token.balanceOf(
    "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC"
  );
  console.log("Balance: ", balance.toString());
}

main().catch((err) => {
  console.error(err);
  process.exit = -1;
});
