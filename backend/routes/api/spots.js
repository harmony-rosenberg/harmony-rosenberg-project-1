const express = require('express');
const router = express.Router();
const { Spot, spotImage, Review, User, reviewImage, Booking} = require('../../db/models');


//GET ALL SPOTS
router.get('/', async (req, res) => {

	let spotData = []

	let spots = await Spot.findAll({
		// include: [{
		// 	model: Review
		// }, {
		// 	model: spotImage
		// }]
	})

	for(let i = 0; i < spots.length; i++) {
		const spot = spots[i];
		const reviewData = {
			review: spot.Reviews
		}

		console.log('TEST -------------->', reviewData)
		spotData.push (reviewData)
	}


	spotData = []

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
			throw new Error(next({
				status: 404,
				message: "Couldn't find spot!"
				}))
		}
		res.json(spot)
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

	const payload = {
		id: image.id,
		url: image.url,
		previewImage: image.previewImage
	}

	res.json(payload)
})

//CREATE BOOKING FOR A SPOT
router.post('/:spotId/bookings', async(req, res, next) => {
	let {startDate, endDate} = req.body

	const spot = await Spot.findOne({where: {id: req.params.spotId}, include: Booking})

	const currBooking = await spot.getBookings()
	
	// let currStartDate = currBooking[0].dataValues.startDate.toString()
	// let currEndDate = currBooking[0].dataValues.endDate.toString()
	// console.log('TEST --------------->', currStartDate, startDate)



	if(!spot) {
		next({
			status: 404,
			message: "Spot couldn't be found"
		})
	}

	if(spot.ownerId === req.user.id) {
		throw new Error(
			next({
				status: 403,
				message: "Can not book a spot that you own" //still allows creation of booking
			})
		)
	}

	const newBooking = await Booking.create({
		userId: req.user.id,
		spotId: spot.id,
		startDate,
		endDate
	})

	res.json(newBooking)
})


//GET ALL BOOKINGS FOR A SPOT
router.get('/:spotId/bookings', async(req, res, next) => {
	const spot = await Spot.findOne({
		where: {
			id: req.params.spotId,
		},
			attributes: ['id'],
		  include: {
			 model: Booking,
			 attributes: ['startDate', 'endDate']
		}
	})


	if(!spot) {
		console.log("TEST!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
		next({
			status: 404,
			message: "Spot couldn't be found"
		})
	}

	res.json(spot)
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
