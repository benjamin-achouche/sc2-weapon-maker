import React, { useState } from 'react';

import Tooltip from './Tooltip';
import '../../../weapons/components/WeaponItem.css';
import './AttributeImage.css';

const AttributeImage = (props) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const openTooltipHandler = () => setShowTooltip(true);

  const closeTooltipHandler = () => setShowTooltip(false);

  const styleEven = {
    maxHeight: `${(25 * props.lvlPtsCost.length) / 2}px`,
  };

  const styleOdd = {
    maxHeight: `${(29 * props.lvlPtsCost.length) / 2}px`,
  };

  const lvlTotalGain = [];
  const lvlTotalCost = [];
  let totalGain = 0;
  let totalCost = 0;

  for (let i = props.currentLevel - 1; i < props.lvlPtsCost.length - 1; i++) {
    if (props.lvlPtsCost[i] > 0) {
      totalCost -= props.lvlPtsCost[i];
      lvlTotalCost.push(totalCost);
    }
    if (props.lvlPtsCost[i] <= 0) {
      totalCost -= Math.abs(props.lvlPtsCost[i + 1]);
      lvlTotalCost.push(totalCost);
    }
  }

  for (let i = props.currentLevel - 1; i > 0; i--) {
    if (props.lvlPtsCost[i] < 0) {
      totalGain += Math.abs(props.lvlPtsCost[i]);
      lvlTotalGain.push(totalGain);
    } else if (props.lvlPtsCost[i] >= 0) {
      totalGain += props.lvlPtsCost[i - 1];
      lvlTotalGain.push(totalGain);
    }
  }
  lvlTotalGain.reverse();
  lvlTotalGain.push(0);

  const lvlTotalArray = lvlTotalGain.concat(lvlTotalCost);

  return (
    <div className="tooltip-container">
      <Tooltip
        show={showTooltip}
        id={props.id}
        className={props.isSC ? 'tooltip-SC' : 'tooltip'}
      >
        <h3 style={{ margin: '0.9rem 0' }}>{props.tooltip.name}</h3>
        <p className="tooltip-description">{props.tooltip.description}</p>
        {props.tooltip.note ? (
          <p className="tooltip-note">{props.tooltip.note}</p>
        ) : null}
        {!props.viewOnly ? (
          <ul
            className="tooltip-list"
            style={props.lvlPtsCost.length % 2 === 0 ? styleEven : styleOdd}
          >
            {lvlTotalArray.map((lvl, index) => (
              <li
                key={
                  'tooltip level ' +
                  index +
                  1 +
                  ' ' +
                  props.tooltip.name +
                  ' ' +
                  props.id
                }
              >
                <span
                  className={
                    props.currentLevel === index + 1 ? 'current-level' : null
                  }
                >
                  Level {index + 1}: {props.attrValues[index]}
                </span>{' '}
                <span className="tooltip-pts-cost">
                  {props.currentLevel === index + 1 ? null : '('}
                  <span
                    style={
                      lvl > 0
                        ? { color: 'rgb(0, 220, 0)' }
                        : lvl < 0
                        ? { color: 'rgb(255, 35, 35)' }
                        : null
                    }
                  >
                    {index === props.currentLevel - 1
                      ? null
                      : lvl > 0
                      ? `+${lvlTotalArray[index] + ' pts.'}`
                      : '' + lvlTotalArray[index] + ' pts.'}
                  </span>
                  {props.currentLevel === index + 1 ? null : ')'}
                </span>
              </li>
            ))}
          </ul>
        ) : null}
      </Tooltip>
      <img
        src={props.image}
        alt={props.name}
        className={`attribute-image ${props.isSC ? 'attribute-image__SC' : ''}`}
        onMouseEnter={openTooltipHandler}
        onMouseLeave={closeTooltipHandler}
      />
    </div>
  );
};

export default AttributeImage;
