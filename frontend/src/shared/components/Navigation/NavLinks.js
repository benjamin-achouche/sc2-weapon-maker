import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../../context/auth-context';
import './NavLinks.css';

const NavLinks = (props) => {
  const auth = useContext(AuthContext);

  return (
    <ul className="nav-links">
      <li>
        <NavLink onClick={props.onClick} to="/" exact>
          ALL USERS
        </NavLink>
      </li>
      {auth.isLoggedIn && (
        <li>
          <NavLink onClick={props.onClick} to={`/${auth.userId}/weapons`}>
            MY WEAPONS
          </NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink onClick={props.onClick} to="/weapons/new">
            CREATE WEAPON
          </NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink onClick={props.onClick} to="/auth">
            AUTHENTICATE
          </NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <React.Fragment>
          <li>
            <button className="logout" onClick={auth.logout}>
              LOGOUT
            </button>
          </li>
          <li>
            <button
              className="delete-account"
              onClick={props.showDeleteAccountWarning}
            >
              DELETE ACCOUNT
            </button>
          </li>
        </React.Fragment>
      )}
    </ul>
  );
};

export default NavLinks;
