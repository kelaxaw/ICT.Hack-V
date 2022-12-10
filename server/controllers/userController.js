const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/userModel');

exports.updateMe = catchAsync(async (req, res, next) => {
  await User.updateOne(
    { _id: req.user._id },
    {
      username: req.body.username,
      firstName: req.body.firstName,
      secondName: req.body.secondName,
      location: req.body.location,
      bio: req.body.bio,
      roles: req.body.roles,
      skills: req.body.skills,
      socials: req.body.socials,
      cvUrl: req.body.cvUrl,
      favorite: req.body.favorite,
    }
  );
  res.status(200).json({
    message: 'success',
  });
});
exports.getMe = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ _id: req.user._id }).populate(
    'roles location.country favorite'
  );
  res.status(200).json({
    message: 'success',
    user,
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ username: req.params.username }).populate(
    'roles location.country favorite'
  );
  if (!user) {
    console.log('hui');
    return next(new AppError('No such user', 404));
  }
  res.status(200).json({
    message: 'success',
    user,
  });
});
