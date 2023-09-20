/* eslint-disable */

import styled from 'styled-components';
import { useEffect, useState } from "react";
import ptBR from 'date-fns/locale/pt-BR';
import { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
registerLocale('pt-BR', ptBR);
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, Label, Cell } from 'recharts';
import 'dayjs/locale/pt-br';

export default function MetragensProcessadas({ chipBoxes, furoSelecionado, menuBig, furos }) {
    const [arrayDataProcessConferenciaConcluido, setArrayDataProcessConferenciaConcluido] = useState([]);
    const [arrayDataProcessMarcacaoConcluido, setArrayDataProcessMarcacaoConcluido] = useState([]);
    const [arrayDataProcessFotografiaConcluido, setArrayDataProcessFotografiaConcluido] = useState([]);
    const [arrayDataProcessArquivamentoConcluido, setArrayDataProcessArquivamentoConcluido] = useState([]);

    const [arrayDataProcessConferenciaAndamento, setArrayDataProcessConferenciaAndamento] = useState([]);
    const [arrayDataProcessMarcacaoAndamento, setArrayDataProcessMarcacaoAndamento] = useState([]);
    const [arrayDataProcessFotografiaAndamento, setArrayDataProcessFotografiaAndamento] = useState([]);
    const [arrayDataProcessArquivamentoAndamento, setArrayDataProcessArquivamentoAndamento] = useState([]);

    const [arrayDataProcessConferenciaNaoIniciado, setArrayDataProcessConferenciaNaoIniciado] = useState([]);
    const [arrayDataProcessMarcacaoNaoIniciado, setArrayDataProcessMarcacaoNaoIniciado] = useState([]);
    const [arrayDataProcessFotografiaNaoIniciado, setArrayDataProcessFotografiaNaoIniciado] = useState([]);
    const [arrayDataProcessArquivamentoNaoIniciado, setArrayDataProcessArquivamentoNaoIniciado] = useState([]);

    const [process, setProcess] = useState('Conferência');
    const processos = [
        { 'processo': 'Conferência' },
        { 'processo': 'Marcação' },
        { 'processo': 'Fotografia' },
        { 'processo': 'Arquivamento' },
    ]
    function sett(selected) {
        setProcess(selected);
    }

    useEffect(() => {

        if (furoSelecionado.furo === 'TODOS') {
            const arrayConferenciaConcluido = chipBoxes.filter((caixa) => caixa?.processos?.conferencia?.sai !== null)
            setArrayDataProcessConferenciaConcluido(arrayConferenciaConcluido)
            const arrayConferenciaAndamento = chipBoxes.filter((caixa) => caixa?.processos?.conferencia?.ent !== null && caixa?.processos?.conferencia?.ent === null)
            setArrayDataProcessConferenciaAndamento(arrayConferenciaAndamento)
            const arrayConferenciaNaoIniciado = chipBoxes.filter((caixa) => caixa?.processos?.conferencia?.ent === null)
            setArrayDataProcessConferenciaNaoIniciado(arrayConferenciaNaoIniciado)
        } else {
            const arrayConferenciaConcluido = chipBoxes.filter((caixa) => caixa.furo === furoSelecionado.furo && caixa?.processos?.conferencia?.sai !== null)
            setArrayDataProcessConferenciaConcluido(arrayConferenciaConcluido)
            const arrayConferenciaAndamento = chipBoxes.filter((caixa) => caixa.furo === furoSelecionado.furo && caixa?.processos?.conferencia?.ent !== null && caixa?.processos?.conferencia?.ent === null)
            setArrayDataProcessConferenciaAndamento(arrayConferenciaAndamento)
            const arrayConferenciaNaoIniciado = chipBoxes.filter((caixa) => caixa.furo === furoSelecionado.furo && caixa?.processos?.conferencia?.ent === null)
            setArrayDataProcessConferenciaNaoIniciado(arrayConferenciaNaoIniciado)
        }

        if (furoSelecionado.furo === 'TODOS') {
            const arrayMarcacaoConcluido = chipBoxes.filter((caixa) => caixa?.processos?.marcacao?.sai !== null)
            setArrayDataProcessMarcacaoConcluido(arrayMarcacaoConcluido)
            const arrayMarcacaoAndamento = chipBoxes.filter((caixa) => caixa?.processos?.marcacao?.ent !== null && caixa?.processos?.marcacao?.ent === null)
            setArrayDataProcessMarcacaoAndamento(arrayMarcacaoAndamento)
            const arrayMarcacaoNaoIniciado = chipBoxes.filter((caixa) => caixa?.processos?.marcacao?.ent === null)
            setArrayDataProcessMarcacaoNaoIniciado(arrayMarcacaoNaoIniciado)
        } else {
            const arrayMarcacaoConcluido = chipBoxes.filter((caixa) => caixa.furo === furoSelecionado.furo && caixa?.processos?.marcacao?.sai !== null)
            setArrayDataProcessMarcacaoConcluido(arrayMarcacaoConcluido)
            const arrayMarcacaoAndamento = chipBoxes.filter((caixa) => caixa.furo === furoSelecionado.furo && caixa?.processos?.marcacao?.ent !== null && caixa?.processos?.marcacao?.ent === null)
            setArrayDataProcessMarcacaoAndamento(arrayMarcacaoAndamento)
            const arrayMarcacaoNaoIniciado = chipBoxes.filter((caixa) => caixa.furo === furoSelecionado.furo && caixa?.processos?.marcacao?.ent === null)
            setArrayDataProcessMarcacaoNaoIniciado(arrayMarcacaoNaoIniciado)
        }

        if (furoSelecionado.furo === 'TODOS') {
            const arrayFotografiaConcluido = chipBoxes.filter((caixa) => caixa?.processos?.fotografia?.sai !== null)
            setArrayDataProcessFotografiaConcluido(arrayFotografiaConcluido)
            const arrayFotografiaAndamento = chipBoxes.filter((caixa) => caixa?.processos?.fotografia?.ent !== null && caixa?.processos?.fotografia?.ent === null)
            setArrayDataProcessFotografiaAndamento(arrayFotografiaAndamento)
            const arrayFotografiaNaoIniciado = chipBoxes.filter((caixa) => caixa?.processos?.fotografia?.ent === null)
            setArrayDataProcessFotografiaNaoIniciado(arrayFotografiaNaoIniciado)
        } else {
            const arrayFotografiaConcluido = chipBoxes.filter((caixa) => caixa.furo === furoSelecionado.furo && caixa?.processos?.fotografia?.sai !== null)
            setArrayDataProcessFotografiaConcluido(arrayFotografiaConcluido)
            const arrayFotografiaAndamento = chipBoxes.filter((caixa) => caixa.furo === furoSelecionado.furo && caixa?.processos?.fotografia?.ent !== null && caixa?.processos?.fotografia?.ent === null)
            setArrayDataProcessFotografiaAndamento(arrayFotografiaAndamento)
            const arrayFotografiaNaoIniciado = chipBoxes.filter((caixa) => caixa.furo === furoSelecionado.furo && caixa?.processos?.fotografia?.ent === null)
            setArrayDataProcessFotografiaNaoIniciado(arrayFotografiaNaoIniciado)
        }

        if (furoSelecionado.furo === 'TODOS') {
            const arrayArquivamentoConcluido = chipBoxes.filter((caixa) => caixa?.processos?.arquivamento?.sai !== null)
            setArrayDataProcessArquivamentoConcluido(arrayArquivamentoConcluido)
            const arrayArquivamentoAndamento = chipBoxes.filter((caixa) => caixa?.processos?.arquivamento?.ent !== null && caixa?.processos?.arquivamento?.ent === null)
            setArrayDataProcessArquivamentoAndamento(arrayArquivamentoAndamento)
            const arrayArquivamentoNaoIniciado = chipBoxes.filter((caixa) => caixa?.processos?.arquivamento?.ent === null)
            setArrayDataProcessArquivamentoNaoIniciado(arrayArquivamentoNaoIniciado)
        } else {
            const arrayArquivamentoConcluido = chipBoxes.filter((caixa) => caixa.furo === furoSelecionado.furo && caixa?.processos?.arquivamento?.sai !== null)
            setArrayDataProcessArquivamentoConcluido(arrayArquivamentoConcluido)
            const arrayArquivamentoAndamento = chipBoxes.filter((caixa) => caixa.furo === furoSelecionado.furo && caixa?.processos?.arquivamento?.ent !== null && caixa?.processos?.arquivamento?.ent === null)
            setArrayDataProcessArquivamentoAndamento(arrayArquivamentoAndamento)
            const arrayArquivamentoNaoIniciado = chipBoxes.filter((caixa) => caixa.furo === furoSelecionado.furo && caixa?.processos?.arquivamento?.ent === null)
            setArrayDataProcessArquivamentoNaoIniciado(arrayArquivamentoNaoIniciado)
        }


    }, [chipBoxes, furoSelecionado]);

    const [conferenciaData, setConferenciaData] = useState()
    const [marcacaoData, setMarcacaoData] = useState()
    const [fotografiaData, setFotografiaData] = useState()
    const [arquivamentoData, setArquivamentoData] = useState()

    const [somaTotalDeFuro, setSomaDeTotalFuro] = useState()

    useEffect(() => {
        if (furoSelecionado.furo === 'TODOS') {
            const somaAte = furos.reduce((total, furo) => {
                return total + (furo.ate || 0);
            }, 0);
            setSomaDeTotalFuro(somaAte.toFixed(2))
        } else {
            const atefuroselecionado = furos.filter((furo) => furo.numero === furoSelecionado.furo)[0]?.ate
            setSomaDeTotalFuro(atefuroselecionado)
        }
    }, [furos, furoSelecionado])

    useEffect(() => {

        const sumConferenciaConcluido = arrayDataProcessConferenciaConcluido.reduce((sum, caixa) => sum + (caixa?.ate.toFixed(2) - caixa?.de.toFixed(2)), 0);
        const roundConferenciaConcluido = Math.round(sumConferenciaConcluido * 100) / 100
        const sumConferenciaAndamento = arrayDataProcessConferenciaAndamento.reduce((sum, caixa) => sum + (caixa?.ate.toFixed(2) - caixa?.de.toFixed(2)), 0);
        const roundConferenciaAndamento = Math.round(sumConferenciaAndamento * 100) / 100
        const sumConferenciaNaoIniciado = arrayDataProcessConferenciaNaoIniciado.reduce((sum, caixa) => sum + (caixa?.ate.toFixed(2) - caixa?.de.toFixed(2)), 0);
        const roundConferenciaNaoIniciado = Math.round(sumConferenciaNaoIniciado * 100) / 100

        const sumMarcacaoConcluido = arrayDataProcessMarcacaoConcluido.reduce((sum, caixa) => sum + (caixa?.ate.toFixed(2) - caixa?.de.toFixed(2)), 0);
        const roundMarcacaoConcluido = Math.round(sumMarcacaoConcluido * 100) / 100
        const sumMarcacaoAndamento = arrayDataProcessMarcacaoAndamento.reduce((sum, caixa) => sum + (caixa?.ate.toFixed(2) - caixa?.de.toFixed(2)), 0);
        const roundMarcacaoAndamento = Math.round(sumMarcacaoAndamento * 100) / 100
        const sumMarcacaoNaoIniciado = arrayDataProcessMarcacaoNaoIniciado.reduce((sum, caixa) => sum + (caixa?.ate.toFixed(2) - caixa?.de.toFixed(2)), 0);
        const roundMarcacaoNaoIniciado = Math.round(sumMarcacaoNaoIniciado * 100) / 100

        const sumFotografiaConcluido = arrayDataProcessFotografiaConcluido.reduce((sum, caixa) => sum + (caixa?.ate.toFixed(2) - caixa?.de.toFixed(2)), 0);
        const roundFotografiaConcluido = Math.round(sumFotografiaConcluido * 100) / 100
        const sumFotografiaAndamento = arrayDataProcessFotografiaAndamento.reduce((sum, caixa) => sum + (caixa?.ate.toFixed(2) - caixa?.de.toFixed(2)), 0);
        const roundFotografiaAndamento = Math.round(sumFotografiaAndamento * 100) / 100
        const sumFotografiaNaoIniciado = arrayDataProcessFotografiaNaoIniciado.reduce((sum, caixa) => sum + (caixa?.ate.toFixed(2) - caixa?.de.toFixed(2)), 0);
        const roundFotografiaNaoIniciado = Math.round(sumFotografiaNaoIniciado * 100) / 100

        const sumArquivamentoConcluido = arrayDataProcessArquivamentoConcluido.reduce((sum, caixa) => sum + (caixa?.ate.toFixed(2) - caixa?.de.toFixed(2)), 0);
        const roundArquivamentoConcluido = Math.round(sumArquivamentoConcluido * 100) / 100
        const sumArquivamentoAndamento = arrayDataProcessArquivamentoAndamento.reduce((sum, caixa) => sum + (caixa?.ate.toFixed(2) - caixa?.de.toFixed(2)), 0);
        const roundArquivamentoAndamento = Math.round(sumArquivamentoAndamento * 100) / 100
        const sumArquivamentoNaoIniciado = arrayDataProcessArquivamentoNaoIniciado.reduce((sum, caixa) => sum + (caixa?.ate.toFixed(2) - caixa?.de.toFixed(2)), 0);
        const roundArquivamentoNaoIniciado = Math.round(sumArquivamentoNaoIniciado * 100) / 100

        setConferenciaData(
            [
                { 'Metros': somaTotalDeFuro, 'label': 'Metragem Total' },
                { 'Metros': roundConferenciaNaoIniciado, 'label': 'Metragem não iniciada' },
                { 'Metros': roundConferenciaAndamento, 'label': 'Metragem em andamento' },
                { 'Metros': roundConferenciaConcluido, 'label': 'Metragem processada' }
            ])
        setMarcacaoData(
            [
                { 'Metros': somaTotalDeFuro, 'label': 'Metragem Total' },
                { 'Metros': roundMarcacaoNaoIniciado, 'label': 'Metragem não iniciada' },
                { 'Metros': roundMarcacaoAndamento, 'label': 'Metragem em andamento' },
                { 'Metros': roundMarcacaoConcluido, 'label': 'Metragem processada' }
            ])
        setFotografiaData(
            [
                { 'Metros': somaTotalDeFuro, 'label': 'Metragem Total' },
                { 'Metros': roundFotografiaNaoIniciado, 'label': 'Metragem não iniciada' },
                { 'Metros': roundFotografiaAndamento, 'label': 'Metragem em andamento' },
                { 'Metros': roundFotografiaConcluido, 'label': 'Metragem processada' }
            ])
        setArquivamentoData(
            [
                { 'Metros': somaTotalDeFuro, 'label': 'Metragem Total' },
                { 'Metros': roundArquivamentoNaoIniciado, 'label': 'Metragem não iniciada' },
                { 'Metros': roundArquivamentoAndamento, 'label': 'Metragem em andamento' },
                { 'Metros': roundArquivamentoConcluido, 'label': 'Metragem processada' }
            ])

    }, [
        arrayDataProcessConferenciaConcluido, arrayDataProcessMarcacaoConcluido, arrayDataProcessFotografiaConcluido, arrayDataProcessArquivamentoConcluido,
        arrayDataProcessConferenciaAndamento, arrayDataProcessMarcacaoAndamento, arrayDataProcessFotografiaAndamento, arrayDataProcessArquivamentoAndamento,
        arrayDataProcessConferenciaNaoIniciado, arrayDataProcessMarcacaoNaoIniciado, arrayDataProcessFotografiaNaoIniciado, arrayDataProcessArquivamentoNaoIniciado,
        furoSelecionado, furos, somaTotalDeFuro])

    const colors = ['#0088FE', '#FF5F2D', '#FFBB28', 'green'];

    const [data, setData] = useState()

    useEffect(() => {
        setData(process === 'Conferência' ? conferenciaData
            :
            process === 'Marcação' ? marcacaoData
                :
                process === 'Fotografia' ? fotografiaData
                    :
                    process === 'Arquivamento' ? arquivamentoData : conferenciaData)
    })

    return (
        <Container >
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
            {
                arrayDataProcessConferenciaConcluido.length > 0 ?
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }} >
                        <BarChart
                            style={{ backgroundColor: '#D9D9D9' }}
                            width={

                                window.screen.width > 1900 ?
                                    menuBig ?
                                        1200
                                        :
                                        1450
                                    :
                                    window.screen.width > 1580 ?
                                        1100
                                        :
                                        menuBig ? 800 : 1000
                            }
                            height={
                                window.screen.width > 1900 ?
                                        500
                                    :
                                    window.screen.width > 1580 ?
                                        490
                                        :
                                         300
                            }
                            data={
                                process === 'Conferência' ? conferenciaData
                                    :
                                    process === 'Marcação' ? marcacaoData
                                        :
                                        process === 'Fotografia' ? fotografiaData
                                            :
                                            process === 'Arquivamento' ? arquivamentoData : conferenciaData
                            }
                        >
                            <XAxis dataKey="label" label={{ fontWeight: 'bold', fontSize: 18 }} style={{ textAnchor: 'middle', fontWeight: 'bold', fontSize: 20 }} >
                                <Label value="" angle={0} position="insideLeft" style={{ textAnchor: 'middle', fontWeight: 'bold', fontSize: 20 }} />
                            </XAxis>
                            <YAxis type="number" value='Metros' domain={[0, dataMax => Math.round(dataMax + 10)]} style={{fontWeight: 'bold', fontSize: 20 }} >
                                <Label value="Metros" angle={-90} position="insideLeft" style={{ textAnchor: 'middle', fontWeight: 'bold', fontSize: 20 }} />
                            </YAxis>
                            <Tooltip />
                            <CartesianGrid stroke="#f5f5f5" />
                            <Bar dataKey="Metros" fill="#008F83" label={{ position: 'top' }} style={{fontWeight: 'bold', fontSize: 20 }} >
                                {data?.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={colors[index % 20]} style={{fontWeight: 'bold', fontSize: 20 }} />
                                ))}
                            </Bar>
                        </BarChart>
                    </div>
                    :
                    <></>

            }
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 5px;
    flex-direction: column;
    align-items: center;
    width: 100%;
`

const DatePickerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
`;

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
const Button = styled.button`
    transition: opacity 0.3s;
    align-items: center;
    justify-content: center;
    &:hover {
        opacity: 0.2;
    }

`
