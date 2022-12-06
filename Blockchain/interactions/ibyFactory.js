require("dotenv").config({ path: `${__dirname}/../config.env` });
const { ethers } = require("ethers");
const { getWallet } = require("./../utils/utils");
const IbyFactory = require("./../artifacts/contracts/ibyFactory.sol/IbyFactory.json");

/**
 * returns smart contract public functions
 * @param {string} arg :
 *     realtyCounter : CALL uint public
 * @param {number} idx : zero-based index of realty in realtyInventory
 * @param {array} params : create new realty params
 */
const factoryContract = async function (arg, idx, params) {
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

  // invoke read method: realtyCounter
  if (arg === "realtyCounter") {
    return parseInt(
      JSON.parse(JSON.stringify(await factory.functions.realtyCounter()))[0]
        .hex,
      16
    );
  }

  // invoke read method: realtyInventory
  if (arg === "realtyInventory") {
    const id = JSON.parse(
      JSON.stringify(await factory.functions.realtyInventory(idx))
    )[0].hex;

    const location = JSON.parse(
      JSON.stringify(await factory.functions.realtyInventory(idx))
    )[1];

    const value = parseInt(
      JSON.parse(
        JSON.stringify(await factory.functions.realtyInventory(idx))
      )[2].hex,
      16
    );

    return { id, location, value };
  }

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
};

/**
 * watches for events emitted by factoryContract
 */
const factoryEventListener = async function () {
  // connect to Alfajores websocket provider
  const provider = new ethers.providers.WebSocketProvider(
    "wss://alfajores-forno.celo-testnet.org/ws"
  );

  // connect to Factory contract
  const contract = new ethers.Contract(
    process.env.IBY_FACTORY_ADDRESS,
    IbyFactory.abi,
    provider
  );

  // event listener
  contract.on("NewRealty", (realtyId, location, value, event) => {
    const info = {
      realtyId,
      location,
      value,
      data: event,
    };
    console.log(`Event listener: ${JSON.stringify(info, null, 4)}`);
  });
};

(async function () {
  console.log(await factoryContract("realtyCounter"));

  // for (let i = 0; i < (await factoryContract("realtyCounter")); i++) {
  //   console.log(await factoryContract("realtyInventory", i));
  // }
  /*
  factoryContract EXAMPLES :
    1. console.log(await factoryContract("realtyCounter"));
    2. console.log(await factoryContract("realtyInventory", 0));
    3. console.log(
      await factoryContract("createRealty", 0, ["Rua Americo 123", 1_000_000])
    );

  factoryEventListener EXAMPLES :
    4. factoryEventListener();
  */
})();
