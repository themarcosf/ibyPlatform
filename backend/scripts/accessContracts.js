const fs = require("fs");
const ethers = require("ethers");
const { wallet } = require("./config");

let erc721Contract = null;
let auctionFactoryContract = null;

async function tokenContract(_wallet) {
  if (erc721Contract) return erc721Contract;

  const _data = JSON.parse(
    fs.readFileSync(`${__dirname}/../contracts/ERC721_NFT.json`, "utf-8")
  );

  const _signer = _wallet ? _wallet : wallet;

  erc721Contract = new ethers.Contract(
    _data.contract.address,
    _data.contract.abi,
    _signer
  );

  return erc721Contract;
}

async function auctionContract(_wallet) {
  if (auctionFactoryContract) return auctionFactoryContract;

  const _data = JSON.parse(
    fs.readFileSync(`${__dirname}/../contracts/AuctionFactory.json`, "utf-8")
  );

  const _signer = _wallet ? _wallet : wallet;

  auctionFactoryContract = new ethers.Contract(
    _data.contract.address,
    _data.contract.abi,
    _signer
  );

  return auctionFactoryContract;
}

module.exports = { tokenContract, auctionContract };
