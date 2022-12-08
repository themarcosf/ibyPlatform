require("dotenv").config({ path: "./config.env" });
const { ContractFactory } = require("ethers");
const IbyRealtyID = require("./../artifacts/contracts/IbyRealtyID.sol/IbyRealtyID.json");
const { getWallet } = require("../utils/utils");

const main = async function () {
  const wallet = getWallet();
  console.info("Deploying to Alfajores with account", wallet.address);
  const ibyRealtyID = new ContractFactory(
    IbyRealtyID.abi,
    IbyRealtyID.bytecode,
    wallet
  );
  const contract = await ibyRealtyID.deploy();
  await contract.deployTransaction.wait();
  console.info("Contract deployed, address:", contract.address);
};

main()
  .then(() => console.info("Deployment complete"))
  .catch(console.error);
