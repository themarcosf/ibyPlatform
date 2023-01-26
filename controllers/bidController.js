const Bid = require("../models/bidModel");
const Auction = require("./../models/auctionModel");
const { asyncHandler } = require("../utils/handlers");
const { auctionContract } = require("./../scripts/accessContracts");

/** ROUTE HANDLERS */
exports.getAllBid = asyncHandler(async function (req, res, next) {
  res
    .status(500)
    .json({
      status: "error",
      message: "TODO",
    })
    .end();
});

exports.createBid = asyncHandler(async function (req, res, next) {
  console.log("req.body.auctionId: ", req.body.auctionId);
  const _auction = await Auction.findById(req.body.auctionId);

  const _auctionContract = await auctionContract();
  console.log("_auctionContract", _auctionContract);
  await _auctionContract.bid(
    _auction.index,
    req.body.bidValue,
    req.user.wallet
  );

  const _bid = await Bid.create({
    auctionId: req.body.auctionId,
    bidValue: req.body.bidValue,
    userId: req.user.id,
  });

  res
    .status(200)
    .json({
      status: "success",
      data: _bid,
    })
    .end();
});
