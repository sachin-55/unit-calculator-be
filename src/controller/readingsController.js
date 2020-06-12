import Readings from '../model/readingsModel';
import catchAsync from '../utils/catchAsync';
import FilterFeatures from '../utils/filterFeatures';

exports.getReadings = catchAsync(async (req, res, next) => {
  const filter = {};

  const features = new FilterFeatures(
    Readings.find(filter),
    req.query
  ).filter();

  const readings = await features.query;

  res.status(200).json({
    status: 'success',
    results: readings.length,
    readings,
  });
});
exports.createReading = catchAsync(async (req, res, next) => {
  const reading = await Readings.create({
    submeter: req.body.submeter,
    readingsYear: req.body.readingsYear,
    readingsMonth: req.body.readingsMonth,
    readings: req.body.readings,
    unitPrice: req.body.unitPrice,
  });

  // const newReading = await reading.populate('submeter').execPopulate();

  res.status(200).json({
    status: 'success',
    reading,
  });
});
