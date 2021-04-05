import React, { useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/util/validators';
import Modal from '../../shared/components/UIElements/Modal';
import Attribute from '../../shared/components/WeaponUIElements/Attribute';
import weaponAttributes from '../util/weaponAttributes';
import { useForm } from '../../shared/hooks/form-hook';
import { useWeapon } from '../../shared/hooks/weapon-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './WeaponForm.css';

const UpdateWeapon = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedWeapon, setLoadedWeapon] = useState('');
  const weaponId = useParams().weaponId;
  const history = useHistory();

  const [formState, inputHandler, setFormData] = useForm(
    {
      name: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const [showUpdateWeaponModal, setShowUpdateWeaponModal] = useState(false);

  const [weaponState, setLevelHandler, setWeaponData] = useWeapon(
    {
      attack: 4,
      defense: 4,
      speed: 3,
      selfGuardPiercing: 7,
      enemyGuardPiercing: 1,
      reach: 2,
      counters: 2,
      enemyDamageReflection: 1,
      lifeContinuous: 4,
      lifeHit: 4,
      lifeVampire: 1,
      lessHealthMoreAttack: 1,
      lessHealthMoreDefense: 1,
      lessHealthMoreSpeed: 1,
      lessHealthMoreLifeCont: 1,
      lessHealthSCLvUp: 1,
      SCAttack: 1,
      SCDefense: 1,
      SCSpeed: 3,
      SCEnemyGuardPiercing: 1,
      SCLifeContinuous: 3,
      SCChargeSpeed: 3,
      SCType: 2,
    },
    100
  );

  useEffect(() => {
    const fetchWeapon = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/weapons/${weaponId}`
        );
        setLoadedWeapon(responseData.weapon);
        setWeaponData(
          responseData.weapon.attributes,
          responseData.weapon.points
        );
        setFormData(
          {
            ...formState.inputs,
            name: {
              value: responseData.weapon.name,
              isValid: true,
            },
            description: {
              value: responseData.weapon.description,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {}
    };
    fetchWeapon();
  }, [sendRequest, weaponId, setWeaponData, setFormData]);

  const showUpdateWeaponModalHandler = () => {
    setShowUpdateWeaponModal(true);
  };

  const cancelUpdateWeaponHandler = () => {
    setShowUpdateWeaponModal(false);
  };

  const updateWeaponSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/weapons/${weaponId}`,
        'PATCH',
        JSON.stringify({
          name: formState.inputs.name.value,
          description: formState.inputs.description.value,
          attributes: weaponState.attributes,
          points: weaponState.points,
        }),
        {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.token,
        }
      );

      history.push(`/${auth.userId}/weapons`);
    } catch (err) {}
    setShowUpdateWeaponModal(false);
  };

  if (isLoading && !formState.isValid) {
    return (
      <div className="center">
        <LoadingSpinner asDarkOverlay big />
      </div>
    );
  }

  const attributes = [];
  let idCount = 0;
  let isSC = false;

  for (const attribute in weaponAttributes) {
    idCount++;
    if (idCount > 16) {
      isSC = true;
    }
    attributes.push({
      id: idCount,
      name: attribute,
      isSC: isSC,
    });
  }

  let weaponUpdate;

  if (typeof loadedWeapon !== 'string' && !error) {
    if (Object.keys(loadedWeapon).length > 0) {
      weaponUpdate = (
        <React.Fragment>
          <div className="new-weapon__points">
            {weaponState.points} /{' '}
            {weaponState.points > 100 ? weaponState.points : 100}
          </div>
          <div className="new-weapon">
            {attributes.map((attr) =>
              !attr.isSC ? (
                <Attribute
                  key={'Attribute ' + weaponAttributes[attr.name].name}
                  id={attr.id}
                  isSC={attr.isSC}
                  name={weaponAttributes[attr.name].name}
                  image={weaponAttributes[attr.name].image}
                  attributeValue={
                    weaponAttributes[attr.name].attributeValue[
                      weaponState.attributes[attr.name] - 1
                    ]
                  }
                  attrValues={weaponAttributes[attr.name].attributeValue}
                  currentLevel={weaponState.attributes[attr.name]}
                  levels={weaponAttributes[attr.name].levels}
                  tooltip={weaponAttributes[attr.name].tooltip}
                  lvlPtsCost={weaponAttributes[attr.name].lvlPtsCost}
                  onClick={setLevelHandler}
                  initialAttributes={weaponState.attributes[attr.name]}
                  initialPoints={weaponState.points}
                />
              ) : (
                <Attribute
                  key={'Attribute ' + weaponAttributes[attr.name].name}
                  id={attr.id}
                  isSC={attr.isSC}
                  name={weaponAttributes[attr.name].name}
                  image={weaponAttributes[attr.name].image}
                  attributeValue={
                    weaponAttributes[attr.name].attributeValue[
                      weaponState.attributes[attr.name] - 1
                    ]
                  }
                  attrValues={weaponAttributes[attr.name].attributeValue}
                  currentLevel={weaponState.attributes[attr.name]}
                  levels={weaponAttributes[attr.name].levels}
                  tooltip={weaponAttributes[attr.name].tooltip}
                  lvlPtsCost={weaponAttributes[attr.name].lvlPtsCost}
                  onClick={setLevelHandler}
                  initialAttributes={weaponState.attributes[attr.name]}
                  initialPoints={weaponState.points}
                />
              )
            )}
          </div>
        </React.Fragment>
      );
    }
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />

      <form onSubmit={updateWeaponSubmitHandler}>
        <Modal
          show={showUpdateWeaponModal}
          onCancel={cancelUpdateWeaponHandler}
          header="Please enter your weapon informations."
          footerClass="weapon-item__modal-actions"
          footer={
            <React.Fragment>
              {isLoading && (
                <div className="center">
                  <LoadingSpinner asDarkOverlay />
                </div>
              )}
              <Button type="button" inverse onClick={cancelUpdateWeaponHandler}>
                CANCEL
              </Button>
              <Button
                onClick={updateWeaponSubmitHandler}
                disabled={!formState.isValid}
              >
                UPDATE
              </Button>
            </React.Fragment>
          }
        >
          <Input
            id="name"
            element="input"
            type="text"
            label="Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid weapon name."
            onInput={inputHandler}
            initialValue={loadedWeapon.name}
            initialTouch={true}
            initialValid={true}
          />
          <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description (at least 5 characters)."
            onInput={inputHandler}
            initialValue={loadedWeapon.description}
            initialTouch={true}
            initialValid={true}
          />
        </Modal>
        <Button
          type="button"
          className="new-weapon__create-btn"
          style={{ left: '8rem' }}
          onClick={showUpdateWeaponModalHandler}
        >
          Update Weapon
        </Button>
        <Button to="./" className="new-weapon__create-btn">
          Back
        </Button>
      </form>

      {weaponUpdate}
    </React.Fragment>
  );
};

export default UpdateWeapon;
