import { csrfFetch } from "./csrf";

const LOAD_SPOTS = 'spots/loadSpots';
const LOAD_DETAILS = 'spots/loadSpotDetails';
const CREATE_SPOT = 'spots/createSpot';
const LOAD_USERSPOTS = 'spots/loadCurrentSpots'

const loadUserSpots = (payload) => ({
	type: LOAD_USERSPOTS,
	payload
})

const loadSpots = (payload) => ({
	type: LOAD_SPOTS,
	payload
})

const loadSpotDetails = (payload) => ({
	type: LOAD_DETAILS,
	payload
})

const createSpot = (payload) => ({
	type: CREATE_SPOT,
	payload
})

export const fetchSpots = () => async (dispatch) => {
	const res = await csrfFetch("/api/spots");

	if(res.ok) {
		const data = await res.json();
		dispatch(loadSpots(data))
	}
}

export const fetchUserSpots = () => async (dispatch) => {
	const res = await csrfFetch("/api/spots/current");

	if(res.ok) {
		const data = await res.json()
		dispatch(loadUserSpots(data))
	}
}

export const fetchSpotDetails = (spotId) => async (dispatch) => {
	const res = await csrfFetch(`/api/spots/${spotId}`);

	if(res.ok) {
		const data = await res.json();
		dispatch(loadSpotDetails(data))
	}
}

export const fetchNewSpot = (spot) => async (dispatch) => {
	const res = await csrfFetch('/api/spots', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(spot)
	})

	if(res.ok) {
		const newSpot = await res.json();
		dispatch(createSpot(newSpot))
		return newSpot
	}
}

const initialState = {};

const spotReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOAD_SPOTS: {
			const newState = {}
			action.payload.forEach(spot => {
				newState[spot.id] = spot
			});
			return {...state, ...newState};
		}
			case LOAD_DETAILS: {
				return {...action.payload}
			}
			case CREATE_SPOT : {
				const newState = {}
				newState[action.payload.newSpot.id] = action.payload.newSpot
				return {...state, ...newState}
			}
			case LOAD_USERSPOTS : {
				const newState = {}
				action.payload.forEach(spot => {
					newState[spot.id] = spot
				})
				return {...newState}
			}
		default:
			return state
	}
}

export default spotReducer;
