import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Desktop, Newspaper, Print, DocumentAttach, StatsChart } from 'react-ionicons'
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import styled from 'styled-components'
import * as furosmock from "@/components/mockedContent/furos";
import * as chipboxesmock from "@/components/mockedContent/chipboxes";
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

export default function MenuLeft() {


    return (
        <MenuHamburguer>
            <div style={{ padding: 20 }}>
                <img src='/assets/logovale.png' />
            </div>
            <Content>
                <Row>
                    <ImgContainer>
                        <img src='/assets/dashboard.png' />
                    </ImgContainer>
                    <TitleOption>Dashboard</TitleOption>
                </Row>
                <Row>
                    <ImgContainer>
                        <img src='/assets/relatorios.png' />
                    </ImgContainer>
                    <TitleOption>Relatórios</TitleOption>
                </Row>
                <Resources>
                    <SwapHorizIcon style={{ color: 'white' }} />
                    <TitleOption>RECURSOS</TitleOption>
                </Resources>
                <Row>
                    <ImgContainer>
                        <img src='/assets/cadastrarfuro.png' />
                    </ImgContainer>
                    <TitleOption>Cadastrar Furo</TitleOption>
                </Row>
                <Row>
                    <ImgContainer>
                        <img src='/assets/print.png' />
                    </ImgContainer>
                    <TitleOption>Impressão Etiquetas</TitleOption>
                </Row>
                <Row>
                    <ImgContainer>
                        <img src='/assets/addarquivo.png' />
                    </ImgContainer>
                    <TitleOption>Importar Arquivo</TitleOption>
                </Row>
                <Row>
                    <ImgContainer>
                        <img src='/assets/dadosprocessamento.png' />
                    </ImgContainer>
                    <TitleOption>Dados Processamento</TitleOption>
                </Row>
                <Resources>
                    <SwapHorizIcon style={{ color: 'white' }} />
                    <TitleOption>CONFIGURAÇÃO</TitleOption>
                </Resources>
                <Row>
                    <ImgContainer>
                        <img src='/assets/configprinter.png' />
                    </ImgContainer>
                    <TitleOption>Config. Impressora</TitleOption>
                </Row>
                <Row>
                    <ImgContainer>
                        <img src='/assets/params.png' />
                    </ImgContainer>
                    <TitleOption>Parâmetros</TitleOption>
                </Row>
                <Resources>
                    <SwapHorizIcon style={{ color: 'white' }} />
                    <TitleOption>ADMINISTRAÇÃO</TitleOption>
                </Resources>
                <Row>
                    <ImgContainer>
                        <img src='/assets/user.png' />
                    </ImgContainer>
                    <TitleOption>Usuário</TitleOption>
                </Row>
                <Row>
                    <ImgContainer>
                        <img src='/assets/avisos.png' />
                    </ImgContainer>
                    <TitleOption>Mensagens/Avisos</TitleOption>
                </Row>
            </Content>
        </MenuHamburguer>
    )
}

const MenuHamburguer = styled.div({
    height: '100%',
    width: '15%',
    backgroundColor: 'black',
})

const Content = styled.div({
    display: 'flex',
    flexDirection: 'column',
    marginTop: 2
})

const ImgContainer = styled.div({
    width: 35,
    height: 35,
    padding: 4
})

const TitleOption = styled.text({
    color: 'white',
    fontSize: 15,
    marginLeft: 8,
    fontWeight: '500', letterSpacing: 0.3
})

const Row = styled.div({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5,
    marginTop: 6
})

const Resources = styled.div({
    backgroundColor: '#6D6262',
    width: '100%',
    height: 30,
    marginTop: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
})