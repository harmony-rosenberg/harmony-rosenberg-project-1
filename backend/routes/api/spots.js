const express = require('express');
const router = express.Router();
const { Spot, spotImage, Review, User, reviewImage} = require('../../db/models');


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


//EDIT A SPOT
router.put('/:spotId', async(req, res, next) => {
	try {
		let {address, city, state, country, lat, lng, name, description, price} = req.body

		const editSpot = await Spot.findOne({where: {id: req.params.spotId, ownerId: req.user.id}});

		if(!editSpot) {
			next({
				status: 404,
				message: "Spot couldn't be found"
			})
		}

		if(address) {
			editSpot.address = address
		}
		if(city) {
			editSpot.city = city
		}
		if(state) {
			editSpot.state = state
		}
		if(country) {
			editSpot.country = country
		}
		if(lat) {
			editSpot.lat = lat
		}
		if(lng) {
			editSpot.lng = lng
		}
		if(name) {
			editSpot.name = name
		}
		if(description) {
			editSpot.description = description
		}
		if(price) {
			editSpot.price = price
		}

		await editSpot.save()

		res.json({
			message: "successfully edited your spot!",
			data: editSpot
		})
	} catch(err) {
		next({
			status: 400,
			message: "something went wrong buddy"
		})
	}
})


//ADD IMAGE TO SPOT BASED ON ID
router.post('/:spotId/images', async(req, res, next) => {

	let {url, previewImage} = req.body

	const spot = await Spot.findOne({where: {id: req.params.spotId, ownerId: req.user.id}});

	if(!spot) {
		next({
			status: 404,
			message: "Spot couldn't be found"
		})
	}

	const image = await spotImage.create({
		spotId: spot.id,
		url,
		previewImage
	})

	res.json(image)
})


//CREATE REVIEW FOR SPOT BASED ON ID
router.post('/:spotId/reviews', async(req, res, next) => {

	let {review, stars} = req.body

	const spot = await Spot.findOne({where: {id: req.params.spotId}})

	if(!spot) {
		next({
			status: 404,
			message: "Spot couldn't be found"
		})
	}

	const newReview = await Review.create({
		userId: req.user.id,
		spotId: spot.id,
		review,
		stars
	})

	res.json(newReview)
})

//GET REVIEWS BASED ON SPOT ID
router.get('/:spotId/reviews', async(req, res, next) => {
	const spot = await Spot.findOne({where: {id: req.params.spotId}})

	if(!spot) {
		next({
			status: 404,
			message: "Spot couldn't be found"
		})
	}

	const spotReviews = await spot.getReviews({
		include: [{
			model: User,
			attributes: ['id', 'firstName', 'lastName']
		},
		{
			model: reviewImage,
			attributes: ['id', 'url']
		}]
	})

	res.json(spotReviews)
})

//DELETE A SPOT BY ID
router.delete('/:spotId', async (req, res, next) => {
	try {
		const deadSpot = await Spot.findOne({where: {id: req.params.spotId, ownerId: req.user.id}});

			await deadSpot.destroy();

		res.json({
			status: "success!",
			message: `we killed your spot ${req.params.spotId}`
		})

		} catch(err) {
			next({
				status: 404,
				message: "doesnt look like this spot exists, buddy"
			})
		}
	})



module.exports = router;
