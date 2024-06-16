import { useNavigate } from 'react-router-dom';
import './SpotCard.css';

const SpotCard = ({ spot }) => {
	const navigate = useNavigate();
	return (
		<div className='spot-card'
		onClick={() => navigate(`/spots/${spot.id}`)}
		data-tooltip={`${spot.name}`}>
			<img className='splash-img' src={spot.previewImage} />
			<div className='row-one'>
			<span>{spot.city}, {spot.state}</span>
			<span className='rating'> ⭐ {spot.avgRating || "new"}</span>
			</div>
			<div className='row-two'>
			<span className='spot-price'> {spot.price} </span> <span>night</span>
			</div>
		</div>
	)
}

export default SpotCard
