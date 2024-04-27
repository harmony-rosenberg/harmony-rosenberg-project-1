const express = require('express');
const router = express.Router();
const { Spot, spotImage, Review, User, reviewImage} = require('../../db/models');

//GET REVIEWS FOR CURRENT USER
router.get('/current', async(req, res, next) => {
	const userReviews = await Review.findAll({
		where: {
			userId: req.user.id
		}, include : [{
			model: User,
			attributes: ['id', 'firstName', 'lastName']
		},
		{
			model: Spot,
			attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'],
			include: {
				model: spotImage,
				attributes: ['url']
			}
		}, {
			model: reviewImage,
			attributes: ['id', 'url']
		}]
	})

	res.json(userReviews)
})



module.exports = router;
