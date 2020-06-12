const mongoose = require('mongoose');

const readingsSchema = new mongoose.Schema({
  submeter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Submeter',
  },
  readingsYear: {
    type: String,
    required: true,
  },
  readingsMonth: {
    type: String,
    required: true,
  },
  readings: {
    type: Number,
    required: [true, 'Please provide submeter readings'],
  },
  recordedAt: {
    type: Date,
    default: Date.now(),
  },
  unitPrice: {
    type: Number,
    required: [true, 'Please provide unit price'],
  },
});

readingsSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'submeter',
    select: 'name collectionId',
  });
  next();
});

const Readings = mongoose.model('Readings', readingsSchema);
module.exports = Readings;
