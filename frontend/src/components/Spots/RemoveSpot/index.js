import React from "react";
import { useDispatch } from "react-redux";
import { removeSpotThunk, getUserSpotsThunk } from "../../../store/spots";
import { useModal } from "../../../context/Modal";
import './RemoveSpot.css'
// import { useEffect } from "react";

export default function RemoveSpot({spotId}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    // useEffect(() => {dispatch(getCurrentUserSpots())}, [handleDelete]);

    const handleDelete = async (e) => {
      e.preventDefault();
      await dispatch(removeSpotThunk(spotId))

      await dispatch(getUserSpotsThunk())
      closeModal()
    };

    return (
      <div className="delete-modal">
          <h1>Confirm Delete</h1>
          <div>Are you sure you want to remove this spot from the listings?</div>

          <button type="submit" value="delete" onClick={handleDelete} id='delete-spot'>Yes (Delete Spot)</button>
          <button type="submit" value='cancel' onClick={closeModal} id='cancel-delete-spot'>No (Keep Spot)</button>

      </div>
    );
  }
