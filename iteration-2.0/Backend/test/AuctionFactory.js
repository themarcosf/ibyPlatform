/**
 * @dev using Hardhat Network local Ethereum network designed for development
 * @dev signer <OBJECT>: ethereum account used to send transactions to contracts and EOA
 * @dev using @nomicfoundation/hardhat-chai-matchers (https://hardhat.org/tutorial/testing-contracts)
 *
 * @dev FIXTURES : setup functions ran only once by hardHat and reset to initial state after every call
 */
const { expect } = require("chai");
const { ethers } = require("hardhat");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("AuctionFactory", function () {
  async function setFixture() {
    // @dev set contracts as factory abstraction
    const AuctionFactory = await ethers.getContractFactory("AuctionFactory");
    const ERC721_NFT = await ethers.getContractFactory("ERC721_NFT");

    // @return Promise() -> Contract
    const deployedAuctionFactory = await AuctionFactory.deploy();
    const deployedERC721_NFT = await ERC721_NFT.deploy();

    // method fired once transaction has been mined
    await deployedAuctionFactory.deployed();
    await deployedERC721_NFT.deployed();

    // @return list of HD accounts
    const [owner, addr1, addr2] = await ethers.getSigners();

    return {
      deployedAuctionFactory,
      deployedERC721_NFT,
      owner,
      addr1,
      addr2,
    };
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { deployedAuctionFactory, owner } = await loadFixture(setFixture);
      expect(await deployedAuctionFactory.owner()).to.equal(owner.address);
    });

    it("Should mint a token", async function () {
      const { deployedERC721_NFT, addr1 } = await loadFixture(setFixture);

      await deployedERC721_NFT.safeMint(addr1.address, "");

      expect(await deployedERC721_NFT.ownerOf(0)).to.equal(addr1.address);
    });
  });

  describe("Auction", function () {
    // NFT Auction 33m
  });

  // describe("Bid", function () {});
  // describe("End", function () {});
  // describe("Get auction", function () {});
});
