import { csrfFetch } from './csrf';

// actions
const GET_ALL_SPOTS = 'spots/GET_ALL_SPOTS';
const GET_SINGLE_SPOT = 'spots/GET_SINGLE_SPOT';
const GET_USER_SPOTS = 'spots/GET_USER_SPOTS';
const CREATE_SPOT = 'spots/CREATE_SPOT';
const EDIT_SPOT = 'spots/EDIT_SPOT';
const REMOVE_SPOT = 'spots/REMOVE_SPOT';
const ADD_IMAGE = 'spots/ADD_IMAGE';

// action creators

export const getAllSpots = (spots) => {
    return {
        type: GET_ALL_SPOTS,
        spots
    }
}
export const getSingleSpot = (spot) => {
    return {
        type: GET_SINGLE_SPOT,
        spot
    }
}
export const getUserSpots = (spots) => {
    return {
        type: GET_USER_SPOTS,
        spots
    }
}
export const createSpot = (spot) => {
    return {
        type: CREATE_SPOT,
        spot
    }
}
export const editSpot = (spotId, spot) => {
    return {
        type: EDIT_SPOT,
        spotId,
        spot
    }
}
export const removeSpot = (spotId) => {
    return {
        type: REMOVE_SPOT,
        spotId
    }
}
export const addImage = (spotId, url, preview) => {
    return {
        type: ADD_IMAGE,
        spotId,
        url,
        preview
    }
}
// export const AddImage = (img) => {
//     return {
//         type: ADD_IMAGE,
//         img
//     }
// }

// thunks
export const getAllSpotsThunk = () => async (dispatch) => {
    const res = await csrfFetch('/api/spots');
    if(res.ok){
        const spots = await res.json();
        dispatch(getAllSpots(spots));
        return spots;
    }
}
export const getSingleSpotThunk = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`);
    if(res.ok){
        const spot = await res.json();
        dispatch(getSingleSpot(spot));
        return spot;
    }
}
export const getUserSpotsThunk = () => async (dispatch) => {
    const res = await csrfFetch('/api/spots/current');
    if(res.ok){
        const spot = await res.json();
        dispatch(getUserSpots(spot));
        return spot;
    }
}
export const createSpotThunk = (spot) => async (dispatch) => {
    const res = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }, body: JSON.stringify(spot)
    });
    if(res.ok){
        const spot = await res.json();
        dispatch(createSpot(spot));
        return spot;
    }
}
export const editSpotThunk = (spotId, spot) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'applicaiton/json'
        }, body: JSON.stringify(spot)
    });
    if(res.ok){
        const spot = await res.json();
        dispatch(editSpot(spotId, spot));
        return spot;
    }
}
export const removeSpotThunk = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE'
    });
    if(res.ok){
        dispatch(removeSpot(spotId));
    }
}
export const addImageThunk = (spotId, url, preview) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/images`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }, body: JSON.stringify({ url, preview })
    });
    if(res.ok){
        const { spotId, url, preview } = await res.json();
        dispatch(addImage(spotId, url, preview));
        return spotId;
    }
}
// end

// reducer
const initialState = {
    singleSpot: {},
    allSpots: {},
    userSpots: {}
}

const spotsReducer = ( state = initialState, action ) => {
    //const newState;
    let newState;
    switch(action.type){
        case GET_ALL_SPOTS: {
            newState = { ...state }
            const normalizedSpots = {};
            action.spots.Spots.forEach((spot)=>{
                normalizedSpots[spot.id] = spot
            });
            newState.allSpots = normalizedSpots;
            // newState.singleSpot = {};
            return newState;
        }
        case GET_SINGLE_SPOT: {
            newState = { ...state, singleSpot: { ...state.allSpots } }
            newState.singleSpot = action.spot
            return newState
        }
        case GET_USER_SPOTS: {
            newState = { ...state };
            const normalizedSpots = {};
            action.spots.Spots.forEach((spot)=>{
                normalizedSpots[spot.id] = spot
            });
            newState.userSpots = normalizedSpots;
            return newState;
        }
        case CREATE_SPOT: {
            newState = {...state, allSpots: {...state.allSpots}}
            newState.allSpots[action.spot.id] = action.spot
            return newState;
        }
        case EDIT_SPOT: {
            newState = { ...state }
            newState.allSpots = { ...state, allSpots: { ...state.allSpots } }
            newState.allSpots[action.spot.id] = action.spot
            newState.spots = { ...state, spots: { ...state.spots } }
            newState.spots[action.spot.id] = action.spot
            return newState
        }
        case REMOVE_SPOT: {
            newState = { ...state }
            delete newState.allSpots[action.spotId]
            return newState;
        }
        case ADD_IMAGE: {
            newState = { ...state }
            newState.singleSpot = { ...state.singleSpot, [action.spotId.SpotImages]: [action.spotId.SpotImages].push(action.url) }
            return newState;
        }
    }
}

export default spotsReducer;
