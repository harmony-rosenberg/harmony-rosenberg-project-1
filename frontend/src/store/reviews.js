import { csrfFetch } from "./csrf";

const LOAD_REVIEWS = 'reviews/loadReviews';

const loadReviews = (payload) => ({
	type: LOAD_REVIEWS,
	payload
});

export const fetchReviews = (spotId) => async (dispatch) => {
	const res = await csrfFetch(`/api/spots/${spotId}/reviews`);

	if(res.ok) {
		const data = await res.json();
		dispatch(loadReviews(data))
	}
}

const initialState = {};

const reviewsReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOAD_REVIEWS: {
			const newState = {...state}
			action.payload.forEach(review => {
				newState[review.id] = review
			})
			return newState
		}
		default:
			return state
	}
}

export default reviewsReducer;
