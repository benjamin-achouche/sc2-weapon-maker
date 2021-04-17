import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';

import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import WeaponsList from '../components/WeaponsList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './WeaponForm.css';

const UserWeapons = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedUserWeapons, setLoadedUserWeapons] = useState(['']);
  const [loadedUser, setLoadedUser] = useState();

  const userId = useParams().userId;

  auth.setTheUrlUserId(userId);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users`
        );
        setLoadedUser(responseData.users.find((user) => user.id === userId));
      } catch (err) {}
    };
    fetchUser();

    const fetchUserWeapons = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/weapons/user/${userId}`
        );
        setLoadedUserWeapons(responseData.userWeapons);
      } catch (err) {}
    };
    fetchUserWeapons();
  }, [sendRequest, userId]);

  const weaponDeleteHandler = (deletedWeaponId) => {
    setLoadedUserWeapons((prevWeapons) =>
      prevWeapons.filter((weapon) => weapon.id !== deletedWeaponId)
    );
  };

  let weaponsList;

  if (typeof loadedUserWeapons[0] !== 'string') {
    if (loadedUserWeapons.length > 0) {
      weaponsList = (
        <WeaponsList
          items={loadedUserWeapons}
          onDeleteWeapon={weaponDeleteHandler}
          userId={userId}
        />
      );
    } else {
      if (userId === auth.userId) {
        weaponsList = (
          <div className="weapons-list center">
            <Card>
              <h2>No weapons found. Maybe create one ?</h2>
              <Button to="/weapons/new">Create New Weapon</Button>
            </Card>
          </div>
        );
      } else {
        weaponsList = (
          <div className="center">
            <Card>
              <h2>This user didn't create any weapon yet.</h2>
            </Card>
          </div>
        );
      }
    }
  }
  return (
    <React.Fragment>
      {!loadedUser && <ErrorModal error={error} onClear={clearError} />}
      {isLoading && (
        <div className="center">
          <LoadingSpinner asDarkOverlay big />
        </div>
      )}
      <Button to="/" className="new-weapon__create-btn">
        Back
      </Button>
      {weaponsList}
    </React.Fragment>
  );
};

export default UserWeapons;
