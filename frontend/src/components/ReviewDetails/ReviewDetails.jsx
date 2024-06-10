const ReviewDetails = ({reviews}) => {
	return (
		<main>
			{Object.values(reviews).map(review => (
				<div key={review.id}>
					<h1>{review.User.firstName}</h1>
					<h2>{review.createdAt}</h2>
					<p>{review.review}</p>
				</div>
			))}
		</main>
	)
}

export default ReviewDetails
