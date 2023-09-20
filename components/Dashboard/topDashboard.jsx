/* eslint-disable */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import { InformationCircleOutline } from 'react-ionicons'
import { SwapVerticalOutline } from 'react-ionicons'
import { usePauseContext } from '../../contexts/PauseContext';

export default function TopDashboard({ finalizados, conferidos, quantidadeDeNaoIniciado, processamento, furos, selected, chipBoxes, menuBig, dataTopDashboard, dataBarChartTodos, caixasFinalizadas, caixasEmAndamento, caixasNaoIniciadas }) {
    const [hoveredFinalizados, setHoveredFinalizados] = useState(false);
    const [hoveredNaoIniciados, setHoveredNaoIniciados] = useState(false);
    const [hoveredEmProcessamento, setHoveredEmProcessamento] = useState(false);
    const [hoveredComObservacao, setHoveredComObservacao] = useState(false);
    const [furosWithObs, setFurosWithObs] = useState([])
    const [caixasWithObs, setCaixasWithObs] = useState()
    const [caixasObs, setCaixasObs] = useState()
    const [hoveredCaixaNaoIniciada, setHoveredCaixaNaoIniciada] = useState(false);
    const { isPaused, timePlay } = usePauseContext();

    const [paused, setPaused] = useState(isPaused)
    const [time, setTime] = useState(timePlay)

    useEffect(() => {
        setPaused(isPaused)
        setTime(timePlay)
    }, [selected])

    useEffect(() => {
        let arrayFurosWithObs = []
        let arrayCaixasWithObs = []

        const itensFiltradosmarcacao = chipBoxes.sort((a, b) => {
            // Ordenar pelo campo 'furo' em ordem alfabética
            if (a.furo < b.furo) return -1;
            if (a.furo > b.furo) return 1;
            // Se 'furo' for igual, ordenar pelo campo 'cx' em ordem alfabética
            if (a.cx < b.cx) return -1;
            if (a.cx > b.cx) return 1;
            return 0;
        }).filter(item => {
            // Normaliza e converte para minúsculas ambas as strings antes de comparar
            const obs = item.processos?.marcacao?.obs;
            return (
                (obs && obs.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() !== 'sem observacao') &&
                (obs && obs.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() !== 'sem observacoes') &&
                (obs && obs.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() !== 'sem observacoes!')
            );
        });
        arrayCaixasWithObs.push(...itensFiltradosmarcacao.map(item => ({ caixa: item.furo + '-' + item.cx, cx: item.cx, furo: item.furo, processo: 'Marcação', obs: item?.processos?.marcacao?.obs })));
        arrayFurosWithObs.push(...itensFiltradosmarcacao.map(item => ({ numero: item.furo })));

        const itensFiltradosFotografia = chipBoxes.sort((a, b) => {
            // Ordenar pelo campo 'furo' em ordem alfabética
            if (a.furo < b.furo) return -1;
            if (a.furo > b.furo) return 1;
            // Se 'furo' for igual, ordenar pelo campo 'cx' em ordem alfabética
            if (a.cx < b.cx) return -1;
            if (a.cx > b.cx) return 1;
            return 0;
        }).filter(item => {
            // Normaliza e converte para minúsculas ambas as strings antes de comparar
            const obs = item.processos?.fotografia?.obs;
            return (
                (obs && obs.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() !== 'sem observacao') &&
                (obs && obs.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() !== 'sem observacoes') &&
                (obs && obs.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() !== 'sem observacoes!')
            );
        });
        arrayCaixasWithObs.push(...itensFiltradosFotografia.map(item => ({ caixa: item.furo + '-' + item.cx, cx: item.cx, furo: item.furo, processo: 'Fotografia', obs: item?.processos?.fotografia?.obs })))
        arrayFurosWithObs.push(...itensFiltradosFotografia.map(item => ({ numero: item.furo })))

        const itensFiltradosGeologica = furos.filter(item => {
            // Normaliza e converte para minúsculas ambas as strings antes de comparar
            const obs = item.processos?.geologia?.descGeologica?.obs;
            return (
                (obs && obs.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() !== 'sem observacao') &&
                (obs && obs.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() !== 'sem observacoes') &&
                (obs && obs.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() !== 'sem observacoes!')
            );
        });
        arrayFurosWithObs.push(...itensFiltradosGeologica)

        const itensFiltradosGeotecnica = furos.filter(item => {
            // Normaliza e converte para minúsculas ambas as strings antes de comparar
            const obs = item.processos?.geologia?.descGeotecnica?.obs;
            return (
                (obs && obs.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() !== 'sem observacao') &&
                (obs && obs.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() !== 'sem observacoes') &&
                (obs && obs.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() !== 'sem observacoes!')
            );
        });
        arrayFurosWithObs.push(...itensFiltradosGeotecnica)

        const itensFiltradosEstrutural = furos.filter(item => {
            // Normaliza e converte para minúsculas ambas as strings antes de comparar
            const obs = item.processos?.geologia?.descEstrutural?.obs;
            return (
                (obs && obs.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() !== 'sem observacao') &&
                (obs && obs.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() !== 'sem observacoes') &&
                (obs && obs.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() !== 'sem observacoes!')
            );
        });
        arrayFurosWithObs.push(...itensFiltradosEstrutural)

        const itensFiltradosDensidade = furos.filter(item => {
            // Normaliza e converte para minúsculas ambas as strings antes de comparar
            const obs = item.processos?.densidade?.obs;
            return (
                (obs && obs.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() !== 'sem observacao') &&
                (obs && obs.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() !== 'sem observacoes') &&
                (obs && obs.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() !== 'sem observacoes!')
            );
        });
        arrayFurosWithObs.push(...itensFiltradosDensidade)

        const itensFiltradosSerragem = furos.filter(item => {
            const obs = item.processos?.serragem?.obs;
            return (
                (obs && obs.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() !== 'sem observacao') &&
                (obs && obs.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() !== 'sem observacoes') &&
                (obs && obs.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() !== 'sem observacoes!')
            );
        });
        arrayFurosWithObs.push(...itensFiltradosSerragem)

        const uniqueFuroNumbers = new Set();

        arrayFurosWithObs = arrayFurosWithObs.filter((item) => {
            if (!uniqueFuroNumbers.has(item.numero)) {
                uniqueFuroNumbers.add(item.numero);
                return true;
            }
            return false; // Descarta itens duplicados
        });

        setCaixasObs(arrayCaixasWithObs)

        const uniqueCaixaNumbers = new Set();
        arrayCaixasWithObs = arrayCaixasWithObs.filter((item) => {
            if (!uniqueCaixaNumbers.has(item.caixa)) {
                uniqueCaixaNumbers.add(item.caixa);
                return true;
            }
            return false; // Descarta itens duplicados
        });

        const numerosFuro = arrayFurosWithObs.map((item) => item.numero);
        const numerosCaixa = arrayCaixasWithObs.map((item) => item.caixa);

        setFurosWithObs(numerosFuro);
        setCaixasWithObs(numerosCaixa)

    }, [furos, chipBoxes])

    const handleNumberMouseEnter = () => {
        setHoveredFinalizados(true);
    };

    const handleNumberMouseLeave = () => {
        setHoveredFinalizados(false);
    };

    const handleNumberMouseEnterNaoIniciados = () => {
        setHoveredNaoIniciados(true);
    };

    const handleNumberMouseLeaveNaoIniciados = () => {
        setHoveredNaoIniciados(false);
    };

    const handleNumberMouseEnterEmProcessamento = () => {
        setHoveredEmProcessamento(true);
    };

    const handleNumberMouseLeaveEmProcessamento = () => {
        setHoveredEmProcessamento(false);
    };

    const handleNumberMouseEnterComObservacao = () => {
        setHoveredComObservacao(true);
    };

    const handleNumberMouseLeaveComObservacao = () => {
        setHoveredComObservacao(false);
    };

    const handleNumberMouseEnterCaixaNaoIniciada = () => {
        setHoveredCaixaNaoIniciada(true);
    };

    const handleNumberMouseLeaveCaixaNaoIniciada = () => {
        setHoveredCaixaNaoIniciada(false);
    };

    function formatTimestamp(timestamp) {
        const seconds = timestamp.seconds;
        const nanoseconds = timestamp.nanoseconds;
        const date = new Date(seconds * 1000 + nanoseconds / 1000000); // Convertendo nanossegundos para milissegundos
        const formattedDate = `${parseInt(date.getDate()) > 10 ? date.getDate() : '0' + date.getDate()}/${parseInt(date.getMonth() + 1) > 10 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1)}/${date.getFullYear()}`;
        return formattedDate;
    }

    const [optionsCaixa, setOptionsCaixa] = useState(false)

    const handleOptionChange = () => {
        setOptionsCaixa(!optionsCaixa)
    }

    useEffect(() => {
        if (!isPaused) {
            setTimeout(() => {
                setOptionsCaixa(!optionsCaixa)
            }, time);
        }
    }, [optionsCaixa, paused])

    return (
        <Column notMargin={true} >
            <TitleTopDashboard selected={selected !== 'Dashboard' ? 'none' : 'flex'} >{window.screen.width < 1900 ? 'Informações' : 'Painel de informações '} {optionsCaixa ? 'das caixas' : 'dos furos'}: </TitleTopDashboard>
            <div style={{ display: selected !== 'Dashboard' ? 'none' : 'flex', flexDirection: 'row', marginLeft: window.screen.width < 1900 ? -10 : 10, justifyContent: 'space-between', marginTop: 0, }} >
                {
                    optionsCaixa ?
                        <>
                            <Row  >
                                <BgImageCards BgColor={'#206F0D'} Padding={
                                    window.screen.width > 1900 ?
                                        0 :
                                        window.screen.width > 1600 ? 0 :
                                            window.screen.width < 1370 ? 6 : 6
                                }>
                                    <img src="/assets/images/furoimg.png" />
                                </BgImageCards>
                                <CardInfos BgColor={'#2FAB10'} >
                                    <Column grande={menuBig}>
                                        <TitleBox>CAIXAS PROCESSADAS</TitleBox>
                                        <RowIconsCards >
                                            <Number>
                                                {dataBarChartTodos[3]?.processed + '/' + chipBoxes?.length}
                                            </Number>
                                            <div
                                                onMouseEnter={handleNumberMouseEnter}
                                                onMouseLeave={handleNumberMouseLeave}
                                                style={{ marginLeft: 0 }}
                                            >
                                                <InformationCircleOutline
                                                    color={'#00000'}
                                                    beat
                                                    title={''}
                                                    height="25px"
                                                    width="25px"
                                                    style={{ marginRight: menuBig ? 0 : 0 }}
                                                />
                                                {hoveredFinalizados && (
                                                    <ObjectList>
                                                        {caixasFinalizadas?.map((item, index) => (
                                                            <ObjectItem key={index}>
                                                                <text style={{ color: 'white', fontWeight: 'bold', fontSize: 18, }} >Furo: {item?.furo}, <br></br> Caixa: {item?.cx}</text>
                                                                <text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }} >Finalizado em: {formatTimestamp(item?.processos?.arquivamento?.sai)}</text>
                                                            </ObjectItem>
                                                        ))}
                                                    </ObjectList>
                                                )}
                                            </div>

                                        </RowIconsCards>

                                    </Column>
                                </CardInfos>
                            </Row>
                            <Row  >
                                <BgImageCards BgColor={'#2f4160'} Padding={
                                    window.screen.width > 1900 ?
                                        0 :
                                        window.screen.width > 1600 ? 0 :
                                            window.screen.width < 1370 ? 6 : 6
                                } >
                                    <img src="/assets/images/furoimg.png" />
                                </BgImageCards>
                                <CardInfos BgColor={'#92b8c3'} >
                                    <Column grande={menuBig}>
                                        <TitleBox>CAIXAS NÃO INICIADAS</TitleBox>
                                        <RowIconsCards >
                                            <Number>
                                                {chipBoxes?.length - dataBarChartTodos[0]?.processed}
                                            </Number>
                                            <div
                                                onMouseEnter={handleNumberMouseEnterCaixaNaoIniciada}
                                                onMouseLeave={handleNumberMouseLeaveCaixaNaoIniciada}
                                                style={{ marginLeft: 0 }}
                                            >
                                                <InformationCircleOutline
                                                    color={'#00000'}
                                                    beat
                                                    title={''}
                                                    height="25px"
                                                    width="25px"
                                                    style={{ marginRight: menuBig ? 0 : 0 }}
                                                />
                                                {hoveredCaixaNaoIniciada && (
                                                    <ObjectListNaoIniciado>
                                                        {caixasNaoIniciadas?.map((item, index) => (
                                                            <ObjectItemNaoIniciado key={index}>
                                                                <text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }} >Furo: {item?.furo}, <br></br> Caixa: {item?.cx} </text>
                                                            </ObjectItemNaoIniciado>
                                                        ))}
                                                    </ObjectListNaoIniciado>
                                                )}
                                            </div>
                                        </RowIconsCards>
                                    </Column>
                                </CardInfos>
                            </Row>
                            <Row  >
                                <BgImageCards BgColor={'#996501'} Padding={
                                    window.screen.width > 1900 ?
                                        0 :
                                        window.screen.width > 1600 ? 0 :
                                            window.screen.width < 1370 ? 6 : 6
                                } >
                                    <img src="/assets/images/furoimg.png" />
                                </BgImageCards>
                                <CardInfos BgColor={'#E89E0E'} >
                                    <Column grande={menuBig}>
                                        <TitleBox>CAIXAS EM PROCESSAMENTO</TitleBox>
                                        <RowIconsCards >
                                            <Number>
                                                {dataBarChartTodos[0]?.processed - dataBarChartTodos[3]?.processed}
                                            </Number>
                                            <div
                                                onMouseEnter={handleNumberMouseEnterEmProcessamento}
                                                onMouseLeave={handleNumberMouseLeaveEmProcessamento}
                                                style={{ marginLeft: 0 }}
                                            >
                                                <InformationCircleOutline
                                                    color={'#00000'}
                                                    beat
                                                    title={''}
                                                    height="25px"
                                                    width="25px"
                                                    style={{ marginRight: menuBig ? 0 : 0 }}
                                                />
                                                {hoveredEmProcessamento && (
                                                    <ObjectListProcessamento>
                                                        {caixasEmAndamento?.map((item, index) => (
                                                            <ObjectItemProcessamento key={index}>
                                                                <text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }} >Furo: {item?.furo}, <br></br> Caixa: {item.cx} </text>
                                                                <text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }} >Conferida em: {formatTimestamp(item?.processos?.conferencia?.sai)}</text>
                                                            </ObjectItemProcessamento>
                                                        ))}
                                                    </ObjectListProcessamento>
                                                )}
                                            </div>

                                        </RowIconsCards>
                                    </Column>
                                </CardInfos>
                            </Row>
                            <Row  >
                                <BgImageCards BgColor={'#990101'} Padding={9} >
                                    <img src="/assets/alertImage.png" />
                                </BgImageCards>
                                <CardInfos BgColor={'#e8410e'} >
                                    <Column grande={menuBig}>
                                        <TitleBox>CAIXAS COM OBSERVAÇÃO</TitleBox>
                                        <RowIconsCards >
                                            <Number>
                                                {caixasWithObs?.length}
                                            </Number>
                                            <div
                                                onMouseEnter={handleNumberMouseEnterComObservacao}
                                                onMouseLeave={handleNumberMouseLeaveComObservacao}
                                                style={{ marginLeft: 0 }}
                                            >
                                                <InformationCircleOutline
                                                    color={'#00000'}
                                                    beat
                                                    title={''}
                                                    height="25px"
                                                    width="25px"
                                                    style={{ marginRight: menuBig ? 0 : 0 }}
                                                />
                                                {hoveredComObservacao && (
                                                    <ObjectListObservacao>
                                                        {caixasObs?.map((item, index) => (
                                                            <ObjectItemObservacao key={index}>
                                                                <text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }} >
                                                                    Furo: {item.furo}, <br></br> Caixa: {item.cx}, <br></br> Processo: {item.processo}, <br></br> Observação: {item.obs}
                                                                </text>
                                                            </ObjectItemObservacao>
                                                        ))}
                                                    </ObjectListObservacao>
                                                )}
                                            </div>

                                        </RowIconsCards>
                                    </Column>
                                </CardInfos>
                            </Row>
                        </>
                        :
                        <>
                            <Row  >
                                <BgImageCards BgColor={'#206F0D'} Padding={
                                    window.screen.width > 1900 ?
                                        0 :
                                        window.screen.width > 1600 ? 0 :
                                            window.screen.width < 1370 ? 6 : 6
                                }>
                                    <img src="/assets/images/furoimg.png" />
                                </BgImageCards>
                                <CardInfos BgColor={'#2FAB10'}>
                                    <Column grande={menuBig}>
                                        <TitleBox>FUROS PROCESSADOS</TitleBox>
                                        <RowIconsCards >
                                            <Number>
                                                {finalizados?.length}
                                            </Number>
                                            <div
                                                onMouseEnter={handleNumberMouseEnter}
                                                onMouseLeave={handleNumberMouseLeave}
                                                style={{ marginLeft: 0 }}
                                            >
                                                <InformationCircleOutline
                                                    color={'#00000'}
                                                    beat
                                                    title={''}
                                                    height="25px"
                                                    width="25px"
                                                    style={{ marginRight: menuBig ? 0 : 0 }}
                                                />
                                                {hoveredFinalizados && (
                                                    <ObjectList>
                                                        {finalizados?.map((item, index) => (
                                                            <ObjectItem key={index}>
                                                                <text style={{ color: 'white', fontWeight: 'bold', fontSize: 18, }} >Furo: {item?.numero}</text>
                                                                <text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }} >Finalizado em: {formatTimestamp(item?.dataFinalizado)}</text>
                                                            </ObjectItem>
                                                        ))}
                                                    </ObjectList>
                                                )}
                                            </div>

                                        </RowIconsCards>

                                    </Column>
                                </CardInfos>
                            </Row>
                            <Row  >
                                <BgImageCards BgColor={'#62728f'} Padding={
                                    window.screen.width > 1900 ?
                                        0 :
                                        window.screen.width > 1600 ? 0 :
                                            window.screen.width < 1370 ? 6 : 6
                                } >
                                    <img src="/assets/images/furoimg.png" />
                                </BgImageCards>
                                <CardInfos BgColor={'#92b8c3'} >
                                    <Column grande={menuBig}>
                                        <TitleBox>FUROS NÃO INICIADOS</TitleBox>
                                        <RowIconsCards >
                                            <Number>
                                                {quantidadeDeNaoIniciado?.length}
                                            </Number>
                                            <div
                                                onMouseEnter={handleNumberMouseEnterNaoIniciados}
                                                onMouseLeave={handleNumberMouseLeaveNaoIniciados}
                                                style={{ marginLeft: 0 }}
                                            >
                                                <InformationCircleOutline
                                                    color={'#00000'}
                                                    beat
                                                    title={''}
                                                    height="25px"
                                                    width="25px"
                                                    style={{ marginRight: menuBig ? 0 : 0 }}
                                                />
                                                {hoveredNaoIniciados && (
                                                    <ObjectListNaoIniciado>
                                                        {quantidadeDeNaoIniciado?.map((item, index) => (
                                                            <ObjectItemNaoIniciado key={index}>
                                                                <text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }} >Furo: {item?.numero}</text>
                                                                <text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }} >Importado em: {formatTimestamp(item?.createdAt)}</text>
                                                            </ObjectItemNaoIniciado>
                                                        ))}
                                                    </ObjectListNaoIniciado>
                                                )}
                                            </div>

                                        </RowIconsCards>
                                    </Column>
                                </CardInfos>
                            </Row>
                            <Row  >
                                <BgImageCards BgColor={'#996501'} Padding={
                                    window.screen.width > 1900 ?
                                        0 :
                                        window.screen.width > 1600 ? 0 :
                                            window.screen.width < 1370 ? 6 : 6
                                } >
                                    <img src="/assets/images/furoimg.png" />
                                </BgImageCards>
                                <CardInfos BgColor={'#E89E0E'} >
                                    <Column grande={menuBig}>
                                        <TitleBox>FUROS EM PROCESSAMENTO</TitleBox>
                                        <RowIconsCards >
                                            <Number>
                                                {processamento?.length}
                                            </Number>
                                            <div
                                                onMouseEnter={handleNumberMouseEnterEmProcessamento}
                                                onMouseLeave={handleNumberMouseLeaveEmProcessamento}
                                                style={{ marginLeft: 0 }}
                                            >
                                                <InformationCircleOutline
                                                    color={'#00000'}
                                                    beat
                                                    title={''}
                                                    height="25px"
                                                    width="25px"
                                                    style={{ marginRight: menuBig ? 0 : 0 }}
                                                />
                                                {hoveredEmProcessamento && (
                                                    <ObjectListProcessamento>
                                                        {processamento?.map((item, index) => (
                                                            <ObjectItemProcessamento key={index}>
                                                                <text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }} >Furo: {item?.numero}</text>
                                                                <text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }} >Importado em: {formatTimestamp(item?.createdAt)}</text>
                                                            </ObjectItemProcessamento>
                                                        ))}
                                                    </ObjectListProcessamento>
                                                )}
                                            </div>

                                        </RowIconsCards>
                                    </Column>
                                </CardInfos>
                            </Row>
                            <Row  >

                                <BgImageCards BgColor={'#990101'} Padding={9} >
                                    <img src="/assets/alertImage.png" />
                                </BgImageCards>
                                <CardInfos BgColor={'#e8410e'} >
                                    <Column grande={menuBig}>
                                        <TitleBox>FUROS COM OBSERVAÇÃO</TitleBox>
                                        <RowIconsCards >
                                            <Number>
                                                {furosWithObs?.length}
                                            </Number>
                                            <div
                                                onMouseEnter={handleNumberMouseEnterComObservacao}
                                                onMouseLeave={handleNumberMouseLeaveComObservacao}
                                                style={{ marginLeft: 0 }}
                                            >
                                                <InformationCircleOutline
                                                    color={'#00000'}
                                                    beat
                                                    title={''}
                                                    height="25px"
                                                    width="25px"
                                                    style={{ marginRight: menuBig ? 0 : 0 }}
                                                />
                                                {hoveredComObservacao && (
                                                    <ObjectListObservacao>
                                                        {furosWithObs?.map((item, index) => (
                                                            <ObjectItemObservacao key={index}>
                                                                <text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }} >Furo: {item}</text>
                                                            </ObjectItemObservacao>
                                                        ))}
                                                    </ObjectListObservacao>
                                                )}
                                            </div>

                                        </RowIconsCards>
                                    </Column>
                                </CardInfos>
                            </Row>
                        </>
                }
                <Button onClick={handleOptionChange} >
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor:'##008f83' }} >
                        <TextButtonSwap>Alternar<br></br>para {!optionsCaixa ? 'caixa' : 'furo'}</TextButtonSwap>
                        <SwapVerticalOutline
                            color={'#fff'}
                            title={''}
                            height="40px"
                            width="40px"
                            style={{ marginRight: 0 }}
                        />
                    </div>

                </Button>
            </div>
        </Column>

    )
}
const TextButtonSwap = styled.text`
    display: flex;
    color: white;
    font-weight: 700;
    @media only screen and (max-device-width: 1679px) {
        display: none;
    }
`

