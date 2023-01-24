const { tokenContract, auctionContract } = require("./accessContracts");

const auction = async function (_tokenId, _minPrice, _endTime, _flashPrice) {
  const _tokenContract = await tokenContract();
  const _auctionContract = await auctionContract();

  return await _auctionContract.auction(
    _tokenContract.address,
    _tokenId,
    _minPrice,
    _endTime,
    _flashPrice
  );
};

const bid = async function (_auctionId, _amount, _bidder) {
  const _auctionContract = await auctionContract();

  return await _auctionContract.bid(_auctionId, _amount, _bidder);
};

const getAuction = async function (_auctionId) {
  const _auctionContract = await auctionContract();

  return await _auctionContract.getAuction(_auctionId);
};

///////////////////////////////////////////////////////////////////////

/**
 * EXAMPLE CALLS :
 *
 * const currentTimestampInSeconds = Math.round(Date.now() / 1000);
 * const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
 * const endTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;
 * auction(0, 10000, endTime, 20000).then((x) => console.log(x));
 *
 * getAuction(0).then((x) => console.log(x));
 *
 * bid(0, 10001, "0x340d100601D934C0321Ef417167314b66007d4e4");
 */

getAuction(0).then((x) => console.log(Number(x[2])));
