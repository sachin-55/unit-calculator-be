const express = require('express');
const readingsController = require('../controller/readingsController');
const authController = require('../controller/authController');

const router = express.Router();

router
  .route('/')
  .get(readingsController.getReadings)
  .post(authController.protect, readingsController.createReading);

router
  .route('/:readingsId')
  .patch(authController.protect, readingsController.updateReadings)
  .delete(authController.protect, readingsController.deleteReadings);

module.exports = router;
