import OpenModalButton from "../OpenModalButton/OpenModalButton"
import { useSelector } from "react-redux";
import DeleteReview from "../DeleteReview/DeleteReview";
import './ReviewDetails.css';

const ReviewDetails = ({review}) => {
  const sessionUser = useSelector(state => state.session.user);
	const dateRaw = new Date(review.createdAt).toDateString()

	const dateFormat = (date) => {
		const dateArr = date.split(" ")
    let returnDate;

		for(let i = 0; i < dateArr.length; i++) {
			const day = dateArr[0]
			const num = dateArr[2]
			let newDate = dateArr.filter(e => e !== day)
			returnDate = newDate.filter(e => e !== num)
		}
		return returnDate.join(" ")
	}

	let deleteBtn;

	sessionUser.id === review.User.id ? deleteBtn = '' : deleteBtn = 'hidden'

	return (
		<div key={review.id} className="single-review">
					<div className="userName">{review.User.firstName}</div>
					<div className="reviewDate">{dateFormat(dateRaw)}</div>
					<div className="reviewText">{review.review}</div>
					<div className={deleteBtn}>
					<OpenModalButton
					buttonText="Delete your review"
					modalComponent={<DeleteReview review={review} />} />
					</div>
		</div>
	)
}

export default ReviewDetails
