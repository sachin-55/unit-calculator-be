const express = require('express');
const submeterController = require('../controller/submeterController');
const authController = require('../controller/authController');

const router = express.Router();

router
  .route('/')
  .get(submeterController.getSubmeters)
  .post(authController.protect, submeterController.createSubmeter);

module.exports = router;
