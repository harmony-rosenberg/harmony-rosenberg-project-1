const express = require('express');
const router = express.Router();
const { Spot, spotImage, Review, User, reviewImage, Booking} = require('../../db/models');
const { requireAuth } = require('../../utils/auth.js');

//GET ALL OF A USERS CURRENT BOOKINGS
router.get('/current', requireAuth, async(req, res, next) => {
	const userBookings = await Booking.findAll({
		where: {
			userId: req.user.id
		}, include: {
				model: Spot,
				attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'],
				include: {
					model: spotImage,
					attributes: ['url']
				}
		}});

	if(!userBookings) {
		next({
			status: 404,
			message: "No bookings for this user"
		})
	}

	res.json(userBookings);
})

//EDIT A BOOKING
router.put('/:bookingId', requireAuth, async(req, res, next) => {
	let {startDate, endDate} = req.body;

	const editBooking = await Booking.findOne({where: {id: req.params.bookingId}});

	let errorResponse = {
		"status": 403,
		"message": "Sorry, this spot is already booked for the specified dates",
		"errors": {}
	}

	if(!editBooking) {
		next({
			status: 404,
			message: "Booking couldn't be found"
		})
	}

	if(editBooking.dataValues.endDate < Date.now()) {
			next({
				status: 403,
				message: "This booking has already passed"
			})
		// )
	}

	if(startDate > endDate) {
			next({
				status: 400,
				"message": "Bad Request",
				errors: "endDate cannot come before startDate"

			})
	}
		const spot = await editBooking.getSpot({include: {model: Booking}})

	// console.log('TEST --------->', editBooking.dataValues)
	// console.log('TEST 2 ------->', spot.Bookings[i].dataValues.id)

	for(let i = 0; i < spot.Bookings.length; i++) {
		let currStart = spot.Bookings[i].dataValues.startDate.toISOString().substring(0, 10);
		let currEnd = spot.Bookings[i].dataValues.endDate.toISOString().substring(0, 10);

		if(currStart === startDate && spot.Bookings[i].dataValues.id !== req.params.bookingId) {
			errorResponse.errors['startDate'] = "Start date conflicts with an existing booking"
		}

		if(currEnd === endDate && spot.Bookings[i].dataValues.id !== req.params.bookingId) {
			errorResponse.errors['endDate'] = "End date conflicts with an existing booking"
		}
	}

	try {
		if(startDate) {
			editBooking.startDate = startDate
		}
		if(endDate) {
			editBooking.endDate = endDate
		}

		await editBooking.save()

		res.json({
			editBooking
		})
	} catch(err) {
			next({
				...errorResponse
			})
	}
})

//DELETE A BOOKING
router.delete('/:bookingId', requireAuth, async(req, res, next) => {
	const deadBooking = await Booking.findOne({where: {id: req.params.bookingId}, include: {model: Spot}});

	if(!deadBooking) {
		next({
			status: 404,
			message: "Booking not found"
		})
	}


	const spot = await deadBooking.getSpot()

	if(deadBooking.userId !== req.user.id && spot.ownerId !== req.user.id) {
		throw new Error(
			next({
				status: 403,
				message: "Must be owner of spot or owner of booking to delete"
			})
		)
	}

	if(deadBooking.startDate < Date.now()) {
		throw new Error(
			next({
				status: 400,
				message: "Can not delete a booking once it has started or passed"
			})
		)
	}

	await deadBooking.destroy();

	res.json({
		message: "Successfully deleted your booking"
	})


})

module.exports = router;
