const ReviewDetails = ({reviews}) => {
	console.log('REVIEWS', reviews)
	return (
		<main>
			{Object.values(reviews).map(review => (
				<div>{review.review}</div>
			))}
		</main>
	)
}

export default ReviewDetails
