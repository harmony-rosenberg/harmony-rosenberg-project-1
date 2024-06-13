import "./UserSpots.css";
import { useNavigate } from 'react-router-dom';

const UserSpots = ({spot}) => {
	const navigate = useNavigate();

	const update = () => {
		return navigate(`/spots/${spot.id}/update`)
	}
	//if no spots render create a spot button otherwise render tile list

	return (
		<div>
		<div className='card' onClick={() => navigate(`/spots/${spot.id}`)}>
			<img className='splash-img' src={spot.previewImage} />
			<div className='row-one'>
			<span>{spot.city}, {spot.state}</span>
			{/* <span className='rating'> ⭐ {spot.avgRating || "new"}</span> */}
			</div>
			<div className='row-two'>
			<span className='spot-price'> {spot.price} </span> <span>night</span>
			</div>
			<div>
			</div>
		</div>
			<button onClick={update}>Update Spot</button>
			<button>Delete Spot</button>
		</div>
	)
}

export default UserSpots
