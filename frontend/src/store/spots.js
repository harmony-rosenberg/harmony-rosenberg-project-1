import { csrfFetch } from "./csrf";

const LOAD_SPOTS = 'spots/loadSpots';

const loadSpots = (payload) => ({
	type: LOAD_SPOTS,
	payload
})

export const fetchSpots = () => async (dispatch) => {
	const res = await csrfFetch("/api/spots");

	if(res.ok) {
		const data = await res.json();
		// console.log(data)
		dispatch(loadSpots(data))
	}
}

const initialState = {};

const spotReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOAD_SPOTS:
			// console.log(action.payload)
			const newState = {}
			action.payload.forEach(spot => {
				newState[spot.id] = spot
			});
			return newState;
		default:
			return state
	}
}

export default spotReducer;
