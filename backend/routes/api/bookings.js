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

//DELETE A BOOKING
router.delete('/:bookingId', async(req, res, next) => {
	const deadBooking = await Booking.findOne({where: {id: req.params.bookingId, userId: req.user.id}});

	if(!deadBooking) {
		next({
			status: 404,
			message: "Booking not found"
		})
	}

	await deadBooking.destroy();

	res.json({
		message: "Successfully deleted your booking"
	})


})

module.exports = router;
