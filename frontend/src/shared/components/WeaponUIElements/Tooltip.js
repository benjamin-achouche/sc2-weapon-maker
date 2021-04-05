import React from 'react';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';

import './Tooltip.css';

const StyledDivNoSC = styled.div`
  top: -${(props) => (props.id < 9 ? 0.615 * props.id * 40 : props.id < 17 ? 0.78 * ((props.id % 9) + 1) * 40 : 40)}%;
  left: 115%;

  @media (max-width: 1400px) {
    top: -${(props) => props.id * 40 * 0.403}%;
    left: 115%;
  }

  @media (max-width: 1100px) {
    top: 115%;
    left: -240%;
  }
`;

const StyledDivSC = styled.div`
  top: -${(props) => (props.id > 17 ? 1.27 * ((props.id % 17) + 1) * 40 : 40)}%;
  right: 100%;

  @media (max-width: 1100px) {
    top: ${(props) => (props.id === 23 ? -600 : 115)}%;
    left: -180%;
  }
`;

const Tooltip = (props) => {
  const renderedDiv =
    props.id > 16 ? (
      <StyledDivSC className={props.className} id={props.id}>
        {props.children}
      </StyledDivSC>
    ) : (
      <StyledDivNoSC className={props.className} id={props.id}>
        {props.children}
      </StyledDivNoSC>
    );

  return (
    <React.Fragment>
      <CSSTransition
        in={props.show}
        timeout={200}
        classNames="tooltip"
        mountOnEnter
        unmountOnExit
      >
        {renderedDiv}
      </CSSTransition>
    </React.Fragment>
  );
};

export default Tooltip;
