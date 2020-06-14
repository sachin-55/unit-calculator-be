const express = require('express');
const submeterController = require('../controller/submeterController');
const authController = require('../controller/authController');

const router = express.Router();

router
  .route('/')
  .get(submeterController.getSubmeters)
  .post(authController.protect, submeterController.createSubmeter);

router
  .route('/:submeterId')
  .patch(authController.protect, submeterController.updateSubmeter);

module.exports = router;
