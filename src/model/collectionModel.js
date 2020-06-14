const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide sub-meter group/collection name'],
  },
  divisionCount: {
    type: Number,
    default: 2,
  },
  submeters: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Submeter',
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

collectionSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'submeters',
    select: 'name',
  }).populate({
    path: 'user',
    select: 'name email photo',
  });
  next();
});

const Collection = mongoose.model('Collection', collectionSchema);
module.exports = Collection;
