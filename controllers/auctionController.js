const fs = require("fs");
const ethers = require("ethers");
const { provider } = require("./../scripts/config");
const Auction = require("../models/auctionModel");
const Realty = require("./../models/realtyModel");
const { CustomError } = require("../utils/errors");
const { asyncHandler } = require("../utils/handlers");

/** BLOCKCHAIN EVENT LISTENER */
exports.eventTransferToken = async function () {
  console.log("entry point");

  const _data = JSON.parse(
    fs.readFileSync(`${__dirname}/../contracts/AuctionFactory.json`, "utf-8")
  );

  const contract = new ethers.Contract(
    _data.contract.address,
    _data.contract.abi,
    provider
  );

  console.log("contract set up");

  contract.on(
    "transferToken",
    asyncHandler(async (tokenId, timestamp) => {
      console.log("tokenId: ", tokenId);
      console.log("timestamp: ", timestamp);

      const _realty = await Realty.find({ tokenId });

      const _auction = await Auction.find({
        realtyId: _realty._id,
        status: "active",
      });
      console.log("_auction: ", _auction);

      await _auction.update({ $set: { status: "inactive" } });

      console.log("token transferred");
    })
  );
};

/** ROUTE HANDLERS */
exports.getAllAuction = asyncHandler(async function (req, res, next) {
  // get all auctions from collection
  const _auction = await Auction.find().populate("bids");

  // end request
  res
    .status(200)
    .json({
      status: "success",
      results: _auction.length,
      data: {
        auction: _auction,
      },
    })
    .end();
});

exports.getAuction = asyncHandler(async function (req, res, next) {
  // get auction from collection
  const _auction = await Auction.findById(req.params.id).select("-__v");

  // if auction not found return new error
  if (!_auction) return next(new CustomError("ID not found", 404));

  // end request
  res
    .status(200)
    .json({
      status: "success",
      data: {
        auction: _auction,
      },
    })
    .end();
});

exports.updateAuction = asyncHandler(async function (req, res, next) {
  res
    .status(500)
    .json({
      status: "error",
      message: "TODO",
    })
    .end();
});
