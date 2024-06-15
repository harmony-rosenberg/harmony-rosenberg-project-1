import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { fetchSpotDetails } from '../../store/spots';
import { fetchUpdateSpot } from "../../store/spots";

const UpdateSpot = () => {
	// const spots = useSelector(state => state.spots);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [country, setCountry] = useState("");
	const [address, setAddress] = useState("");
	const [city, setCity] = useState("");
	const [state, setState] = useState("");
	const [description, setDescription] = useState("");
	const [name, setName] = useState("");
	const [price, setPrice] = useState("");
	const [isLoaded, setIsLoaded] = useState(false);
	const {spotId} = useParams();

	const spot = useSelector(state => state.spots)

	const handleSubmit = async (e) => {
		e.preventDefault();
		const payload = {
			id: spot.id,
			country: country || spot.country,
			address: address || spot.address,
			city: city || spot.city,
			state: state || spot.state,
			description: description || spot.description,
			name: name || spot.name,
			price: price || spot.price,
		}
		// console.log('UPDATED SPOT', payload)

		const updatedSpot = await dispatch(fetchUpdateSpot(payload))

		return navigate(`/spots/${spot.id}`)
	}

	useEffect(() => {
		dispatch(fetchSpotDetails(spotId)).then(() => setIsLoaded(true))
	}, [spotId, dispatch])

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<h1>Update your spot</h1>
			<label>
				<input
					placeholder={spot.country}
					type="text"
					value={country}
					onChange={(e) => setCountry(e.target.value)}
				/>
			</label>
			<label>
				<input
				placeholder={spot.address}
				type="text"
				value={address}
				onChange={(e) => setAddress(e.target.value)}
				/>
			</label>
			<label>
				<input
				placeholder={spot.city}
				type="text"
				value={city}
				onChange={(e) => setCity(e.target.value)}
				/>
				<span>,</span>
				<input
				placeholder={spot.state}
				type="text"
				value={state}
				onChange={(e) => setState(e.target.value)}
				/>
			</label>
				<h3>Describe your place to guests</h3>
				<p>Mention the best features of your space, any special amenitites like fast wifi or parking, and what you love about the neighborhood</p>
			<label>
				<textarea
				cols="60"
				rows="10"
				placeholder={spot.description}
				value={description}
				onChange={(e) => setDescription(e.target.value)}
				>
				</textarea>
			</label>
			<h3>Create a title for your spot</h3>
			<p>Catch guests attention with a spot title that highlights what makes your place special</p>
			<label>
				<input
				placeholder={spot.name}
				type="text"
				value={name}
				onChange={(e) => setName(e.target.value)}
				/>
			</label>
			<h3>Set a base price for your spot</h3>
			<p>Competitive pricing can help your listing stand out and rank higher in search results</p>
			<label>
				<input
				placeholder={spot.price}
				type="text"
				value={price}
				onChange={(e) => setPrice(e.target.value)}
				/>
			</label>
			<button className="create-btn" type="submit">Update</button>
			</form>
		</div>
	)
}

export default UpdateSpot
