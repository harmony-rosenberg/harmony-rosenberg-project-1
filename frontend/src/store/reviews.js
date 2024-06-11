import { csrfFetch } from "./csrf";

const LOAD_REVIEWS = 'reviews/loadReviews';
const CREATE_REVIEW = 'reviews/createReview'

const loadReviews = (payload) => ({
	type: LOAD_REVIEWS,
	payload
});

const createReview = (payload) => ({
	type: CREATE_REVIEW,
	payload
});

export const fetchReviews = (spotId) => async (dispatch) => {
	const res = await csrfFetch(`/api/spots/${spotId}/reviews`);

	if(res.ok) {
		const data = await res.json();
		dispatch(loadReviews(data))
	}
}

export const fetchNewReview = (spotId, review) => async (dispatch) => {
	const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(review)
	})

	if(res.ok) {
		const newReview = await res.json();
		dispatch(createReview(newReview))
		return newReview
	}

}

const initialState = {};

const reviewsReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOAD_REVIEWS: {
			const newState = {}
			action.payload.forEach(review => {
				newState[review.id] = review
			})
			return newState
		}
		case CREATE_REVIEW: {
			const newState = {}
			newState[action.payload.newReview.id] = action.payload.newReview
			return {...state, ...newState}
		}
		default:
			return state
	}
}

export default reviewsReducer;
