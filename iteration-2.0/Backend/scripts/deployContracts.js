/**
 * HRE = Hardhat Runtime Environment
 *   programmatic access to task runner and config system
 *   export EIP-1193-compatible Ethereum provider
 *   can be extended using plug-ins eg hardhat-ethers
 *
 *   npx hardhat run <script> --network <network> : localhost, goerli, ...
 */
const hre = require("hardhat");
const fs = require("fs/promises");

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

  const filename = `${__dirname}/../contracts/deployed${_contractName}.json`;
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
