import { useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleSpotThunk, removeSpotThunk } from '../../store/spots';
import EditSpot from '../EditSpot';
import { getUserSpotsThunk } from '../../store/spots';
import OpenModalButton from '../OpenModalButton';
import RemoveSpot from '../RemoveSpot';
import './GetUserSpots.css'

export default function GetUserSpots() {
    const dispatch = useDispatch();
    const history = useHistory();
    const spots = useSelector((state) => state.spots.userSpots);
    useEffect(() => {
        dispatch(getUserSpotsThunk())
    }, [dispatch]);

    let spotsValues = Object.values(spots);
    if(spotsValues.length === 0){
        return null;
    }

    return (
        <>
            <div className='all-spots'>
                <h1>Here are your Spots.</h1>
            </div>
            <div className='user-spots-container'>
                { spotsValues && Object.values(spots).map((spot)=> <li key={spot.name} className='user-spot'>
                    <p>
                        <img src={spot.previewImage} style={{width: 300, height: 270}}/>
                    </p>
                    <div className='spot-price'>
                        <p>{spot.price} / night</p>
                    </div>
                    <div className='use-edit-delete-rating'>
                        <span>{!spot.avgRating ? 'New':spot.avgRating}</span>
                    </div>
                    <div className='edit-buttons'>
                        <div className='user-edit'>
                            <OpenModalButton
                                buttonText={'Edit'}
                                modalComponent={<EditSpot spotId={spot.id} />}
                            />
                        </div>
                        <div className='user-delete'>
                            <OpenModalButton
                                buttonText={'Delete'}
                                modalComponent={<RemoveSpot spotId={spot.id} />}
                            />
                        </div>
                    </div>
                </li>)}
            </div>
        </>
    )
}
