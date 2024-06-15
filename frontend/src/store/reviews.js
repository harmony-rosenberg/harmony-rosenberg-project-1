import { csrfFetch } from "./csrf";

const LOAD_REVIEWS = 'reviews/loadReviews';
const CREATE_REVIEW = 'reviews/createReview'
const DELETE_REVIEW = 'reviews/deleteReview'

const loadReviews = (payload) => ({
	type: LOAD_REVIEWS,
	payload
});

const createReview = (payload) => ({
	type: CREATE_REVIEW,
	payload
});

const deleteReview = (payload) => ({
	type: DELETE_REVIEW,
	payload
})

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

export const fetchDeleteReview = (review) => async (dispatch) => {
	const res = await csrfFetch(`/api/reviews/${review.id}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json'
		}
	})
	if(res.ok) {
		const deadReview = await res.json()
		dispatch(deleteReview(deadReview))
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
		case DELETE_REVIEW : {
			const newState = {}
			newState[action.payload.id] = action.payload
			Object.values(newState).filter((review) => review.id !== action.payload.id)
			return {...newState}
		}
		default:
			return state
	}
}

export default reviewsReducer;
