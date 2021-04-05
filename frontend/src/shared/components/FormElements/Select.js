import React, { useReducer, useEffect } from 'react';

import { validate } from '../../util/validators';
import './Select.css';

const selectReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_SELECT':
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case 'TOUCH':
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
};

const Select = (props) => {
  const [selectState, dispatch] = useReducer(selectReducer, {
    value: props.initialValue || '',
    isTouched: false,
    isValid: props.initialValid || false,
  });

  const { id, onInput } = props;
  const { value, isValid } = selectState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const selectChangeHandler = (event) => {
    dispatch({
      type: 'CHANGE_SELECT',
      val: event.target.value,
      validators: props.validators,
    });
  };

  const selectTouchHandler = () => {
    dispatch({
      type: 'TOUCH',
    });
  };

  return (
    <div
      className={`select-control ${
        !selectState.isValid &&
        selectState.isTouched &&
        'select-control--invalid'
      }`}
    >
      <label htmlFor={props.htmlFor}>{props.label}</label>

      <select
        id={props.id}
        value={selectState.value}
        onChange={selectChangeHandler}
        onBlur={selectTouchHandler}
      >
        <option value=""></option>
        <option value="assassin">Assassin</option>
        <option value="astaroth">Astaroth</option>
        <option value="berserker">Berserker</option>
        <option value="cassandra">Cassandra</option>
        <option value="cervantes">Cervantes</option>
        <option value="charade">Charade</option>
        <option value="heihachi">Heihachi</option>
        <option value="inferno">Inferno</option>
        <option value="ivy">Ivy</option>
        <option value="kilik">Kilik</option>
        <option value="link">Link</option>
        <option value="lizardman">Lizardman</option>
        <option value="maxi">Maxi</option>
        <option value="mitsurugi">Mitsurugi</option>
        <option value="necrid">Necrid</option>
        <option value="nightmare">Nightmare</option>
        <option value="raphael">Raphael</option>
        <option value="seungmina">Seung Mina</option>
        <option value="siegfried">Siegfried</option>
        <option value="sophitia">Sophitia</option>
        <option value="spawn">Spawn</option>
        <option value="taki">Taki</option>
        <option value="talim">Talim</option>
        <option value="voldo">Voldo</option>
        <option value="xianghua">Xianghua</option>
        <option value="yoshimitsu">Yoshimitsu</option>
        <option value="yunsung">Yunsung</option>
      </select>
      {!selectState.isValid && selectState.isTouched && (
        <p>{props.errorText}</p>
      )}
    </div>
  );
};

export default Select;
