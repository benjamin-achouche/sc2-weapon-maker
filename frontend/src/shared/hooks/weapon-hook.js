import { useCallback, useReducer } from 'react';
import weaponAttributes from '../../weapons/util/weaponAttributes';

const weaponReducer = (state, action) => {
  let addedPts = 0;
  switch (action.type) {
    case 'LEVEL_CHANGE':
      let availablePts = state.points;
      let lvlPtsCost;
      let validatedLevel = state.attributes[action.attrName];

      // Check if currentLevel < clickedLevel --------------------------------------------------------------------------------------
      if (state.attributes[action.attrName] < action.lvlVal) {
        for (
          let i = 1 + state.attributes[action.attrName];
          i <= action.lvlVal;
          i++
        ) {
          if (weaponAttributes[action.attrName].lvlPtsCost[i - 1] < 0) {
            lvlPtsCost = weaponAttributes[action.attrName].lvlPtsCost[i - 1];
          } else {
            lvlPtsCost = weaponAttributes[action.attrName].lvlPtsCost[i - 2];
          }
          if (availablePts >= Math.abs(lvlPtsCost)) {
            availablePts -= Math.abs(lvlPtsCost);
            validatedLevel = i;
          } else {
            break;
          }
        }
        return {
          attributes: {
            ...state.attributes,
            [action.attrName]: validatedLevel,
          },
          points: availablePts,
        };
      }
      // Check if currentLevel > clickedLevel --------------------------------------------------------------------------------------
      else if (
        state.attributes[action.attrName] > action.lvlVal &&
        state.attributes[action.attrName] !== 1
      ) {
        for (
          let i = state.attributes[action.attrName];
          i > action.lvlVal;
          i--
        ) {
          if (weaponAttributes[action.attrName].lvlPtsCost[i - 1] < 0) {
            lvlPtsCost = weaponAttributes[action.attrName].lvlPtsCost[i - 1];
          } else {
            lvlPtsCost = weaponAttributes[action.attrName].lvlPtsCost[i - 2];
          }
          availablePts += Math.abs(lvlPtsCost);
          validatedLevel = i - 1;
        }
        return {
          attributes: {
            ...state.attributes,
            [action.attrName]: validatedLevel,
          },
          points: availablePts,
        };
      }
      // Check if currentLevel === clickedLevel --------------------------------------------------------------------------------------
      else if (state.attributes[action.attrName] === action.lvlVal) {
        if (
          weaponAttributes[action.attrName].lvlPtsCost[action.lvlVal - 1] < 0
        ) {
          lvlPtsCost =
            weaponAttributes[action.attrName].lvlPtsCost[action.lvlVal - 1];
        } else {
          lvlPtsCost =
            weaponAttributes[action.attrName].lvlPtsCost[action.lvlVal - 2];
        }
        if (action.lvlVal - 1 >= 1) {
          availablePts += Math.abs(lvlPtsCost);
        }
        return {
          attributes: {
            ...state.attributes,
            [action.attrName]: action.lvlVal - 1 >= 1 ? action.lvlVal - 1 : 1,
          },
          points: availablePts,
        };
      }
      break;
    case 'RESET_SCCHARGESPEED_AND_HEALTHSC':
      addedPts = 0;
      if (state.attributes.SCType < 3) {
        return state;
      }

      const lessHealthSCLvUp_LEVEL = state.attributes.lessHealthSCLvUp; // 2
      const SCChargeSpeed_LEVEL = state.attributes.SCChargeSpeed; // 1

      for (let i = lessHealthSCLvUp_LEVEL; i > 1; i--) {
        addedPts -= weaponAttributes.lessHealthSCLvUp.lvlPtsCost[i - 1];
      }

      if (SCChargeSpeed_LEVEL > 3) {
        for (let i = SCChargeSpeed_LEVEL; i > 3; i--) {
          addedPts -= weaponAttributes.SCChargeSpeed.lvlPtsCost[i - 1];
        }
      }

      if (SCChargeSpeed_LEVEL < 3) {
        for (let i = SCChargeSpeed_LEVEL; i < 3; i++) {
          addedPts -= weaponAttributes.SCChargeSpeed.lvlPtsCost[i - 1];
        }
      }

      if (state.points + addedPts < 0) {
        let SCTypeLvl = state.attributes.SCType;
        let remainingPts = state.points + addedPts;
        for (let k = state.attributes.SCType; k > 2; k--) {
          SCTypeLvl--;
          remainingPts =
            remainingPts -
            weaponAttributes.SCType.lvlPtsCost[state.attributes.SCType - 1];
          if (remainingPts >= 0) {
            break;
          }
        }

        return {
          attributes: {
            ...state.attributes,
            lessHealthSCLvUp: 1,
            SCChargeSpeed: 3,
            SCType: SCTypeLvl === 2 && remainingPts < 0 ? 1 : SCTypeLvl,
          },
          points:
            SCTypeLvl === 2 && remainingPts < 0
              ? remainingPts + weaponAttributes.SCType.lvlPtsCost[0]
              : remainingPts,
        };
      }
      return {
        attributes: {
          ...state.attributes,
          lessHealthSCLvUp: 1,
          SCChargeSpeed: 3,
        },
        points: state.points + addedPts,
      };

    case 'RESET_ALWAYSSC':
      const SCType_LEVEL = state.attributes.SCType;
      if (SCType_LEVEL < 3) {
        return state;
      }
      addedPts = 0;

      for (let i = SCType_LEVEL; i > 1; i--) {
        addedPts -= weaponAttributes.SCType.lvlPtsCost[i - 1];
      }

      addedPts += weaponAttributes.SCType.lvlPtsCost[0];

      console.log(addedPts);
      return {
        attributes: {
          ...state.attributes,
          SCType: 1,
        },
        points: state.points + addedPts,
      };
    case 'SET_WEAPON_DATA':
      return {
        attributes: action.attributes,
        points: action.points,
      };
    default:
      return state;
  }
};

export const useWeapon = (initialAttributes, initialPoints) => {
  const [weaponState, dispatch] = useReducer(weaponReducer, {
    attributes: initialAttributes,
    points: initialPoints,
  });

  const setLevelHandler = useCallback((attributeName, levelValue) => {
    dispatch({
      type: 'LEVEL_CHANGE',
      attrName: attributeName,
      lvlVal: levelValue,
    });

    if (attributeName === 'SCType') {
      dispatch({
        type: 'RESET_SCCHARGESPEED_AND_HEALTHSC',
      });
    } else if (
      attributeName === 'lessHealthSCLvUp' ||
      attributeName === 'SCChargeSpeed'
    ) {
      dispatch({
        type: 'RESET_ALWAYSSC',
      });
    }
  }, []);

  const setWeaponData = useCallback((attributesData, points) => {
    dispatch({
      type: 'SET_WEAPON_DATA',
      attributes: attributesData,
      points: points,
    });
  }, []);

  return [weaponState, setLevelHandler, setWeaponData];
};
