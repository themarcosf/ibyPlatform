const { ethers } = require("ethers");
const { getWallet } = require("./../utils/utils");
const IbyRealtyTradable = require("../artifacts/contracts/ibyRealtyTradable.sol/IbyRealtyTradable.json");

/**
 * smart contract public functions
 * @param {string} arg : name of function to be called from contract
 * @param {array} params : token contract function params
 */
exports.realtyTradableContract = async function (arg, params) {
  // wallet address
  const wallet = getWallet();

  // connect to Alfajores testnet
  const provider = new ethers.providers.JsonRpcProvider(
    "https://alfajores-forno.celo-testnet.org"
  );

  // connect to realtyTradable contract
  // @dev not sure why process.env.IBY_REALTY_TRADABLE may not work here
  const realtyTradable = new ethers.Contract(
    process.env.IBY_REALTY_TRADABLE,
    IbyRealtyTradable.abi,
    wallet
  );

  // invoke write method: createToken
  if (arg === "createToken") {
    const estimateGasLimit = await realtyTradable.estimateGas.createToken(
      ...params
    );

    const createTokenTxUnsigned =
      await realtyTradable.populateTransaction.createToken(...params);

    createTokenTxUnsigned.gasLimit = estimateGasLimit;
    createTokenTxUnsigned.gasPrice = await provider.getGasPrice();

    const submittedTx = await wallet.sendTransaction(createTokenTxUnsigned);

    return await submittedTx.wait();
  }

  // invoke write method: safeTransferFrom
  if (arg === "safeTransferFrom") {
    const estimateGasLimit = await realtyTradable.estimateGas.safeTransferFrom(
      ...params
    );

    const safeTransferFromTxUnsigned =
      await realtyTradable.populateTransaction.safeTransferFrom(...params);

    safeTransferFromTxUnsigned.gasLimit = estimateGasLimit;
    safeTransferFromTxUnsigned.gasPrice = await provider.getGasPrice();

    const submittedTx = await wallet.sendTransaction(
      safeTransferFromTxUnsigned
    );

    return await submittedTx.wait();
  }

  // invoke write method: burn
  if (arg === "burn") {
    const estimateGasLimit = await realtyTradable.estimateGas.burn(...params);

    const burnTxUnsigned = await realtyTradable.populateTransaction.burn(
      ...params
    );

    burnTxUnsigned.gasLimit = estimateGasLimit;
    burnTxUnsigned.gasPrice = await provider.getGasPrice();

    const submittedTx = await wallet.sendTransaction(burnTxUnsigned);

    return await submittedTx.wait();
  }

  // invoke read method: balanceOf
  if (arg === "balanceOf") {
    return parseInt(
      JSON.parse(
        JSON.stringify(await realtyTradable.functions.balanceOf(...params))
      )[0].hex,
      16
    );
  }
};

(async function () {
  /*
   * realtyIdContract EXAMPLES : detailed comments in the contract
   *
   * .. write methods :
   * 1. await realtyTradableContract("createToken", ["0x...",123456,20,"0xff",])
   * 2. await realtyTradableContract("safeTransferFrom", ["0x...","0x...",123456,10,"0xff",])
   * 3. await realtyTradableContract("burn", ["0x...",123456,5,])
   *
   * .. read methods :
   * 1. await realtyTradableContract("balanceOf", ["0x...",1234,])
   */
})();
