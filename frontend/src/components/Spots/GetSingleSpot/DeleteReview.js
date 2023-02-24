import React from "react";
import { useDispatch } from "react-redux";
import { getSpotReviewsThunk, removeReviewThunk } from "../../../store/reviews";
import { useModal } from "../../../context/Modal";
import './DeleteReview.css';

export default function DeleteReview({ reviewId, spotId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();


    useEffect(() => {
        dispatch(removeReviewThunk(reviewId));
      }, [dispatch]);
    useEffect(() => {
        dispatch(getSpotReviewsThunk(spotId));
      }, [dispatch]);
    const handleRemove = async(e) => {
        e.preventDefault();
        // return dispatch(removeReviewThunk(reviewId))
        //     .then(() => closeModal())
        // closeModal();
        await dispatch(removeReviewThunk(reviewId))
        await dispatch(getSpotReviewsThunk(spotId));

        // dispatch(getSpotReviewsThunk(spotId))
        closeModal()
    };

    return (
        <div className="delete">
            <h1>Confirm Delete</h1>
            <div>Are you sure you want to delete this review?</div>
            <button type="submit" value="delete" onClick={handleRemove} className="confirm">
                Yes (Delete Review)
            </button>
            <button type="submit" value="cancel" onClick={closeModal} className="cancel">
                No (Keep Review)
            </button>
        </div>
    )
}
