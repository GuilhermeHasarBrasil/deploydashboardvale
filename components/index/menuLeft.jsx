
import { useState } from "react";
import styled from 'styled-components'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { ListCircleOutline } from 'react-ionicons'
import { SettingsOutline } from 'react-ionicons'
import { WarningOutline } from 'react-ionicons'

export default function MenuLeft({ setSelected, selected }) {
    const [menuVisible, setMenuVisible] = useState(false);
    const [menuWidth, setMenuWidth] = useState("3%");
    const [logoSrc, setLogoSrc] = useState('/assets/logovale.png'); // Inicialmente, use logovale.png

    function toggleMenuVisibility() {
        setMenuVisible(!menuVisible);
        setMenuWidth(menuVisible ? "3%" : "14%"); // Alterna entre 15% e 4%
        setLogoSrc(!menuVisible ? '/assets/logovale.png' : '/assets/logovaleminimalist.png');
    }


    function sett(selected) {
        setSelected(selected);
    }

    return (
        <MenuHamburguer
            onMouseEnter={toggleMenuVisibility}
            onMouseLeave={toggleMenuVisibility}
            style={{ width: menuWidth }}
        >
            {menuVisible ? (
                <div style={{ padding: 20 }}>
                    <img style={{ userSelect: 'none', width: 220, }} src={logoSrc} width={50} height={50} />
                </div>
            ) : (
                <div style={{ padding: 0 }}>
                    <img style={{ userSelect: 'none', }} src={logoSrc} />
                </div>
            )}
            <Content>
                <Row onClick={() => sett('Dashboard')} >
                    <ImgContainer selected={selected === 'Dashboard'} >
                        <img style={{ userSelect: 'none' }} src='/assets/dashboard.png' />
                    </ImgContainer>
                    <Button>
                        {menuVisible && (
                            <TitleOption selected={selected === 'Dashboard'}>Dashboard</TitleOption>
                        )}
                    </Button>
                </Row>
                <Row onClick={() => sett('Relatórios')}>
                    <ImgContainer selected={selected === 'Relatórios'} >
                        <img style={{ userSelect: 'none' }} src='/assets/relatorios.png' />
                    </ImgContainer>
                    <Button>
                        {menuVisible && (
                            <TitleOption selected={selected === 'Relatórios'}>Relatórios</TitleOption>
                        )}
                    </Button>
                </Row>
                <Resources>
                    {
                        menuVisible ?
                            <SwapHorizIcon style={{ color: 'white' }} />
                            :
                            <></>
                    }
                    {
                        menuVisible ?
                            <TitleOption>RECURSOS</TitleOption>

                            :
                            <ListCircleOutline
                                color={'#00000'}
                                beat
                                title={''}
                                height="40px"
                                width="40px"
                            />
                    }
                </Resources>
                <Row onClick={() => sett('Impressão Etiquetas')}>
                    <ImgContainer selected={selected === 'Impressão Etiquetas'} >
                        <img style={{ userSelect: 'none' }} src='/assets/print.png' />
                    </ImgContainer>
                    <Button>
                        {menuVisible && (
                            <TitleOption selected={selected === 'Impressão Etiquetas'}>Impressão Etiquetas</TitleOption>
                        )}
                    </Button>
                </Row>
                <Row onClick={() => sett('Importar Arquivo')}>
                    <ImgContainer selected={selected === 'Importar Arquivo'} >
                        <img style={{ userSelect: 'none' }} src='/assets/addarquivo.png' />
                    </ImgContainer>
                    <Button>
                        {menuVisible && (
                            <TitleOption selected={selected === 'Importar Arquivo'}>Importar Arquivo</TitleOption>
                        )}
                    </Button>
                </Row>
                <Row onClick={() => sett('Dados Processamento')}>
                    <ImgContainer selected={selected === 'Dados Processamento'} >
                        <img style={{ userSelect: 'none' }} src='/assets/dadosprocessamento.png' />
                    </ImgContainer>
                    <Button>
                        {menuVisible && (
                            <TitleOption selected={selected === 'Dados Processamento'}>Dados Processamento</TitleOption>
                        )}
                    </Button>
                </Row>
                <Resources>
                    {
                        menuVisible ?
                            <SwapHorizIcon style={{ color: 'white' }} />
                            :
                            <></>
                    }
                    {
                        menuVisible ?
                            <TitleOption>CONFIGURAÇÃO</TitleOption>
                            :
                            <SettingsOutline
                                color={'#00000'}
                                rotate
                                title={''}
                                height="35px"
                                width="35px"
                            />
                    }

                </Resources>
                <Row onClick={() => sett('Config. Impressora')}>
                    <ImgContainer selected={selected === 'Config. Impressora'} >
                        <img style={{ userSelect: 'none' }} src='/assets/configprinter.png' />
                    </ImgContainer>
                    <Button>
                        {menuVisible && (
                            <TitleOption selected={selected === 'Config. Impressora'}>Config. Impressora</TitleOption>
                        )}
                    </Button>
                </Row>
                <Row onClick={() => sett('Parâmetros')}>
                    <ImgContainer selected={selected === 'Parâmetros'} >
                        <img style={{ userSelect: 'none' }} src='/assets/params.png' />
                    </ImgContainer>
                    <Button>
                        {menuVisible && (
                            <TitleOption selected={selected === 'Parâmetros'}>Parâmetros</TitleOption>
                        )}
                    </Button>
                </Row>
                <Resources>
                    {
                        menuVisible ?
                            <SwapHorizIcon style={{ color: 'white' }} />
                            :
                            <></>
                    }
                    {
                        menuVisible ?
                            <TitleOption>ADMINISTRAÇÃO</TitleOption>

                            :
                            <WarningOutline
                                color={'#00000'}
                                shake
                                title={'' }
                                height="35px"
                                width="35px"
                            />
                    }
                </Resources>
                <Row onClick={() => sett('Usuário')}>
                    <ImgContainer selected={selected === 'Usuário'} >
                        <img style={{ userSelect: 'none' }} src='/assets/user.png' />
                    </ImgContainer>
                    <Button>
                        {menuVisible && (
                            <TitleOption selected={selected === 'Usuário'}>Usuário</TitleOption>
                        )}
                    </Button>
                </Row>
                <Row onClick={() => sett('Mensagens/Avisos')}>
                    <ImgContainer selected={selected === 'Mensagens/Avisos'} >
                        <img style={{ userSelect: 'none' }} src='/assets/avisos.png' />
                    </ImgContainer>
                    <Button>
                        {menuVisible && (
                            <TitleOption selected={selected === 'Mensagens/Avisos'}>Mensagens/Avisos</TitleOption>
                        )}
                    </Button>
                </Row>
            </Content>
        </MenuHamburguer>
    )
}

const MenuHamburguer = styled.div`
    height: 100%;
    background-color: black;
    transition: width 0.3s; /* Adicione uma transição suave */
`;

const Content = styled.div({
    display: 'flex',
    flexDirection: 'column',
    marginTop: 2
})

const ImgContainer = styled.div`
    width: 35;
    height: 35;
    padding: 4px; 
    border-radius: 10px;
    margin-left: -5px;
    background-color: ${props => (props.selected ? '#3699FF' : '')};

`
const TitleOption = styled.text`
    color: ${props => (props.selected ? '#3699FF' : 'white')};
    font-size: 16px;
    margin-left: 8px;
    font-weight: 500;
    letter-spacing: 0.3px;
    transition: opacity 0.3s;
    user-select: none;

    &:hover {
        opacity: 0.7;
    }
`;

const Row = styled.div({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
    marginTop: 12, padding: 2
})

const Resources = styled.div({
    backgroundColor: '#6D6262',
    width: '100%',
    height: 40,
    marginTop: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
})

const Button = styled.button`
    transition: opacity 0.3s;
    align-items: center;
    justify-content: center;
    &:hover {
        opacity: 0.2;
    }
`