const ethers = require("ethers");
const { provider } = require("./config");
const { tokenContract } = require("./accessContracts");

const safeMint = async function (_to, _uri) {
  const _tokenContract = await tokenContract();
  return await _tokenContract.safeMint(_to, _uri);
};

const totalSupply = async function () {
  const _tokenContract = await tokenContract();

  return await _tokenContract.totalSupply();
};

const ownerOf = async function (_tokenId) {
  const _tokenContract = await tokenContract();

  return await _tokenContract.ownerOf(_tokenId);
};

const approve = async function (_mnemonic, _tokenId) {
  const wallet = new ethers.Wallet.fromMnemonic(_mnemonic).connect(provider);

  const _tokenContract = await tokenContract(wallet);

  return await _tokenContract.approve(
    "0xbbdac338f3a94A2F4D4C4C518249C147dD873315",
    _tokenId
  );
};

const getApproved = async function (_tokenId) {
  const _tokenContract = await tokenContract();

  return await _tokenContract.getApproved(_tokenId);
};

//////////////////////////////////////////////////////////////
/**
 * EXAMPLE CALLS :
 *
 * const currentTimestampInSeconds = Math.round(Date.now() / 1000);
 * const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
 * const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;
 *
 * totalSupply().then((x) => console.log(x));
 */
// safeMint("0x340d100601D934C0321Ef417167314b66007d4e4", "");
ownerOf(0).then((x) => console.log("Owner of: ", x));
// getApproved(1).then((x) => console.log("Get approved: ", x));
// approve("nose bird flame start comic discover hammer palace click sniff casino above", 1);
