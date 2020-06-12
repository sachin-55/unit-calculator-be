import User from '../model/userModel';
import catchAsync from '../utils/catchAsync';
import FilterFeatures from '../utils/filterFeatures';

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const filter = {};
  const features = new FilterFeatures(User.find(filter), req.query).filter();

  const users = await features.query;

  res.status(200).json({
    status: 'success',
    results: users.length,
    users,
  });
});
