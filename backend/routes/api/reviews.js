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
		const editReview = await Review.findOne({where: {id: req.params.reviewId, userId: req.user.id}})

		if(!editReview) {
			next({
				status: 404,
				message: "Review couldn't be found"
			})
		}

		editReview.review = review
		editReview.stars = stars

		await editReview.save()

		res.json({
			message: "Successfully edited your review!",
			data: editReview
		})
	} catch{
		next({
			status: 400,
			...errorResponse
		})
	}

})


//ADD IMAGE TO REVIEW
router.post('/:reviewId/images', async(req, res, next) => {

	let {url} = req.body

	const currReview = await Review.findOne({
		where: {
			id: req.params.reviewId,
			userId: req.user.id
		}, include: {
			model: reviewImage
		}
	})

	if(!currReview) {
		next({
			status: 404,
			message: "Couldn't find review"
		})
	}
	console.log(currReview.reviewImages)

	if(currReview.reviewImages.length >= 5) {
		throw new Error(
			next({
				status: 403,
				message: "Maximum number of images reached"
			})
		)
	}

	const newImage = await reviewImage.create({
		reviewId: req.params.reviewId,
		url
	})

	const payLoad = {
		id: newImage.id,
		url: newImage.url
	}

	res.json(payLoad)

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
