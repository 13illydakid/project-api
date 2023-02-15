import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createSpotThunk } from '../../../store/spots';
import { useModal } from '../../../context/Modal';
import '.CreateSpot.css';

export default function CreateSpotForm(){
    const dispatch = useDispatch();
    const history = useHistory();
    const { noModal } = useModal();
    const [ address, setAddress ] = useState("");
    const [ city, setCity ] = useState("");
    const [ state, setState ] = useState("");
    const [ country, setCountry ] = useState("");
    // const [ lat, setLat ] = useState(thisSpot.lat);
    // const [ lng, setLng ] = useState(thisSpot.lng);
    const [ name, setName ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ price, setPrice ] = useState("");
    const [ error, setError ] = useState([]);
    const [ preview, setPreview ] = useState(true);
}
