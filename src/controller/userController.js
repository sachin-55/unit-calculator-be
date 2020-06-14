import User from '../model/userModel';
import catchAsync from '../utils/catchAsync';
import FilterFeatures from '../utils/filterFeatures';
import AppError from '../utils/appError';

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

exports.updateUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    return next(new AppError('No document Found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: user,
  });
});
