import { ArrowBackCircleSharp, ArrowForwardCircleSharp } from 'react-ionicons'
import styled from 'styled-components'
import { useState } from "react";
import CustomBarChart from './BarChart';


export default function Relatorio({ chipBoxes, furoSelecionado, filtroConferencia, filtroMarcacao, filtroFotografia, filtroDensidade, filtroSerragem, filtroArquivamento, chipBoxesInternos }) {

    if(!furoSelecionado)
    return(
        <div style={{display:'flex', alignItems:'center', justifyContent:'center'}} >
            <text style={{ marginRight: 15, fontWeight: 'bold', fontSize:30 }}>Selecione o furo acima</text>
        </div>
    )

    const dataArray = filtroConferencia[furoSelecionado?.index]
    const conferenciaData = dataArray.map(item => ({
        id: item.id,
        diferencaTempo: item.processos.conferencia.sai.seconds - item.processos.conferencia.ent.seconds,
      }));

    console.log(conferenciaData)


    return (
        <div style={{ display: 'flex', justifyContent: 'space-between',padding: 5, flexDirection:'column', width:'100%' }} >
            

            <CustomBarChart data={conferenciaData} />

        </div>
    )
}

const Button = styled.button`
    transition: opacity 0.3s;
    align-items: center;
    justify-content: center;
    &:hover {
        opacity: 0.2;
    }

`

const BgIcon = styled.button`
    transition: opacity 0.3s;
    height: 45px;
    width: 45px;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    background-color:'white';
    &:hover {
        opacity: 0.2;
    }

`

