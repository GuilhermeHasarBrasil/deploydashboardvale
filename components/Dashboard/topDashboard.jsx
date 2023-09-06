/* eslint-disable */
import React, { useState } from 'react';
import styled from 'styled-components'
import { InformationCircleOutline } from 'react-ionicons'

export default function TopDashboard({ finalizados, conferidos, quantidadeDeNaoIniciado, processamento, furos }) {
    const [hoveredFinalizados, setHoveredFinalizados] = useState(false);
    const [hoveredNaoIniciados, setHoveredNaoIniciados] = useState(false);
    const [hoveredEmProcessamento, setHoveredEmProcessamento] = useState(false);

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

    function formatTimestamp(timestamp) {
        const seconds = timestamp.seconds;
        const nanoseconds = timestamp.nanoseconds;
        const date = new Date(seconds * 1000 + nanoseconds / 1000000); // Convertendo nanossegundos para milissegundos
        const formattedDate = `${parseInt(date.getDate()) > 10 ? date.getDate() : '0' + date.getDate()}/${parseInt(date.getMonth() + 1) > 10 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1)}/${date.getFullYear()}`;
        return formattedDate;
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'row', marginLeft: 10, marginTop: 10, }} >
            <Row>
                <div
                    style={{
                        alignItems: 'center',
                        display: 'flex',
                        justifyContent: 'center',
                        backgroundColor: '#206F0D',
                        width: 70,
                        height: 70,
                    }}
                >
                    <img src="/assets/images/furoimg.png" />
                </div>
                <div style={{ backgroundColor: '#2FAB10', height: 70, width: 400 }}>
                    <Column>
                        <TitleBox>FUROS PROCESSADOS</TitleBox>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} >
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
                                    style={{ marginRight: 100 }}
                                />
                                {hoveredFinalizados && (
                                    <ObjectList>
                                        {finalizados?.map((item, index) => (
                                            <ObjectItem key={index}>
                                                <text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }} >Furo: {item?.numero}</text>
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
            <Row>
                <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'center', backgroundColor: '#2760BB', width: 70, height: 70 }} >
                    <img src="/assets/images/furoimg.png" />
                </div>
                <div style={{ backgroundColor: '#307BF4', height: 70, width: 400 }} >
                    <Column>
                        <TitleBox>FUROS NÃO PROCESSADOS / INICIADOS</TitleBox>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} >
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
                                    style={{ marginRight: 100 }}
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
            <Row>
                <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'center', backgroundColor: '#996501', width: 70, height: 70 }} >
                    <img src="/assets/images/furoimg.png" />
                </div>
                <div style={{ backgroundColor: '#E89E0E', height: 70, width: 400 }} >
                    <Column>
                        <TitleBox>FUROS EM PROCESSAMENTO</TitleBox>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} >
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
                                    style={{ marginRight: 100 }}
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
        </div>


    )
}
const Row = styled.div({
    display: 'flex',
    flexDirection: 'row', marginLeft: 25, marginRight: 25
})
const Column = styled.div({
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 15
})
const TitleBox = styled.text({
    color: 'white',
    fontSize: 17,
    fontWeight: '600'
})
const Number = styled.text({
    fontSize: 35,
    color: 'white',
    fontWeight: 'bold'
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

  cursor: pointer;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #f0f0f0;
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

  cursor: pointer;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #f0f0f0;
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

  cursor: pointer;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #f0f0f0;
  }
`;