/**
 * command line script for importing and deleting collections of data
 */

require("dotenv").config({ path: `${__dirname}/../config.env` });
const fs = require("fs");
const mongoose = require("mongoose");
const Realty = require("./../iteration-2.0/Backend/models/realtyModel");
////////////////////////////////////////////////////////////////////////////////

// remote database
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

// local database
// const DB = process.env.DATABASE_LOCAL;

mongoose
  .connect(DB)
  .then((conn) => console.log(`DB Connected: ${conn.connections[0].name}`));
////////////////////////////////////////////////////////////////////////////////

// data management
const data = JSON.parse(fs.readFileSync(`${__dirname}/realty.json`, "utf-8"));

const _import = async () => {
  try {
    await Realty.create(data);
    console.log("Data successfully loaded");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const _delete = async () => {
  try {
    await Realty.deleteMany();
    console.log("Data successfully deleted");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv.includes("--import")) {
  _import();
}

if (process.argv.includes("--delete")) {
  _delete();
}
