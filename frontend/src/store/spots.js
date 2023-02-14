import { csrfFetch } from './csrf';

// actions
const GET_SINGLE_SPOT = 'spots/GET_SINGLE_SPOT';
const GET_ALL_SPOTS = 'spots/GET_ALL_SPOTS';
const CREATE_SPOT = 'spots/CREATE_SPOT';
const EDIT_SPOT = 'spots/EDIT_SPOT';
const REMOVE_SPOT = 'spots/REMOVE_SPOT';
const ADD_IMAGE = 'spots/ADD_IMAGE';

// action creators

export const GetSingleSpot = (spot) => {
    return {
        type: GET_SINGLE_SPOT,
        spot
    }
}
export const GetAllSpots = (spots) => {
    return {
        type: GET_ALL_SPOTS,
        spots
    }
}
export const CreateSpot = (spot) => {
    return {
        type: CREATE_SPOT,
        spot
    }
}
export const EditSpot = (spotId, spot) => {
    return {
        type: EDIT_SPOT,
        spotId,
        spot
    }
}
export const RemoveSpot = (spotId) => {
    return {
        type: REMOVE_SPOT,
        spotId
    }
}
export const AddImage = (spotId, url, preview) => {
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
export const getSingleSpotThunk = () => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`);
    if(res.ok){
        const spot = await res.json();
        dispatch(GetSingleSpot(spot));
        return spot;
    }
}
export const getAllSpotsThunk = () => async (dispatch) => {
    const res = await csrfFetch('/api/spots');
    if(res.ok){
        const spots = await res.json();
        dispatch(GetAllSpots(spots));
        return spots;
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
        dispatch(CreateSpot(spot));
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
        dispatch(EditSpot(spotId, spot));
        return spot;
    }
}
export const removeSpotThunk = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE'
    });
    if(res.ok){
        dispatch(RemoveSpot(spotId));
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
        dispatch(AddImage(spotId, url, preview));
        return spotId;
    }
}
// end

const initialState = {
    singleSpot: {},
    allSpots: {}
}

// reducer
function spotsReducer ( state = initialState, action ) {
    const newState;
    switch(action.type){
        case GET_SINGLE_SPOT: {
            newState = { ...state }
            newState.spots = 
        }
    }
}
