import React from 'react';
import { number } from 'prop-types';

import currencyContext from '../../context';

import { footer, total } from './Footer.scss';

const Footer = (props) => {
  const currencyType = React.useContext(currencyContext);

  return (
    <footer className={footer}>
      <span>Итого:</span>
      <span className={total}>{props.total}{' '}{currencyType}</span>
    </footer>
  );
};

Footer.propTypes = {
  total: number,
};

Footer.defaultProps = {
  total: 0,
};

export default React.memo(Footer);
