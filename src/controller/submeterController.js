import Submeter from '../model/submeterModel';
import catchAsync from '../utils/catchAsync';
import FilterFeatures from '../utils/filterFeatures';
import AppError from '../utils/appError';

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
    collectionId: req.body.collectionId,
  });

  const newSubmeter = await submeter.populate('collectionId').execPopulate();

  res.status(200).json({
    status: 'success',
    submeter: newSubmeter,
  });
});

exports.updateSubmeter = catchAsync(async (req, res, next) => {
  const submeter = await Submeter.findByIdAndUpdate(
    req.params.submeterId,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!submeter) {
    return next(new AppError('No document Found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: submeter,
  });
});

exports.deleteSubmeter = catchAsync(async (req, res, next) => {
  const submeter = await Submeter.findByIdAndDelete(req.params.submeterId);

  if (!submeter) {
    return next(new AppError('No document Found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    message: 'Submeter deleted Successfully',
  });
});
