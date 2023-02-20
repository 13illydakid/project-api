import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { addReviewThunk } from '../../store/reviews';
import { useModal } from '../../context/Modal'
import { getSingleSpotThunk } from '../../store/spots';
import './CreateReviews.css';
export default function CreateReviews({ spotId }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();
    const [url, setUrl] = useState('');
    const [review, setReview] = useState('');
    const [stars, setStars] = useState(5);
    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [rating, setRating] = useState(0);

    const currentUser = useSelector((state) => state.session.user);
    const {id} = useParams();
    const handleStarClick = (index) => {
        setRating(index + 1)
      }
    useEffect(() => {
        if (currentUser) setErrors([]);
        else setErrors(['Log in to leave a review']);
    }, [currentUser]);
    const updateReview = (e) => setReview(e.target.value)
    const updateStars = (e) => setStars(e.target.value)
    const updateURL = (e) => setUrl(e.target.value)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        setHasSubmitted(true);

        const errorsArr = [];
        if (!review.length || review.length > 150)
            errorsArr.push('Enter a valid review fewer than 150 characters long');

        setErrors(errorsArr);
        if (errorsArr.length) return;
        const reviewInfo = { review, stars, url };

        const newReview = await dispatch(
            addReviewThunk(reviewInfo, spotId, currentUser)
        ).catch(async (res) => {
            const message = await res.json();
            const messageErrors = [];

            if (message) {
                messageErrors.push(message.error);
                errorsArr.push(message.error);
                setErrors(messageErrors);
            }
        });
        if (newReview && !url.length) {
            closeModal();
            dispatch(getSingleSpotThunk(spotId))
            history.push(`/spots/${spotId}`);
        }

    };
    const handleCancelClick = (e) => {
        e.preventDefault()


    }
    return (
        <div>
            <div className="modalHead">Leave a Review</div>

            <div>
                {hasSubmitted &&
                    errors &&
                    errors.map((error) => <div style={{ color: 'red' }} key={error}>{error}</div>)}
            </div>

            <form onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
                <input
                    type={'text'}
                    placeholder={'Leave a review'}
                    required
                    value={review}
                    onChange={updateReview}
                />
                <input
                    type={'number'}
                    placeholder={'Stars'}
                    required
                    value={stars}
                    onChange={updateStars}
                    readOnly
                />
                <div className="star-rating">
        {Array.from({ length: 5 }, (_, i) => (
          <i
            key={i}
            className={`fa fa-star ${i < rating ? "selected" : ""}`}
            onClick={() => handleStarClick(i)}
          />
        ))}
      </div>
                <input
                    type={'text'}
                    placeholder={'Review image (optional)'}
                    value={url}
                    onChange={updateURL}
                />
                <button type="submit">Submit</button>
                <button type="button" onClick={handleCancelClick}>Cancel</button>
                <button>Create Review</button>
            </form>
        </div>
    );
};
