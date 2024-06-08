import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSpotDetails } from '../../store/spots';
import { useEffect, useState } from 'react';
import SpotImages from '../SpotImages';
import ReviewFormModal from '../ReviewFormModal'
import './SpotDetails.css';
import OpenModalButton from '../OpenModalButton/OpenModalButton';

const SpotDetails = () => {
	const [isLoaded, setIsLoaded] = useState(false);
	const dispatch = useDispatch();
	const {spotId} = useParams();

	const spot = useSelector(state => state.spots)

	useEffect(() => {
		dispatch(fetchSpotDetails(spotId)).then(() => setIsLoaded(true))
	}, [spotId, dispatch])

	return (
		isLoaded ? (
			<div>
			<h1>{spot.name}</h1>
			<h2>{spot.city}, {spot.state}, {spot.country}</h2>
			<div className='spot-images'>
			{spot.spotImages.map(image => (
				<SpotImages key={image.id} image={image} />
			))}
			</div>
			<h3>Hosted By {spot.owner.firstName} {spot.owner.lastName}</h3>
			<p>{spot.description}</p>
			<div className='callout-box'>
				<div className='callout-details'>
				<p>{spot.price} night</p>
				<p>⭐{spot.avgStarRating}</p>
				<p>{spot.numReviews} reviews</p>
				</div>
				<button className='reserve-btn'>reserve</button>
			</div>
			<div className='reviews'>
				<h2>Reviews</h2>
				<OpenModalButton
				buttonText="Post Your Review"
				modalComponent={<ReviewFormModal />}
				/>
			</div>
		</div>
		) : (
			<div>whoopsie daisies</div>
		)
	)
};

export default SpotDetails
