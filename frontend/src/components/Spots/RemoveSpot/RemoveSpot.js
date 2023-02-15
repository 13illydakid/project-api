import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { removeSpotThunk } from '../../..store/spots';
import { useModal } from '../../../context/Modal';
import './RemoveSpot.css';

export default function RemoveSpot(spot){
    const dispatch = useDispatch();
    const history = useHistory();
    const 
}
