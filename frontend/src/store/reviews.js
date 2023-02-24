import { csrfFetch } from "./csrf";

// actions
const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS';
const ADD_REVIEW = 'reviews/ADD_REVIEW';
const DELETE_REVIEW = 'reviews/DELETE_REVIEW';
const UPDATE_REVIEW = 'reviews/UPDATE_REVIEW';
// action creators

const load = (reviews) => ({
    type: LOAD_REVIEWS,
    reviews
});

const add = (review) => ({
    type: ADD_REVIEW,
    review
});
const remove = (reviewId, spotId) => ({
    type: DELETE_REVIEW,
    reviewId,
    spotId
});
const update = (review) => ({
    type: UPDATE_REVIEW,
    review
});

// thunks

export const getReviews = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`);
    if (res.ok) {
        const reviews = await res.json();
        dispatch(load(reviews));
        return reviews;
    }
}

export const addReview = (data, spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }, body: JSON.stringify(data),
    });

    if (res.ok) {
        const review = await res.json();
        dispatch(add(review));
        return review;
    }
}
export const deleteReview = (reviewId, spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    });
    if (res.ok) {
        const { id: deletedReviewId } = await res.json();
        dispatch(remove(deletedReviewId, spotId));
        return deletedReviewId;
    }
}
export const updateReview = data => async dispatch => {
    const res = await csrfFetch(`/api/reviews/${data.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    if(res.ok){
        const review = await res.json();
        dispatch(update(review));
        return review;
    }
}

// reducer
const initialState = {};

const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_REVIEWS:
            const newReviews = {};
            action.reviews.forEach(review => {
                newReviews[review.id] = review;
            })
            return {
                ...state,
                ...newReviews
            }
        case REMOVE_REVIEW:
            const newState = { ...state }
            delete newState[action.reviewId]
            return newState;
        case ADD_REVIEW:
            return {
                ...state,
                review: { ...state.review, [action.reviews.id]: action.reviews }
            };
        case UPDATE_REVIEW:
        return {
            ...state,
            [action.review.id]: action.review
        }
        default:
            return state;
    }
}

export default reviewsReducer;
