import './ReviewCard.css';
import ReviewFormModal from '../ReviewFormModal'
import OpenModalButton from '../OpenModalButton/OpenModalButton';

const ReviewCard = ({spot}) => {
	const displayReviews = spot.numReviews === 1 ? "Review" : "Reviews"
	const noReviews = spot.numReviews === 0 ? "" : displayReviews
	const displayNothing = spot.numReviews === 0 ? "" : `• ${spot.numReviews}`

	return (
		<main>
			<h2>⭐{spot.avgStarRating || "New"} {displayNothing} {noReviews}</h2>
			<OpenModalButton
				buttonText="Post Your Review"
				modalComponent={<ReviewFormModal />}
			/>
			
		</main>
	)
}

export default ReviewCard
