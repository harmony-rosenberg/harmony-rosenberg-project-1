import './SpotCard.css';

const SpotCard = ({ spot }) => {
	console.log(spot)
	return (
		<div className='card'>
			<div>
			<img className='splash-img' src={spot.previewImage} />
			</div>
			<span>{spot.city}, {spot.state}</span>
			<span className='rating'>rating</span>
			<div>
			<span className='spot-price'> {spot.price} </span> <span>night</span>
			</div>
		</div>
	)
}

export default SpotCard
