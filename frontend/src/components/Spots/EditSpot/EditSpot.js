// import { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { useHistory } from 'react-router-dom';
// import { editSpotThunk, getSingleSpotThunk } from '../../../store/spots';
// import { useModal } from '../../../context/Modal';
// import '.EditSpot.css';

// export default function EditSingleSpotForm(spot){
//     const dispatch = useDispatch();
//     const history = useHistory();
//     const { noModal } = useModal();
//     const thisSpot = spot.spot;
//     const [ address, setAddress ] = useState(thisSpot.address);
//     const [ city, setCity ] = useState(thisSpot.city);
//     const [ state, setState ] = useState(thisSpot.state);
//     const [ country, setCountry ] = useState(thisSpot.country);
//     const [ lat, setLat ] = useState(thisSpot.lat);
//     const [ lng, setLng ] = useState(thisSpot.lng);
//     const [ name, setName ] = useState(thisSpot.name);
//     const [ description, setDescription ] = useState(thisSpot.description);
//     const [ price, setPrice ] = useState(thisSpot.price);
//     const [ error, setError ] = useState([]);
// }
