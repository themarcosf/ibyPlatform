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
const ethers = require("ethers");
const fs = require("fs/promises");

const provider = new ethers.providers.InfuraProvider(
  "goerli",
  process.env.INFURA_API_KEY
);

async function main(_contractName) {
  const contractFactory = await hre.ethers.getContractFactory(_contractName);
  const contract = await contractFactory.deploy();
  await contract.deployed();

  await writeDeploymentInfo(contract, _contractName);
}

async function writeDeploymentInfo(contract, _contractName) {
  const data = {
    network: hre.network.name,
    contract: {
      address: contract.address,
      signer: contract.signer.address,
      abi: contract.interface.format(),
    },
  };

  const filename = `${__dirname}/../artifacts/contracts/${_contractName}.sol/deployed${_contractName}.json`;
  const content = JSON.stringify(data, null, 2);
  await fs.writeFile(filename, content, { encoding: "utf-8" });
}

const contracts = ["ERC721_NFT", "AuctionFactory"];

contracts.forEach((contract) =>
  main(contract).catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
);
