const { QueryHelpers, CustomError, asyncHandler } = require("../utils/lib");
const Auction = require("./../models/auctionsModel");
const Realty = require("./../models/realtyModel");
const schedule = require("node-schedule");
const {
  realtyTradableContract,
} = require("./../alfajores/interactions/ibyRealtyTradable");
////////////////////////////////////////////////////////

/**
 * ROUTE HANDLERS
 */
exports.getAllAuctions = asyncHandler(async function (req, res, next) {
  const query = new QueryHelpers(req.query, Auction.find())
    .filter()
    .sort()
    .fields()
    .paginate();
  const _auctions = await query.mongooseQuery;

  res
    .status(200)
    .json({
      status: "success",
      results: _auctions.length,
      data: { _auctions },
    })
    .end();
});

exports.getAuction = asyncHandler(async function (req, res, next) {
  const _auction = await Auction.findById(req.params.id);

  if (!_auction) return next(new CustomError("ID not found", 404));

  res
    .status(200)
    .json({
      status: "success",
      data: { _auction },
    })
    .end();
});

exports.createNewAuction = asyncHandler(async function (req, res, next) {
  const _auction = await Auction.create(req.body);
  const realtyId = _auction.realtyId;
  const endDate = _auction.auctionEndDate;
  const celoId = (await Realty.findById(realtyId)).celoId;

  const expirationDate = String(new Date(endDate));
  schedule.scheduleJob(expirationDate, async () => {
    const _auctionFinal = await Auction.findById(_auction.id);

    await realtyTradableContract("createToken", [
      _auctionFinal.lastBidderWallet,
      celoId,
      20,
      "0xff",
    ]);
    const _balance = await realtyTradableContract("balanceOf", [
      _auctionFinal.lastBidderWallet,
      celoId,
    ]);
    console.log(
      `Balance of ${_balance} NFTs with ID ${celoId} transferred to ${_auctionFinal.lastBidderWallet}`
    );
  });

  res
    .status(201)
    .json({
      status: "Success",
      data: { auction: _auction },
    })
    .end();
});

exports.updateAuction = asyncHandler(async function (req, res, next) {
  const _auction = await Auction.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!_auction) return next(new CustomError("ID not found", 404));

  res
    .status(200)
    .json({
      status: "Success",
      data: { auction: _auction },
    })
    .end();
});

////////////////////////////////////////////////////////
