const ethers = require("ethers");
const {
  deployedERC721Contract,
} = require("../artifacts/contracts/ERC721_NFT.sol/deployedERC721_NFT.json");
const {
  deployedAuctionFactoryContract,
} = require("../artifacts/contracts/AuctionFactory.sol/deployedAuctionFactory.json");
//////////////////////////////////////////////////////////////////

/** @notice PROVIDER : any company that provides nodes that can be used to interact with the blockchain */

// @dev localhost provider
// const provider = new ethers.providers.JsonRpcProvider();

// @dev infura provider
const provider = new ethers.providers.InfuraProvider(
  "goerli",
  process.env.INFURA_API_KEY
);

let erc721Contract = null;
let auctionFactoryContract = null;

async function tokenContract() {
  if (erc721Contract) return;

  erc721Contract = new ethers.Contract(
    deployedERC721Contract.address,
    deployedERC721Contract.abi,
    provider.getSigner()
  );

  return erc721Contract;
}

async function auctionContract() {
  if (auctionFactoryContract) return;

  auctionFactoryContract = new ethers.Contract(
    deployedAuctionFactoryContract.address,
    deployedAuctionFactoryContract.abi,
    provider.getSigner()
  );

  return auctionFactoryContract;
}

module.exports = { tokenContract, auctionContract };
//////////////////////////////////////////////////////////////////

/**
 * examples:
 *
 * const currentTimestampInSeconds = Math.round(Date.now() / 1000);
 * const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
 * const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;
 *
 *
 * async function mintToken(_to, _uri) {
 *   const _erc721Contract = await tokenContract();
 *
 *   return await _erc721Contract.safeMint(_to, _uri);
 * }
 */