const TitleTopDashboard = styled.text`
    
    font-size: 18px;
    font-weight: bold;
    color: #000000;
    margin-right: 40px;
    margin-left: 10px;
    display: ${props => props.selected};
    @media only screen and (max-device-width: 1679px) {
        font-size:15px;
        margin-left: 10px;
    }
    @media only screen and (max-device-width: 1370px) {
        font-size:14px;
        margin-left: -4px;
    }
`

const RowIconsCards = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: -10px;
    @media only screen and (max-device-width: 1679px) {
        flex-direction: row;
    }
`
const CardInfos = styled.div`
    height: 60px;
    padding-right: 20px;
    background-color: ${props => (props.BgColor)};
    @media only screen and (max-device-width: 1679px) {
        height: 50px;
    }
    @media only screen and (max-device-width: 1370px) {
        height: 44px;
    }
`
const BgImageCards = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.BgColor};
    width: 70px;
    height: 60px;
    padding: ${props => props.Padding + 'px'} ;
    @media only screen and (max-device-width: 1679px) {
        width: 60px;
        height: 50px;
    }
    @media only screen and (max-device-width: 1370px) {
        width: 60px;
        height: 44px;
    }
`
const Row = styled.div`
    display: flex;
    flex-direction: row; 
    //margin-left : 25px;
    margin-right: 15px;
    @media only screen and (max-device-width: 1679px) {
        margin-right: 2px;
    }
`
const Column = styled.div`
    display: flex;
    flex-direction:  ${props => (props.grande ? 'column' : 'column')};
    margin-left: ${props => (props.notMargin ? '0px' : '15px')};
    @media only screen and (max-device-width: 1679px) {
            flex-direction: column;
            margin-bottom: -6px;
            margin-top: 2px;
            margin-left:15px;
    }
    
`
const TitleBox = styled.div`
    color: white;
    font-size: 17px;
    font-weight: bold;
    user-select: none;
    @media only screen and (max-device-width: 1679px) {
        font-size: 15px;
    }
    @media only screen and (max-device-width: 1370px) {
        font-size: 12px;
    }
`

