import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import elleBnB_Logo from '../Images/elleBnB_Logo.jpg';
import CreateSpot from '../CreateSpot';
import OpenModalButton from '../OpenModalButton';
import DemoUser from '../DemoUser';
import './Navigation.css';
export default function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <>
      <div className="wrapper">
        <div>
          <NavLink
            style={{ textDecoration: 'none' }}
            className="logo"
            exact
            to="/"
          >
            <div className="logowrapper">
              <img className="logo" src={elleBnB_Logo} style={{ height: '80px' }} />
              <span>FireBnb</span>
            </div>
          </NavLink>
        </div>

        {!sessionUser && (
          <div className="demo-user-main">
            <DemoUser />
          </div>
        )}
        {sessionUser && (
          <div className="create-spot-main">
            <OpenModalButton
              buttonText="Firebnb your home !"
              modalComponent={<CreateSpot />}
            />
          </div>
        )}
        {isLoaded && (
          <>
            <div className="profile-container">
              <ProfileButton user={sessionUser} />
            </div>
          </>
        )}
      </div>
      <div className="breaker"></div>
    </>
  );
}
