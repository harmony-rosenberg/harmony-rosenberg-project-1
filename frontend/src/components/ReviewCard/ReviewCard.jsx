import './ReviewCard.css';
import ReviewFormModal from '../ReviewFormModal'
import OpenModalButton from '../OpenModalButton/OpenModalButton';

const ReviewCard = ({spot}) => {
	return (
		<main>
			<h2>⭐{spot.avgStarRating} // {spot.numReviews} Reviews</h2>
			<OpenModalButton
				buttonText="Post Your Review"
				modalComponent={<ReviewFormModal />}
			/>
		</main>
	)
}

export default ReviewCard
