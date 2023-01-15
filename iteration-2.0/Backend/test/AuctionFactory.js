/**
 * @dev using Hardhat Network local Ethereum network designed for development
 * @dev signer <OBJECT>: ethereum account used to send transactions to contracts and EOA
 * @dev using @nomicfoundation/hardhat-chai-matchers (https://hardhat.org/tutorial/testing-contracts)
 *
 * @dev FIXTURES : setup functions ran only once by hardHat and reset to initial state after every call
 */
const { expect } = require("chai");
const { ethers } = require("hardhat");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");

describe("AuctionFactory", function () {
  async function setupFixture() {
    const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
    const endTime = (await time.latest()) + ONE_YEAR_IN_SECS;

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
      ONE_YEAR_IN_SECS,
      endTime,
      deployedAuctionFactory,
      deployedERC721_NFT,
      owner,
      addr1,
      addr2,
    };
  }

  async function mintFixture() {
    const _setupFixture = await loadFixture(setupFixture);

    await _setupFixture.deployedERC721_NFT.safeMint(
      _setupFixture.addr1.address,
      ""
    );
    await _setupFixture.deployedERC721_NFT.safeMint(
      _setupFixture.addr2.address,
      ""
    );

    return _setupFixture;
  }

  async function approveFixture() {
    const _mintFixture = await loadFixture(mintFixture);

    await _mintFixture.deployedERC721_NFT
      .connect(_mintFixture.addr1)
      .approve(_mintFixture.deployedAuctionFactory.address, 0);

    await _mintFixture.deployedERC721_NFT
      .connect(_mintFixture.addr2)
      .approve(_mintFixture.deployedAuctionFactory.address, 1);

    return _mintFixture;
  }

  async function auctionFixture() {
    const _approveFixture = await loadFixture(approveFixture);

    await _approveFixture.deployedAuctionFactory.auction(
      _approveFixture.deployedERC721_NFT.address,
      0,
      10000,
      _approveFixture.endTime,
      20000
    );
    await _approveFixture.deployedAuctionFactory.auction(
      _approveFixture.deployedERC721_NFT.address,
      1,
      40000,
      _approveFixture.endTime,
      50000
    );

    return _approveFixture;
  }

  async function bidFixture() {
    const _auctionFixture = await loadFixture(auctionFixture);
    await _auctionFixture.deployedAuctionFactory.bid(
      0,
      15000,
      _auctionFixture.addr1.address
    );
    return _auctionFixture;
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { deployedAuctionFactory, owner } = await loadFixture(setupFixture);
      expect(await deployedAuctionFactory.owner()).to.equal(owner.address);
    });

    it("Should mint a token", async function () {
      const { deployedERC721_NFT, addr1 } = await loadFixture(mintFixture);
      expect(await deployedERC721_NFT.ownerOf(0)).to.equal(addr1.address);
    });
  });

  describe("Auctions", function () {
    it("Should revert if transfer privileges not granted by token owner", async function () {
      const { endTime, deployedAuctionFactory, deployedERC721_NFT } =
        await loadFixture(mintFixture);

      // prettier-ignore
      await expect(
        deployedAuctionFactory.auction(
          deployedERC721_NFT.address, 0, 10000, endTime, 20000
          )
        ).to.be.revertedWith("transfer privileges not granted by token owner");
    });

    it("Should revert if end date not in the future", async function () {
      const { ONE_YEAR_IN_SECS, deployedAuctionFactory, deployedERC721_NFT } =
        await loadFixture(approveFixture);

      const _pastDate = (await time.latest()) - ONE_YEAR_IN_SECS;

      // prettier-ignore
      await expect(
        deployedAuctionFactory.auction(
          deployedERC721_NFT.address, 0, 10000, _pastDate, 20000
          )
        ).to.be.revertedWith("Auction end time should be in the future");
    });

    it("Should allow listing a token", async function () {
      const { endTime, deployedAuctionFactory, deployedERC721_NFT } =
        await loadFixture(approveFixture);

      // prettier-ignore
      await expect(
        deployedAuctionFactory.auction(
          deployedERC721_NFT.address, 0, 10000, endTime, 20000
        )
      ).to.not.be.reverted;
    });

    it("Should receive and store the token to be auctioned", async function () {
      const { deployedERC721_NFT, deployedAuctionFactory } = await loadFixture(
        auctionFixture
      );

      expect(await deployedERC721_NFT.ownerOf(0)).to.equal(
        deployedAuctionFactory.address
      );
    });

    it("Should set the right duration of auction", async function () {
      const { ONE_YEAR_IN_SECS, deployedAuctionFactory } = await loadFixture(
        auctionFixture
      );

      expect(
        new Date(
          (await deployedAuctionFactory.getAuction(0))[5].toNumber() * 1000
        ).toDateString()
      ).to.equal(new Date(Date.now() + ONE_YEAR_IN_SECS * 1000).toDateString());
    });

    it("Should allow listing a second token", async function () {
      const { endTime, deployedAuctionFactory, deployedERC721_NFT } =
        await loadFixture(approveFixture);

      // prettier-ignore
      await deployedAuctionFactory.auction(
        deployedERC721_NFT.address, 0, 10000, endTime, 20000
      );

      // prettier-ignore
      await expect(
        deployedAuctionFactory.auction(
          deployedERC721_NFT.address, 1, 40000, endTime, 50000
        )
      ).to.not.be.reverted;
    });
  });

  describe("Bid", function () {
    it("Should revert if auction does not exist", async function () {
      const { deployedAuctionFactory, addr1 } = await loadFixture(
        approveFixture
      );

      await expect(
        deployedAuctionFactory.bid(0, 5000, addr1.address)
      ).to.be.revertedWith("invalid auction");
    });

    it("Should revert if bid price less than minimum price", async function () {
      const { deployedAuctionFactory, addr1 } = await loadFixture(
        auctionFixture
      );

      await expect(
        deployedAuctionFactory.bid(0, 5000, addr1.address)
      ).to.be.revertedWith("invalid bid price");
    });

    it("Should revert if auction is expired", async function () {
      const { deployedAuctionFactory, endTime, addr1 } = await loadFixture(
        auctionFixture
      );

      await time.increaseTo(endTime);

      await expect(
        deployedAuctionFactory.bid(0, 15000, addr1.address)
      ).to.be.revertedWith("auction is expired");
    });

    it("Should update auction with new bid price", async function () {
      const { deployedAuctionFactory, addr1 } = await loadFixture(bidFixture);

      expect(
        (await deployedAuctionFactory.getAuction(0))[2].toNumber()
      ).to.equal(15000);
    });

    it("Should update auction with new bidder address", async function () {
      const { deployedAuctionFactory, addr1 } = await loadFixture(bidFixture);

      expect((await deployedAuctionFactory.getAuction(0))[6]).to.equal(
        addr1.address
      );
    });

    it("Should revert if bid price less than highest bid price", async function () {
      const { deployedAuctionFactory, addr2 } = await loadFixture(bidFixture);

      await expect(
        deployedAuctionFactory.bid(0, 12500, addr2.address)
      ).to.be.revertedWith("invalid bid price");
    });

    it("Should revert if bid price equal to highest bid price", async function () {
      const { deployedAuctionFactory, addr2 } = await loadFixture(bidFixture);

      await expect(
        deployedAuctionFactory.bid(0, 15000, addr2.address)
      ).to.be.revertedWith("invalid bid price");
    });

    it("Should call end auction method if bid price equal to flash price");
    it("Should call end auction method if bid price greater than flash price");
  });

  describe("End", function () {
    it("Should revert if auction does not exist");
    it("Should revert if auction not expired and flash price not reached");
    it("Should transfer token to highest bidder");
    it("Should transfer token to owner if no bid placed");
    it("Should set auction owner to null");
  });

  describe("Events", function () {
    it("Should emit a new auction listing event", async function () {
      const { endTime, deployedAuctionFactory, deployedERC721_NFT } =
        await loadFixture(approveFixture);

      // prettier-ignore
      await expect(
        deployedAuctionFactory.auction(
          deployedERC721_NFT.address, 0, 10000, endTime, 20000
        )
      ).to.emit(deployedAuctionFactory, "newAuction");
    });

    it("Should emit a new bid event", async function () {
      const { deployedAuctionFactory, addr1 } = await loadFixture(
        auctionFixture
      );

      await expect(deployedAuctionFactory.bid(0, 15000, addr1.address)).to.emit(
        deployedAuctionFactory,
        "newBid"
      );
    });

    it("Should emit a transfer token event");
  });
});
