import { csrfFetch } from './csrf';

// actions
const GET_ALL_SPOTS = 'spots/GET_ALL_SPOTS';
const GET_SINGLE_SPOT = 'spots/GET_SINGLE_SPOT';
const CREATE_SPOT = 'spots/CREATE_SPOT';
const GET_USER_SPOTS = 'spots/GET_USER_SPOTS';
const REMOVE_USER_SPOT = 'spots/REMOVE_USER_SPOT';
// const EDIT_SPOT = 'spots/EDIT_SPOT';
const REMOVE_SPOT = 'spots/RESET_SPOT';
// const RESET_SPOT = 'spots/RESET_SPOT';
// const ADD_IMAGE = 'spots/ADD_IMAGE';

// action creators
const getAllSpots = (payload) => {
    return {
        type: GET_ALL_SPOTS,
        payload
    }
}
const getSingleSpot = (payload) => {
    return {
        type: GET_SINGLE_SPOT,
        payload
    }
}
const createSpot = (payload) => {
    return {
        type: CREATE_SPOT,
        payload
    }
}
const getUserSpots = (payload) => {
    return {
        type: GET_USER_SPOTS,
        payload
    }
}
const removeUserSpot = (payload) => {
    return {
        type: REMOVE_USER_SPOT,
        payload
    }
}
// export const editSpot = (payload) => {
//     return {
//         type: EDIT_SPOT,
//         payload
//     }
// }
const removeSpot = () => {
    return {
        type: REMOVE_SPOT

    }
}
// const resetSpot = () => {
//     return {
//         type: RESET_SPOT

//     }
// }
// export const addImage = (spotId, url, preview) => {
//     return {
//         type: ADD_IMAGE,
//         spotId,
//         url,
//         preview
//     }
// }
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
        const payload = await res.json();
        dispatch(getAllSpots(payload));
        // return payload;
    }
}
export const getSingleSpotThunk = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`);
    if(res.ok){
        const payload = await res.json();
        dispatch(getSingleSpot(payload));
        // return payload;
    }
}
export const createSpotThunk = (data) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }, body: JSON.stringify(data.spot)
    });

    let spotData;

    if(res.ok){
        spotData = await res.json();
    }
    const dataArray = Object.values(data.images);
    // dataArray.forEach((image)=>{
        for(let image of dataArray) {
        image.spotId = spotData.id;
        if(image.url.length !== 0 || image.url !== ''){
            await csrfFetch(`/api/spots/${spotData.id}/images`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }, body: JSON.stringify(image)
            });
        }
    }
    const resTwo = await csrfFetch(`/api/spots/${spotData.id}`);
    if(resTwo.ok){
        const payload = await resTwo.json();
        if(!payload.SpotImages){
            dispatch(createSpot(payload));
        }
        return payload.id;
    }
    // if(res.ok){
    //     const spot = await res.json();
    //     dispatch(createSpot(spot));
    //     return spot;
    // }
}
export const getUserSpotsThunk = () => async (dispatch) => {
    const res = await csrfFetch('/api/spots/current');
    if(res.ok){
        const payload = await res.json();
        dispatch(getUserSpots(payload));
        // return payload;
    }
}

export const removeSpotThunk = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE'
    })
    if(res.ok){
        dispatch(removeUserSpot(spotId));
    }
}

export const editSpotThunk = (data, spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        }, body: JSON.stringify(data.spot)
    });
    if(res.ok){
        const payload = await res.json();
        dispatch(createSpot(payload));
        // return payload;
    }
}
export const resetSpot = () => async (dispatch) => {
    dispatch(removeSpot());
}
// export const addImageThunk = (spotId, url, preview) => async (dispatch) => {
//     const res = await csrfFetch(`/api/spots/${spotId}/images`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         }, body: JSON.stringify({ url, preview })
//     });
//     if(res.ok){
//         const { spotId, url, preview } = await res.json();
//         dispatch(addImage(spotId, url, preview));
//         return spotId;
//     }
// }
// end

// reducer
const initialState = {
    singleSpot: {},
    allSpots: {},
    userSpots: {},
    newSpotImages: {}
}

const spotsReducer = ( state = initialState, action ) => {
    //const newState;
    let newState;
    switch(action.type){
        case GET_ALL_SPOTS: {
            newState = { ...state }
            const normalizedSpots = {};
            action.payload.Spots.forEach((spot)=>(
                normalizedSpots[spot.id] = spot
            ));
            newState.allSpots = normalizedSpots;
            // newState.singleSpot = {};
            return newState;
        }
        case GET_SINGLE_SPOT: {
            newState = { ...state, singleSpot: { ...action.payload } }
            // newState.singleSpot = action.payload
            return newState
        }
        case CREATE_SPOT: {
            newState = { ...state } //allSpots: {...state.allSpots}}
            newState.allStates[action.payload.id] = action.payload
            return newState;
        }
        case GET_USER_SPOTS: {
            newState = { ...state };
            const normalizedSpots = {};
            action.payload.Spots.forEach((spot)=>{
                normalizedSpots[spot.id] = spot
            });
            newState.userSpots = normalizedSpots;
            return newState;
        }
        // case EDIT_SPOT: {
        //     newState = { ...state }
        //     newState.allSpots = { ...state, allSpots: { ...state.allSpots } }
        //     newState.allSpots[action.spot.id] = action.spot
        //     newState.spots = { ...state, spots: { ...state.spots } }
        //     newState.spots[action.spot.id] = action.spot
        //     return newState
        // }
        case REMOVE_USER_SPOT: {
            newState = { ...state }
            delete newState.userSpots[action.payload]
            return newState;
        }
        // case ADD_IMAGE: {
        //     newState = { ...state }
        //     newState.singleSpot = { ...state.singleSpot, [action.spotId.SpotImages]: [action.spotId.SpotImages].push(action.url) }
        //     return newState;
        // }
        case REMOVE_SPOT: {
            newState = { ...state }
            let obj = {}
            newState.singleSpot = obj;
            return newState;
        }
        default: {
            // newState = { ...state }
            // return newState;
            return state;
        }
    }
}

export default spotsReducer;
