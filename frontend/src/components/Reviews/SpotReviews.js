import React, { useEffect } from 'react';
import { resetReviews, getSpotReviewsThunk } from '../../store/reviews';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import noImg from '../Images/noImg.jpg';

// import './Reviews.css';

export default function SpotReviews({ spotId }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const reviewsObj = useSelector((state) => {
    return state.reviews.spot;
  });

  const reviewsArr = Object.values(reviewsObj);

  useEffect(() => {
    dispatch(getSpotReviewsThunk(+spotId));
    return () => {
      dispatch(resetReviews());
    };
  }, [dispatch]);

  if (!reviewsArr.length) return null;

  return (
    <>
      {reviewsArr.map((review) => (
        <div>
          <h3>
            {review.User.firstName} {review.User.lastName}
          </h3>
          <p className='review-date'>{new Date(review.createdAt).toString().slice(3, -42)}</p>

          <p>
            {[...Array(review.stars)].map((star) => (
              <i className="fa-solid fa-star"></i>
            ))}
          </p>

          <p>
            <i className="fa fa-light fa-fire" aria-hidden="true"></i>{' '}
            <span>{review.review}</span>{' '}
            <i className="fa fa-light fa-fire" aria-hidden="true"></i>
          </p>
          <div>
            {review.ReviewImages &&
              review.ReviewImages.map((image) => {
                return (
                  <img
                    className="spot-review-image"
                    src={image.url}
                    key={image.url}
                    onError={(event) => {
                      event.target.src = `${noImg}`;
                      event.onerror = null;
                    }}
                  />
                );
              })}
          </div>
        </div>
      ))}
    </>
  );
};
