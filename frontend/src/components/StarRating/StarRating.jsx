import {FaStar} from "react-icons/fa";

const StarRating = () => {
	return (
		<div>
			{[...Array(5)].map(star => {
				return <label>
					<input type="radio" name="rating" />
					<FaStar />
				</label>
			})}

		</div>
	)
}

export default StarRating
