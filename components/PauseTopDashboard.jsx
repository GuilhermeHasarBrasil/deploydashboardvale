import React from 'react';
import {usePauseContext} from '../contexts/PauseContext'
import { IonButton } from '@ionic/react';

const PauseButton = () => {
  const { isPaused, togglePause } = usePauseContext();

  return (
    <IonButton onClick={togglePause}>
      {isPaused ? 'Despausar' : 'Pausar'}
    </IonButton>
  );
};

export default PauseButton;
