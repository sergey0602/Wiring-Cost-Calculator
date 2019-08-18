import React from 'react';
import { string } from 'prop-types';

import { header } from './Header.scss';

const Header = (props) => {
  return (
    <header className={header}>
      {props.caption}
    </header>
  );
};

Header.propTypes = {
  caption: string,
};

Header.defaultProps = {
  caption: 'Расчёт стоимости электропроводки',
};

export default React.memo(Header);
