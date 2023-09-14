import React, { createContext, useContext, useState } from 'react';

const PauseContext = createContext();

export const usePauseContext = () => {
  return useContext(PauseContext);
};

export const PauseProvider = ({ children }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [timePlay, setTimePlay] = useState(30000);

  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  return (
    <PauseContext.Provider value={{ isPaused, togglePause, timePlay, setTimePlay }}>
      {children}
    </PauseContext.Provider>
  );
};
