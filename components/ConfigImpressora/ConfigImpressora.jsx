import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components'
import Alert from '@mui/material/Alert';
import { useBroswerPrint } from '../../contexts/BrowserPrintContext';

export default function PrinterSettings() {

  const { printer, BPrint } = useBroswerPrint();
  const [availableDevices, setAvailableDevices] = useState([])
  const [currentPrinter, setCurrentPrinter] = useState()

  useEffect(() => {
    function onSuccess(devices) {
      const devicesWithImages = devices?.printer?.map((device) => {
        const name = device.name.toLowerCase();
        let image = null;

        if (name.includes("zt231")) {
          image = '/assets/PrinterImages/ZT231.png';
        } else if (name.includes("zd500")) {
          image = '/assets/PrinterImages/ZD500R.png'; // Pode ser ZD500RImage ou ZD500Image, dependendo do nome exato.
        } else if (name.includes("zt230")) {
          image = '/assets/PrinterImages/ZT230.png';
        }

        return {
          ...device,
          image: image,
        };
      });

      setAvailableDevices(devicesWithImages);
    }

    function onError(error) {
      console.error("Erro ao obter dispositivos:", error);
    }

    BPrint?.getLocalDevices(onSuccess, onError);
    BPrint?.getDefaultDevice("printer", (deviceDefault) => {
      setCurrentPrinter(deviceDefault);
    });
  }, []);

  return (
    <div style={{ width: '80%', marginLeft: '10%', display: 'flex', flexDirection: 'column', marginTop: '3%', }} >
      <div style={{ width: '100%', display: 'flex', alignItems: 'start', justifyContent: 'center', }} >
        <h1 style={{ color: 'black', fontSize: 25, fontWeight: 'bold', marginBottom: 20 }} >Configurações da Impressora</h1>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', marginTop: 40 }} >
        <text style={{ fontSize: 25, fontWeight: 'bold', }}>Impressoras disponíveis na rede: </text>
        {
          availableDevices.length > 0 ?
            <div style={{ display: 'flex', flexDirection: 'column', marginTop: 20 }} >
              {availableDevices.map((device) => (
                <span style={{ fontSize: 18, marginTop: 8, fontWeight: 'bold', color: device.name == currentPrinter?.name ? 'green' : 'red' }} >
                  {device.name}{device.name == currentPrinter?.name ? ' - Conectada' : ' - Desconectada'}
                </span>
              ))}
            </div>
            :
            <span>Carregando impressoras conectadas...</span>
        }

      </div>
    </div>
  );
}