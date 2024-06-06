import './SpotCard.css';

const SpotCard = ({ spot }) => {
	console.log(spot)
	return (
		<div className='card'>
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
