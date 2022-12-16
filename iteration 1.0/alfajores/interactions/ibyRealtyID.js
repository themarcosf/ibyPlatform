const { ethers } = require("ethers");
const { getWallet } = require("../utils/utils");
const IbyRealtyID = require("../artifacts/contracts/ibyRealtyID.sol/IbyRealtyID.json");

/**
 * smart contract public functions
 * @param {string} arg : name of function to be called from contract
 * @param {array} params : token contract function params
 */
exports.realtyIdContract = async function (arg, params) {
  // wallet address
  const wallet = getWallet();

  // connect to Alfajores testnet
  const provider = new ethers.providers.JsonRpcProvider(
    "https://alfajores-forno.celo-testnet.org"
  );

  // connect to realtyID contract
  const realtyID = new ethers.Contract(
    process.env.IBY_REALTY_ID,
    IbyRealtyID.abi,
    wallet
  );

  // invoke write method: createToken
  if (arg === "createToken") {
    const estimateGasLimit = await realtyID.estimateGas.createToken(...params);

    const createTokenTxUnsigned =
      await realtyID.populateTransaction.createToken(...params);

    createTokenTxUnsigned.gasLimit = estimateGasLimit;
    createTokenTxUnsigned.gasPrice = await provider.getGasPrice();

    const submittedTx = await wallet.sendTransaction(createTokenTxUnsigned);

    return await submittedTx.wait();
  }

  // invoke write method: transferFrom
  if (arg === "transferFrom") {
    const estimateGasLimit = await realtyID.estimateGas.transferFrom(...params);

    const safeTransferFromTxUnsigned =
      await realtyID.populateTransaction.transferFrom(...params);

    safeTransferFromTxUnsigned.gasLimit = estimateGasLimit;
    safeTransferFromTxUnsigned.gasPrice = await provider.getGasPrice();

    const submittedTx = await wallet.sendTransaction(
      safeTransferFromTxUnsigned
    );

    return await submittedTx.wait();
  }

  // invoke read method: ownerOf
  if (arg === "ownerOf") {
    const [owner] = await realtyID.functions.ownerOf(params);
    return owner;
  }

  // invoke read method: balanceOf
  if (arg === "balanceOf") {
    return parseInt(
      JSON.parse(JSON.stringify(await realtyID.functions.balanceOf(params)))[0]
        .hex,
      16
    );
  }
};

(async function () {
  /*
   * realtyIdContract EXAMPLES : detailed comments in the contract
   *
   * .. write methods :
   * 1. await realtyIdContract("createToken", [1234, "https://ipfs.io/ipfs/QmTJZkVtzhKJw4FrHxm9pbpYm7NnnZxy9iNWnisEdtr9nA"])
   * 2. await realtyIdContract("transferFrom", ["0x...","0x...",1234,]));
   *
   * .. read methods :
   * 1. await realtyIdContract("ownerOf", 1234)
   * 2. await realtyIdContract("balanceOf","0x...")
   */
})();
