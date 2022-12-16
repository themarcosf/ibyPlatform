require("dotenv").config({ path: "./../config.env" });
require("@nomiclabs/hardhat-ethers");

module.exports = {
  defaultNetwork: "alfajores",
  networks: {
    alfajores: {
      url: "https://alfajores-forno.celo-testnet.org",
      accounts: [process.env.PRIVATE_KEY],
      chainId: 44787,
    },
  },
  solidity: {
    version: "0.8.15",
  },
  namedAccounts: {
    deployer: 0,
  },
};
