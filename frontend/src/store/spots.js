import { csrfFetch } from './csrf';

// actions
const LOAD_SPOTS = 'spots/LOAD_SPOTS';
const LOAD_SPOT = 'spots/LOAD_SPOT';
const ADD_SPOT = 'spots/ADD_SPOT';
const USER_SPOTS = 'spots/USER_SPOTS';
const REMOVE_USER_SPOT = 'spots/REMOVE_USER_SPOT';
const UPDATE_SPOT = 'spots/UPDATE_SPOT';
const RESET_SPOT = 'spots/RESET_SPOT';

// action creators
const loadSpots = (spots) => ({
        type: LOAD_SPOTS,
        spots
});
const loadSpot = (spot) => ({
        type: LOAD_SPOT,
        spot
});
const add = (spot) => ({
        type: ADD_SPOT,
        spot
});
const remove = (spotId, userId) => ({
        type: REMOVE_USER_SPOT,
        spotId,
        userId
});
const update = (spot) => ({
    type: UPDATE_SPOT,
    spot
});

// const getUserSpots = (payload) => {
//     return {
//         type: GET_USER_SPOTS,
//         payload
//     }
// }
// thunks
export const getSpots = () => async (dispatch) => {
    const res = await csrfFetch('/api/spots');
    if(res.ok){
        const spots = await res.json();
        dispatch(loadSpots(spots));
        return spots;
    }
}
export const getSpot = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`);
    if(res.ok){
        const spot = await res.json();
        dispatch(loadSpot(spot));
        return spot;
    }
}
export const addSpot = (data) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }, body: JSON.stringify(data)
    });
    let spot;
    if(res.ok){
        spot = await res.json();
        // dispatch(add(spot));
        // return spot;
    }
    const dataArray = Object.values(data.images);

        for(let image of dataArray) {
        image.spotId = spot.id;
        if(image.url.length !== 0 || image.url !== ''){
            await csrfFetch(`/api/spots/${spot.id}/images`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }, body: JSON.stringify(image)
            });
        }
    }
    const resTwo = await csrfFetch(`/api/spots/${spot.id}`);
    if(resTwo.ok){
        const payload = await resTwo.json();
        // if(!payload.SpotImages){
            dispatch(add(payload));
        // }
        return payload;
    }
}
export const getUserSpotsThunk = () => async (dispatch) => {
    const res = await csrfFetch('/api/spots/current');
    if(res.ok){
        const payload = await res.json();
        dispatch(getUserSpots(payload));
        return payload;
    }
}

export const removeSpot = (spotId, userId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE'
    })
    if(res.ok){
        const { id: deletedSpotId } = await res.json();
        dispatch(remove(deletedSpotId, spotId));
        return deletedSpotId;
    }
}

export const updateSpot = (data) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${data.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        }, body: JSON.stringify(data)
    });
    if(res.ok){
        const spot = await res.json();
        dispatch(update(spot));
        return spot;
    }
}
// reducer
const initialState = {
    singleSpot: {},
    allSpots: {},
    userSpots: {},
    newSpotImages: {}
}

const spotsReducer = ( state = initialState, action ) => {
    switch(action.type){
        case LOAD_SPOTS:
            const newSpots = {};
            action.allSpots.forEach(spot => {
                newSpots[spot.id] = spot;
            })
            return {
                ...state,
                ...newSpots
            }
        case GET_SINGLE_SPOT:
            const newState1 = { ...state }
            newState1[singleSpot] = action.payload;
            return newState1;
        case ADD_SPOT:
            const newState2 = { ...state } //allSpots: {...state.allSpots}}
            newState2.allStates[action.spot.id] = action.singleSpot
            return newState2;
        case USER_SPOTS:
            const newState3 = { ...state };
            const normalizedSpots = {};
            action.userSpots.Spots.forEach((spot)=>{
                normalizedSpots[spot.id] = userSpots
            });
            newState3.userSpots = normalizedSpots;
            return newState3;
        case REMOVE_USER_SPOT:
            const newState4 = { ...state }
            delete newState4.userSpots[action.spotId]
            return newState4;
        case RESET_SPOT:
            const newState = { ...state }
            let obj = {}
            newState.singleSpot = obj;
            return newState;
        default:
            return state;
    }
}

export default spotsReducer;
