import { Link } from "react-router-dom";
import './Spot.css';

export default function Spot({ spot }) {
  // const calculator = (obj, key, i) => {
  //   return Number.parseFloat(obj[key]).toFixed(i);
  // }
  // let avgRating = calculator(spot, avgRating, 1);
  let avgRating = Number.parseFloat(spot.avgRating).toFixed(1);
  if (avgRating === 0) {
    avgRating = "New";
  }
  // const price = calculator(spot, price, 2);
  const price = Number.parseFloat(spot.price).toFixed(2);

  return (
    <Link className="tile" key={spot.id} to={`spots/${spot.id}`}>
      <div className="thumbnail-container">

        <img className="thumbnail" src={spot.previewImage} alt={spot.name}>Preview</img>
      </div>

      <div className="outer">
        <div className="outer-child-one">
          <div className="spot-name"> {spot.name} </div>
          <div className="spot-stars"><i className="fa-regular fa-star"></i> {avgRating} </div>

        </div>
        <div className="child-spot-price"> ${price} / night </div>
      </div>
    </Link>
  )
}
// let num = 4984623;
// console.log(num.toFixed(3));
