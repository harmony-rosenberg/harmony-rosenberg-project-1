import {FaStar} from "react-icons/fa";
import { useState } from 'react';
import './ReviewForm.css';
import { useDispatch } from 'react-redux';
import { fetchNewReview } from '../../store/reviews';
import { useModal } from '../../context/Modal';
import { useNavigate } from 'react-router-dom';

// console.log('SPOTID', spotId)

const ReviewFormModal = ({ spotId }) => {
	const { closeModal } = useModal();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [review, setReview] = useState("")
	const [stars, setStars] = useState(0);
	const [hover, setHover] = useState(0);

	const handleSubmit = async (e) => {
		e.preventDefault()

		const payload = {
			review,
			stars
		}
		const newReview = await dispatch(fetchNewReview(spotId, payload))
		.then(closeModal())

		return navigate(`/spots/${spotId}`)
	}

	return (
		<main>
		<form onSubmit={handleSubmit} className='review-form'>
			<h1>How was your stay?</h1>
			<label>
				<textarea
				value={review}
				onChange={(e) => setReview(e.target.value)}
				cols={50}
				rows={10}
				placeholder='Leave your review here...'
				type='text'
				/>
			</label>
			<label>
				<div>
				<div className="star-rating">
				{[...Array(5)].map((rating, index) => {
					index += 1;
					return (
						<button
						type="button"
						value={stars}
						key={index}
						className={index <= (hover || stars) ? "on" : "off"}
						onClick={() => setStars(index)}
						onMouseEnter={() => setHover(index)}
						onMouseLeave={() => setHover(stars)}
						>
							<span className="star"><FaStar size={25}/></span>
						</button>
					);
				})}
			</div>
				</div>
			</label>
			<label>
			<button className='submit-btn' type='submit'>Submit Your Review</button>
			</label>
		</form>
		</main>
	)
}

export default ReviewFormModal;
