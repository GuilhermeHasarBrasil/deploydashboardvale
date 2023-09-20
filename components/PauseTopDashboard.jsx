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
    { value: 5 * 60000, label: "5 minutos" },
    { value: 10 * 60000, label: "10 minutos" },
    { value: 30 * 60000, label: "30 minutos" },
    { value: 60 * 60000, label: "1 hora" },
    { value: 120 * 60000, label: "2 horas" },
    { value: 240 * 60000, label: "4 horas" }
  ];
  const [selectedTempo, setSelectedTempo] = useState(30000);
  const [label, setLabel] = useState()

  const handleTempoChange = (event) => {
    const selectedOption = temposOptions.find(option => option.value === parseInt(event.target.value));
    setSelectedTempo(selectedOption.value);
    setLabel(selectedOption.label);
  };

  useEffect(() => {
    setTimePlay(selectedTempo)
  }, [selectedTempo])


  return (

    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }} >
      <text style={
        {
          fontSize: window.screen.width>1900? 25 : window.screen.width>1580? 22 : 18, fontWeight: 'bold',
          marginTop: window.screen.width > 1900 ? 200 : window.screen.width > 1580 ? 100 : 40,
          userSelect: 'none', marginLeft:30
        }
      }
      >
        Parâmetros de exibição de Dashboard:
      </text>
      <div style={
        {
          display: 'flex', marginTop: '3%',
          flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around',
          width: '60%', marginLeft: '20%', marginRight: '20%',
          borderWidth: window.screen.width>1900? 30 : window.screen.width>1580? 22 : 18,
          borderRadius: 20,
          borderColor: '#008F83',
          padding: window.screen.width>1900? 70 : window.screen.width>1580? 60 : 40
        }
      } >

        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} >
          <text style={
            {
              fontSize: window.screen.width > 1900 ? 25 : window.screen.width > 1580 ? 22 : 18,
              fontWeight: 'bold',
              marginRight: 20,
              userSelect: 'none'
            }
          }>
            Tipo de exibição
          </text>
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
          <text style={
            {
              fontSize: window.screen.width > 1900 ? 25 : window.screen.width > 1580 ? 22 : 18,
              fontWeight: 'bold',
              marginTop: 20,
              marginRight: 20,
              userSelect: 'none'
            }
          } >
            Tempo de transição
          </text>
          <select style={
            {
              marginTop: 20, borderRadius: 5, paddingLeft: 8,
              backgroundColor: '#008F83', color: 'white',
              width: window.screen.width > 1900 ? 280 : window.screen.width > 1580 ? 240 : 200,
              height: 50,
              fontSize: 21,
              fontWeight: 'bold'
            }
          } value={selectedTempo.value} onChange={handleTempoChange}>
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
