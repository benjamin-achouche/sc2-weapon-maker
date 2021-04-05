import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import MainHeader from './MainHeader';
import NavLinks from './NavLinks';
import SideDrawer from './SideDrawer';
import Button from '../FormElements/Button';
import Backdrop from '../UIElements/Backdrop';
import Modal from '../UIElements/Modal';
import ErrorModal from '../UIElements/ErrorModal';
import LoadingSpinner from '../UIElements/LoadingSpinner';
import { AuthContext } from '../../context/auth-context';
import { useHttpClient } from '../../hooks/http-hook';
import './MainNavigation.css';

const MainNavigation = (props) => {
  const auth = useContext(AuthContext);
  const { error, sendRequest, clearError } = useHttpClient();
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const [showConfirmDeletionModal, setShowConfirmDeletionModal] = useState(
    false
  );
  const [isDeleting, setIsDeleting] = useState(false);

  const openDrawerHandler = () => setDrawerIsOpen(true);

  const closeDrawerHandler = () => setDrawerIsOpen(false);

  const showDeleteAccountWarningHandler = () => {
    setShowConfirmDeletionModal(true);
  };

  const cancelDeleteAccountHandler = () => {
    setShowConfirmDeletionModal(false);
  };

  const confirmDeleteAccountHandler = async (event) => {
    event.preventDefault();
    try {
      setIsDeleting(true);
      auth.setRedirection(auth.userId, auth.urlUserId);
      const responseData = await sendRequest('http://localhost:5000/api/users');

      const loadedUser = responseData.users.find(
        (user) => user.id === auth.userId
      );
      const loadedUserWeapons = loadedUser.weapons;

      for (const weaponId of loadedUserWeapons) {
        await sendRequest(
          `http://localhost:5000/api/weapons/${weaponId}`,
          'DELETE',
          null,
          { Authorization: 'Bearer ' + auth.token }
        );
      }

      await sendRequest(
        `http://localhost:5000/api/users/${auth.userId}`,
        'DELETE',
        null,
        { Authorization: 'Bearer ' + auth.token }
      );
      auth.logout();
      props.onDelete(auth.userId);
      setIsDeleting(false);
      setShowConfirmDeletionModal(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showConfirmDeletionModal}
        onCancel={cancelDeleteAccountHandler}
        header="Are you sure?"
        footerClass="weapon-item__modal-actions"
        footer={
          <React.Fragment>
            {isDeleting && (
              <div className="center">
                <LoadingSpinner asDarkOverlay />
              </div>
            )}
            <Button inverse onClick={cancelDeleteAccountHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteAccountHandler}>
              DELETE
            </Button>
          </React.Fragment>
        }
      >
        <p>
          Are you sure you want to delete your account? All your weapons will
          also be deleted!
        </p>
      </Modal>
      {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}

      <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
        <nav className="main-navigation__drawer-nav">
          <NavLinks />
        </nav>
      </SideDrawer>

      <MainHeader>
        <button
          className="main-navigation__menu-btn"
          onClick={openDrawerHandler}
        >
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-navigation__title">
          <Link to="/">SC2WeaponMaker</Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <NavLinks
            showDeleteAccountWarning={showDeleteAccountWarningHandler}
          />
        </nav>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;
