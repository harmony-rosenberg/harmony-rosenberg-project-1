import { fetchDeleteSpot } from "../../store/spots"
import { useDispatch } from "react-redux";
import { useModal } from '../../context/Modal';
import "./DeleteSpot.css"

const DeleteSpot = ({spot}) => {
	const dispatch = useDispatch();
  const { closeModal } = useModal();

	const handleDelete = async (e) => {
		e.preventDefault()

		const payload = {
			...spot
		}

		const deadSpot = await dispatch(fetchDeleteSpot(payload))
		closeModal()
		return deadSpot
	}

	return (
		<div className="form-container">
			<h1>Confirm Delete</h1>
			<h2>are you sure you want to remove this spot?</h2>
		<form>
			<label>
				<button onClick={handleDelete}>Yes (delete spot)</button>
			</label>
			<label>
				<button onClick={closeModal}>No (keep spot)</button>
			</label>
		</form>
		</div>
	)
}

export default DeleteSpot;
