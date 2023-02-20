import React, { useEffect } from 'react';
import { resetReviews, getSpotReviewsThunk } from '../../store/reviews';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import MyReviews from './MyReviews';
import noImg from '../Images/noImg.jpg';

// import './Reviews.css';

export default function SpotReviews({ spotId }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const reviewsObj = useSelector((state) => {
    return state.reviews;
  });

  const reviewsArr = Object.values(reviewsObj);

  useEffect(() => {
    dispatch(getSpotReviewsThunk(spotId));
    // return () => {
    //   dispatch(resetReviews());
    // };
  }, [dispatch]);

  if (!reviewsArr.length) return null;

  return (
    <div style={{"margin":"10px", "padding":"0px 10px", "display":"flex", "flexDirection":"column", "border":"lightGray solid 1px", "borderRadius":"10px"}}>
        <h2 style={{"borderBottom":"solid lightgray 1px", "padding":"10px"}}>Your Reviews:</h2>

        {reviewsArr.map((review) => (
            <MyReviews key={review.id} {...review}/>  ))}
            </div>

        )
};
