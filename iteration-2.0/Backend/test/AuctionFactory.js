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
    it("Should revert if transfer privileges not granted by token owner", async function () {
      const { deployedAuctionFactory, deployedERC721_NFT, addr1 } =
        await loadFixture(setFixture);

      await deployedERC721_NFT.safeMint(addr1.address, "");

      // prettier-ignore
      await expect(
        deployedAuctionFactory.auction(
          deployedERC721_NFT.address, 0, 1, 1, 0
          )
          ).to.be.revertedWith("transfer privileges not granted by token owner");
    });

    it("Should allow listing a token", async function () {
      const { deployedAuctionFactory, deployedERC721_NFT, addr1 } =
        await loadFixture(setFixture);

      await deployedERC721_NFT.safeMint(addr1.address, "");

      await deployedERC721_NFT
        .connect(addr1)
        .approve(deployedAuctionFactory.address, 0);

      // prettier-ignore
      await expect(
              deployedAuctionFactory.auction(
                deployedERC721_NFT.address, 0, 1, 1, 0
              )
            ).to.not.be.reverted;
    });

    it("Should emit a new auction listing event", async function () {
      const { deployedAuctionFactory, deployedERC721_NFT, addr1 } =
        await loadFixture(setFixture);

      await deployedERC721_NFT.safeMint(addr1.address, "");

      await deployedERC721_NFT
        .connect(addr1)
        .approve(deployedAuctionFactory.address, 0);

      // prettier-ignore
      await expect(
              deployedAuctionFactory.auction(
                deployedERC721_NFT.address, 0, 1, 1, 0
              )
            ).to.emit(deployedAuctionFactory, "newAuction");
    });

    it("Should allow listing a second token", async function () {
      const { deployedAuctionFactory, deployedERC721_NFT, addr1, addr2 } =
        await loadFixture(setFixture);

      // @dev list first token
      await deployedERC721_NFT.safeMint(addr1.address, "");
      await deployedERC721_NFT
        .connect(addr1)
        .approve(deployedAuctionFactory.address, 0);
      // prettier-ignore
      await deployedAuctionFactory.auction(
        deployedERC721_NFT.address, 0, 1, 1, 0
      );

      // list second token
      await deployedERC721_NFT.safeMint(addr2.address, "");
      await deployedERC721_NFT
        .connect(addr2)
        .approve(deployedAuctionFactory.address, 1);

      // prettier-ignore
      await expect(
        deployedAuctionFactory.auction(
          deployedERC721_NFT.address, 1, 1, 1, 0
        )
      ).to.not.be.reverted;
    });
  });

  // describe("Bid", function () {});
  // describe("End", function () {});
  // describe("Get auction", function () {});
});
