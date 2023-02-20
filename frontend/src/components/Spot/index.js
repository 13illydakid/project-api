import { Link } from 'react-router-dom';
import OpenModalButton from "../OpenModalButton";
import { useHistory } from "react-router-dom";
import RemoveSpot from "../RemoveSpot";
import './Spot.css'
import { useSelector } from 'react-redux'
export default function Spot({spot}){
    const path = window.location.href.split('/').pop()
    const history = useHistory()
    // const spot1 = useSelector(state=>state.allSpots[spot])
    return(
        <div className='spot-card'>
        <Link  key={spot.id} to={`/spots/${spot.id}`}>
            <img  className="spot-card-prev-image" src={spot.previewImage} alt={spot.name}/>
            <div  className='spot-preview-info'>
                <div>
                    <h4>{spot.name}</h4>
                    <h4>${spot.price} night</h4>
                </div>
                <span className='ratings-span'><i className="fa-sharp fa-solid fa-star"></i> {spot.avgRating>0?parseFloat(spot.avgRating).toFixed(1):'New'}</span>
            </div>
        </Link>
            {path==='current'?(
                <div className='delete-update-div'>
                    <button onClick={()=> history.push(`/spots/${spot.id}/edit`)}>Update</button>
                    <OpenModalButton
                    buttonText="Delete"
                    modalComponent={<RemoveSpot spotId={spot.id}/>}
                    />
                </div>
            ):(<></>)}
        </div>
    )
}
