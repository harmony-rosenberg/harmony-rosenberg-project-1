import OpenModalButton from "../OpenModalButton/OpenModalButton";
import "./UserSpots.css";
import DeleteSpot from "../DeleteSpot/DeleteSpot";
import { useNavigate } from 'react-router-dom';

const UserSpots = ({spot}) => {
	const navigate = useNavigate();

	const update = () => {
		return navigate(`/spots/${spot.id}/update`)
	}

	return (
		<div>
		<div className='card' onClick={() => navigate(`/spots/${spot.id}`)}>
			<img className='splash-img' src={spot.previewImage} />
			<div className='row-one'>
			<span>{spot.city}, {spot.state}</span>
			<span className='rating'> ⭐ {spot.avgRating || "new"}</span>
			</div>
			<div key={spot.id} className='row-two'>
			<span className='spot-price'> {spot.price} </span> <span>night</span>
			</div>
			<div>
			</div>
		</div>
		<div className="manage-btns">
			<button onClick={update}>Update Spot</button>
			<OpenModalButton
			buttonText="Delete your spot"
			modalComponent={<DeleteSpot spot={spot}/>} />
		</div>
		</div>
	)
}

export default UserSpots
