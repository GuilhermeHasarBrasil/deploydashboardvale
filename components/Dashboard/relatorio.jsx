/* eslint-disable */

import styled from 'styled-components'
import { useEffect, useState, useContext } from "react";
import CustomBarChart from './BarChartRelatorio';
import { motion } from 'framer-motion';
import DatePicker from 'react-datepicker';
import ptBR from 'date-fns/locale/pt-BR';
import { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
registerLocale('pt-BR', ptBR);
import 'dayjs/locale/pt-br';
import InfoProcess from './infoProcess';

export default function Relatorio({ chipBoxes, furoSelecionado, filtroConferencia, filtroMarcacao, filtroFotografia, filtroDensidade, filtroSerragem, filtroArquivamento, chipBoxesInternos, menuBig }) {

    if (!furoSelecionado)
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                <text style={{ marginRight: 15, fontWeight: 'bold', fontSize: 30 }}>Selecione o furo acima</text>
            </div>
        )

    const [selectedDateRange, setSelectedDateRange] = useState({ startDate: null, endDate: null });
    const [process, setProcess] = useState(null);
    const [arrayDataProcess, setArrayDataProcess] = useState()
    const [arrayDataProcessDateFilter, setArrayDataProcessDateFilterDateFilter] = useState()
    const processos = [
        { 'processo': 'Conferência' },
        { 'processo': 'Marcação' },
        { 'processo': 'Fotografia' },
        // { 'processo': 'Densidade' },
        // { 'processo': 'Serragem' },
        // { 'processo': 'Despacho' },
        { 'processo': 'Arquivamento' },

    ]

    function sett(selected) {
        setProcess(selected);
    }

    function segundosParaHHMMSS(segundos) {
        const horas = Math.floor(segundos / 3600);
        segundos %= 3600;
        const minutos = Math.floor(segundos / 60);
        segundos %= 60;
        segundos = Math.floor(segundos);
        return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
    }

    useEffect(() => {
        const array = furoSelecionado.furo === "TODOS" ? chipBoxes : chipBoxesInternos[furoSelecionado.index].sort((a, b) => a.cx - b.cx)
        if (process === 'Conferência') {
            const dataArray = array;
            const conferenciaData = dataArray?.map(item => ({
                'id': item.id,
                'Tempo ': item.processos.conferencia.ent && item.processos.conferencia.sai?.seconds ? (item.processos.conferencia.sai.seconds - item.processos.conferencia.ent?.seconds) / 60 : 0,
                'Tempo': segundosParaHHMMSS(item.processos.conferencia.ent && item.processos.conferencia.sai?.seconds ? (item.processos.conferencia.sai.seconds - item.processos.conferencia.ent?.seconds) / 1 : 0),
                'caixa': item.cx,
                'user': item.processos.conferencia.user ? item.processos.conferencia.user : '-',
                'Data finalização': item.processos.conferencia.sai?.seconds ? item.processos.conferencia.sai.seconds : '-'
            }));
            setArrayDataProcess(conferenciaData);
        }

        if (process === 'Marcação') {
            const dataArray = array;
            const marcacaoData = dataArray?.map(item => ({
                'id': item.id,
                'Tempo ': item.processos.marcacao.ent ? (item.processos.marcacao.sai?.seconds - item.processos.marcacao.ent.seconds) / 60 : 0,
                'Tempo': segundosParaHHMMSS(item.processos.marcacao.ent ? (item.processos.marcacao.sai?.seconds - item.processos.marcacao.ent.seconds) / 1 : 0),
                'caixa': item.cx,
                'user': item.processos.marcacao.user ? item.processos.marcacao.user : '-',
                'Data finalização': item.processos.marcacao.sai?.seconds ? item.processos.marcacao.sai.seconds : '-'
            }));
            setArrayDataProcess(marcacaoData);
        }

        if (process === 'Fotografia') {
            const dataArray = array;
            const fotografiaData = dataArray?.map(item => ({
                'id': item.id,
                'Tempo ': item.processos.fotografia.ent ? (item.processos.fotografia.sai?.seconds - item.processos.fotografia.ent.seconds) / 60 : 0,
                'Tempo': segundosParaHHMMSS(item.processos.fotografia.ent ? (item.processos.fotografia.sai?.seconds - item.processos.fotografia.ent.seconds) / 1 : 0),
                'caixa': item.cx,
                'user': item.processos.fotografia.user ? item.processos.fotografia.user : '-',
                'Data finalização': item.processos.fotografia.sai?.seconds ? item.processos.fotografia.sai.seconds : '-'
            }));
            setArrayDataProcess(fotografiaData);
        }

        if (process == 'Arquivamento') {
            const dataArray = array
            const arquivamentoData = dataArray?.map(item => ({
                'id': item.id,
                'Tempo ': item.processos.arquivamento.ent ? (item.processos.arquivamento.sai?.seconds - item.processos.arquivamento.ent.seconds) / 60 : 0,
                'Tempo': segundosParaHHMMSS(item.processos.arquivamento.ent ? (item.processos.arquivamento.sai?.seconds - item.processos.arquivamento.ent.seconds) / 1 : 0),
                'caixa': item.cx,
                'user': item.processos.arquivamento.user ? item.processos.arquivamento.user : '-',
                'Data finalização': item.processos.arquivamento.sai?.seconds ? item.processos.arquivamento.sai?.seconds : '-'
            }));
            setArrayDataProcess(arquivamentoData)
        }
    }, [process, furoSelecionado, chipBoxes, chipBoxesInternos[furoSelecionado.index]]);

    function motionIcon() {
        return (
            <motion.div
                style={{ marginLeft: 525, marginBottom: -20, marginTop: -10 }}
                initial={{ y: -5 }}
                animate={{ y: 0 }}
                transition={{ repeat: Infinity, duration: 1, repeatType: 'reverse' }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={
                        window.screen.width > 1900 ?
                            "55"
                            :
                            window.screen.width > 1580 ?
                                "50"
                                :
                                "40"
                    }
                    height={
                        window.screen.width > 1900 ?
                            "55"
                            :
                            window.screen.width > 1580 ?
                                "50"
                                :
                                "40"

                    }
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


    useEffect(() => {
        const filteredData = arrayDataProcess?.filter(item => {
            const dataFinalizacao = new Date(item["Data finalização"] * 1000);
            const dataFinalizacaoDay = dataFinalizacao.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to zero
            const startDateDay = selectedDateRange?.startDate ? selectedDateRange?.startDate.setHours(0, 0, 0, 0) : null;
            const endDateDay = selectedDateRange?.endDate ? selectedDateRange?.endDate.setHours(0, 0, 0, 0) : null;

            if (startDateDay === endDateDay && startDateDay === dataFinalizacaoDay) {
                return true;
            } else {
                return (
                    (!startDateDay || dataFinalizacaoDay >= startDateDay) &&
                    (!endDateDay || dataFinalizacaoDay <= endDateDay)
                );
            }
        });

        setArrayDataProcessDateFilterDateFilter(filteredData);
    }, [arrayDataProcess, selectedDateRange, chipBoxes]);

    const [countFinalizadosSelectedProcess, setCountFinalizadosSelectedProcess] = useState()
    const [countProcessingBoxesSelectedProcess, setCountProcessingBoxesSelectedProcess] = useState()
    const [countNotStartedBoxesSelectedProcess, setCountNotStartedBoxesSelectedProcess] = useState()

    useEffect(() => {

        if (process === 'Conferência') {
            const arrayFinalizadoConferencia = chipBoxesInternos[furoSelecionado.index]?.filter(chipbox =>
                chipbox.processos.conferencia.sai && chipbox.processos.conferencia.ent !== null
            )
            setCountFinalizadosSelectedProcess(arrayFinalizadoConferencia)

            const arrayIniciadoConferencia = chipBoxesInternos[furoSelecionado.index]?.filter(chipbox =>
                chipbox.processos.conferencia.ent !== null && chipbox.processos.conferencia.sai === null
            )
            setCountProcessingBoxesSelectedProcess(arrayIniciadoConferencia)

            const arrayNotStartedConferencia = chipBoxesInternos[furoSelecionado.index]?.filter(chipbox =>
                chipbox.processos.conferencia.sai && chipbox.processos.conferencia.ent == null
            )
            setCountNotStartedBoxesSelectedProcess(arrayNotStartedConferencia)

        }
        if (process === 'Marcação') {
            const arrayFinalizadomarcacao = chipBoxesInternos[furoSelecionado.index]?.filter(chipbox =>
                chipbox.processos.marcacao.sai && chipbox.processos.marcacao.ent !== null
            )
            setCountFinalizadosSelectedProcess(arrayFinalizadomarcacao)

            const arrayIniciadomarcacao = chipBoxesInternos[furoSelecionado.index]?.filter(chipbox =>
                chipbox.processos.marcacao.ent !== null && chipbox.processos.marcacao.sai === null
            )
            setCountProcessingBoxesSelectedProcess(arrayIniciadomarcacao)

            const arrayNotStartedmarcacao = chipBoxesInternos[furoSelecionado.index]?.filter(chipbox =>
                chipbox.processos.marcacao.sai && chipbox.processos.marcacao.ent == null
            )
            setCountNotStartedBoxesSelectedProcess(arrayNotStartedmarcacao)

        }
        if (process === 'Fotografia') {
            const arrayFinalizadofotografia = chipBoxesInternos[furoSelecionado.index]?.filter(chipbox =>
                chipbox.processos.fotografia.sai && chipbox.processos.fotografia.ent !== null
            )
            setCountFinalizadosSelectedProcess(arrayFinalizadofotografia)

            const arrayIniciadofotografia = chipBoxesInternos[furoSelecionado.index]?.filter(chipbox =>
                chipbox.processos.fotografia.ent !== null && chipbox.processos.fotografia.sai === null
            )
            setCountProcessingBoxesSelectedProcess(arrayIniciadofotografia)

            const arrayNotStartedfotografia = chipBoxesInternos[furoSelecionado.index]?.filter(chipbox =>
                chipbox.processos.fotografia.sai && chipbox.processos.fotografia.ent == null
            )
            setCountNotStartedBoxesSelectedProcess(arrayNotStartedfotografia)

        }
        if (process === 'Arquivamento') {
            const arrayFinalizadoarquivamento = chipBoxesInternos[furoSelecionado.index]?.filter(chipbox =>
                chipbox.processos.arquivamento.sai && chipbox.processos.arquivamento.ent !== null
            )
            setCountFinalizadosSelectedProcess(arrayFinalizadoarquivamento)

            const arrayIniciadoarquivamento = chipBoxesInternos[furoSelecionado.index]?.filter(chipbox =>
                chipbox.processos.arquivamento.ent !== null && chipbox.processos.arquivamento.sai === null
            )
            setCountProcessingBoxesSelectedProcess(arrayIniciadoarquivamento)

            const arrayNotStartedarquivamento = chipBoxesInternos[furoSelecionado.index]?.filter(chipbox =>
                chipbox.processos.arquivamento.sai && chipbox.processos.arquivamento.ent == null
            )
            setCountNotStartedBoxesSelectedProcess(arrayNotStartedarquivamento)

        }
    }, [process, chipBoxesInternos[furoSelecionado.index]], chipBoxes)

    //console.log('total:', chipBoxesInternos[furoSelecionado.index].length)
    //console.log('iniciado:', countProcessingBoxesSelectedProcess)
    //console.log('finalizado:', countFinalizadosSelectedProcess)

    //const [date1, setDate1] = useState()
    //console.log(date1+':00.000Z')

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: 0, flexDirection: 'column', width: '100%' }} >
            <text style={
                {
                    fontSize: window.screen.width > 1900 ?
                        25
                        :
                        window.screen.width > 1580 ?
                            20
                            :
                            16
                    ,
                    fontWeight: 'bold',
                    marginLeft: menuBig ? -50 : 50,
                    marginTop: 0, userSelect: 'none'
                }
            }
            >
                {
                    furoSelecionado.furo === 'TODOS' ?
                        'Selecione o processo para verificar o tempo de cada caixa processada (todos os furos)'
                        :
                        'Selecione o processo para exibir o gráfico de tempo de processamento de cada caixa do furo ' + furoSelecionado.furo} {motionIcon()}

            </text>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 5, marginLeft: 250 }} >
                <ul style={{ display: 'flex', flexDirection: 'row', overflowX: 'auto', overflow: 'hidden' }} >
                    {processos.map((furo, index) => (
                        <li style={
                            {
                                marginLeft: 30, marginRight: 0,
                                backgroundColor: furo.processo == process ? '#008f83' : '#c4c4c4',
                                padding: window.screen.width > 1900 ?
                                    8
                                    :
                                    window.screen.width > 1580 ?
                                        7
                                        :
                                        3,
                                borderRadius: 10
                            }
                        }
                            key={furo.id}
                        >
                            <Button>
                                <h1 style={{ color: furo.processo !== process ? 'black' : '#f3c108', width: 120, fontWeight: 'bold', userSelect: 'none' }} onClick={() => sett(furo.processo, index)} >
                                    {furo.processo}
                                </h1>
                            </Button>
                        </li>
                    ))}
                </ul>
            </div>
            {
                arrayDataProcess ?
                    <div style={{ marginLeft: '-2%', display: 'flex', flexDirection: 'row' }} >
                        <div>
                            <CustomBarChart data={selectedDateRange ? arrayDataProcessDateFilter : arrayDataProcess} menuBig={menuBig} />
                            {/* <text style={{ color: "#777777", fontSize: 20, fontWeight: 'bold', marginLeft:30,  }} >Caixas</text> */}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop:window.screen.width>1900? -30 : window.screen.width>1580? 0 : 0 }} >
                            <text style={{ marginLeft: 15, fontWeight: 'bold' }} >Filtrar por data</text>
                            <DatePickerWrapper>
                                <DatePicker
                                    selected={selectedDateRange.startDate}
                                    onChange={dates => setSelectedDateRange({ startDate: dates[0], endDate: dates[1] })}
                                    startDate={selectedDateRange.startDate}
                                    endDate={selectedDateRange.endDate}
                                    selectsRange
                                    locale="pt-BR"
                                    inline
                                />
                            </DatePickerWrapper>
                            {/* <input
                                type='datetime-local'
                                style={{ backgroundColor: 'white', width: 400, marginBottom: 15, height: 40, padding: 2, borderRadius: 5, borderWidth: 1, borderColor: 'black' }}
                                onChange={(e) => setDate1(e.target.value)}
                            /> */}
                            {
                                furoSelecionado.furo === 'TODOS' ?
                                    <></>
                                    :
                                    <InfoProcess total={chipBoxesInternos[furoSelecionado.index]?.length}
                                        iniciado={countProcessingBoxesSelectedProcess}
                                        finalizado={countFinalizadosSelectedProcess}
                                        naoIniciado={countNotStartedBoxesSelectedProcess}
                                    />
                            }

                        </div>

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
const DatePickerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 0px;
    margin-left: 20px;
`;