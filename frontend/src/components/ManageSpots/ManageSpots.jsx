import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserSpots } from '../../store/spots';
import { NavLink, Link } from 'react-router-dom';
import './ManageSpots.css';
import UserSpots from '../UserSpots/UserSpots';

const ManageSpots = () => {
	const dispatch = useDispatch();
	const spots = useSelector(state => state.spots);

	useEffect(() => {
		dispatch(fetchUserSpots())
	}, [dispatch])

	if(Object.values(spots).length === 0) {
		return (
			<div>
				<h1>Manage Your Spotsss</h1>
				<Link to='/spots/new'>Create New Spot</Link>
			</div>
		)
	} 

	return (
		<main>
			<h1>Manage Your Spots</h1>
			<div className='user-spots-list'>
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
