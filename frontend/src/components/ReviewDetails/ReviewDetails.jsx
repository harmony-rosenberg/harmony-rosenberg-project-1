import OpenModalButton from "../OpenModalButton/OpenModalButton"
import { useSelector } from "react-redux";
import DeleteReview from "../DeleteReview/DeleteReview";
import './ReviewDetails.css';

const ReviewDetails = ({reviews}) => {
  const sessionUser = useSelector(state => state.session.user);

	return (
		<main>
			{Object.values(reviews).map(review => (
				<div key={review.id}>
					<h1>{review.User.firstName}</h1>
					<h2>{review.createdAt}</h2>
					<p>{review.review}</p>
					<div className={sessionUser.id === review.userId ? 'container' : 'hidden'}>
					<OpenModalButton
					buttonText="Delete your review"
					modalComponent={<DeleteReview review={review} />} />
					</div>
				</div>
			))}
		</main>
	)
}

export default ReviewDetails
