import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
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
	const [isLoaded, setIsLoaded] = useState(false);


	useEffect(() => {
		dispatch(fetchReviews(spotId)).then(() => setIsLoaded(true))
	}, [spotId, dispatch])

	let reviewClass

	if(sessionUser) {
		sessionUser.id === spot.ownerId ? reviewClass = "hidden" : reviewClass = "review-modal"
	}

	if(reviews) {
		Object.values(reviews).map(review => {
			if(sessionUser && review.User.id === sessionUser.id) {
				reviewClass = "hidden"
			}
		})
	}

	let textClassName;

	if(sessionUser) {
		sessionUser.id !== spot.ownerId && Object.values(reviews).length === 0 ?  textClassName = "post-a-review-text" : textClassName = "hidden"
	}

	return (
		isLoaded ? (
		<div>
			<div className='reviews-container'>
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
						<ReviewDetails key={review.id} review={review}/>
					))}
				</div>
			</div>
		</div>
		) : (
			<div> whoopsie </div>
		)
	)
}

export default ReviewCard
