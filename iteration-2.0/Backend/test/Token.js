/**
 * @dev using Hardhat Network local Ethereum network designed for development
 * @dev signer <OBJECT>: ethereum account used to send transactions to contracts and EOA
 * @dev using @nomicfoundation/hardhat-chai-matchers (https://hardhat.org/tutorial/testing-contracts)
 */
const { expect } = require("chai");
const { ethers } = require("hardhat");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

/**
 * FIXTURES : setup functions ran only once by hardHat and reset to initial state after every call
 */
async function deployTokenFixture() {
  // @dev set contract as factory abstraction
  const Token = await ethers.getContractFactory("Token");
  // @return list of HD accounts
  const [owner, addr1, addr2] = await ethers.getSigners();
  // @return Promise() -> Contract
  const hardhatToken = await Token.deploy();
  // method fired once its transaction has been mined
  await hardhatToken.deployed();

  return { Token, hardhatToken, owner, addr1, addr2 };
}

describe("Deployment", function () {
  it("Should set the right owner", async function () {
    const { hardhatToken, owner } = await loadFixture(deployTokenFixture);
    expect(await hardhatToken.owner()).to.equal(owner.address);
  });

  it("Should assign the total supply of tokens to the owner", async function () {
    const { hardhatToken, owner } = await loadFixture(deployTokenFixture);
    const ownerBalance = await hardhatToken.balanceOf(owner.address);

    expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
  });
});

describe("Transactions", function () {
  it("Should transfer tokens between accounts", async function () {
    const { hardhatToken, owner, addr1, addr2 } = await loadFixture(
      deployTokenFixture
    );
    await expect(
      hardhatToken.transfer(addr1.address, 50)
    ).to.changeTokenBalances(hardhatToken, [owner, addr1], [-50, 50]);

    // @dev ethers Contract.connect(signer): new instance of Contract connected to signer
    await expect(
      hardhatToken.connect(addr1).transfer(addr2.address, 50)
    ).to.changeTokenBalances(hardhatToken, [addr1, addr2], [-50, 50]);
  });

  it("should emit Transfer events", async function () {
    const { hardhatToken, owner, addr1, addr2 } = await loadFixture(
      deployTokenFixture
    );

    await expect(hardhatToken.transfer(addr1.address, 50))
      .to.emit(hardhatToken, "Transfer")
      .withArgs(owner.address, addr1.address, 50);

    // @dev ethers Contract.connect(signer): new instance of Contract connected to signer
    await expect(hardhatToken.connect(addr1).transfer(addr2.address, 50))
      .to.emit(hardhatToken, "Transfer")
      .withArgs(addr1.address, addr2.address, 50);
  });

  it("Should fail if sender doesn't have enough tokens", async function () {
    const { hardhatToken, owner, addr1 } = await loadFixture(
      deployTokenFixture
    );
    const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);

    // Try to send 1 token from addr1 (0 tokens) to owner.
    // `require` will evaluate false and revert the transaction.
    await expect(
      hardhatToken.connect(addr1).transfer(owner.address, 1)
    ).to.be.revertedWith("Not enough tokens");

    // Owner balance shouldn't have changed.
    expect(await hardhatToken.balanceOf(owner.address)).to.equal(
      initialOwnerBalance
    );
  });
});
