import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSpotsThunk } from '../../store/spots';
//import Spots from './Spots';
//import './Spots.css';
import { useHistory } from 'react-router-dom';
const GetAllSpots = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const obj = useSelector(state => state.spots);

    useEffect(() => {
        dispatch(getAllSpotsThunk())
    }, [])
}
const array = Object.values(obj);
if(array.length === 0){
    return null;
} else{
    
}
