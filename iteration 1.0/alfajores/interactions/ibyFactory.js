const { ethers } = require("ethers");
const { getWallet, realtyPoolDestruct } = require("./../utils/utils");
const IbyFactory = require("./../artifacts/contracts/ibyFactory.sol/IbyFactory.json");

/**
 * smart contract public functions
 * @param {string} arg : * @param {string} arg : name of function to be called from contract
 * @param {number} idx : zero-based index of realty properties
 * @param {array} params : contract function params
 */
exports.factoryContract = async function (arg, idx, params) {
  // wallet address
  const wallet = getWallet();

  // connect to Alfajores testnet
  const provider = new ethers.providers.JsonRpcProvider(
    "https://alfajores-forno.celo-testnet.org"
  );

  // connect to Factory contract
  const factory = new ethers.Contract(
    process.env.IBY_FACTORY_ADDRESS,
    IbyFactory.abi,
    wallet
  );

  // invoke write method: createRealty
  if (arg === "createRealty") {
    const estimateGasLimit = await factory.estimateGas.createRealty(...params);

    const createRealtyTxUnsigned =
      await factory.populateTransaction.createRealty(...params);

    createRealtyTxUnsigned.gasLimit = estimateGasLimit;
    createRealtyTxUnsigned.gasPrice = await provider.getGasPrice();

    const submittedTx = await wallet.sendTransaction(createRealtyTxUnsigned);

    return await submittedTx.wait();
  }

  // invoke write method: updateOwner
  if (arg === "updateOwner") {
    const estimateGasLimit = await factory.estimateGas.updateOwner(...params);

    const updateOwnerTxUnsigned = await factory.populateTransaction.updateOwner(
      ...params
    );

    updateOwnerTxUnsigned.gasLimit = estimateGasLimit;
    updateOwnerTxUnsigned.gasPrice = await provider.getGasPrice();

    const submittedTx = await wallet.sendTransaction(updateOwnerTxUnsigned);

    return await submittedTx.wait();
  }

  // invoke read method: owner
  if (arg === "owner") {
    const [owner] = await factory.functions.owner();
    return owner;
  }

  // invoke read method: realtyPool
  if (arg === "realtyPoolCounter") {
    return parseInt(
      JSON.parse(JSON.stringify(await factory.functions.realtyPoolCounter()))[0]
        .hex,
      16
    );
  }

  // invoke read method: realtyInventory
  if (arg === "realtyPool") {
    const id = await realtyPoolDestruct(factory, idx, 0);
    const sqMeters = await realtyPoolDestruct(factory, idx, 1);
    const lastValuation = await realtyPoolDestruct(factory, idx, 2);
    const streetAddress = await realtyPoolDestruct(factory, idx, 3);
    const neighborhood = await realtyPoolDestruct(factory, idx, 4);
    const city = await realtyPoolDestruct(factory, idx, 5);
    const state = await realtyPoolDestruct(factory, idx, 6);
    const legalOwner = await realtyPoolDestruct(factory, idx, 7);

    return {
      id,
      sqMeters,
      lastValuation,
      streetAddress,
      neighborhood,
      city,
      state,
      legalOwner,
    };
  }

  // invoke read method: realtyToOwner
  if (arg === "realtyToOwner") {
    const [owner] = JSON.parse(
      JSON.stringify(await factory.functions.realtyToOwner(params))
    );
    return owner;
  }
};

(async function () {
  /*
   * factoryContract EXAMPLES : detailed comments in the contract
   *
   * .. write methods :
   * 1. console.log(await factoryContract("createRealty", 0, [1_000_000,200,"Rua XPTO, 123","Bairro A","Cidade Alfa","Estado 0x1a9",]));
   * 2. console.log(await factoryContract("updateOwner", 0, ["0x9fa52c0aa55f4a9c5e6981a2cebd619d35a2f00c1e4526d0997b43d54fb8c200","0x4b20993bc481177ec7e8f571cecae8a9e22c02db",]));
   *
   * .. read methods :
   * 1. console.log(await factoryContract("owner"));
   * 2. console.log(await factoryContract("realtyPoolCounter"));
   * 3. console.log(await factoryContract("realtyPool", 0));
   * 4. console.log(await factoryContract("realtyToOwner",0,"0x9fa52c0aa55f4a9c5e6981a2cebd619d35a2f00c1e4526d0997b43d54fb8c200"));
   */
})();
