import { csrfFetch } from "./csrf";

// actions
const GET_USER_REVIEWS = 'spot/GET_USER_REVIEWS';
const GET_SPOT_REVIEWS = 'spot/GET_SPOT_REVIEWS';
const ADD_REVIEW = 'spot/ADD_REVIEW';
const EDIT_REVIEW = 'spot/EDIT_REVIEW';
const REMOVE_REVIEW = 'spot/REMOVE_REVIEW';

// action creators
export const getUserReviews = (userId, reviews) => {
    return {
        type: GET_USER_REVIEWS,
        userId,
        reviews
    }
}
export const getSpotReviews = (spotId, reviews) => {
    return {
        type: GET_SPOT_REVIEWS,
        spotId,
        reviews
    }
}
export const addReview = (spotId, review) => {
    return {
        type: ADD_REVIEW,
        spotId,
        review
    }
}
export const editReview = (reviewId, review) => {
    return {
        type: EDIT_REVIEW,
        reviewId,
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
