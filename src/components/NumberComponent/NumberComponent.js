import React from 'react';
import {
  func,
  number,
  oneOfType,
  string,
} from 'prop-types';

import { NumberField } from 'Components';
import currencyContext from '../../context';

import { numberCmp, labelText, currency } from './NumberComponent.scss';

const NumberComponent = (props) => {
  const currencyType = React.useContext(currencyContext);
  const {
    label,
    max,
    min,
    step,
    onChange,
    value,
    name,
  } = props;

  return (
    <div className={numberCmp}>
      <span className={labelText}>{label}</span>
      <NumberField
        max={max}
        min={min}
        step={step}
        onChange={onChange}
        value={value}
        name={name}
      />
      <span className={currency}>{currencyType}</span>
    </div>
  );
};

NumberComponent.propTypes = {
  value: oneOfType([string, number]),
  max: oneOfType([string, number]),
  min: oneOfType([string, number]),
  step: oneOfType([string, number]),
  label: string.isRequired,
  name: string.isRequired,
  onChange: func.isRequired,
};

export default React.memo(NumberComponent);
