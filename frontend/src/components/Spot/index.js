import React from 'react';
import { Link } from 'react-router-dom';
import noImg from '../Images/noImg.jpg';
export default function Spot({ spot }) {
  return (
    <div className="outer-container">
      <Link
        style={{ textDecoration: 'none', color: 'black' }}
        to={`/spots/${spot.id}`}
      >
        <div className="allspot-image-container">
          {spot.previewImage ? (
            <div>
              <img
                src={spot.previewImage}
                // alt={'image not found'}
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
                <span>★ {spot.avgRating}</span>
              ) : (
                <span>★ New</span>
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
