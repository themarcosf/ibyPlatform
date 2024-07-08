const Bid = require("../models/bidModel");
const Auction = require("./../models/auctionModel");
const { asyncHandler } = require("../backend/utils/handlers");
const { auctionContract } = require("../backend/scripts/accessContracts");

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
  const _auction = await Auction.findById(req.body.auctionId);

  const _auctionContract = await auctionContract();

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
