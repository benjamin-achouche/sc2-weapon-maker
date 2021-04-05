import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import Attribute from '../../shared/components/WeaponUIElements/Attribute';
import weaponAttributes from '../util/weaponAttributes';
import { useWeapon } from '../../shared/hooks/weapon-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';

import './WeaponForm.css';

const ViewWeapon = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedWeapon, setLoadedWeapon] = useState('');
  const weaponId = useParams().weaponId;

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
      } catch (err) {}
    };
    fetchWeapon();
  }, [sendRequest, weaponId, setWeaponData]);

  if (isLoading) {
    return (
      <React.Fragment>
        <Button to="../" className="new-weapon__create-btn">
          Back
        </Button>
        <div className="center">
          <LoadingSpinner asDarkOverlay big />
        </div>
      </React.Fragment>
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

  let weaponView;

  if (typeof loadedWeapon !== 'string' && !error) {
    if (Object.keys(loadedWeapon).length > 0) {
      weaponView = (
        <React.Fragment>
          <div className="new-weapon__points"></div>
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
                  viewOnly={true}
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
                  viewOnly={true}
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
      <Button to="../" className="new-weapon__create-btn">
        Back
      </Button>
      {weaponView}
    </React.Fragment>
  );
};

export default ViewWeapon;
