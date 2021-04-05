import React from 'react';

import './ButtonItem.css';

const ButtonItem = (props) => {
  return (
    <li
      id={props.id}
      className="button-item"
      style={{ backgroundColor: props.backgroundColor }}
      onClick={() =>
        !props.viewOnly ? props.onClick(props.name, props.levelId) : null
      }
    ></li>
  );
};

export default ButtonItem;
