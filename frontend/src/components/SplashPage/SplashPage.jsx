import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchSpots } from '../../store/spots';
import './SplashPage.css';

const SplashPage = () => {
	const dispatch = useDispatch();
	const spots = useSelector(state => state.spots)

	useEffect(() => {
		dispatch(fetchSpots())
	}, [])

	return (
		<div>
		<h1>splash page</h1>
		</div>
	)
}

export default SplashPage
