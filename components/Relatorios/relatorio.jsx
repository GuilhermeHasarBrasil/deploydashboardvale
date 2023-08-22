import styled from 'styled-components'
import { useEffect, useState } from "react";
import CustomBarChart from './BarChart';
import { motion } from 'framer-motion';

export default function Relatorio({ chipBoxes, furoSelecionado, filtroConferencia, filtroMarcacao, filtroFotografia, filtroDensidade, filtroSerragem, filtroArquivamento, chipBoxesInternos }) {

    if (!furoSelecionado)
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                <text style={{ marginRight: 15, fontWeight: 'bold', fontSize: 30 }}>Selecione o furo acima</text>
            </div>
        )

    const [process, setProcess] = useState(null);
    const processos = [
        { 'processo': 'Conferência' },
        { 'processo': 'Marcação' },
        { 'processo': 'Fotografia' },
        { 'processo': 'Densidade' },
        { 'processo': 'Serragem' },
        { 'processo': 'Despacho' },
        { 'processo': 'Arquivamento' },

    ]

    function sett(selected) {
        setProcess(selected);
    }

    useEffect(() => {
        console.log(process)
        if (process == 'Conferência') {
            const dataArray = filtroConferencia[furoSelecionado?.index]
            const conferenciaData = dataArray.map(item => ({
                'id': item.id,
                'Tempo (segundos)': item.processos.conferencia.sai.seconds - item.processos.conferencia.ent.seconds,
                'caixa': item.cx,
                'user': item.processos.conferencia.user
            }));
            setArrayDataProcess(conferenciaData)
        }

        console.log(arrayDataProcess)
        if (process == 'Marcação') {
            const dataArray = filtroMarcacao[furoSelecionado?.index]
            const marcacaoData = dataArray.map(item => ({
                'id': item.id,
                'Tempo (segundos)': item.processos.marcacao.sai.seconds - item.processos.marcacao.ent.seconds,
                'caixa': item.cx,
                'user': item.processos.marcacao.user
            }));
            setArrayDataProcess(marcacaoData)
        }
        if (process == 'Fotografia') {
            const dataArray = filtroFotografia[furoSelecionado?.index]
            const fotografiaData = dataArray.map(item => ({
                'id': item.id,
                'Tempo (segundos)': item.processos.fotografia.sai.seconds - item.processos.fotografia.ent.seconds,
                'caixa': item.cx,
                'user': item.processos.fotografia.user
            }));
            setArrayDataProcess(fotografiaData)
        }
        if (process == 'Densidade') {
            const dataArray = filtroDensidade[furoSelecionado?.index]
            const densidadeData = dataArray.map(item => ({
                'id': item.id,
                'Tempo (segundos)': item.processos.densidade.sai.seconds - item.processos.densidade.ent.seconds,
                'caixa': item.cx,
                'user': item.processos.densidade.user
            }));
            setArrayDataProcess(densidadeData)
        }
        if (process == 'Serragem') {
            const dataArray = filtroSerragem[furoSelecionado?.index]
            const serragemData = dataArray.map(item => ({
                'id': item.id,
                'Tempo (segundos)': item.processos.serragem.sai.seconds - item.processos.serragem.ent.seconds,
                'caixa': item.cx,
                'user': item.processos.serragem.user
            }));
            setArrayDataProcess(serragemData)
        }
        if (process == 'Despacho') {
            const dataArray = filtroFotografia[furoSelecionado?.index]
            const despachoData = dataArray.map(item => ({
                'id': item.id,
                'Tempo (segundos)': item.processos.despacho.sai.seconds - item.processos.despacho.ent.seconds,
                'caixa': item.cx,
                'user': item.processos.despacho.user
            }));
            setArrayDataProcess(despachoData)
        }
        if (process == 'Arquivamento') {
            const dataArray = filtroArquivamento[furoSelecionado?.index]
            const arquivamentoData = dataArray.map(item => ({
                'id': item.id,
                'Tempo (segundos)': item.processos.arquivamento.sai.seconds - item.processos.arquivamento.ent.seconds,
                'caixa': item.cx,
                'user': item.processos.arquivamento.user
            }));
            setArrayDataProcess(arquivamentoData)
        }
    }, [process, furoSelecionado]);

    function motionIcon() {
        return (
            <motion.div
                style={{ marginLeft: 600, marginBottom:-20 }}
                initial={{ y: -10 }}
                animate={{ y: 0 }}
                transition={{ repeat: Infinity, duration: 1, repeatType: 'reverse' }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="60"
                    height="60"
                    fill="currentColor"
                    className="bi bi-chevron-down"
                    viewBox="0 0 16 16"
                >
                    <path
                        fill-rule="evenodd"
                        d="M4.646 5.646a.5.5 0 0 1 .708 0L8 8.293l2.646-2.647a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 0-.708z"
                    />
                </svg>
            </motion.div>
        )
    }
    const [arrayDataProcess, setArrayDataProcess] = useState()

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: 5, flexDirection: 'column', width: '100%' }} >
            <text style={{ fontSize: 25, fontWeight: 'bold', marginLeft: 50, marginTop:20 }} >Selecione o processo para exibir o gráfico de tempo de processamento de cada caixa{motionIcon()} </text>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 5, marginLeft:50 }} >
                <ul style={{ display: 'flex', flexDirection: 'row', overflowX: 'auto', overflow: 'hidden' }} >
                    {processos.map((furo, index) => (
                        <li style={{ marginLeft: 30, marginRight: 0, backgroundColor: furo.processo == process ? '#008f83' : '#c4c4c4', padding: 8, borderRadius: 10 }} key={furo.id}>
                            <Button>
                                <h1 style={{ color: furo.processo !== process ? 'black' : '#f3c108', width: 120, fontWeight: 'bold' }} onClick={() => sett(furo.processo, index)} >
                                    {furo.processo}
                                </h1>
                            </Button>
                        </li>
                    ))}
                </ul>
            </div>
            {
                arrayDataProcess ?
                    <div style={{marginLeft:'2%'}} >
                        <CustomBarChart data={arrayDataProcess} />
                    </div>

                    :

                    <></>
            }
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