const Number = styled.text`
    font-size: 32px;
    color: white;
    font-weight: bold;
    user-select: none;
    margin-right: 20px;
    @media only screen and (max-device-width: 1679px) {
        font-size:19px;
        user-select: none;
        margin-right: 0px;
        margin-top: 10px;
    }
`
const Button = styled.button`
    transition: opacity 0.3s;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
    background-color: #008F83;
    padding: 6px;
    padding-left: 9px;
    border-radius: 6px;
    &:hover {
        opacity: 0.2;
    }
    @media only screen and (max-device-width: 1679px) {
        width: 50px;
        height: 50px;
        margin-right: 0px;
        padding: 3px;
        padding-left: 3px;
    }
    @media only screen and (max-device-width: 1679px) {
        width: 50px;
        height: 50px;
        margin-right: 0px;
        padding: 1px;
        padding-left: 1px;
    }
`
const ObjectList = styled.ul`
  list-style-type: none;
  padding: 6px; /* Adicione "px" ao valor do padding */
  background-color: #206f0d;
  position: absolute;
  z-index: 999;
height: auto; /* Defina a altura como "auto" */
  max-height: 300px; /* Defina a altura máxima desejada */  overflow-y: auto; /* Habilita a rolagem vertical se o conteúdo ultrapassar a altura */
  /* Resto do estilo... */
  border-radius: 15px; /* Adicione "px" ao valor do border-radius */
`;
const ObjectItem = styled.li`
  padding: 8px;
  border-bottom: 1px solid #ccc;
  background-color: #206f0d;
  display: flex;
  flex-direction: column;
  border-radius: 15;

  cursor: default;
  user-select: none;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #6af308;
  }
`;
const ObjectListProcessamento = styled.ul`
  list-style-type: none;
  padding: 6;
  background-color: #996501;
  position: absolute; /* Importante para posicionar corretamente */
  z-index: 999; /* Valor alto para garantir que fique por cima de outros elementos */
height: auto; /* Defina a altura como "auto" */
  max-height: 300px; /* Defina a altura máxima desejada */  overflow-y: auto; /* Habilita a rolagem vertical se o conteúdo ultrapassar a altura */
  /* Resto do estilo... */
  border-radius: 15px; /* Adicione "px" ao valor do border-radius */
  
`;
const ObjectItemProcessamento = styled.li`
  padding: 8px;
  border-bottom: 1px solid #ccc;
  background-color: #996501;
  display: flex;
  flex-direction: column;
  border-radius: 15;

  cursor: default;
  user-select: none;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #f3c108;
  }
`;
const ObjectListNaoIniciado = styled.ul`
  list-style-type: none;
  padding: 6;
  background-color: #2760bb;
  position: absolute; /* Importante para posicionar corretamente */
  z-index: 999; /* Valor alto para garantir que fique por cima de outros elementos */
height: auto; /* Defina a altura como "auto" */
  max-height: 300px; /* Defina a altura máxima desejada */  overflow-y: auto; /* Habilita a rolagem vertical se o conteúdo ultrapassar a altura */
  /* Resto do estilo... */
  border-radius: 15px; /* Adicione "px" ao valor do border-radius */
`;
const ObjectItemNaoIniciado = styled.li`
  padding: 8px;
  border-bottom: 1px solid #ccc;
  background-color: #2760bb;
  display: flex;
  flex-direction: column;
  border-radius: 15;

  cursor: default;
  user-select: none;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #08a1f3;
  }
`;
const ObjectListObservacao = styled.ul`
  list-style-type: none;
  padding: 6;
  background-color: #bb272e;
  position: absolute; /* Importante para posicionar corretamente */
  z-index: 999; /* Valor alto para garantir que fique por cima de outros elementos */
height: auto; /* Defina a altura como "auto" */
  max-height: 300px; /* Defina a altura máxima desejada */  overflow-y: auto; /* Habilita a rolagem vertical se o conteúdo ultrapassar a altura */
  /* Resto do estilo... */
  border-radius: 15px; /* Adicione "px" ao valor do border-radius */
`;
const ObjectItemObservacao = styled.li`
  padding: 8px;
  border-bottom: 1px solid #ccc;
  background-color: #bb4e27;
  display: flex;
  flex-direction: column;
  border-radius: 15;

  cursor: default;
  user-select: none;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #f30808;
  }
`;