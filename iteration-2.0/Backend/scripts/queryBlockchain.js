/**
 * @notice this is a reference-only file with useful methods to query a blockchain
 * @notice run the file to console log comments and functionalities
 */

const ethers = require("ethers");

// @notice provider : any company that provides nodes that can be used to interact with the blockchain
const providerAtGoerli = new ethers.providers.InfuraProvider(
  "goerli",
  process.env.INFURA_API_KEY
);

const providerAtHomestead = new ethers.providers.InfuraProvider(
  "homestead",
  process.env.INFURA_API_KEY
);
//////////////////////////////////////////////////////////////////

console.log(
  "===================================================\n\nNOTICE : This is a reference-only file with useful methods to query a blockchain"
);

(async function () {
  // account methods
  console.log(
    "\n===================================================\n\nAccount methods:\n"
  );

  const _randomAddress = "0x8dC847Af872947Ac18d5d63fA646EB65d4D99560";

  console.log(
    `Account balance (in ether): ${ethers.utils.formatEther(
      await providerAtGoerli.getBalance(_randomAddress)
    )}`
  );

  console.log(
    `Account transaction count: ${await providerAtGoerli.getTransactionCount(
      _randomAddress
    )}`
  );

  // block methods
  console.log(
    "\n===================================================\n\nBlock methods:\n"
  );
  const _currentBlock = await providerAtGoerli.getBlockNumber();

  console.log(`Current block number: ${_currentBlock}`);

  console.log(
    "Current block details: ",
    await providerAtGoerli.getBlock(_currentBlock)
  );

  console.log(
    "\n* current block details with transactions details: provider.getBlockWithTransactions(blockNumber)"
  );

  // network methods
  console.log(
    "\n===================================================\n\nNetwork methods:\n"
  );

  console.log(
    `Gas price estimate (in gwei): ${ethers.utils.formatUnits(
      await providerAtGoerli.getGasPrice(),
      "gwei"
    )}`
  );

  console.log("Network fee data: ", await providerAtGoerli.getFeeData());

  // events methods
  console.log(
    "\n===================================================\n\nEvents methods:\n"
  );

  const _filter = {
    address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    topics: [ethers.utils.id("Transfer(address,address,uint256)")],
    // topics: [ethers.utils.id("Transfer(address,address,uint256)"), null, ["address1", "address2"], "value"], --> advanced filters
  };

  console.log(
    "Filtered events log: ",
    (await providerAtHomestead.getLogs(_filter)).slice(0, 3)
  );

  providerAtHomestead.once(_filter, (e) =>
    console.log("\nListened event: ", e)
  );

  // custom events
})();
