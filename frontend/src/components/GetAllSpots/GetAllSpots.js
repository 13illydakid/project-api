import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSpotsThunk } from '../../store/spots';
//import Spots from './Spots';
import './GetAllSpots.css';
// import { useHistory } from 'react-router-dom';
export default function GetAllSpots() {
    const dispatch = useDispatch();
    // const history = useHistory();
    const obj = useSelector(state => state.spots.allSpots);

    useEffect(() => {
        dispatch(getAllSpotsThunk())
    }, [dispatch]);

    // const array = Object.values(obj);
    // if (array.length === 0) {
    //     return null;
    // } else {

    // }
    return (
        <div id='spots-outer'>
        <div id='spots-inner'>

        {obj && Object.values(obj).map(spot=>(
            <SpotTile key={spot.id} spot={spot} />
        ))}
        </div>
        </div>
    )
}
