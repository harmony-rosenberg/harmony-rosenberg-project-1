const express = require('express');
const router = express.Router();
const { Spot, spotImage, Review, User, reviewImage} = require('../../db/models');
const { requireAuth } = require('../../utils/auth.js');

router.delete('/:imageId', requireAuth, async(req, res, next) => {

	const deadImage = await reviewImage.findOne({
		where: {
			id: req.params.imageId
		}, include: {
			model: Review,
			where: {
				userId: req.user.id
			}
		}
	})

	if(!deadImage) {
		next({
			status: 404,
			message: "Couldn't find this image associated with any reviews"
		})
	}


	await deadImage.destroy()

	res.json({
		message: "Successfully deleted your image!"
	})
})

module.exports = router;
