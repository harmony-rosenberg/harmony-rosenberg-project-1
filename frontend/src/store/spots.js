import { csrfFetch } from "./csrf";

const LOAD_SPOTS = 'spots/loadSpots';
const LOAD_DETAILS = 'spots/loadSpotDetails';
const CREATE_SPOT = 'spots/createSpot';
const LOAD_USERSPOTS = 'spots/loadCurrentSpots';
const UPDATE_SPOT = 'spots/updateSpot';
const DELETE_SPOT = 'spots/deleteSpot'
const CREATE_IMAGE = 'spots/images/createImage'

const deleteSpot = (payload) => ({
	type: DELETE_SPOT,
	payload
});

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

const updateSpot = (payload) => ({
	type: UPDATE_SPOT,
	payload
})

const createSpotImage = (payload) => ({
	type: CREATE_IMAGE,
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

export const createImage = (payLoad, spotId) => async (dispatch) => {
	// console.log('ANYTHING WORKING', spotId, imageUrl, isPreview)
	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(payLoad),
	}

    const res = await csrfFetch(`/api/spots/${spotId}/images`, options);
    if (response.ok) {
			const data = await res.json();
			dispatch(createSpotImage(data))
			return data
  }
};

export const fetchUpdateSpot = (spot) => async (dispatch) => {
	const res = await csrfFetch(`/api/spots/${spot.id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(spot)
	})
	if(res.ok) {
		const updatedSpot = await res.json();
		dispatch(updateSpot(updatedSpot))
		return updatedSpot
	}
}

export const fetchDeleteSpot = (spot) => async (dispatch) => {
	const res = await csrfFetch(`/api/spots/${spot.id}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json'
		}
	})
	if(res.ok) {
		const deadSpot = await res.json()
		dispatch(deleteSpot(deadSpot))
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
			case CREATE_IMAGE : {
				const newState = []
				newState = action.payload
				return {...state, ...newState}
			}
			case UPDATE_SPOT : {
				const newState = {}
				newState[action.payload.editSpot.id] = action.payload.updatedSpot
				return {...newState}
			}
			case LOAD_USERSPOTS : {
				const newState = {}
				action.payload.forEach(spot => {
					newState[spot.id] = spot
				})
				return {...newState}
			}
			case DELETE_SPOT : {
				const newState = {}
				newState[action.payload.id] = action.payload
				Object.values(newState).filter((spot) => spot.id !== action.payload.id)
				return {...newState}
			}
		default:
			return state
	}
}

export default spotReducer;
