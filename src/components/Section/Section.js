import React from 'react';
import { arrayOf, func, object } from 'prop-types';

import { NumberComponent, NumberField } from 'Components';

import { grid, gridHeader, gridFirstColumn } from './Section.scss';

const Section = (props) => {
  const parseData = (values = []) => {
    return values.map((item) => {
      return (
        <React.Fragment key={item.typeOfWork}>
          <NumberComponent
            label={item.typeOfWork}
            name={item.typeOfWork}
            value={item.cost}
            onChange={props.handleCost}
          />
          <div>{item.uom}</div>
          <NumberField
            value={item.quantity}
            name={item.typeOfWork}
            onChange={props.handleQuantity}
          />
        </React.Fragment>
      );
    });
  };

  return (
    <section className={grid}>
      <div className={`${gridHeader} ${gridFirstColumn}`}>Виды работ и стоимость в грн.</div>
      <div className={gridHeader}>Ед.изм.</div>
      <div className={gridHeader}>Количество</div>
      {parseData(props.data)}
    </section>
  );
};

Section.propTypes = {
  data: arrayOf(object),
  handleQuantity: func.isRequired,
  handleCost: func.isRequired,
};

Section.defaultProps = {
  data: [],
};

export default React.memo(Section);
