const ethers = require("ethers");

// const currentTimestampInSeconds = Math.round(Date.now() / 1000);
//   const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
//   const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

// @notice provider : any company that provides nodes that can be used to interact with the blockchain
const provider = new ethers.providers.InfuraProvider(
  "goerli",
  process.env.INFURA_API_KEY
);

let signer;
let tokenContract = null;

const tokenAbi = "";
const tokenAddress = "";

async function getAccess() {
  if (tokenContract) return;

  await provider.send("eth_requestAccounts", []);
  signer = provider.getSigner();
  tokenContract = new ethers.Contract(tokenAddress, tokenAbi, signer);
}

async function getAllTokens() {
  await getAccess();
  const tokenAmount = await tokenContract.balanceOf(await signer.getAddress());

  let tokenIds = [];
  let tokenMetadata = [];

  for (let i = 0; i < tokenAmount; i++) {
    const _tokenPromise = tokenContract.tokenByIndex(i).then((id) => {
      const _id = id.toNumber(); // BigInt => Number
      return tokenContract.tokenUri(_id).then((uri) => {
        tokenIds.push(uri);
      });
    });
    tokenMetadata.push(_tokenPromise);
  }

  await Promise.all(tokenMetadata);

  /**
   * TODO = implement getData from server
   
   for (const tokenId of tokenIds) {
      const _data = getData(tokenId);
    }
   */

  return { tokenAmount, tokenIds, tokenMetadata };
}
