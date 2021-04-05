import React from 'react';

import ButtonItem from './ButtonItem';
import './ButtonsList.css';

const ButtonsList = (props) => {
  const buttons = [];

  for (let i = 1; i <= props.levelCount; i++) {
    if (i === props.levelCount) {
      buttons.push({
        levelId: i,
        red: 0,
        green: 255,
        blue: 0,
      });
      break;
    }
    buttons.push({
      levelId: i,
      red: 1.8 * (255 - (255 / props.levelCount) * (i - 1)),
      green: 1.8 * (0 + (255 / props.levelCount) * (i - 1)),
      blue: 0,
    });
  }

  return (
    <ul className="buttons-list" style={{ width: `${1.5 * props.style}rem` }}>
      {buttons.map((button) => (
        <ButtonItem
          key={props.name + ' lv' + button.levelId}
          name={props.name}
          levelId={button.levelId}
          backgroundColor={
            button.levelId <= props.currentLevel
              ? `rgb(${button.red}, ${button.green}, ${button.blue})`
              : 'rgb(255,255,255)'
          }
          onClick={props.onClick}
          viewOnly={props.viewOnly}
        />
      ))}
    </ul>
  );
};

export default ButtonsList;
