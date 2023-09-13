/* eslint-disable */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import { InformationCircleOutline } from 'react-ionicons'

export default function TopDashboard({ finalizados, conferidos, quantidadeDeNaoIniciado, processamento, furos, selected, chipBoxes, menuBig }) {
    const [hoveredFinalizados, setHoveredFinalizados] = useState(false);
    const [hoveredNaoIniciados, setHoveredNaoIniciados] = useState(false);
    const [hoveredEmProcessamento, setHoveredEmProcessamento] = useState(false);
    const [hoveredComObservacao, setHoveredComObservacao] = useState(false);
    const [furosWithObs, setFurosWithObs] = useState([])

    useEffect(() => {
        let arrayFurosWithObs = []

        const itensFiltradosmarcacao = chipBoxes.filter(item => {
            // Normaliza e converte para minúsculas ambas as strings antes de comparar
            const obs = item.processos?.marcacao?.obs;
            return (
                (obs && obs.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() !== 'sem observacao') &&
                (obs && obs.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() !== 'sem observacoes') &&
                (obs && obs.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() !== 'sem observacoes!')
            );
        });
        arrayFurosWithObs.push(...itensFiltradosmarcacao.map(item => ({ numero: item.furo })));

        const itensFiltradosFotografia = chipBoxes.filter(item => {
            // Normaliza e converte para minúsculas ambas as strings antes de comparar
            const obs = item.processos?.fotografia?.obs;
            return (
                (obs && obs.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() !== 'sem observacao') &&
                (obs && obs.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() !== 'sem observacoes') &&
                (obs && obs.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() !== 'sem observacoes!')
            );
        });
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

        const numerosFuro = arrayFurosWithObs.map((item) => item.numero);
        setFurosWithObs(numerosFuro);

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

    function formatTimestamp(timestamp) {
        const seconds = timestamp.seconds;
        const nanoseconds = timestamp.nanoseconds;
        const date = new Date(seconds * 1000 + nanoseconds / 1000000); // Convertendo nanossegundos para milissegundos
        const formattedDate = `${parseInt(date.getDate()) > 10 ? date.getDate() : '0' + date.getDate()}/${parseInt(date.getMonth() + 1) > 10 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1)}/${date.getFullYear()}`;
        return formattedDate;
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }} >
            <text style={{ fontSize: 20, marginRight: 40, fontWeight: 'bold', color: "#000f000", marginLeft: 10 }} >Painel de informações: </text>
            <div style={{ display: selected !== 'Dashboard' ? 'none' : 'flex', flexDirection: 'row', marginLeft: 10, justifyContent: 'space-between', marginTop: 0, }} >
                <Row  >
                    <div
                        style={{
                            alignItems: 'center',
                            display: 'flex',
                            justifyContent: 'center',
                            backgroundColor: '#206F0D',
                            width: 70,
                            height: 60,
                        }}
                    >
                        <img src="/assets/images/furoimg.png" />
                    </div>
                    <div style={{ backgroundColor: '#2FAB10', height: 60, paddingRight: 20 }}>
                        <Column grande={menuBig}>
                            <TitleBox>FUROS PROCESSADOS</TitleBox>
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: -10 }} >
                                <Number>
                                    {finalizados?.length}
                                </Number>
                                <div
                                    onMouseEnter={handleNumberMouseEnter}
                                    onMouseLeave={handleNumberMouseLeave}
                                    style={{ marginLeft: 20 }}
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

                            </div>

                        </Column>
                    </div>
                </Row>
                <Row  >
                    <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'center', backgroundColor: '#2760BB', width: 70, height: 60 }} >
                        <img src="/assets/images/furoimg.png" />
                    </div>
                    <div style={{ backgroundColor: '#307BF4', height: 60, paddingRight: 20 }} >
                        <Column grande={menuBig}>
                            <TitleBox>FUROS NÃO INICIADOS</TitleBox>
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: -10 }} >
                                <Number>
                                    {quantidadeDeNaoIniciado?.length}
                                </Number>
                                <div
                                    onMouseEnter={handleNumberMouseEnterNaoIniciados}
                                    onMouseLeave={handleNumberMouseLeaveNaoIniciados}
                                    style={{ marginLeft: 20 }}
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

                            </div>
                        </Column>
                    </div>
                </Row>
                <Row  >
                    <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'center', backgroundColor: '#996501', width: 70, height: 60 }} >
                        <img src="/assets/images/furoimg.png" />
                    </div>
                    <div style={{ backgroundColor: '#E89E0E', height: 60, paddingRight: 20 }} >
                        <Column grande={menuBig}>
                            <TitleBox>FUROS EM PROCESSAMENTO</TitleBox>
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: -10 }} >
                                <Number>
                                    {processamento?.length}
                                </Number>
                                <div
                                    onMouseEnter={handleNumberMouseEnterEmProcessamento}
                                    onMouseLeave={handleNumberMouseLeaveEmProcessamento}
                                    style={{ marginLeft: 20 }}
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

                            </div>
                        </Column>
                    </div>
                </Row>
                <Row  >

                    <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'center', backgroundColor: '#990101', width: 70, height: 60, padding:9 }} >
                        <img src="/assets/alertImage.png" />
                    </div>
                    <div style={{ backgroundColor: '#e8410e', height: 60, paddingRight: 20 }} >
                        <Column grande={menuBig}>
                            <TitleBox>FUROS COM OBSERVAÇÃO</TitleBox>
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: -10 }} >
                                <Number>
                                    {furosWithObs?.length}
                                </Number>
                                <div
                                    onMouseEnter={handleNumberMouseEnterComObservacao}
                                    onMouseLeave={handleNumberMouseLeaveComObservacao}
                                    style={{ marginLeft: 20 }}
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

                            </div>
                        </Column>
                    </div>
                </Row>
            </div>
        </div>

    )
}
const Row = styled.div`
    display: flex;
    flex-direction: row; 
    //margin-left : 25px;
    margin-right: 25px;
`
const Column = styled.div`
    display: flex;
    flex-direction:  ${props => (props.grande ? 'column' : 'column')};
    margin-left: 15px;
`
const TitleBox = styled.text({
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
    userSelect: 'none',

    WebkitTextStrokeWidth: 0.1,
    WebkitTextStrokeColor: 'black'
})
const Number = styled.text({
    fontSize: 35,
    color: 'white',
    fontWeight: 'bold',
    userSelect: 'none',
    WebkitTextStrokeWidth: 1.5,
    WebkitTextStrokeColor: 'black'
})
const ObjectList = styled.ul`
  list-style-type: none;
  padding: 6;
  background-color: #206f0d;
  position: absolute; /* Importante para posicionar corretamente */
  z-index: 999; /* Valor alto para garantir que fique por cima de outros elementos */
  /* Resto do estilo... */
  border-radius: 15;
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
  /* Resto do estilo... */
  border-radius: 15;
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
  /* Resto do estilo... */
  border-radius: 15;
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
  /* Resto do estilo... */
  border-radius: 15;
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
    background-color: #08a1f3;
  }
`;