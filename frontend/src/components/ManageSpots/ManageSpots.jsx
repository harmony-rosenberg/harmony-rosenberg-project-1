import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserSpots } from '../../store/spots';
import './ManageSpots.css';
import UserSpots from '../UserSpots/UserSpots';

const ManageSpots = () => {
	const dispatch = useDispatch();
	const spots = useSelector(state => state.spots);
	const sessionUser = useSelector(state => state.session.user);

	useEffect(() => {
		dispatch(fetchUserSpots())
	}, [])

	console.log(spots)

	return (
		<main>
			<h1>Manage Your Spots</h1>
			<div key={spots.id} className='user-spots-list'>
			{Object.values(spots).map(spot => {
				return (
					<UserSpots key={spot.id} spot={spot}/>
				)
			})}
			</div>
		</main>
	)
}

export default ManageSpots
