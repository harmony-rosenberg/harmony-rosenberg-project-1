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

//EDIT A REVIEW
router.put('/:reviewId', async(req, res, next) => {
	let {review, stars} = req.body

	const editReview = await Review.findOne({where: {id: req.params.reviewId, userId: req.user.id}})

	if(!editReview) {
		next({
			status: 404,
			message: "Review couldn't be found"
		})
	}

	if(review) {
		editReview.review = review
	}
	if(stars) {
		editReview.stars = stars
	}

	await editReview.save()

	res.json({
		message: "Successfully edited your review!",
		data: editReview
	})
})


//ADD IMAGE TO REVIEW
router.post('/:reviewId/images', async(req, res, next) => {

	let {url} = req.body

	const currReview = await Review.findOne({
		where: {
			id: req.params.reviewId,
			userId: req.user.id
		}
	})

	if(!currReview) {
		next({
			status: 404,
			message: "Couldn't find review"
		})
	}

	console.log(currReview)

	const newImage = await reviewImage.create({
		reviewId: req.params.reviewId,
		url: "new image url here"
	})

	res.json(newImage)

})


//DELTE A REVIEW
router.delete('/:reviewId', async(req, res, next) => {
	const deadReview = await Review.findOne({where: {id: req.params.reviewId, userId: req.user.id}});

	if(!deadReview) {
		next({
			status: 404,
			message: "Review couldn't be found"
		})
	}

	await deadReview.destroy();

	res.json({
		message: "Successfully deleted your review"
	})

})


module.exports = router;
