import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSpotDetails } from '../../store/spots';
import { useEffect, useState } from 'react';
import SpotImages from '../SpotImages';
import ReviewCard from '../ReviewCard/ReviewCard';
import CalloutBox from '../CalloutBox/CalloutBox';
import './SpotDetails.css';

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
			<main className='spot-details'>
			<h1>{spot.name}</h1>
			<h2>{spot.city}, {spot.state}, {spot.country}</h2>
			<div className='spot-images'>
			{spot.spotImages.map((image, index) => (
					<img className={`image-${index}`} src={image.url}></img>
				// <SpotImages key={image.id} image={image} />
			))}
			</div>
			<div className='middle-details'>
			<h3>Hosted By {spot.owner.firstName} {spot.owner.lastName}</h3>
			<div className='description'>{spot.description} </div>
			<CalloutBox spot={spot}/>
			</div>
			<ReviewCard spot={spot}/>
		</main>
		) : (
			<div>whoopsie daisies</div>
		)
	)
};

export default SpotDetails
