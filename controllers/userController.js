const { CustomError, asyncHandler } = require("../utils/lib");
const Auction = require("./../models/auctionsModel");
const Realty = require("./../models/realtyModel");
const User = require("../models/userModel");
////////////////////////////////////////////////////////

/**
 * ROUTE HANDLERS
 */

exports.userLogin = asyncHandler(async function (req, res, next) {
  const _allUsers = await User.find();

  let _currentUser;
  for (let i = 0; i < _allUsers.length; i++) {
    // console.log(req.body.officialId)
    // console.log(_allUsers[i].officialId)
    // console.log(_allUsers[i])
    if (_allUsers[i].officialId === req.body.officialId) {
      _currentUser = _allUsers[i];
      break
    }
  }
  // console.log(_currentUser)
  if (_currentUser) {
    if (_currentUser.password === req.body.password) {
      res
        .status(200)
        .json({
          status: "Success",
          data: { currentUser: _currentUser },
        })
        .end();
    } else {
      return next(new CustomError("Invalid password", 400));
    }
  } else {
    const _user = await User.create(req.body);

    res
      .status(201)
      .json({
        status: "Success",
        data: { user: _user },
      })
      .end();
  }
});

exports.userContracts = asyncHandler(async function (req, res, next) {
  const userId = req.params.id;

  const _auctions = await Auction.find();
  const _realty = await Realty.find();

  const _myAuctions = _auctions.map((el) => {
    if (el.lastBidUser === userId) {
      let _realtyData;
      for (let i = 0; i < _realty.length; i++) {
        if (_realty[i].id === el.realtyId) {
          _realtyData = _realty[i];
          break;
        }
      }

      return {
        _realtyData: _realtyData,
        _lastBidValue: el.lastBidValue,
        _auctionId: el.id,
      };
    }
  });
  console.log(_myAuctions);

  res
    .status(201)
    .json({
      status: "Success",
      data: { auctions: _myAuctions },
    })
    .end();
});

////////////////////////////////////////////////////////
