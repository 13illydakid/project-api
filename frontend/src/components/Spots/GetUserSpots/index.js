import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserSpotsThunk } from '../../../store/spots';
import Spot from './Spot'
import './GetUserSpots.css'

export default function GetUserSpots() {
  const dispatch = useDispatch();

  const spots = useSelector(state => state.spots.userSpots);

  useEffect(() => {dispatch(getUserSpotsThunk())}, [dispatch]);

  if (!Object.values(spots).length) {
    return null;
  }

  return (
    <section id='current-spots'>
      <div id='current-spot-tiles'>
        {Object.values(spots).map(spot => <Spot spot={spot} key={spot.id}/>)}
      </div>
    </section>
  )
};
