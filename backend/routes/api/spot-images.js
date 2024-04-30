const express = require('express');
const router = express.Router();
const { Spot, spotImage, Review, User, reviewImage} = require('../../db/models');

router.delete('/:imageId', async(req, res, next) => {

	const deadImage = await spotImage.findOne({
		where: {
			id: req.params.imageId
		}, include: {
			model: Spot,
			where: {
				ownerId: req.user.id
			}
		}
	})

	if(!deadImage) {
		next({
			status: 404,
			message: "Couldn't find this image associated with any spots"
		})
	}

	await deadImage.destroy();

	res.json({
		message: "Successfully deleted your image!"
	})
})


module.exports = router
