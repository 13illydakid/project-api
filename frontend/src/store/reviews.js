import { csrfFetch } from "./csrf";

// actions
const GET_SPOT_REVIEWS = 'spot/GET_SPOT_REVIEWS';
const GET_USER_REVIEWS = 'spot/GET_USER_REVIEWS';
const ADD_REVIEW = 'spot/ADD_REVIEW';
const EDIT_REVIEW = 'spot/EDIT_REVIEW';
const REMOVE_REVIEW = 'spot/REMOVE_REVIEW';

// action creators
export const getSpotReviews = (reviews) => {
    return {
        type: GET_SPOT_REVIEWS,
        // spotId,
        reviews
    }
}
export const getUserReviews = (reviews) => {
    return {
        type: GET_USER_REVIEWS,
        // userId,
        reviews
    }
}
export const addReview = (review) => {
    return {
        type: ADD_REVIEW,
        // spotId,
        review
    }
}
export const editReview = (review) => {
    return {
        type: EDIT_REVIEW,
        // reviewId,
        review
    }
}
export const removeReview = (reviewId) => {
    return {
        type: REMOVE_REVIEW,
        reviewId
    }
}

// thunks
export const getSpotReviewsThunk = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`);
    if(res.ok){
        const reviews = await res.json();
        dispatch(getSpotReviews(reviews));
        return reviews;
    }
}
export const getUserReviewsThunk = () => async (dispatch) => {
    const res = await csrfFetch('/api/reviews/current');
    if(res.ok){
        const reviews = await res.json();
        dispatch(getUserReviews(reviews));
        return reviews;
    }
}
export const addReviewThunk = (spotId, review, user) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }, body: JSON.stringify(review)
    });
    if(res.ok){
        const review = await res.json();
        review.User = user;
        dispatch(addReview(review));
        return review;
    }
}
export const editReviewThunk = (reviewId, review) => async (dispatch) => {
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'applicaiton/json'
        }, body: JSON.stringify(review)
    });
    if(res.ok){
        const newReview = await res.json();
        dispatch(editReview(review));
        return newReview;
    }
}
export const removeReviewThunk = (reviewId) => async (dispatch) => {
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    });
    if(res.ok){
        const formerReview = await res.json();
        dispatch(removeReview(reviewId));
        return formerReview;
    }
}

// reducer
const initialState = {
    user: {},
    spot: {}
}

const reviewsReducer = (state=initialState, action) => {
    let newState;
    switch(action.type){
        case GET_SPOT_REVIEWS: {
            newState = { ...state, spot: {} }
            action.reviews.Reviews.forEach((review) => {
                newState.spot[review.id] = review
            });
            return newState;
        }
        case GET_USER_REVIEWS: {
            newState = { ...state, user: { ...state.user } }
            action.reviews.Reviews.forEach((review) => {
                newState.user[review.id] = review
            });
            return newState;
        }
        case ADD_REVIEW: {
            newState = { ...state, spot: { ...state.spot } }
            newState.spot[action.review.id] = action.review
            return newState;
        }
        case EDIT_REVIEW: {
            return { ...state, spot: { ...state.spot, [action.review.id]: action.review } }
        }
        case REMOVE_REVIEW: {
            newState = { ...state, spot: { ...state.spot }, user: { ...state.user } }
            delete newState.spot[action.reviewId]
            delete newState.user[action.reviewId]
            return newState;
        }
        default:
            return state;
    }
}

export default reviewsReducer;
