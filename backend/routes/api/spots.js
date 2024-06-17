const express = require('express');
const router = express.Router();
const { Spot, spotImage, Review, User, reviewImage, Booking, Sequelize,} = require('../../db/models');
const { Op } = require('sequelize');
const { requireAuth } = require('../../utils/auth.js');


//GET ALL SPOTS
router.get('/', async (req, res, next) => {
	let {page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice} = req.query

	// if(!page) {page = 1}
	// if(!size) {size = 5}

	// let pagination = {}
	// pagination.limit = size
	// pagination.offset = size * (page -1)

	// let filters = {}

// 	if(!maxLat) {
// 		maxLat = 90
// 	}
// 	if(!minLat) {
// 		minLat = -90
// 	}
// 	if(!maxLng) {
// 		maxLng = 180
// 	}
// 	if(!minLng) {
// 		minLng = -180
// 	}
// 	if(!minPrice) {
// 		minPrice = 1
// 	}
// 	if(!maxPrice) {
// 		maxPrice = 1000000
// 	}

// 	if(maxLat || minLat) {
// 		filters.lat = {[Op.lt]: maxLat, [Op.gt]: minLat}
// }

// 	if(maxLng || minLng) {
// 		filters.lng = {[Op.lt]: maxLng, [Op.gt]: minLng}
// 	}

// 	if(maxPrice || minPrice) {
// 		filters.price = {[Op.lt]: maxPrice, [Op.gt]: minPrice}
// 	}

	let queryErrors = {
		status: 400,
		"message": "Bad Request",
		"errors": {}
	}

	let errorCount = 0

	// if(isNaN(maxLat) || maxLat > 90 || maxLat < -89) {
	// 	queryErrors.errors['maxLat'] = "Maximum latitude is invalid"
	// 	errorCount++
	// }
	// if(isNaN(minLat) || minLat < -90 || minLat > 89) {
	// 	queryErrors.errors['minLat'] = "Minimum latitude is invalid"
	// 	errorCount++
	// }
	// if(isNaN(maxLng) || maxLng > 180 || maxLng < -179) {
	// 	queryErrors.errors['maxLng'] = "Maximum longitude is invalid"
	// 	errorCount++
	// }
	// if(isNaN(minLng) || minLng < -180 || minLng > 179) {
	// 	queryErrors.errors['minLng'] = "Minimum longitude is invalid"
	// 	errorCount++
	// }
	// if(isNaN(maxPrice) || maxPrice < 1 || maxPrice > 1000000) {
	// 	queryErrors.errors['maxPrice'] = "Maximum price is invalid"
	// 	errorCount++
	// }
	// if(isNaN(minPrice) || minPrice < 1) {
	// 	queryErrors.errors['minPrice'] = "Minimum price is invalid"
	// 	errorCount++
	// }
	// if(isNaN(page) || page < 1) {
	// 	queryErrors.errors['page'] = "Page must be greater than or equal to 1"
	// 	errorCount++
	// }
	// if(isNaN(size) || size < 1) {
	// 	queryErrors.errors['size'] = "Size must be greater than or equal to 1"
	// 	errorCount++
	// }

	if(errorCount > 0) {
		throw new Error(
			next({
				...queryErrors
			})
		)
	}

	// try {
		let spots = await Spot.findAll({
			where: {
				// ...filters
			},
		include: [{
			model: Review,
			// attributes: ['stars']
			// attributes: [Sequelize.fn('AVG', Sequelize.col('Reviews.stars'), 'rating')]
		}, {
			model: spotImage,
			attributes: ['url']
		}],
		// ...pagination,
	})

	let avgVal = function(arr) {
		let totalStars = 0
			for(let j = 0; j < arr.length; j++) {
				let stars = arr[j].stars
				totalStars += stars
			}
			return totalStars/arr.length
	}

	let getImage = function(arr) {
		for(let i = 0; i < arr.length; i++) {
			let image = arr[i].dataValues.url
			if(image) {
				return image
			} else {
				return null
			}
		}
	}

	spotData = spots.map(spot => {
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
			['previewImage']: getImage(spot.spotImages),
			['avgRating']: avgVal(spot.Reviews),
			['page']: page,
			['size']: size
		}
	})

	res.json(spotData)
	// } catch {
	// 	next({
	// 		...queryErrors
	// 	})
	// }
})

