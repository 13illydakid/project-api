import { csrfFetch } from "./csrf";

// actions
// const GET_SPOT_REVIEWS = 'reviews/GET_SPOT_REVIEWS';
// const GET_USER_REVIEWS = 'reviews/GET_USER_REVIEWS';
// const EDIT_REVIEW = 'reviews/EDIT_REVIEW';
// const RESET_REVIEWS = 'reviews/RESET_REVIEWS';
const GET_REVIEWS = 'reviews/GET_REVIEWS';
const ADD_REVIEW = 'reviews/ADD_REVIEW';
const REMOVE_REVIEW = 'reviews/REMOVE_REVIEW';

// action creators

// const getSpotReviews = (reviews) => {
//     return {
//         type: GET_SPOT_REVIEWS,
//         // spotId,
//         reviews
//     }
// }
// const getUserReviews = (reviews) => {
//     return {
//         type: GET_USER_REVIEWS,
//         // userId,
//         reviews
//     }
// }
const getReviews = (payload) => {
    return {
        type: GET_REVIEWS,
        // spotId,
        payload
    }
}

const addReview = (payload) => {
    return {
        type: ADD_REVIEW,
        // spotId,
        payload
    }
}
const removeReview = (reviewId) => {
    return {
        type: REMOVE_REVIEW,
        reviewId
    }
}
// const editReview = (review) => {
//     return {
//         type: EDIT_REVIEW,
//         // reviewId,
//         review
//     }
// }
// const resetReviews = () => {
//     return {
//       type: RESET_REVIEWS,
//     };
//   }

// thunks

// export const getUserReviewsThunk = () => async (dispatch) => {
//     const res = await csrfFetch('/api/reviews/current');
//     if(res.ok){
//         const reviews = await res.json();
//         dispatch(getUserReviews(reviews));
//         return reviews;
//     }
// }
export const getSpotReviewsThunk = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`);
    if (res.ok) {
        const payload = await res.json();
        dispatch(getReviews(payload));
        // return payload;
    }
}

export const addReviewThunk = (data, spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${data.spotId}/reviews`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }, body: JSON.stringify(data),
    });

    if(res.ok){
        const payload = await res.json();
        dispatch(addReview(payload));
        // return payload;
    }
}
export const removeReviewThunk = (reviewId) => async (dispatch) => {
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    });
    if (res.ok) {
        dispatch(removeReview(reviewId));
    }
}
// export const editReviewThunk = (reviewId, review) => async (dispatch) => {
//     const res = await csrfFetch(`/api/reviews/${reviewId}`, {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json'
//         }, body: JSON.stringify(review)
//     });
//     if (res.ok) {
//         const newReview = await res.json();
//         dispatch(editReview(review));
//         return newReview;
//     }
// }

// reducer
const initialState = {
    spotReviews: {}
}

const reviewsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_REVIEWS: {
            newState = { ...state };
            const normalizedUserReviews = {};
            action.payload.Reviews.forEach(
                (review) => (normalizedUserReviews[review.id] = review)
            );
            newState.spotReviews = normalizedUserReviews;
            return newState;
        }
        case ADD_REVIEW: {
            newState = { ...state };
            newState.spotReviews[action.payload.id] = action.payload
            return newState;
        }
        // case EDIT_REVIEW: {
        //     return { ...state, spot: { ...state.spot, [action.review.id]: action.review } }
        // }
        case REMOVE_REVIEW: {
            newState = { ...state.spotReviews };
            delete newState[action.reviewId];
            return newState;
        }
        // case RESET_REVIEWS: {
        //     newState = { ...state };
        //     newState.user = {};
        //     newState.spot = {};
        //     return newState;
        // }
        default: {
            return state;
        }
    }
}

export default reviewsReducer;
