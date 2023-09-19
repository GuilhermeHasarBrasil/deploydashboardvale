import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList } from 'recharts';
import styled from 'styled-components'

export default function BarChartWeek({ contagensPorDiaConferencia, contagensPorDiaMarcacao, contagensPorDiaFotografia, contagensPorDiaDensidade, contagensPorDiaSerragem, contagensPorDiaDespacho, contagensPorDiaArquivamento, chipBoxes, menuBig }) {

    const diasDaSemana = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira'];
    const [arrayDiasProcesso, setArrayDiasProcesso] = useState()
    const [process, setProcess] = useState('Conferência');
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

    useEffect(() => {
        if (process == 'Conferência') {
            const data = diasDaSemana.map(dia => ({ dia, 'Quantidade de caixas processadas': contagensPorDiaConferencia[dia] || 0 }));
            setArrayDiasProcesso(data)
        }
        if (process == 'Marcação') {
            const data = diasDaSemana.map(dia => ({ dia, 'Quantidade de caixas processadas': contagensPorDiaMarcacao[dia] || 0 }));
            setArrayDiasProcesso(data)
        }
        if (process == 'Fotografia') {
            const data = diasDaSemana.map(dia => ({ dia, 'Quantidade de caixas processadas': contagensPorDiaFotografia[dia] || 0 }));
            setArrayDiasProcesso(data)
        }
        if (process == 'Densidade') {
            const data = diasDaSemana.map(dia => ({ dia, 'Quantidade de caixas processadas': contagensPorDiaDensidade[dia] || 0 }));
            setArrayDiasProcesso(data)
        }
        if (process == 'Serragem') {
            const data = diasDaSemana.map(dia => ({ dia, 'Quantidade de caixas processadas': contagensPorDiaSerragem[dia] || 0 }));
            setArrayDiasProcesso(data)
        }
        if (process == 'Despacho') {
            const data = diasDaSemana.map(dia => ({ dia, 'Quantidade de caixas processadas': contagensPorDiaDespacho[dia] || 0 }));
            setArrayDiasProcesso(data)
        }
        if (process == 'Arquivamento') {
            const data = diasDaSemana.map(dia => ({ dia, 'Quantidade de caixas processadas': contagensPorDiaArquivamento[dia] || 0 }));
            setArrayDiasProcesso(data)
        }
    }, [process, chipBoxes])

    const [date1, setDate1] = useState()
    const [date2, setDate2] = useState()

    useEffect(() => {
        const dataHoraObjeto1 = new Date(date1);
        const dataHoraObjeto2 = new Date(date2);
        // Converter milissegundos para segundos
        const segundos1 = Math.floor(dataHoraObjeto1.getTime() / 1000);
        const segundos2 = Math.floor(dataHoraObjeto1.getTime() / 1000);
        // Obter milissegundos
        const milissegundos = dataHoraObjeto1.getMilliseconds();
        //console.log(`Segundos: ${segundos1}`);
        //console.log(`Segundos: ${segundos2}`);
        //console.log(`Milissegundos: ${milissegundos}`);
    }, [date1, date2])

    const [chartHeight, setChartHeight] = useState(menuBig ? 500 : 500)
    const [chartWidth, setChartWidth] = useState(menuBig ? 500 : 500);

    useEffect(() => {
        const handleResize = () => {
            setChartHeight(window.screen.height); // Ajuste o tamanho conforme necessário
            setChartWidth(window.screen.width); // Ajuste o tamanho conforme necessário
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [menuBig]);

    const renderCustomizedLabel = (props) => {
        const { x, y, width, height, value } = props;
        const radius = 10;

        return (
            <g>
                <text style={{ fontWeight: 'bold', fontSize: 20 }} x={x + width / 2} y={y - radius} fill="#008F83" textAnchor="middle" dominantBaseline="middle">
                    {value + ' caixas'}
                </text>
            </g>
        );
    };

    return (
        <div style={{ marginTop: 10, marginLeft: 40 }} >
            <h1 style={{ marginLeft: 30, marginTop: 10, marginBottom: 5, fontSize: 20, fontWeight: 'bold', userSelect: 'none' }} >Caixas finalizadas por dia da semana (por processo)</h1>
            <ul style={{ display: 'flex', flexDirection: 'row', overflowX: 'auto', overflow: 'hidden', marginLeft: 120, marginBottom: 10 }} >
                {processos.map((furo, index) => (
                    <li style={{ marginLeft: 15, marginRight: 0, backgroundColor: furo.processo == process ? '#008f83' : '#c4c4c4', padding: 8, borderRadius: 10 }} key={furo.id}>
                        <Button>
                            <h1 style={{ color: furo.processo !== process ? 'black' : '#f3c108', width: 120, fontWeight: 'bold', userSelect: 'none' }} onClick={() => sett(furo.processo, index)} >
                                {furo.processo}
                            </h1>
                        </Button>
                    </li>
                ))}
            </ul>
            <div style={{ display: 'flex', flexDirection: 'row' }} >
                <BarChart
                    width={
                        window.screen.width > 1900 ?
                            menuBig ? 1300 : 1500
                            :
                            window.screen.width > 1600 ?
                                menuBig ? 1100 : 1300
                                :
                                menuBig ? 1000 : 1200
                    }
                    height={
                        window.screen.width > 1900 ?
                            menuBig ? 500 : 500
                            :
                            window.screen.width > 1600 ?
                                menuBig ? 420 : 420
                                :
                                menuBig ? 300 : 300
                    }
                    style=
                    {
                        {
                            marginLeft: window.screen.width > 1900 ? 100 : 0
                        }
                    }
                    data={arrayDiasProcesso}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="dia" />
                    <YAxis type="number" domain={[0, dataMax => dataMax + 2]} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Quantidade de caixas processadas" fill="#008F83" >
                        <LabelList dataKey="Quantidade de caixas processadas" content={renderCustomizedLabel} />
                    </Bar>
                </BarChart>
                {/* <div style={{ display: 'flex', flexDirection: 'column' }} >
                    <input
                        type='datetime-local'
                        style={{ backgroundColor: 'white', width: 400, marginBottom: 15, height: 40, padding: 2, borderRadius: 5, borderWidth: 1, borderColor: 'black' }}
                        onChange={(e) => setDate1(e.target.value)}
                    />
                    <input
                        type='datetime-local'
                        style={{ backgroundColor: 'white', width: 400, marginBottom: 15, height: 40, padding: 2, borderRadius: 5, borderWidth: 1, borderColor: 'black' }}
                        onChange={(e) => setDate2(e.target.value)}
                    />
                </div> */}

            </div>

        </div>
    );
}

const Button = styled.button`
    transition: opacity 0.3s;
    align-items: center;
    justify-content: center;
    &:hover {
        opacity: 0.2;
    }

`