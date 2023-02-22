import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpotReviewsThunk } from "../../store/reviews";
import './GetReviews.css';
import OpenModalButton from "../OpenModalButton";
import DeleteReview from "./DeleteReview";

export default function GetReviews({ spotId }) {
    const dispatch = useDispatch();

    const reviews = useSelector(state => state.reviews.spotReviews);

    const user = useSelector(state => state.session.user);

    useEffect(() => { dispatch(getSpotReviewsThunk(spotId)) }, [dispatch, spotId]);

    if (!Object.values(reviews).length || !user) return <li>Be the first to post a review!</li>;

    const array = Object.values(reviews)

    const dateFormat = (date) => {
        const dateArray = date.split('-');
        return (dateArray[0] + '-' + dateArray[1] + '-' + dateArray[2].slice(0, 2));
    }



    return (

        <>
            {array.length > 0 && array[0].User.firstName ? array.map(review =>
                <li key={review.id} className='outer'>
                    <h4>{review.User.firstName}</h4>
                    <div className="date">{dateFormat(review.createdAt)}</div>
                    <div className="text">{review.review}</div>
                    {user.id === review.userId ?
                        <OpenModalButton
                            buttonText="Delete"
                            modalComponent={<DeleteReview reviewId={review.id} spotId={spotId} />}
                        /> : <div></div>}
                </li>
            ) : (<li></li>)}
        </>

    )
}
