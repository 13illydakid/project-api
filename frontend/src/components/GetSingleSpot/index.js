import React, { useEffect } from 'react';
import noImg from '../Images/noImg.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleSpotThunk } from '../../store/spots';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import './GetSingleSpot.css';
import SpotReviews from '../Reviews/SpotReviews';
import OpenModalButton from '../OpenModalButton';
import CreateReviews from '../CreateReviews';

export default function GetSingleSpot() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const spot = useSelector((state) => {
    return state.spots.singleSpot;
  });
  const currentUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getSingleSpotThunk(spotId));
    history.push(`/spots/${spotId}`);
  }, [dispatch, spotId]);

  if (!Object.values(spot).length) return null;

  const spotImgArr = spot?.SpotImages;

  let previewImages;
  let displayImages = [];
  if (spotImgArr) {
    for (let img of spotImgArr) {
      if (img.preview === true) {
        previewImages = img.url;
      } else {
        displayImages.push(img.url);
      }
    }
  }

  if (!spot?.Owner) return null;
  if (!Object.keys(spot).length) return null;
  return (
    <div className="singlespot-container">
      <div>
        <div>
          <h1>{spot.name}</h1>
        </div>

        <div>
          {spot.avgStarRating ? (
            <span> ★{spot.avgStarRating} · </span>
          ) : (
            <span> New · </span>
          )}
          <span>{spot.numReviews} reviews · </span>
          <span>Superhost · </span>
          <span className='spot-capitalize'>
            {spot.city}, {spot.state}, {spot.country}
          </span>
        </div>
      </div>
      <div id="spot-img-container">
        <img
          id="preview-img"
          alt={spot.name}
          src={previewImages}
          onError={(event) => {
            event.target.src = `${noImg}`;
            event.onerror = null;
          }}
        />
        <div className="other-img-container">
          {displayImages.length > 0 ? (
            displayImages.map((url) => (
              <img
                id={`spot-image-${url.id}`}
                className="other-image"
                alt={spot.name}
                src={url}
                key={url}
                onError={(event) => {
                  event.target.src = `${noImg}`;
                  event.onerror = null;
                }}
              />
            ))
          ) : (
            <>
              <img className="other-image" alt={spot.name} src={noImg} />
              <img className="other-image" alt={spot.name} src={noImg} />
              <img className="other-image" alt={spot.name} src={noImg} />
              <img className="other-image" alt={spot.name} src={noImg} />
            </>
          )}
        </div>
      </div>
      <div className="spot-lower-title">
        <h2 className="spot-name">
          Entire home hosted by {spot.Owner.firstName} {spot.Owner.lastName}
        </h2>
      </div>
      <div className="spot-description">
        <p>
          <i className="fa fa-quote-left fa-lg"></i> {spot.description}{' '}
          <i className="fa fa-quote-right fa-lg"></i>
        </p>
      </div>

      <div className="breaker"></div>
      {currentUser && (
        <div className="review-button">
          <OpenModalButton
            buttonText="Leave a Review"
            modalComponent={<CreateReviews spotId={spotId} />}
          />
        </div>
      )}

      <h2 className="review-stats-middle">
        <span>
          {spot.avgStarRating ? (
            <span className="bold">★ {spot.avgStarRating} · </span>
          ) : (
            <span className="bold">★ New · </span>
          )}
        </span>
        <span>{spot.numReviews} reviews</span>
      </h2>
      <div className="one-spot-reviews-container">
        <SpotReviews spotId={spotId} />
      </div>
      <div className="breaker"></div>
    </div>
  );
}
