import React, { useState, useEffect } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import Users from './users/pages/Users';
import NewWeapon from './weapons/pages/NewWeapon';
import UserWeapons from './weapons/pages/UserWeapons';
import ViewWeapon from './weapons/pages/ViewWeapon';
import UpdateWeapon from './weapons/pages/UpdateWeapon';
import Auth from './users/pages/Auth';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import { AuthContext } from './shared/context/auth-context';
import { useHttpClient } from './shared/hooks/http-hook';
import { useAuth } from './shared/hooks/auth-hook';

const App = () => {
  const { sendRequest } = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState();
  const {
    token,
    login,
    logout,
    userId,
    urlUserId,
    setTheUrlUserId,
    redirectToAuth,
    setRedirection,
  } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          'http://localhost:5000/api/users'
        );

        setLoadedUsers(responseData.users);
      } catch (err) {}
    };
    fetchUsers();
  }, [sendRequest, setLoadedUsers]);

  const deleteAccountHandler = (deletedUserId) => {
    setLoadedUsers((prevUsers) =>
      prevUsers.filter((user) => user.id !== deletedUserId)
    );
  };

  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/weapons" exact>
          <UserWeapons />
        </Route>
        <Route path="/weapons/new" exact>
          <NewWeapon />
        </Route>
        <Route path="/:userId/weapons/view/:weaponId">
          <ViewWeapon />
        </Route>
        <Route path="/:userId/weapons/:weaponId">
          <UpdateWeapon />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else if (!redirectToAuth) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/weapons" exact>
          <UserWeapons />
        </Route>
        <Route path="/:userId/weapons/view/:weaponId">
          <ViewWeapon />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        urlUserId: urlUserId,
        redirectToAuth: redirectToAuth,
        login: login,
        logout: logout,
        setTheUrlUserId: setTheUrlUserId,
        setRedirection: setRedirection,
      }}
    >
      <Router>
        <MainNavigation onDelete={deleteAccountHandler} />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
