const express = require('express');
const collectionController = require('../controller/collectionController');
const authController = require('../controller/authController');

const router = express.Router();

router
  .route('/')
  .get(collectionController.getCollections)
  .post(authController.protect, collectionController.createCollection);
router
  .route('/:collectionId')
  .patch(authController.protect, collectionController.updateCollection);
module.exports = router;
