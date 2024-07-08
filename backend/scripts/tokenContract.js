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

// @dev fromMnemonic(<MNEMONIC>, `m/44'/60'/0'/0/1`) to get second HD account
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
 * totalSupply().then((nrTokens) => console.log("total supply: ", parseInt(nrTokens)));
 * safeMint("<ACCOUNT_ADDRESS>", "");
 * ownerOf(<TOKEN_ID>).then((tokenId) => console.log("Owner of: ", tokenId));
 * approve("<MNEMONIC>", <TOKEN_ID>);
 * getApproved(<TOKEN_ID>).then((tokenId) => console.log("Get approved: ", tokenId));
 */
