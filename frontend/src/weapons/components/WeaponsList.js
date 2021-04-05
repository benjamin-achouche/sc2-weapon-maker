import React from 'react';

import WeaponItem from './WeaponItem';
import './WeaponsList.css';

const WeaponsList = (props) => {
  return (
    <ul className="weapons-list">
      {props.items.map((weapon) => (
        <WeaponItem
          key={weapon.id}
          id={weapon.id}
          image={weapon.imageUrl}
          name={weapon.name}
          description={weapon.description}
          address={weapon.address}
          creatorId={weapon.creator}
          coordinates={weapon.location}
          onDelete={props.onDeleteWeapon}
        />
      ))}
    </ul>
  );
};

export default WeaponsList;
