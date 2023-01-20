const Realty = require("../models/realtyModel");
const {
  createOne,
  readOne,
  readAll,
  updateOne,
  deleteOne,
} = require("./../utils/handlers");
//////////////////////////////////////////////////////////////////

const populateOptions = {
  path: "auctions",
  select: "-__v",
  match: { status: "active" },
  populate: {
    path: "bids",
  },
};
//////////////////////////////////////////////////////////////////

/** ROUTE HANDLERS */
exports.createRealty = createOne(Realty);
exports.readRealty = readOne(Realty, populateOptions);
exports.readAllRealty = readAll(Realty, populateOptions);
exports.updateRealty = updateOne(Realty);
exports.deleteRealty = deleteOne(Realty);
