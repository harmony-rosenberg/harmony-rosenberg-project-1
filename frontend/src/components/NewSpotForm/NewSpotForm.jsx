import "./NewSpotForm.css";

const NewSpotForm = () => {
	return (
		<main>
		<form className="new-spot-form">
			<label>
				<input
					placeholder="Country"
					type="text"
				/>
			</label>
			<label>
				<input
				placeholder="Street Address"
				type="text"
				/>
			</label>
			<label>
				<input
				placeholder="City"
				type="text"
				/>
				<span>,</span>
				<input
				placeholder="State"
				type="text"
				/>
			</label>
			<label>
				<input
				placeholder="Latitude"
				type="text"
				/>
				<input
				placeholder="Longitude"
				type="text"
				/>
			</label>
				<h3>Describe your place to guests</h3>
				<p>Mention the best features of your space, any special amenitites like fast wifi or parking, and what you love about the neighborhood</p>
			<label>
				<textarea
				cols="60"
				rows="10"
				placeholder="Please write at least 30 characters"
				>
				</textarea>
			</label>
			<h3>Create a title for your spot</h3>
			<p>Catch guests' attention with a spot title that highlights what makes your place special</p>
			<label>
				<input
				placeholder="Name of  your spot"
				type="text"
				/>
			</label>
			<h3>Set a base price for your spot</h3>
			<p>Competitive pricing can help your listing stand out and rank higher in search results</p>
			<label>
				<input
				placeholder="Price per night (USD)"
				type="text"
				/>
			</label>
			<h3>Liven up your spot with photos</h3>
			<p>Submit a link to atleast one photo to publish your spot</p>
			<label>
				<input
				placeholder="Preview image URL"
				type="text"
				/>
				</label>
			<label>
				<input
				placeholder="Image URL"
				type="text"
				/>
			</label>
			<label>
				<input
				placeholder="Image URL"
				type="text"
				/>
			</label>
			<label>
			<input
				placeholder="Image URL"
				type="text"
				/>
			</label>
			<label>
				<input
				placeholder="Image URL"
				type="text"
				/>
			</label>
		</form>
		</main>
	)
};

export default NewSpotForm;
