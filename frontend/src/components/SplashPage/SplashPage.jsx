import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchSpots } from '../../store/spots';
import SpotCard from '../SpotCard';
import './SplashPage.css';

const SplashPage = () => {
	const dispatch = useDispatch();
	const spots = useSelector(state => state.spots)
	const [isLoaded, setIsLoaded] = useState(false);


	useEffect(() => {
		dispatch(fetchSpots()).then(() => setIsLoaded(true))
	}, [dispatch])

	return (
		isLoaded ? (
		<div className='spots-list'>
			{Object.values(spots).map((spot) => (
				<SpotCard spot={spot} />
			))}
		</div>
		) : (
			<div>whoopsie</div>
		)
	)
}

export default SplashPage
