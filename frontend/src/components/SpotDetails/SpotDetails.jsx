import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './SpotDetails.css';

const SpotDetails = () => {
	const dispatch = useDispatch()
	const {spotId} = useParams();

	return (
		<div>
			<h1>more to come</h1>
		</div>
	)
}
