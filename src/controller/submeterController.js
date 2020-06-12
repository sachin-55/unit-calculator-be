import Submeter from '../model/submeterModel';
import catchAsync from '../utils/catchAsync';
import FilterFeatures from '../utils/filterFeatures';

exports.getSubmeters = catchAsync(async (req, res, next) => {
  const filter = {};
  const features = new FilterFeatures(
    Submeter.find(filter),
    req.query
  ).filter();

  const submeters = await features.query;

  res.status(200).json({
    status: 'success',
    results: submeters.length,
    submeters,
  });
});
exports.createSubmeter = catchAsync(async (req, res, next) => {
  const submeter = await Submeter.create({
    name: req.body.name,
  });

  // const newSubmeter = await submeter.populate('collectionId').execPopulate();

  res.status(200).json({
    status: 'success',
    submeter,
  });
});
