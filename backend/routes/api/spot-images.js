const express = require('express');
const router = express.Router();
const { Spot, spotImage, Review, User, reviewImage} = require('../../db/models');

module.exports = router
