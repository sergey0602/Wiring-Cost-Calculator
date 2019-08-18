import React, { StrictMode } from 'react';
import { hot } from 'react-hot-loader/root';

import { Footer, Header, Section } from 'Components';

import db from './db';
import currencyContext from './context';

import { app, divider } from './App.scss';

const App = () => {
  const [values, setValues] = React.useState(db);
  const [total, setTotal] = React.useState(0);

  const calculateTotal = (allValues) => {
    let localTotal = 0;

    allValues.forEach((value) => {
      const quantity = parseFloat(value.quantity);
      if (quantity) {
        const cost = parseFloat(value.cost || 0);
        localTotal += cost * quantity;
      }
    });

    setTotal(localTotal);
  };

  React.useEffect(() => { calculateTotal(values); }, [values]);

  const handleField = (event, mutableProperty) => {
    const { target } = event;

    return values.map((value) => {
      if (value.typeOfWork === target.name) {
        return { ...value, [mutableProperty]: target.value };
      }

      return value;
    });
  };

  const handleQuantity = (event) => {
    const newState = handleField(event, 'quantity');
    setValues(newState);
  };

  const handleCost = (event) => {
    const newState = handleField(event, 'cost');
    setValues(newState);
  };

  return (
    <StrictMode>
      <currencyContext.Provider value="грн.">
        <div className={app}>
          <Header />
          <Section handleQuantity={handleQuantity} handleCost={handleCost} data={values} />
          <div className={divider} />
          <Footer total={total} />
        </div>
      </currencyContext.Provider>
    </StrictMode>
  );
};

export default (process.env.NODE_ENV === 'development' ? hot(App) : App);
