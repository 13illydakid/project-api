import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
// import DemoUser from '../DemoUser';
import './Navigation.css';
export default function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const title = useSelector(state => state.title);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <li>
        <NavLink to='/spots/new'><button id='create-spot-button'>Create a Spot</button></NavLink>
        <ProfileButton user={sessionUser} />
      </li>
    );
  } else {
    sessionLinks = (
      <li>
        <OpenModalButton
          buttonText="Log In"
          modalComponent={<LoginFormModal />}
        />
        <OpenModalButton
          buttonText="Sign Up"
          modalComponent={<SignupFormModal />}
        />
      </li>
    );
  }

  return (
    <ul className='nav-bar'>
      <li>
        <NavLink exact to="/" id='home-path'>
          <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/5aade74c-2644-426a-bcd6-499fe50419b4/de71o77-489fdee4-b076-41b2-9bad-c9717acabe0c.jpg/v1/fill/w_1000,h_800,q_70,strp/brand_of_sacrifice_by_mhenvyart_de71o77-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTc3MiIsInBhdGgiOiJcL2ZcLzVhYWRlNzRjLTI2NDQtNDI2YS1iY2Q2LTQ5OWZlNTA0MTliNFwvZGU3MW83Ny00ODlmZGVlNC1iMDc2LTQxYjItOWJhZC1jOTcxN2FjYWJlMGMuanBnIiwid2lkdGgiOiI8PTIyMTUifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.27kxGWOG4uT33vBtgHSNiIYSNDaW2gm4gtrWRcW6-qk" alt='logo' id='nav-bar-logo'></img>
          <div id='name'>elleBnB</div>
        </NavLink>
      </li>
      {isLoaded && sessionLinks}
    </ul>
  );
}
