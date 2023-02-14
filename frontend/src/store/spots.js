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
export const AddImage = (img) => {
    return {
        type: ADD_IMAGE,
        img
    }
}

// thunks
export const getSingleSpotThunk = () => async (dispatch) => {
    const res = await csrfFetch('/api/spots');
    if(res.ok){
        const spot = await res.json();
        dispatch(GetSingleSpot(spot));
        return spot;
    }
}
