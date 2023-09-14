import React from 'react';
import {usePauseContext} from '../contexts/PauseContext'

const PauseButton = () => {
  const { isPaused, togglePause } = usePauseContext();

  return (
    <button onClick={togglePause}>
      {isPaused ? 'Despausar' : 'Pausar'}
    </button>
  );
};

export default PauseButton;
