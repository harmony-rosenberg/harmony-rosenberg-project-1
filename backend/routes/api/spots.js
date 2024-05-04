const express = require('express');
const router = express.Router();
const { Spot, spotImage, Review, User, reviewImage, Booking, Sequelize,} = require('../../db/models');
const { Op } = require('sequelize');


//GET ALL SPOTS
router.get('/', async (req, res, next) => {
	let {page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice} = req.query

	if(!page) {page = 1}
	if(!size) {size = 5}

	let pagination = {}
	pagination.limit = size
	pagination.offset = size * (page -1)

	let filters = {}

	if(!minLat) {
		minLat = 1
	}
	if(!minLng) {
		minLng = 1
	}
	if(!minPrice) {
		minPrice = 1
	}
	if(!maxLat) {
		maxLat = 1000000
	}
	if(!maxLng) {
		maxLng = 1000000
	}
	if(!maxPrice) {
		maxPrice = 1000000
	}

	if(maxLat || minLat) {
		filters.lat = {[Op.lt]: maxLat, [Op.gt]: minLat}
}

	if(maxLng || minLng) {
		filters.lng = {[Op.lt]: maxLng, [Op.gt]: minLng}
	}

	if(maxPrice || minPrice) {
		filters.price = {[Op.lt]: maxPrice, [Op.gt]: minPrice}
	}

	let queryErrors = {
		"message": "Bad Request",
		"errors": {}
	}

	if(isNaN(minLat) || minLat < 1) {
		queryErrors.errors['minLat'] = "Minimum latitude is invalid"
	}
	if(isNaN(maxLat) || maxLat > 1000000) {
		queryErrors.errors['maxLat'] = "Maximum latitude is invalid"
	}
	if(isNaN(minLng) || minLng < 1) {
		queryErrors.errors['minLng'] = "Minimum longitude is invalid"
	}
	if(isNaN(maxLng) || maxLng > 1000000) {
		queryErrors.errors['maxLng'] = "Maximum longitude is invalid"
	}
	if(isNaN(minPrice) || minPrice < 1) {
		queryErrors.errors['minPrice'] = "Minimum price is invalid"
	}
	if(isNaN(maxPrice) || maxPrice > 1000000) {
		queryErrors.errors['maxPrice'] = "Maximum price is invalid"
	}

	try {
		let spots = await Spot.findAll({
			where: {
				...filters
			},
		include: [{
			model: Review,
			attributes: ['stars']
			// as: 'rating',
			// attributes: [Sequelize.fn('AVG', Sequelize.col('Reviews.stars'), 'rating')]
		}, {
			model: spotImage,
			attributes: ['url']
		}],
		...pagination,
	})


	let avgVal = function(arr) {
		let totalStars = 0
			for(let j = 0; j < arr.length; j++) {
				let stars = arr[j].stars
				totalStars += stars
			}
			return totalStars/arr.length
	}

	let spotData = spots.map(spot => {
		return {
			['id'] : spot.id,
			['ownerId']: spot.ownerId,
			['address']: spot.address,
			['city']: spot.city,
			['state']: spot.state,
			['country']: spot.country,
			['lat']: spot.lat,
			['lng']: spot.lng,
			['name']: spot.name,
			['description']: spot.description,
			['price']: spot.price,
			['createdAt']: spot.createdAt,
			['updatedAt']: spot.updatedAt,
			['previewImage']: spot.spotImages[0].url,
			['avg-rating']: avgVal(spot.Reviews),
			['page']: page,
			['size']: size
		}
	})

	res.json(spotData)
	} catch {
		next({
			...queryErrors
		})
	}
})

