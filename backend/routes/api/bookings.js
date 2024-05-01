const express = require('express');
const router = express.Router();
const { Spot, spotImage, Review, User, reviewImage, Booking} = require('../../db/models');

//GET ALL OF A USERS CURRENT BOOKINGS
router.get('/current', async(req, res, next) => {
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
router.put('/:bookingId', async(req, res, next) => {
	try {
		let {startDate, endDate} = req.body;

		const editBooking = await Booking.findOne({where: {id: req.params.bookingId}});

		console.log(editBooking.endDate)

		if(editBooking.endDate < Date.now()) {
			throw new Error(
				next({
					status: 400,
					message: "This booking has already passed"
				})
			)
		}

		if(!editBooking) {
			next({
				status: 404,
				message: "Booking couldn't be found"
			})
		}

		if(startDate) {
			editBooking.startDate = startDate
		}
		if(endDate) {
			editBooking.endDate = endDate
		}

		await editBooking.save()

		res.json({
			message: "Successfully edited your booking!",
			data: editBooking
		})
	} catch {
		throw new Error(
			next({
				status: 403,
				message: "Booking already exists for this time"
			})
		)
	}
})

//DELETE A BOOKING
router.delete('/:bookingId', async(req, res, next) => {
	const deadBooking = await Booking.findOne({where: {id: req.params.bookingId}, include: {model: Spot}});
	const spot = await deadBooking.getSpot()

	if(!deadBooking) {
		next({
			status: 404,
			message: "Booking not found"
		})
	}

	console.log(spot)
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
