import { useDispatch } from "react-redux";
import { fetchDeleteReview } from "../../store/reviews";
import { useModal } from '../../context/Modal';


const DeleteReview = ({review}) => {
console.log('REVIEW', review)
const dispatch = useDispatch();
const { closeModal } = useModal();

	const handleDelete = async (e) => {
		e.preventDefault();

		const payload = {
			...review
		}
		const deadReview = await dispatch(fetchDeleteReview(payload))
		closeModal()
		return deadReview
	}

	return (
		<div className="form-container">
			<h1>Confirm Delete</h1>
			<h2>are you sure you want to remove this review?</h2>
			<form>
				<label>
					<button onClick={handleDelete}>Yes(delete review)</button>
					<button onClick={closeModal}>No(keep review)</button>
				</label>
			</form>
		</div>
	)
}

export default DeleteReview
