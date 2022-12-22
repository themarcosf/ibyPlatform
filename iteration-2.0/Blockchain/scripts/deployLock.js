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
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

  const lockedAmount = hre.ethers.utils.parseEther("1");

  const Lock = await hre.ethers.getContractFactory("Lock");
  const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

  await lock.deployed();

  console.log(
    `Lock with 1 ETH and unlock timestamp ${unlockTime} deployed to ${lock.address}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
