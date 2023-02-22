import React, { useEffect } from 'react';
// import noImg from '../Images/noImg.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleSpotThunk } from '../../../store/spots';
import { getSpotReviewsThunk } from '../../../store/reviews';
import { resetSpot } from '../../../store/spots';
import SpotImages from '../Spot';
import { useParams } from 'react-router-dom';
import './GetSingleSpot.css';
import GetReviews from './GetReviews';
import OpenModalButton from '../../OpenModalButton';
import CreateReviews from '../../CreateReviews';

export default function GetSingleSpot() {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const spot = useSelector((state) => state.spots.singleSpot);
  const user = useSelector((state) => state.session.user);
  const reviews = useSelector((state) => state.reviews.SpotReviews);

  useEffect(() => {
    dispatch(getSingleSpotThunk(spotId));
    return () => dispatch(resetSpot())
  }, [dispatch, spotId]);

  useEffect(() => {
    dispatch(getSpotReviewsThunk(spotId))
  }, [dispatch, spotId]);

  if(!reviews){
    return null;
  }
  if(!spot){
    return null;
  }
  if(!spot.Owner){
    return null;
  }


  const spotReviewArr = Object.values(reviews);

  let counter = 0;
  for(let elem of spotReviewArr){
    counter += elem.stars;
  }
  let avgRating = (counter/spotReviewArr.length).toFixed(1);
  // let avgRating = Math.floor(counter/spotReviewArr.length);
  if(avgRating == 0){
    avgRating = 'New';
  }

  const price = Number.parseFloat(spot.price).toFixed(2);

  let existingData;
  if(user){
    existingData = spotReviewArr.filter((match)=> match.userId == user.id);
  }
  // let previewImages;
  // let displayImages = [];
  // if (spotImgArr) {
  //   for (let img of spotImgArr) {
  //     if (img.preview === true) {
  //       previewImages = img.url;
  //     } else {
  //       displayImages.push(img.url);
  //     }
  //   }
  // }

  // if (!spot.Owner) return null;
  if (!Object.values(spot).length) return null;


  return (
      <section id='tiles'>
        <div >{spot.name}</div>
        <div >Location: {spot.city}, {spot.state}, {spot.country}</div>
        <SpotImages images={spot.SpotImages}/>
        <div id='parent-container'>
          <div id='container'>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</div>
          <div id='description'>{spot.description}</div>
        </div>

        <div id='reserve-price-container'>
          <div id='price-inner'>
            <span id='cost'>${price} / night</span>
          </div>
          <div>
            <i className='fa-regular fa-star'></i><span>{}avgRating</span>
          </div>
          <div className='reserve-button'>
            <button className='to-reserve' type='button' onClick={()=> alert("Feature coming soon")}>
              Reserve
            </button>
          </div>
        </div>
        <div>
          <div><i className='fa-regular fa-star'></i>{avgRating === 'New' ? avgRating : avgRating + ' . ' + spotReviewArr.length + ' reviews'} </div>
          <div className='review-button'>
            {!existingData && user ? (<OpenModalButton
              buttonText="Please leave a review"
              modalComponent={<CreateReviews />} />
            ) : ''}
          </div>
          <ul className='existing'>
            <GetReviews spotId={spotId} />
          </ul>
        </div>
      </section>
  )















}






//   return (
//     <div className="singlespot-container">
//       <div>
//         <div>
//           <h1>{spot.name}</h1>
//         </div>

//         <div>
//           {spot.avgStarRating ? (
//             <span>{spot.avgStarRating}</span>
//           ) : (
//             <span> New</span>
//           )}
//           <span>{spot.numReviews} reviews</span>
//           <span>server </span>
//           <span className='spot-capitalize'>
//             {spot.city}, {spot.state}, {spot.country}
//           </span>
//         </div>
//       </div>
//       <div id="spot-img-container">
//         <img
//           id="preview-img"
//           alt={spot.name}
//           src={previewImages}
//           onError={(event) => {
//             event.target.src = `${noImg}`;
//             event.onerror = null;
//           }}
//         />
//         <div className="other-img-container">
//           {displayImages.length > 0 ? (
//             displayImages.map((url) => (
//               <img
//                 id={`spot-image-${url.id}`}
//                 className="other-image"
//                 alt={spot.name}
//                 src={url}
//                 key={url}
//                 onError={(event) => {
//                   event.target.src = `${noImg}`;
//                   event.onerror = null;
//                 }}
//               />
//             ))
//           ) : (
//             <>
//               <img className="other-image" alt={spot.name} src={noImg} />
//               <img className="other-image" alt={spot.name} src={noImg} />
//               <img className="other-image" alt={spot.name} src={noImg} />
//               <img className="other-image" alt={spot.name} src={noImg} />
//             </>
//           )}
//         </div>
//       </div>
//       <div className="spot-lower-title">
//         <h2 className="spot-name">
//           Entire home hosted by {spot.Owner.firstName} {spot.Owner.lastName}
//         </h2>
//       </div>
//       <div className="spot-description">
//         <p>
//           <i className="fa fa-quote-left fa-lg"></i> {spot.description}{' '}
//           <i className="fa fa-quote-right fa-lg"></i>
//         </p>
//       </div>

//       <div className="breaker"></div>
//       {currentUser && (
//         <div className="review-button">
//           <OpenModalButton
//             buttonText="Leave a Review"
//             modalComponent={<CreateReviews spotId={spotId} />}
//           />
//         </div>
//       )}

//       <h2 className="review-stats-middle">
//         <span>
//           {spot.avgStarRating ? (
//             <span className="bold">★ {spot.avgStarRating} · </span>
//           ) : (
//             <span className="bold">★ New · </span>
//           )}
//         </span>
//         <span>{spot.numReviews} reviews</span>
//       </h2>
//       <div className="one-spot-reviews-container">
//         <SpotReviews spotId={spotId} />
//       </div>
//       <div className="breaker"></div>
//     </div>
//   );
// }
