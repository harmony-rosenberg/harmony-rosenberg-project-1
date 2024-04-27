const express = require('express');
const router = express.Router();
const { Spot, spotImage, Review, User} = require('../../db/models');


//GET ALL SPOTS
router.get('/', async (req, res) => {

	let spotData = []

	let spots = await Spot.findAll({
		include: {
			model: spotImage,
			attributes: ['previewImage','url']
		}
	})

	const spotReviews = await Spot.findAll({
		include: {
			model: Review,
			attributes: ['stars']
		}
	})

	const numOfReviews = await Review.count()

	console.log('TEST -------------->', numOfReviews)

	spotData = [...spots]

	res.json(spotData)
})


//GET ALL SPOTS FOR CURRENT USER
router.get('/current', async (req, res, next) => {

	const userSpots = await Spot.findAll({
		where: {
			ownerId: req.user.id
		}
	})

	res.json(userSpots)
})

//GET DETAILS FOR SPOT FROM ID
router.get('/:id', async (req, res, next) => {
	try{
		const spot = await Spot.findOne({
			where: {
				id: req.params.id
			}, include: [{
				model: spotImage,
				attributes: ['id', 'url', 'previewImage']
			}, {
				model: User,
				attributes: ['id', 'firstName', 'lastName']
			}]
		})

		if(!spot) {
			next({
			status: 404,
			message: "that spot doesnt exist, buddy!"
			})
		}

		res.json(spot)

	} catch(err) {
		next({
			status: 404,
			message: "that spot doesnt exist, buddy!"
		})
	}
})


//CREATE A SPOT
router.post('/', async (req, res, next) => {
		try {
		const {ownerId, address, city, state, country, lat, lng, name, description, price} = req.body

		const newSpot = await Spot.create({
			ownerId,
			address,
			city,
			state,
			country,
			lat,
			lng,
			name,
			description,
			price
		});

		await newSpot.validate();

		res.json({
			message: "success!",
			data: newSpot
		})

	} catch(err) {
		next({
			status: 404,
			message: "you messed something up, buddy!"
		})
	}

})

//DELETE A SPOT BY ID
router.delete('/:id', async (req, res, next) => {
	try {
		const deadSpot = await Spot.findOne({where: {id: req.params.id, ownerId: req.user.id}});

			await deadSpot.destroy();

		res.json({
			status: "success!",
			message: `we killed your spot ${req.params.id}`
		})

		} catch(err) {
			next({
				status: 404,
				message: "doesnt look like this spot exists, buddy"
			})
		}
	})



module.exports = router;
