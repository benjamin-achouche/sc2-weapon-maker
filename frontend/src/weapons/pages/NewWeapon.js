import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import weaponAttributes from '../util/weaponAttributes';

import charactersImages from '../../shared/util/charactersImages';
import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';
import Select from '../../shared/components/FormElements/Select';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/util/validators';
import Modal from '../../shared/components/UIElements/Modal';
import Attribute from '../../shared/components/WeaponUIElements/Attribute';
import { useForm } from '../../shared/hooks/form-hook';
import { useWeapon } from '../../shared/hooks/weapon-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './WeaponForm.css';

const NewWeapon = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      character: {
        value: '',
        isValid: false,
      },
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

  const [showCreateWeaponModal, setShowCreateWeaponModal] = useState(false);

  const [weaponState, setLevelHandler] = useWeapon(
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

  const history = useHistory();

  const showCreateWeaponModalHandler = () => {
    setShowCreateWeaponModal(true);
  };

  const cancelCreateWeaponHandler = () => {
    setShowCreateWeaponModal(false);
  };

  const weaponSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        'http://localhost:5000/api/weapons',
        'POST',
        JSON.stringify({
          character: formState.inputs.character.value,
          name: formState.inputs.name.value,
          description: formState.inputs.description.value,
          imageUrl: charactersImages[formState.inputs.character.value],
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
    setShowCreateWeaponModal(false);
  };

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

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form onSubmit={weaponSubmitHandler}>
        <Modal
          show={showCreateWeaponModal}
          onCancel={cancelCreateWeaponHandler}
          header="Please enter your weapon informations."
          footerClass="weapon-item__modal-actions"
          footer={
            <React.Fragment>
              {isLoading && (
                <div className="center">
                  <LoadingSpinner asDarkOverlay />
                </div>
              )}
              <Button type="button" inverse onClick={cancelCreateWeaponHandler}>
                CANCEL
              </Button>
              <Button
                onClick={weaponSubmitHandler}
                disabled={!formState.isValid}
              >
                CREATE
              </Button>
            </React.Fragment>
          }
        >
          <Select
            htmlFor="character-select"
            id="character"
            label="Select a character"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please select a character."
            onInput={inputHandler}
          />
          <Input
            id="name"
            element="input"
            type="text"
            label="Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid weapon name."
            onInput={inputHandler}
          />
          <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description (at least 5 characters)."
            onInput={inputHandler}
          />
        </Modal>
        <Button
          type="button"
          className="new-weapon__create-btn"
          onClick={showCreateWeaponModalHandler}
        >
          Create Weapon
        </Button>
      </form>
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
            />
          )
        )}
      </div>
    </React.Fragment>
  );
};

export default NewWeapon;
