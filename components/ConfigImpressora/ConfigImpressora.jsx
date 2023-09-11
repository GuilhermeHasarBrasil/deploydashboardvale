import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components'
import Alert from '@mui/material/Alert';
import { useBroswerPrint } from '../../contexts/BrowserPrintContext';
import ReactLoading from "react-loading";

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

  const [showInfo, setShowInfo] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      if (availableDevices?.length === 0) {
        showInfoPrinter()
      }
    }, 10000);
  }, [availableDevices])

  function showInfoPrinter(){
    if (availableDevices?.length > 0) {
      setShowInfo(false)
    }
    else{
      setShowInfo(true)
    }
  }

  useEffect(()=>{
  
    if(availableDevices.length > 1) {
      setShowInfo(false)
    }
  
    },[availableDevices])

  return (
    <div style={{ width: '80%', marginLeft: '10%', display: 'flex', flexDirection: 'column', marginTop: '3%', }} >
      <div style={{ width: '100%', display: 'flex', alignItems: 'start', justifyContent: 'center', }} >
        <h1 style={{ color: 'black', fontSize: 25, fontWeight: 'bold', marginBottom: 20 , userSelect:'none'}} >Configurações da Impressora</h1>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', marginTop: 40 }} >
        {
          availableDevices?.length > 0 ?
            <h1 style={{ color: 'black', fontSize: 25, fontWeight: 'bold', marginBottom: 20, userSelect:'none' }} >Impressoras disponíveis na rede: </h1>
            :
            <h1 style={{ color: 'black', fontSize: 25, fontWeight: 'bold', marginBottom: 20, userSelect:'none' }} >Buscando impressoras conectadas</h1>
        }        {
          availableDevices?.length > 0 ?
            <div style={{ display: 'flex', flexDirection: 'column', marginTop: 20 }} >
              {availableDevices.map((device) => (
                <span style={{ fontSize: 18, marginTop: 8, fontWeight: 'bold', color: device.name == currentPrinter?.name ? 'green' : 'red' }} >
                  {device.name}{device.name == currentPrinter?.name ? ' - Conectada' : ' - Desconectada'}
                </span>
              ))}
            </div>
            :
            <span style={{ display: 'flex', flexDirection: 'row' }} ><ReactLoading width={100} height={50} type={"bubbles"} color="#008F83" /></span>
        }
        {
          showInfo ?
            <h1 style={{ color: 'black', fontSize: 25, fontWeight: 'bold', marginTop: 60, userSelect:'none' }} >Não foi possível encontrar nenhuma impressora conectada na rede? Clique no link abaixo para baixar o aplicativo de impressoras da zebra:{<br></br>}
             {<a style={{color:'blue'}} href='https://www.zebra.com/content/dam/zebra_new_ia/en-us/solutions-verticals/product/Software/Printer%20Software/Link-OS/browser-print/zebra-browser-print-windows-v132489.exe' >Zebra Browser Print</a>} 
            </h1>
            :
            <></>
        }


      </div>
    </div>
  );
}