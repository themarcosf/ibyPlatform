const ethers = require("ethers");

const provider = new ethers.providers.Web3Provider(window.ethereum);

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
