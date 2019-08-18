import React from 'react';
import {
  func,
  number,
  oneOfType,
  string,
} from 'prop-types';

import { numberField } from './NumberField.scss';

const NumberField = (props) => {
  return (
    <input
      type="number"
      className={numberField}
      value={props.value}
      name={props.name}
      max={props.max}
      min={props.min}
      step={props.step}
      onChange={props.onChange}
    />
  );
};

NumberField.propTypes = {
  value: oneOfType([string, number]),
  max: oneOfType([string, number]),
  min: oneOfType([string, number]),
  step: oneOfType([string, number]),
  name: string.isRequired,
  onChange: func.isRequired,
};

NumberField.defaultProps = {
  max: '100000',
  min: '0',
  step: '1',
};

export default React.memo(NumberField);
