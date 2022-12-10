const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Project = require('../models/projectModel');
const Tag = require('../models/tagModel');

exports.getAll = catchAsync(async (req, res, next) => {
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 10;
  const tagsReq = req.query.tags;
  const categoryReq = req.query.category;
  const minInvest = req.query.minInvest || 0;
  const maxInvest = req.query.maxInvest || Infinity;
  let match = {};
  console.log(req.query);
  if (categoryReq) {
    match.category = categoryReq;
  }
  if (tagsReq) {
    const tagsArr = tagsReq.split(',').map((el) => {
      return { tags: el };
    });
    match.$or = tagsArr;
  }
  match.$and = [
    { investments: { $gte: minInvest } },
    { investments: { $lte: maxInvest } },
  ];
  const projects = await Project.find(match)
    .populate('category')
    .limit(limit)
    .skip((page - 1) * limit);
  res.status(200).json({
    message: 'success',
    found: projects.length,
    projects,
  });
});

exports.create = catchAsync(async (req, res, next) => {
  const newProject = await Project.create({
    name: req.body.name,
    category: req.body.category,
    tags: req.body.tags,
    shortDescription: req.body.shortDescription,
    longDescription: req.body.longDescription,
    webSite: req.body.webSite,
    logoUrl: req.body.logoUrl,
    coverUrl: req.body.coverUrl,
    presentationUrl: req.body.presentationUrl,
    screenShotsUrl: req.body.screenShotsUrl,
    teamMembers: req.body.teamMembers,
    demoUrl: req.body.demoUrl,
    creator: req.user._id,
  });
  if (req.body.tags) {
    const tags = req.body.tags;
    tags.forEach(async (tag) => {
      return await Tag.findOneAndUpdate(
        { name: tag },
        { name: tag },
        { upsert: true }
      );
    });
  }
  res.status(200).json({
    message: 'success',
    newProject,
  });
});