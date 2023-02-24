// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";
// import { getAllSpotsThunk } from "../../../store/spots";
// import Spot from '../Spot';
// import './GetAllSpots.css';

// export default function GetAllSpots() {
//   const dispatch = useDispatch();
//   const spots = useSelector((state)=> state.spots.allSpots);
//   useEffect(()=> {
//     dispatch(getAllSpotsThunk())
//   }, [dispatch]);

//   if(!Object.values(spots).length === 0){
//     return null;
//   }

//   const spotsObj = Object.values(spots);

//   return (
//     <section id="landing-page">
//       <div id="each-spot">{ spotsObj.map((spot)=> <Spot spot={spot} />) }</div>
//     </section>
//   )
// }










































// // import { useEffect } from 'react';
// // import { useDispatch, useSelector } from 'react-redux';
// // // import { getAllSpotsThunk } from '../../store/spots';
// // import Spot from '../Spot';
// // import './GetAllSpots.css';

// // export default function GetAllSpots() {
// //     const dispatch = useDispatch();
// //     // const history = useHistory();
// //     const spots = useSelector(state => state.spots.allSpots);

// //     // useEffect(() => {
// //     //     dispatch(getAllSpotsThunk())
// //     // }, [dispatch]);

// //     let spotsValues = Object.values(spots);
// //     if (spotsValues.length === 0) {
// //         return null;
// //     }
// //     // const array = Object.values(obj);
// //     // if (array.length === 0) {
// //     //     return null;
// //     // } else {

// //     // }
// //     return (
// //         <>
// //           <div className="outer">
// //             <div className="inner">
// //               {spotsValues.map((spot) => (
// //                 <Spot key={spot.id} spot={spot} />
// //               ))}
// //             </div>
// //           </div>
// //         </>
// //       );
// //     }


import { useParams, Redirect, Route, Switch } from "react-router-dom";
import { getSpots } from "../../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import GetSingleSpot from "../GetSingleSpot";

const GetAllSpots = () => {
  const dispatch = useDispatch();
  const spots = useSelector(state => state.spots.allSpots);
  useEffect(()=>{
    dispatch(getSpots())
  }, [dispatch]);

  return (
    <div>
      <h1>Spots Selection</h1>
      <div className="spots-list">
        {Object.values(spots).map(({ id, spot}) => (
          <li key={id}><NavLink to={`/spots/${id}`}>{spot}</NavLink> </li>
        ))}
      </div>

      <Switch>
        <Route path='/spots/:id'>
          <GetSingleSpot spots={spots} />
        </Route>
      </Switch>
    </div>
  )
}

export default GetAllSpots;