//GET ALL SPOTS FOR CURRENT USER
router.get('/current', requireAuth, async (req, res, next) => {
	const spots = await Spot.findAll({
		where: {
			ownerId: req.user.id
		}, include: [{
			model: Review,
			attributes: ['stars']
		}, {
			model: spotImage,
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

		let getImage = function(arr) {
			for(let i = 0; i < arr.length; i++) {
				let image = arr[i].dataValues.url
				if(image) {
					return image
				} else {
					return null
				}
			}
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
			['previewImage']: getImage(spot.spotImages),
			['avgRating']: avgVal(spot.Reviews),
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
router.post('/', requireAuth, async (req, res, next) => {
	let {address, city, state, country, name, description, price} = req.body

	const errorResponse = {
		"message": "Bad Request",
		"errors": {}
	}

	let errorCount = 0

	if(!address) {
		errorResponse.errors['address'] = "Street address is required"
		errorCount++
	}
	if(!city) {
		errorResponse.errors['city'] = "City is required"
		errorCount++
	}
	if(!state) {
		errorResponse.errors['state'] = "State is required"
		errorCount++
	}
	if(!country) {
		errorResponse.errors['country'] = "Country is required"
		errorCount++
	}
	// if(!lat || lat.toString().match(/[a-z]/i) || lat > 90 || lat < -89) {
	// 	errorResponse.errors['lat'] = "Latitude is not valid"
	// 	errorCount++
	// }
	// if(!lng || lng.toString().match(/[a-z]/i) || lng < -180 || lng > 179) {
	// 	errorResponse.errors['lng'] = "Longitude is not valid"
	// 	errorCount++
	// }
	if(!name) {
		name = " "
		errorResponse.errors['name'] = "Name is required"
	}
	if(name.length > 50) {
		errorResponse.errors['name'] = "Name must be less than 50 characters"
		errorCount++
	}
	if(!description) {
		errorResponse.errors['description'] = "Description is required"
		errorCount++
	}
	if(!price || price < 0) {
		errorResponse.errors['price'] = "Price per day is required"
		errorCount++
	}

	if(errorCount > 0) {
		throw new Error(
			next({
				status: 403,
				...errorResponse
			})
		)
	}

			// try {
			const newSpot = await Spot.create({
			ownerId: req.user.id,
			address,
			city,
			state,
			country,
			// lat,
			// lng,
			name,
			description,
			price
		});

	// await newSpot.validate();

	res.json({newSpot})

	// } catch {
	// 	next({
	// 		status: 400,
	// 		...errorResponse
	// 	})
	// }
})

//EDIT A SPOT
router.put('/:spotId', requireAuth, async(req, res, next) => {
	let {address, city, state, country, lat, lng, name, description, price} = req.body

	let errorResponse = {
		status: 400,
		"message": "Bad Request",
		"errors": {}
	}

	let errorCount = 0

	if(!address) {
		errorResponse.errors['address'] = "Street address is required"
		errorCount++
	}
	if(!city) {
		errorResponse.errors['city'] = "City is required"
		errorCount++
	}
	if(!state) {
		errorResponse.errors['state'] = "State is required"
		errorCount++
	}
	if(!country) {
		errorResponse.errors['country'] = "Country is required"
		errorCount++
	}
	// if(!lat || lat.toString().match(/[a-z]/i)) {
	// 	errorResponse.errors['lat'] = "Latitude is not valid"
	// 	errorCount++
	// }
	// if(!lng || lng.toString().match(/[a-z]/i)) {
	// 	errorResponse.errors['lng'] = "Longitude is not valid"
	// 	errorCount++
	// }
	if(!name) {
		name = " "
		errorResponse.errors['name'] = "Name is required"
	}
	if(name.length > 50) {
		errorResponse.errors['name'] = "Name must be less than 50 characters"
		errorCount++
	}
	if(!description) {
		errorResponse.errors['description'] = "Description is required"
		errorCount++
	}
	if(!price) {
		errorResponse.errors['price'] = "Price per day is required"
		errorCount++
	}

	if(errorCount > 0) {
		throw new Error(
			next({
				status: 403,
				...errorResponse
			})
		)
	}
	// try {
		const editSpot = await Spot.findOne({where: {id: req.params.spotId, ownerId: req.user.id}});

		if(!editSpot) {
			next({
				status: 404,
				message: "Spot couldn't be found"
			})
		}
			editSpot.ownerId = req.user.id
			editSpot.address = address
			editSpot.city = city
			editSpot.state = state
			editSpot.country = country
			// editSpot.lat = lat
			// editSpot.lng = lng
			editSpot.name = name
			editSpot.description = description
			editSpot.price = price

		await editSpot.save()

		res.json({
			editSpot
		})
	// } catch(err) {
		// next({
			// ...errorResponse
		// })

})

//ADD IMAGE TO SPOT BASED ON ID
router.post('/:spotId/images', requireAuth, async(req, res, next) => {
	console.log(req.body)
	let {preview, urlOne, urlTwo, urlThree, urlFour} = req.body

	const spot = await Spot.findOne({
		where: {
			id: req.params.spotId,
			ownerId: req.user.id
		}, include: {
			model: spotImage
		}
	});

	if(!spot) {
		next({
			status: 404,
			message: "Spot couldn't be found"
		})
	}

	let newImage;
	let imageOne;
	let imageTwo;
	let imageThree;
	let imageFour
	// console.log('ID', spot.id)

	if(preview) {
		newImage = await spotImage.create({
			spotId: spot.id,
			url: preview,
			previewImage: true
		})
	}

	if(urlOne) {
		imageOne = await spotImage.create({
			spotId: spot.id,
			url: urlOne,
			previewImage: false
		})
	}

	if(urlTwo) {
		imageTwo = await spotImage.create({
			spotId: spot.id,
			url: urlTwo,
			previewImage: false
		})
	}

	if(urlThree) {
		imageThree = await spotImage.create({
			spotId: spot.id,
			url: urlThree,
			previewImage: false
		})
	}

	if(urlFour) {
		imageFour = await spotImage.create({
			spotId: spot.id,
			url: urlFour,
			previewImage: false
		})
	}

		const payload = {
			previewImage : {
				id: newImage.spotId,
				url: newImage.url,
				previewImage: true
			},
			imageOne : {
				id: imageOne.spotId,
				url: imageOne.url,
				previewImage: false
			},
			imageTwo: {
				id: imageTwo.spotId,
				url: imageTwo.url,
				previewImage: false
			},
			imageThree: {
				id: imageThree.spotId,
				url: imageThree.url,
				previewImage: false
			},
			imageFour: {
				id: imageFour.spotId,
				url: imageFour.url,
				previewImage: false
			}
		}

	res.json(payload)
})

//CREATE BOOKING FOR A SPOT
router.post('/:spotId/bookings', requireAuth, async(req, res, next) => {
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
router.get('/:spotId/bookings', requireAuth, async(req, res, next) => {
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
router.post('/:spotId/reviews', requireAuth, async(req, res, next) => {
	let {review, stars} = req.body

	let errorResponse = {
		"message": "Bad Request",
		errors: {}
	}

	if(!review || review === '') {
		errorResponse.errors['review'] = "Review text is required"
	}
	if(!stars || stars < 1 || stars > 5) {
		errorResponse.errors['stars'] = "Stars must be an integer from 1 to 5"
	}

try {

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
		...errorResponse
	})
}
})

//GET REVIEWS BASED ON SPOT ID
router.get('/:spotId/reviews', async(req, res, next) => {
	const spotId = req.params.spotId
	const spot = await Spot.findByPk(spotId);

	if(spot) {
		const reviews = await Review.findAll({
			where: { spotId },
			order: [["createdAt", "DESC"]],
			include: [
				{
					model: User,
					attributes: ["id", "firstName", "lastName"],
				},
				{
					model: reviewImage,
					attributes: ["id", "url"],
					required: false
				}
			]
		})
		return res.status(200).json({reviews: reviews})
	} else {
		return res.status(404).json({ message: "Spot couldnt be found"})
	}

	// 	const spot = await Spot.findOne({where: {id: req.params.spotId}})

	// if(!spot) {
	// 	next({
	// 		status: 404,
	// 		message: "Spot couldn't be found"
	// 	})
	// }

	// const spotReviews = await spot.getReviews({
	// 	order: [["createdAt", "DESC"]],
	// 	include: [{
	// 		model: User,
	// 		attributes: ['id', 'firstName', 'lastName']
	// 	},
	// 	{
	// 		model: reviewImage,
	// 		attributes: ['id', 'url']
	// 	}],
	// 	order: [['id']],
	// })

	// res.json(spotReviews)
})

//DELETE A SPOT BY ID
router.delete('/:spotId', requireAuth, async (req, res, next) => {
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
