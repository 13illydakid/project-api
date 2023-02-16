// import { csrfFetch } from "./csrf";

// // actions
// const GET_USER_REVIEWS = 'spot/GET_USER_REVIEWS';
// const GET_SPOT_REVIEWS = 'spot/GET_SPOT_REVIEWS';
// const ADD_REVIEW = 'spot/ADD_REVIEW';
// const EDIT_REVIEW = 'spot/EDIT_REVIEW';
// const REMOVE_REVIEW = 'spot/REMOVE_REVIEW';

// // action creators
// export const getUserReviews = (userId, reviews) => {
//     return {
//         type: GET_USER_REVIEWS,
//         userId,
//         reviews
//     }
// }
// export const getSpotReviews = (spotId, reviews) => {
//     return {
//         type: GET_SPOT_REVIEWS,
//         spotId,
//         reviews
//     }
// }
// export const addReview = (spotId, review) => {
//     return {
//         type: ADD_REVIEW,
//         spotId,
//         review
//     }
// }
// export const editReview = (reviewId, review) => {
//     return {
//         type: EDIT_REVIEW,
//         reviewId,
//         review
//     }
// }
// export const removeReview = (reviewId) => {
//     return {
//         type: REMOVE_REVIEW,
//         reviewId
//     }
// }

// // thunks
// export const getUserReviewsThunk = (userId) => async (dispatch) => {
//     const res = await csrfFetch('/api/reviews/current');
//     if(res.ok){
//         const reviews = await res.json();
//         dispatch(getUserReviews(userId, reviews));
//         return reviews;
//     }
// }
// export const getSpotReviewsThunk = (spotId) => async (dispatch) => {
//     const res = await csrfFetch(`/api/spots/${spotId}/reviews`);
//     if(res.ok){
//         const reviews = await res.json();
//         dispatch(getSpotReviews(spotId, reviews));
//         return reviews;
//     }
// }
// export const addReviewThunk = (spotId, review) => async (dispatch) => {
//     const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         }, body: JSON.stringify(review)
//     });
//     if(res.ok){
//         const review = await res.json();
//         dispatch(addReview(spotId, review));
//         return review;
//     }
// }
// export const editReviewThunk = (reviewId, review) => async (dispatch) => {
//     const res = await csrfFetch(`/api/reviews/${reviewId}`, {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'applicaiton/json'
//         }, body: JSON.stringify(review)
//     });
//     if(res.ok){
//         const newReview = await res.json();
//         dispatch(editReview(reviewId, review));
//         return newReview;
//     }
// }
// export const removeReviewThunk = (reviewId) => async (dispatch) => {
//     const res = await csrfFetch(`/api/reviews/${reviewId}`, {
//         method: 'DELETE'
//     });
//     if(res.ok){
//         const formerReview = await res.json();
//         dispatch(removeReview(reviewId));
//         return formerReview;
//     }
// }

// // reducer
// const initialState = {
//     userReviews: {},
//     spotReviews: {}
// }
