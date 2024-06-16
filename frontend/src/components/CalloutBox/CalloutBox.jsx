// import { Alert } from 'react-alert'

const CalloutBox = ({spot}) => {

	const handleReserveButton = () => {
		return alert('Feature Coming Soon...')
}

	return (
		<main className='callout-box'>
		<div className='callout-details'>
		<p>{spot.price} night</p>
		<p>⭐{spot.avgStarRating || "New"}</p>
		<p>{spot.numReviews} {spot.numReviews === 1 ? "Review" : "Reviews"}</p>
		</div>
		<button className='reserve-btn' onClick={handleReserveButton}>reserve</button>
	</main>
	)
}

export default CalloutBox;
