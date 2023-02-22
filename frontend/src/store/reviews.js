import { csrfFetch } from "./csrf";

// actions
const GET_SPOT_REVIEWS = 'spot/GET_SPOT_REVIEWS';
const GET_USER_REVIEWS = 'spot/GET_USER_REVIEWS';
const ADD_REVIEW = 'spot/ADD_REVIEW';
const EDIT_REVIEW = 'spot/EDIT_REVIEW';
const REMOVE_REVIEW = 'spot/REMOVE_REVIEW';
const RESET_REVIEWS = 'reviews/RESET_REVIEWS';

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
export const resetReviews = () => {
    return {
      type: RESET_REVIEWS,
    };
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
export const addReviewThunk = (newReview, spotId, user) => async (dispatch) => {
        const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newReview),
        });

        if (!res.ok) {
          let error;
          if (res.status === 403) {
            error = await res.json();
            return error.message;

          }
          console.log(error)
        }

        if (res.ok) {
          const newReview = await res.json();
          const userInfo = {};
          userInfo.id = user.id;
          userInfo.firstName = user.firstName;
          userInfo.lastName = user.lastName;
          newReview.User = userInfo;
          newReview.ReviewImages = [];

          dispatch(addReview(newReview));

          return newReview;
        } else {
          const result = await res.json();
          return result;
        }
}
export const editReviewThunk = (reviewId, review) => async (dispatch) => {
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
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
            newState = { ...state };
            const normalizedReview = {};
            action.reviews.forEach((review) => {
              normalizedReview[review.id] = review;
            });
            newState.spot = normalizedReview;
            newState.user = {};
            return newState;
        }
        case GET_USER_REVIEWS: {
            newState = { ...state };
            const normalizedUserReviews = {};
            action.reviews.forEach(
              (review) => (normalizedUserReviews[review.id] = review)
            );
            newState.user = normalizedUserReviews;
            newState.spot = {};
            return newState;
        }
        case ADD_REVIEW: {
            newState = { ...state };
            newState.user = { ...state.user };
            newState.spot = { ...state.spot, [action.review.id]: action.review };
            return newState;
        }
        case EDIT_REVIEW: {
            return { ...state, spot: { ...state.spot, [action.review.id]: action.review } }
        }
        case REMOVE_REVIEW: {
            newState = { ...state };
            newState.spot = { ...state.spot };
            newState.user = { ...state.user };
            delete newState.spot[action.reviewId];
            delete newState.user[action.reviewId];
            return newState;
        }
        case RESET_REVIEWS: {
            newState = { ...state };
            newState.user = {};
            newState.spot = {};
            return newState;
        }
        default: {
            newState = { ...state }
            return newState;
        }
    }
}

export default reviewsReducer;
