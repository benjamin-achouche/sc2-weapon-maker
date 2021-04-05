import React from 'react';

import './AttributeValue.css';

const AttributeValue = (props) => {
  return (
    <h3 className="attribute-value" style={props.style}>
      {props.children}
    </h3>
  );
};

export default AttributeValue;
