const express = require('express');
const readingsController = require('../controller/readingsController');
const authController = require('../controller/authController');

const router = express.Router();

router
  .route('/')
  .get(readingsController.getReadings)
  .post(authController.protect, readingsController.createReading);

module.exports = router;
