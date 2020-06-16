import Collection from '../model/collectionModel';
import catchAsync from '../utils/catchAsync';
import FilterFeatures from '../utils/filterFeatures';
import AppError from '../utils/appError';

exports.getCollections = catchAsync(async (req, res, next) => {
  const filter = {};
  const features = new FilterFeatures(
    Collection.find(filter),
    req.query
  ).filter();

  const collections = await features.query;

  res.status(200).json({
    status: 'success',
    results: collections.length,
    collections,
  });
});
exports.createCollection = catchAsync(async (req, res, next) => {
  const collection = await Collection.create({
    name: req.body.name,
    user: req.body.user,
    divisionCount: req.body.divisionCount,
  });

  const newCollection = await collection
    .populate('user')
    .populate('submeters')
    .execPopulate();

  res.status(200).json({
    status: 'success',
    collection: newCollection,
  });
});

exports.updateCollection = catchAsync(async (req, res, next) => {
  const collect = await Collection.findByIdAndUpdate(
    req.params.collectionId,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!collect) {
    return next(new AppError('No document Found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: collect,
  });
});
