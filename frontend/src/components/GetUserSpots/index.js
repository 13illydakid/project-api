import { useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { getSingleSpotThunk, removeSpotThunk } from '../../store/spots';
import EditSpot from '../EditSpot';
import { getAllSpotsThunk, getUserSpotsThunk } from '../../store/spots';
import OpenModalButton from '../OpenModalButton';
import RemoveSpot from '../RemoveSpot';
import noImg from '../Images/noImg.jpg';
import './GetUserSpots.css'

export default function GetUserSpots() {
    const dispatch = useDispatch();
    const obj = useSelector((state) => {
        return state.spots.allSpots;
    });

    const spotsArray = Object.values(obj);
    const history = useHistory();
    const spots = useSelector((state) => state.spots.allSpots);
    const userId = useSelector((state) => state.session.user.id);
    const spotsArr = Object.values(spots).filter(
        (spot) => spot.ownerId === userId
    );

    const deleteSpotClickEvent = async (spotId) => {
        await dispatch(RemoveSpot(spotId));
        dispatch(getAllSpotsThunk());
        history.push('/current');
    };

    useEffect(() => {
        dispatch(getAllSpotsThunk());

    }, [dispatch]);

    if (!spots) return null;

    return (
        <>
            <div className='user-spot-title'>
                <h1>Here are all your Spots</h1>
            </div>
            <div className='user-spot-container'>
                {spotsArr.length > 0 ? (
                    spotsArr.map((spot) => {
                        return (
                            <div className="user-spot-outer" key={spot.id}>
                                <NavLink
                                    style={{ textDecoration: 'none', color: 'black' }}
                                    to={`/spots/${spot.id}`}
                                >
                                    <div className="user-img-div">
                                        <img
                                            id="spot-img"
                                            src={spot.previewImage}
                                            alt={spot.id}
                                            onError={(event) => {
                                                event.target.src = `${noImg}`;
                                                event.onerror = null;
                                            }}
                                        />
                                    </div>

                                    <div className="user-info-container">
                                        <div>
                                            <span className="allspot-location">
                                                {spot.city}
                                                {', '}
                                                {spot.state}
                                            </span>
                                            <div>
                                                <i
                                                    className="fa-sharp fa-solid fa-star"
                                                    style={{ color: 'black' }}
                                                ></i>{' '}
                                                <span>
                                                    {spot.avgRating === 'NaN' ? 'New' : spot.avgRating}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="allspot-country">{spot.country}</div>
                                        <div className="user-price-container">
                                            <div className="allspot-price">
                                                <span>{`$${spot.price}`}</span> night
                                            </div>
                                        </div>
                                    </div>
                                </NavLink>

                                <div className="user-editdelete">
                                    <div className="user-submit-button">
                                        <OpenModalButton
                                            buttonText="Edit"
                                            modalComponent={<EditSpot spotId={spot.id} />}
                                        />
                                    </div>
                                    <button
                                        className="user-submit-button"
                                        onClick={() => deleteSpotClickEvent(spot.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <d1 className='notHosting'>You're not hosting spots</d1>
                )}
            </div>
        </>
    );
}
