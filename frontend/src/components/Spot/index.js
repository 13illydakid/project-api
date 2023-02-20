import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch , useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getSingleSpotThunk } from '../../store/spots';
import noImg from '../Images/noImg.jpg';
export default function Spot( spotId ) {
    const spot = useSelector((state) => state.spots.singleSpot)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getSingleSpotThunk(spotId))
      }, [dispatch, spotId])
  return (
    <div className="outer-container">
      <Link
        style={{ textDecoration: 'none', color: 'black' }}
        to={`/spots/${spotId}`}
        // to={"/spots/:spotId"}
      >
        <div className="allspot-image-container">
          {spot.previewImage ? (
            <div>
              <img
                src={spot.previewImage}

                onError={(event) => {
                  event.target.src =
                    `${noImg}`;
                  event.onerror = null;
                }}
              />
            </div>
          ) : (
            <div>
              <img style={{ height: '50px' }} src={noImg} alt="noimage" />
            </div>
          )}
        </div>

        <div>
          <div>
            <div className="allspot-location">
              {spot.city}, {spot.state}
            </div>

            <div>
              {spot.avgRating ? (
                <span>{spot.avgRating}</span>
              ) : (
                <span> New</span>
              )}
            </div>
          </div>
          <div className="allspot-country">{spot.country}</div>
          <div className="allspot-price">
            ${spot.price} <span className="no">night</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
