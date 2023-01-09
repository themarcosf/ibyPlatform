const QueryFeatures = require("./queryFeatures");
const CustomError = require("./errors");

/**
 * wrapper function to catch errors in async functions
 *
 * @param {function} fn
 * @returns void
 */
const asyncHandler = function (fn) {
  return (req, res, next) => fn(req, res, next).catch(next);
};
//////////////////////////////////////////////////////////////////

/**
 * factory CRUD operations handlers
 *
 * @param {object} Model
 * @param {object} populateOptions
 */

const createOne = (Model) =>
  asyncHandler(async function (req, res, next) {
    const _document = await Model.create(req.body);

    res
      .status(201)
      .json({
        status: "Success",
        data: { _document },
      })
      .end();
  });

const readOne = (Model, populateOptions) =>
  asyncHandler(async function (req, res, next) {
    let _query = Model.findById(req.params.id);
    if (populateOptions) _query.populate(populateOptions);

    const _document = await _query;

    if (!_document) return next(new CustomError("Document not found", 404));

    res
      .status(200)
      .json({
        status: "success",
        data: { _document },
      })
      .end();
  });

const readAll = (Model, populateOptions) =>
  asyncHandler(async function (req, res, next) {
    let _query = Model.find();
    if (populateOptions) _query.populate(populateOptions);

    const query = new QueryFeatures(req.query, _query)
      .filter()
      .sort()
      .fields()
      .paginate();

    const _documents = await query.mongooseQuery;

    if (!_documents) return next(new CustomError("Documents not found", 404));

    res
      .status(200)
      .json({
        status: "success",
        results: _documents.length,
        data: { _documents },
      })
      .end();
  });

const updateOne = (Model) =>
  asyncHandler(async function (req, res, next) {
    const _document = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!_document) return next(new CustomError("Document not found", 404));

    res
      .status(200)
      .json({
        status: "sucess",
        data: { _document },
      })
      .end();
  });

const deleteOne = (Model) =>
  asyncHandler(async function (req, res, next) {
    const _document = await Model.findByIdAndDelete(req.params.id);

    if (!_document) return next(new CustomError("Document not found", 404));

    res
      .status(204)
      .json({
        status: "sucess",
        data: null,
      })
      .end();
  });
//////////////////////////////////////////////////////////////////

module.exports = {
  asyncHandler,
  createOne,
  readOne,
  readAll,
  updateOne,
  deleteOne,
};
