const express = require('express');
const router = express.Router();
const { Spot, spotImage } = require('../../db/models')

//GET ALL SPOTS
router.get('/', async (req, res) => {

	// let spots = await Spot.findAll({include: spotImage})

	let spots = spotImage.findAll({include: Spot})

	// console.log('test!!!!!!!!!!!!!!!!!!', spots[0].spotImage)

	res.json(spots)
})

//GET ALL SPOTS FOR CURRENT USER
router.get('/current', async (req, res, next) => {

})


//CREATE A SPOT
router.post('/', async (req, res, next) => {
		try {
		const {ownerId, address, city, state, country, lat, lng, name, description, price} = req.body

		const newSpot = await Spot.create({
			ownerId,
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

		res.json({
			message: "success!",
			data: newSpot
		})

	} catch(err) {
		next({
			status: 404,
			message: "you messed something up, buddy!"
		})
	}

})

//DELETE A SPOT BY ID
router.delete('/:id', async (req, res, next) => {
	try {
		const deadSpot = await Spot.findOne({where: {id: req.params.id}});

		await deadSpot.destroy();

		res.json({
			status: "success!",
			message: `we killed your spot ${req.params.id}`
		})

		} catch(err) {
			next({
				status: 404,
				message: "doesnt look like this spot exists, buddy"
			})
		}
	})



module.exports = router;
