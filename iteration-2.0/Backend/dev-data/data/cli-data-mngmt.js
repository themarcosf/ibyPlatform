/**
 * command line script for importing and deleting collections of data
 */
require("dotenv").config({ path: "./../../../../config.env" });

const fs = require("fs");
const mongoose = require("mongoose");
const Realty = require("./../../models/realtyModel");
const Auction = require("./../../models/auctionModel");
////////////////////////////////////////////////////////////////////////////////

// remote database
const DB = process.env.DATABASE_REMOTE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

// local database
// const DB = process.env.DATABASE_LOCAL;

mongoose
  .set("strictQuery", false)
  .connect(DB)
  .then((conn) => console.log(`DB Connected: ${conn.connections[0].name}`));
////////////////////////////////////////////////////////////////////////////////

/**
 * data management : select appropriate data category
 */
// const _category = ["realty", Realty];
const _category = ["auction", Auction];

const _data = JSON.parse(
  fs.readFileSync(`${__dirname}/${_category[0]}.json`, "utf-8")
);

const _import = async () => {
  try {
    await _category[1].create(_data);
    console.log("Data successfully loaded");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const _delete = async () => {
  try {
    await _category[1].deleteMany();
    console.log("Data successfully deleted");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// @dev command: node cli-data-mngmt.js --import
if (process.argv.includes("--import")) {
  _import();
}

// @dev command: node cli-data-mngmt.js --delete
if (process.argv.includes("--delete")) {
  _delete();
}