//GET ALL SPOTS FOR CURRENT USER
router.get('/current', async (req, res, next) => {
	const spots = await Spot.findAll({
		where: {
			ownerId: req.user.id
		}, include: [{
			model: Review,
			attributes: ['stars']
		}, {
			model: spotImage,
			attributes: ['url']
		}]
	})

	let avgVal = function(arr) {
		let totalStars = 0
			for(let j = 0; j < arr.length; j++) {
				let stars = arr[j].stars
				totalStars += stars
			}
			return totalStars/arr.length
	}

	let spotData = spots.map(spot => {
		return {
			['id'] : spot.id,
			['ownerId']: spot.ownerId,
			['address']: spot.address,
			['city']: spot.city,
			['state']: spot.state,
			['country']: spot.country,
			['lat']: spot.lat,
			['lng']: spot.lng,
			['name']: spot.name,
			['description']: spot.description,
			['price']: spot.price,
			['createdAt']: spot.createdAt,
			['updatedAt']: spot.updatedAt,
			['previewImage']: spot.spotImages[0].url,
			['avg-rating']: avgVal(spot.Reviews),
		}
	})

	res.json(spotData)
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
			}, {
				model: Review
			}]
		})

		if(!spot) {
			throw new Error(next({
				status: 404,
				message: "Couldn't find spot!"
				}))
		}

		let avgVal = function(arr) {
			let totalStars = 0
				for(let j = 0; j < arr.length; j++) {
					let stars = arr[j].stars
					totalStars += stars
				}
				return totalStars/arr.length
		}

		let spotData = {
			['id'] : spot.id,
			['ownerId']: spot.ownerId,
			['address']: spot.address,
			['city']: spot.city,
			['state']: spot.state,
			['country']: spot.country,
			['lat']: spot.lat,
			['lng']: spot.lng,
			['name']: spot.name,
			['description']: spot.description,
			['price']: spot.price,
			['createdAt']: spot.createdAt,
			['updatedAt']: spot.updatedAt,
			['numReviews']: spot.Reviews.length,
			['avgStarRating']: avgVal(spot.Reviews),
			['spotImages']: spot.spotImages,
			['owner']: spot.User,
		}

		res.json(spotData)
})

//CREATE A SPOT
router.post('/', async (req, res, next) => {
	const {address, city, state, country, lat, lng, name, description, price} = req.body

	const errorResponse = {
		"message": "Bad Request",
		"errors": {}
	}
	if(!address) {
		errorResponse.errors['address'] = "Street address is required"
	}
	if(!city) {
		errorResponse.errors['city'] = "City is required"
	}
	if(!state) {
		errorResponse.errors['state'] = "State is required"
	}
	if(!country) {
		errorResponse.errors['country'] = "Country is required"
	}
	if(!lat || lat.match(/[a-z]/i)) {
		errorResponse.errors['lat'] = "Latitude is not valid"
	}
	if(!lng || lng.match(/[a-z]/i)) {
		errorResponse.errors['lng'] = "Longitude is not valid"
	}
	if(name.length > 50) {
		console.log(name)
		errorResponse.errors['name'] = "Name must be less than 50 characters"
	}
	if(!description) {
		errorResponse.errors['description'] = "Description is required"
	}
	if(!price) {
		errorResponse.errors['price'] = "Price per day is required"
	}

			try {
			const newSpot = await Spot.create({
			ownerId: req.user.id,
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

	res.json({newSpot})

	} catch {
		next({
			status: 404,
			...errorResponse
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
			details: err.errors ? err.errors.map(item => item.message).join(', ') : err.message,
			message: `${err.message}`,
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
	try{
		let {startDate, endDate} = req.body

		const spot = await Spot.findOne({where: {id: req.params.spotId}, include: Booking})

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
	} catch(err) {
		next({
			status: 403,
			message: "Booking for that date already exists!"
		})
	}
})


//GET ALL BOOKINGS FOR A SPOT
router.get('/:spotId/bookings', async(req, res, next) => {
	let payLoad = {}

	const spot = await Spot.findOne({
		where: {
			id: req.params.spotId,
		}, include: {
			model: Booking,
			attributes: ['spotId', 'startDate', 'endDate']
		}
	})

	if(!spot) {
		throw new Error(
			next({
				status: 404,
				message: "Spot couldn't be found"
			})
		)
	}

	const currBookings = await spot.getBookings({include: {
		model: User,
		attributes: ['id', 'firstName', 'lastName']
	}})

	if(spot.dataValues.ownerId === req.user.id) {
		payLoad = currBookings
	} else {
		payLoad = spot.Bookings
	}
	res.json(payLoad)

})


//CREATE REVIEW FOR SPOT BASED ON ID
router.post('/:spotId/reviews', async(req, res, next) => {
try {
	let {review, stars} = req.body

	const spot = await Spot.findOne({where: {id: req.params.spotId}, include: {model: Review}})

	if(!spot) {
		next({
			status: 404,
			message: "Spot couldn't be found"
		})
	}

	if(spot.Reviews.length > 0) {
		for(let i = 0; i < spot.Reviews.length; i++) {
			let currReview = spot.Reviews[i]
			if(currReview.userId === req.user.id) {
				throw new Error(next({
					status: 403,
					message: "User already has a review for this spot"
				}))
			}
		}
	}

	const newReview = await Review.create({
		userId: req.user.id,
		spotId: spot.id,
		review,
		stars
	})

	res.json(newReview)
} catch(err) {
	next({
		status: 400,
		details: err.errors ? err.errors.map(item => item.message).join(', ') : err.message,
		message: `${err.message}`,
	})
}
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
