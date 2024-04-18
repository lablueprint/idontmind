import React, { createContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

const TrendsContext = createContext();

export function TrendsProvider({ children }) {
  const [sleepData, setSleepData] = useState([]);
  const [waterData, setWaterData] = useState([]);
  const [avgSleep, setAvgSleep] = useState(0);
  const [avgWater, setAvgWater] = useState(0);  

  const initData = (allData) => {
    console.log('initialize data');
  };

  const contextValue = useMemo(() => ({
    initData,
  }), [initData]);

  return (
    <TrendsContext.Provider value={contextValue}>
      {children}
    </TrendsContext.Provider>
  );
}

export default TrendsContext;

TrendsProvider.propTypes = {
  children: PropTypes.shape({
  }).isRequired,
};