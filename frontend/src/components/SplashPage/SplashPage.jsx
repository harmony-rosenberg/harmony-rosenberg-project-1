import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchSpots } from '../../store/spots';
import SpotCard from '../SpotCard';
import './SplashPage.css';

const SplashPage = () => {
	const dispatch = useDispatch();
	const spots = useSelector(state => state.spots)

	useEffect(() => {
		dispatch(fetchSpots())
	}, [dispatch])

	return (
		<div className='spots-list'>
			{Object.values(spots).map((spot) => (
				<SpotCard spot={spot} />
			))}
		</div>
	)
}

export default SplashPage
