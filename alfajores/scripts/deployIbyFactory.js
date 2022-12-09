const { ContractFactory } = require("ethers");
const IbyFactory = require("./../artifacts/contracts/ibyFactory.sol/IbyFactory.json");
const { getWallet } = require("./../utils/utils");

const main = async function () {
  const wallet = getWallet();
  console.info("Deploying to Alfajores with account", wallet.address);
  const factory = new ContractFactory(
    IbyFactory.abi,
    IbyFactory.bytecode,
    wallet
  );
  const contract = await factory.deploy();
  await contract.deployTransaction.wait();
  console.info("Contract deployed, address:", contract.address);
};

main()
  .then(() => console.info("Deployment complete"))
  .catch(console.error);
