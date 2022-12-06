const ethers = require("ethers");

exports.getWallet = function () {
  const provider = new ethers.providers.JsonRpcProvider(
    "https://alfajores-forno.celo-testnet.org"
  );
  return new ethers.Wallet(process.env.PRIVATE_KEY, provider);
};
