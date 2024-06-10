import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import './ReviewCard.css';
import ReviewFormModal from '../ReviewFormModal'
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import { fetchReviews } from '../../store/reviews';
import ReviewDetails from '../ReviewDetails/ReviewDetails';

const ReviewCard = ({spot}) => {
	const displayReviews = spot.numReviews === 1 ? "Review" : "Reviews"
	const noReviews = spot.numReviews === 0 ? "" : displayReviews
	const displayNothing = spot.numReviews === 0 ? "" : `• ${spot.numReviews}`

	const {spotId} = useParams();
	const dispatch = useDispatch();
	const reviews = useSelector(state => state.reviews);

	useEffect(() => {
		dispatch(fetchReviews(spotId))
	}, [spotId, dispatch])

	return (
		<main>
			<h2>⭐{spot.avgStarRating || "New"} {displayNothing} {noReviews}</h2>
			<OpenModalButton
				buttonText="Post Your Review"
				modalComponent={<ReviewFormModal />}
			/>
			<ReviewDetails reviews={reviews}/>
		</main>
	)
}

export default ReviewCard
