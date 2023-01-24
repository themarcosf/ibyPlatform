require("dotenv").config({ path: "./../config.env" });

const ethers = require("ethers");

/** @notice PROVIDER : any company that provides nodes that can be used to interact with the blockchain */
const provider = new ethers.providers.InfuraProvider(
  "goerli",
  process.env.INFURA_API_KEY
);

const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

module.exports = { provider, wallet };
