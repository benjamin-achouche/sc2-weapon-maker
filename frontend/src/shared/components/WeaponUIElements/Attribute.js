import React from 'react';

import AttributeImage from './AttributeImage';
import AttributeValue from './AttributeValue';
import ButtonsList from './ButtonsList';
import './Attribute.css';

const Attribute = (props) => {
  const attrValueColor = [];

  const { currentLevel: curLvl, levels: maxLvl } = props;

  const createColorGradient = (enhancer, color1, color2, curLvl, maxLvl) => {
    return (
      enhancer * (color1 - ((color1 - color2) * (curLvl - 1)) / (maxLvl - 1))
    );
  };

  for (let i = 0; i < props.levels; i++) {
    attrValueColor.push({
      colorRed: createColorGradient(1.05, 204, 65, curLvl, maxLvl),
      colorGreen: createColorGradient(1.05, 50, 180, curLvl, maxLvl),
      colorBlue: createColorGradient(1.05, 16, 63, curLvl, maxLvl),
      backgrdColrRed: createColorGradient(1, 224, 179, curLvl, maxLvl),
      backgrdColrGreen: createColorGradient(1, 170, 229, curLvl, maxLvl),
      backgrdColrBlue: createColorGradient(1, 159, 178, curLvl, maxLvl),
    });
  }

  const styleColor = `rgb(${attrValueColor[curLvl - 1].colorRed},
                          ${attrValueColor[curLvl - 1].colorGreen},
                          ${attrValueColor[curLvl - 1].colorBlue})`;

  const styleBackgrdColor = `rgba(${attrValueColor[curLvl - 1].backgrdColrRed},
                                  ${
                                    attrValueColor[curLvl - 1].backgrdColrGreen
                                  },
                                  ${
                                    attrValueColor[curLvl - 1].backgrdColrBlue
                                  },1)`;

  const style = {
    color: styleColor,
    textShadow: `0 0 3px ${styleBackgrdColor},
                 0 0 5px ${styleBackgrdColor},
                 0 0 5px ${styleBackgrdColor},
                 0 0 8px ${styleBackgrdColor},
                 0 0 10px ${styleBackgrdColor}`,
  };

  return (
    <div className={`attribute ${props.isSC ? 'attribute__SC' : ''}`}>
      <AttributeImage
        image={props.image[curLvl - 1]}
        name={props.name}
        id={props.id}
        isSC={props.isSC}
        tooltip={props.tooltip}
        lvlPtsCost={props.lvlPtsCost}
        attrValues={props.attrValues}
        currentLevel={curLvl}
        viewOnly={props.viewOnly}
      />
      <AttributeValue style={style}>{props.attributeValue}</AttributeValue>
      <ButtonsList
        name={props.name}
        levelCount={props.levels}
        currentLevel={curLvl}
        style={props.levels}
        onClick={props.onClick}
        viewOnly={props.viewOnly}
      />
    </div>
  );
};

export default Attribute;
