/* eslint-disable no-console */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const DragContext = React.createContext();
const DragConsumer = DragContext.Consumer;

const DragProvider = ({ children }) => {
  const [data, setData] = useState("Anlık JSON Çıktısı / Realtime JSON Output");
  return (
    <DragContext.Provider value={{ data, setData }}>
      {children}
    </DragContext.Provider>
  );
};

DragProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { DragContext, DragConsumer, DragProvider };
