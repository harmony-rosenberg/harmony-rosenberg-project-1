import "./UserSpots.css";
import { useNavigate } from 'react-router-dom';

const UserSpots = ({spot}) => {
	const navigate = useNavigate();

	return (
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
			<button>Update Spot</button>
			<button>Delete Spot</button>
			</div>
		</div>
	)
}

export default UserSpots
