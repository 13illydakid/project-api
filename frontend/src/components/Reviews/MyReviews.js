import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeReviewThunk } from '../../store/reviews';
import { useSelector } from 'react-redux';

export default function MyReviews({ reviewId, review }) {
  const dispatch = useDispatch();
  const history = useHistory();
    // const review = useSelector((state)=>state.spot.user);
  const deleteReviewHandleClick = async () => {
    await dispatch(removeReviewThunk(reviewId));
  };

  return (
    <>
      <div className="review-wrapper">
        <div className="review-header">
          Review For{' '}
          <Link
            style={{ textDecoration: 'none' }}
            to={`/spots/${review.Spot.id}`}
          >
            {review.Spot.name}
          </Link>
          {''}:
        </div>

        <div>
          <p className="review-date">
            {new Date(review.createdAt).toString().slice(3, -42)}
          </p>
          <div>
            {[...Array(review.stars)].map((star) => (
              <i className="fa-solid fa-star"></i>
            ))}
          </div>

          <div className="user-review-text">
            <i className="fa fa-light fa-fire" aria-hidden="true"></i>
            <span> </span>
            <span>{review.review}</span>
            <span> </span>
            <i className="fa fa-light fa-fire" aria-hidden="true"></i>
          </div>
        </div>

        <div>
          <button
            className="review-delete-button"
            onClick={deleteReviewHandleClick}
          >
            Delete Review
          </button>
        </div>
        <div className="breaker"></div>
        <div>
          {review.ReviewImages.length > 0 && (
            <div>
              <p>Image For This Spot :</p>
              <div>
                {review.ReviewImages.map((ele) => {
                  return (
                    <div>
                      <img src={ele.url} />
                    </div>
                  );
                })}
              </div>
              {/* <div className="breaker"></div> */}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
