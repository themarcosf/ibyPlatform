const ethers = require("ethers");

// @notice provider : any company that provides nodes that can be used to interact with the blockchain
const provider = new ethers.providers.InfuraProvider(
  "homestead",
  process.env.INFURA_KEY
);

const getBlockNumber = async function () {
  const blockNumber = await provider.getBlockNumber();
  console.log(blockNumber);
};

getBlockNumber();
