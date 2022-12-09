const { ContractFactory } = require("ethers");
const IbyRealtyTradable = require("../artifacts/contracts/IbyRealtyTradable.sol/IbyRealtyTradable.json");
const { getWallet } = require("../utils/utils");

const main = async function () {
  const wallet = getWallet();
  console.info("Deploying to Alfajores with account", wallet.address);
  const ibyRealtyTradable = new ContractFactory(
    IbyRealtyTradable.abi,
    IbyRealtyTradable.bytecode,
    wallet
  );
  const contract = await ibyRealtyTradable.deploy();
  await contract.deployTransaction.wait();
  console.info("Contract deployed, address:", contract.address);
};

main()
  .then(() => console.info("Deployment complete"))
  .catch(console.error);
