import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { createSpotThunk } from '../../store/spots';
import { useModal } from '../../context/Modal';
import './CreateSpot.css';

export default function CreateSpot() {
    const dispatch = useDispatch();
    const user = useSelector((state)=> state.session.User);
    if(!user){
        history.push('/');
    }
    const {spotId} = useParams();
    const history = useHistory();
    const { noModal } = useModal();
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [ lat, setLat ] = useState("");
    const [ lng, setLng ] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [error, setError] = useState([]);
    const [preview, setPreview] = useState(true);
    const [url, setUrl] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            address,
            city,
            state,
            country,
            name,
            description,
            price,
            url
        }
        const imageData = {
            url,
            preview
        }

        dispatch(createSpotThunk(data, imageData))
            .then((newSpot) => {
                history.push(`/spots/${newSpot.id}`)
            })
            .then(noModal)
            .catch(async (res) => {
                if (res === undefined) {
                    return null;
                }
                const elem = await res.json();
                if (elem) {
                    if (elem.error) {
                        setError(elem.error);
                    }
                }
            });
    }

    // jsx

    return (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <div>
                    <div className="title">Add a Spot</div>
                    <div className="errors">
                        {error.map((err, id) => <div key={id}>{err}</div>)}
                    </div>

                    // inputs **("add placeholders??")
                    <div className="inputs">
                        <label>Address</label>
                        <input
                            type="text"
                            value={address}
                            required
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                    <div className="inputs">
                        <label>City</label>
                        <input
                            type="text"
                            value={city}
                            required
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </div>
                    <div className="inputs">
                        <label>State</label>
                        <input
                            type="text"
                            value={state}
                            required
                            onChange={(e) => setState(e.target.value)}
                        />
                    </div>
                    <div className="inputs">
                        <label>Country</label>
                        <input
                            type="text"
                            value={country}
                            required
                            onChange={(e) => setCountry(e.target.value)}
                        />
                    </div>
                    <div className="inputs">
                        <label>Lat</label>
                        <input
                            type="text"
                            value={lat}
                            required
                            onChange={(e)=>setLat(e.target.value)}
                        />
                    </div>
                    <div className="inputs">
                        <label>Lng</label>
                        <input
                            type="text"
                            value={lng}
                            required
                            onChange={(e)=>setLng(e.target.value)}
                        />
                    </div>
                    <div className="inputs">
                        <label>Name</label>
                        <input
                            type="text"
                            value={name}
                            required
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="inputs">
                        <label>Description</label>
                        <input
                            type="text"
                            value={description}
                            required
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="inputs">
                        <label>Price</label>
                        <input
                            type="text"
                            value={price}
                            required
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                    <div className="inputs">
                        <label>URL</label>
                        <input
                            type="text"
                            value={url}
                            required
                            onChange={(e) => setUrl(e.target.value)}
                        />
                    </div>
                    <div className="inputs">
                        <label>Preview</label>
                        <select
                            // type="url"
                            // required
                            value={preview}
                            onChange={(e) => setPreview(e.target.value)}
                        >
                            <option key="false">false</option>
                            <option key="true">true</option>
                        </select>
                    </div>

                    // Submit Button
                    <div>
                        <button className="submit-button" type="submit">Create Spot</button>
                    </div>
                </div>

            </form>
        </div>
    )
}
