import React from 'react';
import { useHistory } from 'react-router-dom';
import './Pagenotfound.css';

export default function PageNotFound() {
  const history = useHistory();

  return (
    <div >
      <div className='pagenotfound' onClick={() => history.push('/')}>Status Code: 404. Return</div>
    </div>
  );
};
