import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import {fetchNewSpot, createImage} from '../../store/spots'
import "./NewSpotForm.css";

const NewSpotForm = () => {
	const user = useSelector(state => state.session.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [country, setCountry] = useState("");
	const [address, setAddress] = useState("");
	const [city, setCity] = useState("");
	const [state, setState] = useState("");
	const [description, setDescription] = useState("");
	const [name, setName] = useState("");
	const [price, setPrice] = useState("");
	const [preview, setPreview] = useState("");
	const [urlOne, setUrlOne] = useState("");
	const [urlTwo, setUrlTwo] = useState("");
	const [urlThree, setUrlThree] = useState("");
	const [urlFour, setUrlFour] = useState("");
  const [formErrors, setFormErrors] = useState({});
	// console.log('HEEERREEE', newSpot.newSpot.id)
	// dispatch(createImage(urlOne))
	// dispatch(createImage(urlTwo))
	// dispatch(createImage(urlThree))
	// dispatch(createImage(urlFour))

	const handleSubmit = async (e) => {
		e.preventDefault();

		const errors = {}

		if(!country) {
			errors.country = "Country is required"
		}
		if(!address) {
			errors.address = "Street Address is required"
		}
		if(!city) {
			errors.city = "City is required"
		}
		if(!state) {
			errors.state = "State is required"
		}
		if(!description || description.length < 30) {
			errors.state = "Description must be at least 30 characters long"
		}
		if(!name) {
			errors.name = "Name is required"
		}
		if(!price) {
			errors.price = "Price is required"
		}
		if(!preview) {
			errors.previewImage = "Must have at least one preview image"
		}

		if(Object.keys(errors).length > 0) {
			setFormErrors(errors)
			return;
		}
		setFormErrors({});

		const payload = {
			country,
			address,
			city,
			state,
			description,
			name,
			price,
			preview,
			urlOne,
			urlTwo,
			urlThree,
			urlFour
		}

		const newSpot = await dispatch(fetchNewSpot(payload))
		dispatch(createImage(payload, newSpot.newSpot.id))

		if(!user) return <h1>You must be logged in to do this</h1>

		return await navigate(`/spots/${newSpot.newSpot.id}`)
	}

	return (
		<main>
		<form className="new-spot-form" onSubmit={handleSubmit}>
			<h1>Create A New Spot</h1>
			<div className="error-box">
			{formErrors.country && <p>{formErrors.country}</p>}
			{formErrors.address && <p>{formErrors.address}</p>}
			{formErrors.city && <p>{formErrors.city}</p>}
			{formErrors.state && <p>{formErrors.state}</p>}
			{formErrors.description && <p>{formErrors.description}</p>}
			{formErrors.name && <p>{formErrors.name}</p>}
			{formErrors.price && <p>{formErrors.price}</p>}
			{formErrors.previewImage && <p>{formErrors.previewImage}</p>}
			</div>

			<h3>Where is your place located?</h3>
			<p>Guests will only get your exact address once they booked a reservation</p>
			<label>
				<input
					placeholder="Country"
					type="text"
					value={country}
					onChange={(e) => setCountry(e.target.value)}
				/>
			</label>
			<label>
				<input
				placeholder="Street Address"
				type="text"
				value={address}
				onChange={(e) => setAddress(e.target.value)}
				/>
			</label>
			<label>
				<input
				placeholder="City"
				type="text"
				value={city}
				onChange={(e) => setCity(e.target.value)}
				/>
				<span>,</span>
				<input
				placeholder="State"
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
				placeholder="Please write at least 30 characters"
				value={description}
				onChange={(e) => setDescription(e.target.value)}
				>
				</textarea>
			</label>
			<h3>Create a title for your spot</h3>
			<p>Catch guests attention with a spot title that highlights what makes your place special</p>
			<label>
				<input
				placeholder="Name of  your spot"
				type="text"
				value={name}
				onChange={(e) => setName(e.target.value)}
				/>
			</label>
			<h3>Set a base price for your spot</h3>
			<p>Competitive pricing can help your listing stand out and rank higher in search results</p>
			<label>
				<input
				placeholder="Price per night (USD)"
				type="text"
				value={price}
				onChange={(e) => setPrice(e.target.value)}
				/>
			</label>
			<h3>Liven up your spot with photos</h3>
			<p>Submit a link to atleast one photo to publish your spot</p>
			<label>
				<input
				placeholder="Preview image URL"
				type="text"
				value={preview}
				onChange={(e) => setPreview(e.target.value)}
				/>
				</label>
				<div>
					<div className="images-input">
						<input
							type="text"
							placeholder="Image Url"
							value={urlOne}
							onChange={(e) => setUrlOne(e.target.value)}
						/>
						<input
							type="text"
							placeholder="Image Url"
							value={urlTwo}
							onChange={(e) => setUrlTwo(e.target.value)}
						/>
										<input
							type="text"
							placeholder="Image Url"
							value={urlThree}
							onChange={(e) => setUrlThree(e.target.value)}
						/>
										<input
							type="text"
							placeholder="Image Url"
							value={urlFour}
							onChange={(e) => setUrlFour(e.target.value)}
						/>
					</div>

				</div>
			<button className="create-btn" type="submit">Create Spot</button>
		</form>
		</main>
	)
};

export default NewSpotForm;
