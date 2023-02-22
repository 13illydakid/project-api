import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { getAllSpotsThunk } from '../../store/spots';
import Spot from '../Spot';
import './GetAllSpots.css';

export default function GetAllSpots() {
    const dispatch = useDispatch();
    // const history = useHistory();
    const spots = useSelector(state => state.spots.allSpots);

    // useEffect(() => {
    //     dispatch(getAllSpotsThunk())
    // }, [dispatch]);

    let spotsValues = Object.values(spots);
    if (spotsValues.length === 0) {
        return null;
    }
    // const array = Object.values(obj);
    // if (array.length === 0) {
    //     return null;
    // } else {

    // }
    return (
        <>
          <div className="outer">
            <div className="inner">
              {spotsValues.map((spot) => (
                <Spot key={spot.id} spot={spot} />
              ))}
            </div>
          </div>
        </>
      );
    }
