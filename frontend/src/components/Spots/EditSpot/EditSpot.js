import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { editSpotThunk, getSingleSpotThunk } from '../../../store/spots';
import { useModal } from '../../../context/Modal';
import '.EditSpot.css';

export default function EditSingleSpotForm(spot){
    const dispatch = useDispatch();
    const history = useHistory();
    const { noModal } = useModal();
    const thisSpot = spot.spot;
    const [ address, setAddress ] = useState(thisSpot.address);
    const [ city, setCity ] = useState(thisSpot.city);
    const [ state, setState ] = useState(thisSpot.state);
    const [ country, setCountry ] = useState(thisSpot.country);
    const [ lat, setLat ] = useState(thisSpot.lat);
    const [ lng, setLng ] = useState(thisSpot.lng);
    const [ name, setName ] = useState(thisSpot.name);
    const [ description, setDescription ] = useState(thisSpot.description);
    const [ price, setPrice ] = useState(thisSpot.price);
    const [ errors, setErrors ] = useState([]);
}

const submitNow = (e) => {
    e.preventDefault();

    const spotInfo = {
      name,
      description,
      address,
      city,
      state,
      country,
      lat,
      lng,
      price,
    };

    dispatch(updateSingleSpot(spotInfo, +spotId))
      .then((res) => noModal())
      .then((res) => history.push(`/spots/${spotId}`))
      .catch(async (res) => {
        if (res === undefined) return null;
        const message = await res.json();
        if (message && message.errors) setErrors(message.errors)
        else{
            noModal();
        }
      });


  };

//   const handleCancelClick = (e) => {
//     e.preventDefault();
//     closeModal()
//     history.push(`/my-spots`);
//   };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="modalHead">Edit your spot</div>
        <div>
          <ul>
            {errors &&
              errors.map((error, id) => (
                <li style={{ color: 'red' }} key={id}>
                  {error}
                </li>
              ))}
          </ul>

          <div>
            <label className="form-label">
              Address
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </label>
          </div>

          <div>
            <label className="form-label">
              City
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </label>
          </div>

          <div>
            <label className="form-label">
              State
              <input
                type="text"
                required
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </label>
          </div>

          <div>
            <label className="form-label">
              Country
              <input
                type="text"
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </label>
          </div>

          <div>
            <label className="form-label">
              lat
              <input
                type="decimel"
                min="-90"
                max="90"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
              />
            </label>
          </div>

          <div>
            <label className="form-label">
              lng
              <input
                type="decimel"
                min="-190"
                max="190"
                value={lng}
                onChange={(e) => setLng(e.target.value)}
              />
            </label>
          </div>

          <div>
            <label className="form-label">
              Spot Name
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="createSpot-inputField"
              />
            </label>
          </div>

          <div className="inputContainer" id="middle-label">
            <label className="form-label">
              Description
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="createSpot-inputField"
              />
            </label>
          </div>

          <div>
            <label className="form-label">
              Price/Cost
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </label>
          </div>

          <div>
            <button type="submit" className="modal-submit-button">
              Update
            </button>

          </div>
        </div>
      </form>
    </div>
  );
};
