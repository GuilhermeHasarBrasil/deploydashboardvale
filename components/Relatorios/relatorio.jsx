import { ArrowBackCircleSharp, ArrowForwardCircleSharp } from 'react-ionicons'
import styled from 'styled-components'
import { useState } from "react";

export default function Relatorio({ chipBoxes, furoSelecionado, filtroConferencia, filtroMarcacao, filtroFotografia, filtroDensidade, filtroSerragem, filtroArquivamento, chipBoxesInternos }) {

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between',padding: 5, flexDirection:'column' }} >
            <text>Furo: {furoSelecionado.furo}</text>
            <text>Conferência: {filtroConferencia[furoSelecionado.index]?.length} de {chipBoxesInternos[furoSelecionado.index]?.length} </text>
            <text>Marcação: {filtroMarcacao[furoSelecionado.index]?.length} de {chipBoxesInternos[furoSelecionado.index]?.length}</text>
            <text>Fotografia: {filtroFotografia[furoSelecionado.index]?.length} de {chipBoxesInternos[furoSelecionado.index]?.length}</text>
            <text>Densidade: {filtroDensidade[furoSelecionado.index]?.length} de {chipBoxesInternos[furoSelecionado.index]?.length}</text>
            <text>Serragem: {filtroSerragem[furoSelecionado.index]?.length} de {chipBoxesInternos[furoSelecionado.index]?.length}</text>
            <text>Arquivamento: {filtroArquivamento[furoSelecionado.index]?.length} de {chipBoxesInternos[furoSelecionado.index]?.length}</text>
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

