import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { getAllSpots, removeSpotThunk } from '../../store/spots';
import { useModal } from '../../context/Modal';
// import './RemoveSpot.css';

export default function RemoveSpot(spotId) {
    const dispatch = useDispatch();
    // const history = useHistory();
    // const { noModal } = useModal();
    // const thisSpot = spot.spot;
    const spot = useParams();
    // const [error, setError] = useState([]);
    // const revert = (i) => {
    //     i.preventDefault();
    //     noModal();
    // }
        const deletion = async()=> {
            const elem = await dispatch(removeSpotThunk(spotId));
            await dispatch(getAllSpots());
            if(elem){
                console.log("Removed.");
            }
        }
        // noModal();
        // history.pushState('/');
    if(!spot){
        return null;
    }

    return (
        <div style={{"display":"flex", "justifyContent":"space-between", "alignContent":"center", "gap":"40px"}}>
            <h3>{spot.name}</h3>
            <div style={{"display":"flex", "justifyContent":"space-between", "alignContent":"center"}}>
                <button><Link to={"/spots/:spotId/edit"}>Edit</Link></button>
                <button onClick={deletion}>Delete</button>
            </div>
        </div>
    )
}
