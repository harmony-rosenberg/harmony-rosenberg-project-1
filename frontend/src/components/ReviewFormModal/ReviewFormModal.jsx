import './ReviewForm.css';

const ReviewFormModal = () => {
	return (
		<main>
		<form className='review-form'>
			<h1>How was your stay?</h1>
			<label>
				<textarea
				cols={50}
				rows={10}
				placeholder='Leave your review here...'
				type='text'
				/>
			</label>
			<label>
				<div>Stars</div>
			</label>
			<button className='submit-btn' type='submit'>Submit Your Review</button>
		</form>
		</main>
	)
}

export default ReviewFormModal;
