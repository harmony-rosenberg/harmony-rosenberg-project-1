import { csrfFetch } from "./csrf";

const LOAD_DETAILS = 'spots/loadSpotDetails';

const loadSpotDetails = (payload) => ({
	type: LOAD_DETAILS,
	payload
})

const LOAD_SPOTS = 'spots/loadSpots';

const loadSpots = (payload) => ({
	type: LOAD_SPOTS,
	payload
})

export const fetchSpots = () => async (dispatch) => {
	const res = await csrfFetch("/api/spots");

	if(res.ok) {
		const data = await res.json();
		dispatch(loadSpots(data))
	}
}

export const fetchSpotDetails = (spotId) => async (dispatch) => {
	const res = await csrfFetch(`/api/spots/${spotId}`);

	if(res.ok) {
		const data = await res.json();
		dispatch(loadSpotDetails(data))
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
			return {...initialState, ...newState};
		}
			case LOAD_DETAILS: {
				return {...action.payload}
			}
		default:
			return state
	}
}

export default spotReducer;
