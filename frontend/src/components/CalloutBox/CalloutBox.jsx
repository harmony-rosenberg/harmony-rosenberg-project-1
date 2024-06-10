const CalloutBox = ({spot}) => {
	return (
		<main className='callout-box'>
		<div className='callout-details'>
		<p>{spot.price} night</p>
		<p>⭐{spot.avgStarRating || "New"}</p>
		<p>{spot.numReviews} {spot.numReviews === 1 ? "Review" : "Reviews"}</p>
		</div>
		<button className='reserve-btn'>reserve</button>
	</main>
	)
}

export default CalloutBox;
