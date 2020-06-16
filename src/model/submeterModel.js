const mongoose = require('mongoose');

const submeterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide submeter name'],
  },
  collectionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Collection',
  },
});

submeterSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'collectionId',
    select: 'name user',
  });
  next();
});

const Submeter = mongoose.model('Submeter', submeterSchema);
module.exports = Submeter;
