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
  const sessionUser = useSelector(state => state.session.user);

	let reviewClass

	if(sessionUser) {
		sessionUser.id === spot.ownerId ? reviewClass = "hidden" : reviewClass = "review-modal"
	}

	Object.values(reviews).forEach(review => {
		if(sessionUser && review.userId === sessionUser.id) {
			reviewClass = "hidden"
		}
	})

	useEffect(() => {
		dispatch(fetchReviews(spotId))
	}, [spotId, dispatch])

	let textClassName;

	if(sessionUser) {
		sessionUser.id !== spot.ownerId && Object.values(reviews).length === 0 ?  textClassName = "post-a-review-text" : textClassName = "hidden"
	}

	console.log('REVIEWS', reviews)

	return (
		<main>
			<h2>⭐{spot.avgStarRating || "New"} {displayNothing} {noReviews}</h2>
			<div className={textClassName}>Be the First to post a review!</div>
				<div className={reviewClass}>
					<OpenModalButton
						buttonText="Post Your Review"
						modalComponent={<ReviewFormModal spotId={spotId} />}
					/>
				</div>
				<div className='reviews-list'>
					{Object.values(reviews).map((review) => (
						<ReviewDetails review={review}/>
					))}
				</div>
		</main>
	)
}

export default ReviewCard
