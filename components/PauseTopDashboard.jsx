import React, { useState, useEffect } from 'react';
import { usePauseContext } from '../contexts/PauseContext';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

const PauseButton = () => {
  const { isPaused, togglePause, timePlay, setTimePlay } = usePauseContext();

  const handlePauseCheckboxChange = () => {
    togglePause();
  };

  const handleUnpauseCheckboxChange = () => {
    togglePause();
  };

  const temposOptions = [
    { value: 30000, label: "30 segundos" },
    { value: 60000, label: "1 minuto" },
    { value: 5*60000, label: "5 minutos" },
    { value: 10*60000, label: "10 minutos" },
    { value: 30*60000, label: "30 minutos" },
    { value: 60*60000, label: "1 hora" },
    { value: 120*60000, label: "2 horas" },
    { value: 240*60000, label: "4 horas" }
  ];
  const [selectedTempo, setSelectedTempo] = useState(30000);
  const [label, setLabel] = useState()

  const handleTempoChange = (event) => {
    const selectedOption = temposOptions.find(option => option.value === parseInt(event.target.value));
    setSelectedTempo(selectedOption.value);
    setLabel(selectedOption.label);
  };

  useEffect(()=>{
    setTimePlay(selectedTempo)
  },[selectedTempo])


  return (

    <div style={{display:'flex', flexDirection:'column', alignItems:'center'}} >
      <text style={{ fontSize: 25, fontWeight: 'bold', marginTop: 200, userSelect:'none' }}>Parâmetros de exibição de Dashboard:</text>
      <div style={{ display: 'flex', marginTop: '4%', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around', width: '70%', marginLeft: '15%', marginRight: '15%', borderWidth: 30, borderRadius: 20, borderColor: '#074f92', padding: 90 }} >

        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} >
          <text style={{ fontSize: 25, fontWeight: 'bold', marginRight: 20, userSelect:'none' }}>Tipo de exibição</text>
          <div>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isPaused}
                  onChange={handlePauseCheckboxChange}
                  color="primary"
                />
              }
              label="Fixa"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={!isPaused}
                  onChange={handleUnpauseCheckboxChange}
                  color="primary"
                />
              }
              label="Dinâmica"
            />
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <text style={{ fontSize: 25, fontWeight: 'bold', marginTop: 20, marginRight: 20, userSelect:'none' }} >Tempo de transição</text>
          <select style={{ marginTop: 20, borderRadius: 5, paddingLeft: 8, backgroundColor: '#074f92', color: 'white', width: 280, height: 50, fontSize: 21, fontWeight: 'bold' }} value={selectedTempo.value} onChange={handleTempoChange}>
            {temposOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      </div>
    </div>

    

  );
};

export default PauseButton;
