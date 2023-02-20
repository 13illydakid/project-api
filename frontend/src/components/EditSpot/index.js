import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { editSpotThunk, getSingleSpotThunk } from '../../store/spots';
import { useModal } from '../../context/Modal';

export default function EditSpot(spotId) {
  // const user = useSelector(state => state.session.user)
  const spot = useSelector((state) => state.spots.singleSpot)
  const dispatch = useDispatch();
  // if (!user) {
  //   history.push('/');
  // }
  const history = useHistory();
  const { noModal } = useModal();
  // spot = spot.spot;
  // const { spotId } = useParams();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    dispatch(getSingleSpotThunk(spotId))
  }, [dispatch, spotId])

  useEffect(() => {
    if (Object.values(spot).length) {
      setAddress(spot.address)
      setCity(spot.city)
      setState(spot.state)
      setCountry(spot.country)
      setLat(spot.lat);
      setLng(spot.lng);
      setName(spot.name)
      setDescription(spot.description)
      setPrice(spot.price)
    }
  }, [spot])

  const submitNow = (e) => {
    e.preventDefault();

    const data = {
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
    // const spotId = spot.id;
    dispatch(editSpotThunk(data, spotId))
      .then(() => noModal())
      .then(() => history.push(`/spots/${spotId}`))
      .catch(async (res) => {
        if (res === undefined) return null;
        const message = await res.json();
        if (message && message.errors) setErrors(message.errors)
        else {
          // noModal();
        }
      });
  }



    const handleCancelClick = (e) => {
      e.preventDefault();
      noModal()
      history.push(`/spots/current`);
    };

  return (
    <div>
      <form onSubmit={submitNow}>
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
