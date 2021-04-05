import React, { useState, useContext } from 'react';

import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import './WeaponItem.css';

const WeaponItem = (props) => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    try {
      await sendRequest(
        `http://localhost:5000/api/weapons/${props.id}`,
        'DELETE',
        null,
        { Authorization: 'Bearer ' + auth.token }
      );
      props.onDelete(props.id);
    } catch (err) {}
  };

  // const downloadCodeFileHandler = async () => {
  //   try {
  //     await sendRequest(
  //       `http://localhost:5000/api/weapons/download/${props.creatorId}`,
  //       'GET',
  //       null,
  //       {},
  //       'text'
  //     );
  //   } catch (err) {}
  // };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="weapon-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </React.Fragment>
        }
      >
        <p>
          Do you want to proceed and delete this weapon? Please note that it
          can't be undone thereafter.
        </p>
      </Modal>
      <li className="weapon-item">
        <Card className="weapon-item__content" style={{ width: '40rem' }}>
          {isLoading && <LoadingSpinner asClearOverlay />}
          <div className="weapon-item__image">
            <img src={props.image} alt={props.name} />
          </div>
          <div className="weapon-item__info">
            <h2>{props.name}</h2>
            <p>{props.description}</p>
          </div>
          <div className="weapon-item__actions">
            <Button inverse to={`/${props.creatorId}/weapons/view/${props.id}`}>
              VIEW ATTRIBUTES
            </Button>
            <Button
              inverse
              href={`http://localhost:5000/api/weapons/download/${props.creatorId}`}
            >
              DOWNLOAD
            </Button>
            {auth.userId === props.creatorId && (
              <Button to={`/${props.creatorId}/weapons/${props.id}`}>
                EDIT
              </Button>
            )}
            {auth.userId === props.creatorId && (
              <Button danger onClick={showDeleteWarningHandler}>
                DELETE
              </Button>
            )}
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default WeaponItem;
