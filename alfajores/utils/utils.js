require("dotenv").config({ path: "./../../config.env" });
const ethers = require("ethers");

exports.getWallet = function () {
  const provider = new ethers.providers.JsonRpcProvider(
    "https://alfajores-forno.celo-testnet.org"
  );
  return new ethers.Wallet(process.env.PRIVATE_KEY, provider);
};

exports.realtyPoolDestruct = async function (factory, idx, i) {
  switch (i) {
    case 0:
      return JSON.parse(
        JSON.stringify(await factory.functions.realtyPool(idx))
      )[i].hex;
    case 1:
      return JSON.parse(
        JSON.stringify(await factory.functions.realtyPool(idx))
      )[i];
    case 2:
      return JSON.parse(
        JSON.stringify(await factory.functions.realtyPool(idx))
      )[i];
    case 3:
      return JSON.parse(
        JSON.stringify(await factory.functions.realtyPool(idx))
      )[3];
    case 4:
      return JSON.parse(
        JSON.stringify(await factory.functions.realtyPool(idx))
      )[4];
    case 5:
      return JSON.parse(
        JSON.stringify(await factory.functions.realtyPool(idx))
      )[5];
    case 6:
      return JSON.parse(
        JSON.stringify(await factory.functions.realtyPool(idx))
      )[6];
    case 7:
      return JSON.parse(
        JSON.stringify(await factory.functions.realtyPool(idx))
      )[7];
  }
};
