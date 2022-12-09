const { factoryContract } = require("./../alfajores/interactions/ibyFactory");
const { realtyIdContract } = require("./../alfajores/interactions/ibyRealtyID");
const {
  QueryHelpers,
  CustomError,
  asyncHandler,
  paramsObjToArray,
} = require("../utils/lib");
const Realty = require("./../models/realtyModel");
////////////////////////////////////////////////////////

/**
 * ROUTE HANDLERS
 */
exports.getAllRealty = asyncHandler(async function (req, res, next) {
  const query = new QueryHelpers(req.query, Realty.find())
    .filter()
    .sort()
    .fields()
    .paginate();
  const _realty = await query.mongooseQuery;

  res
    .status(200)
    .json({
      status: "success",
      results: _realty.length,
      data: { _realty },
    })
    .end();
});

exports.getRealty = asyncHandler(async function (req, res, next) {
  const _realty = await Realty.findById(req.params.id);

  if (!_realty) return next(new CustomError("ID not found", 404));

  res
    .status(200)
    .json({
      status: "success",
      data: { _realty },
    })
    .end();
});

exports.createNewRealty = asyncHandler(async function (req, res, next) {
  const _txReceipt = await factoryContract(
    "createRealty",
    0,
    paramsObjToArray(req.body)
  );

  const counter = await factoryContract("realtyPoolCounter");
  const _realtyOnChain = await factoryContract("realtyPool", counter - 1);
  const _token = await realtyIdContract("createToken", [
    _realtyOnChain.id,
    req.body.ipfsLink,
  ]);

  req.body.celoId = _realtyOnChain.id;
  req.body.govtAddress = _txReceipt.from;
  req.body.contractAddress = _txReceipt.to;
  req.body.blockHash = _txReceipt.blockHash;
  req.body.blockNumber = _txReceipt.blockNumber;
  req.body.legalOwner = _realtyOnChain.legalOwner;
  req.body.gasUsed = parseInt(_txReceipt.gasUsed, 16);
  req.body.transactionHash = _txReceipt.transactionHash;
  req.body.cumulativeGasUsed = parseInt(_txReceipt.cumulativeGasUsed, 16);
  req.body.effectiveGasPrice = parseInt(_txReceipt.effectiveGasPrice, 16);
  req.body.tokenBlockHash = _token.blockHash;
  req.body.tokenTransactionHash = _token.transactionHash;
  req.body.tokenBlockNumber = _token.blockNumber;

  const _realty = await Realty.create(req.body);

  res
    .status(201)
    .json({
      status: "Success",
      data: { realty: _realty },
    })
    .end();
});

////////////////////////////////////////////////////////
