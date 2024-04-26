const express = require('express');
const router = express.Router();
const { Spot } = require('../../db/models')
const { spotImages } = require('../../db/models')

//GET ALL SPOTS
router.get('/', async (req, res) => {

	let spots = await Spot.findAll()

	// const images = await spots.getspotImages()

	// console.log('test!!!!!!!!!!!!!!!!!!', images)


	res.json(spots)
})

module.exports = router;
