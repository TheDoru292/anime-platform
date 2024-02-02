const express = require('express');
const router = express.router()

const review = require('../controllers/reviewController.js');
const checks = require('../lib/Checks');

router.get(
    '/:username/review',
    review.getUserReviews,
);

module.exports = router;