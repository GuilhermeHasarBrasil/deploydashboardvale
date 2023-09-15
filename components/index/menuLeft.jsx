
import { useState, useEffect } from "react";
import styled from 'styled-components'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { ListCircleOutline } from 'react-ionicons'
import { SettingsOutline } from 'react-ionicons'
import { WarningOutline } from 'react-ionicons'
import { LogOutSharp } from 'react-ionicons'

export default function MenuLeft({ setSelected, selected, setMenuBig, onClick }) {
    const [menuVisible, setMenuVisible] = useState(false);
    const [menuWidth, setMenuWidth] = useState("3%");
    const [logoSrc, setLogoSrc] = useState('/assets/logovaleminimalist.png'); // Inicialmente, use logovale.png

    let timer; // Variável para armazenar o timer

    useEffect(() => {
        setMenuBig(menuVisible)
    }, [menuVisible])

    function toggleMenuVisibility() {
        setMenuVisible(true); // Sempre torna o menu visível ao passar o mouse
        setMenuWidth("14%"); // Define a largura para 14%
        setLogoSrc('/assets/logovale.png');
    }

    function hideMenuWithDelay() {
        timer = setTimeout(() => {
            setMenuVisible(false); // Torna o menu invisível após 3 segundos
            setMenuWidth("3%"); // Define a largura de volta para 3%
            setLogoSrc('/assets/logovaleminimalist.png');
        }, 3000);
    }

    useEffect(() => {
        // Limpa o timer quando o componente é desmontado
        return () => clearTimeout(timer);
    }, []);


    function sett(selected) {
        setSelected(selected);
    }

    return (
        <MenuHamburguer
            onMouseEnter={toggleMenuVisibility}
            onMouseLeave={hideMenuWithDelay}
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
                <Resources className={menuVisible ? 'resources-transition' : 'resources-hidden'}>
                    {
                        menuVisible ?
                            <ListCircleOutline
                                color={'white'}
                                //beat
                                title={''}
                                height="30px"
                                width="30px"
                            />
                            :
                            <></>
                    }
                    {
                        menuVisible ?
                            <TitleOption className={menuVisible ? 'transition-opacity' : ''}>RECURSOS</TitleOption>

                            :
                            <ListCircleOutline
                                color={'white'}
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
                <Resources className={menuVisible ? 'resources-transition' : 'resources-hidden'}>
                    {
                        menuVisible ?
                            <SettingsOutline
                                color={'white'}
                                rotate
                                title={''}
                                height="30px"
                                width="30px"
                            /> :
                            <></>
                    }
                    {
                        menuVisible ?
                            <TitleOption className={menuVisible ? 'transition-opacity' : ''}>CONFIGURAÇÃO</TitleOption>
                            :
                            <SettingsOutline
                                color={'white'}
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
                <Resources className={menuVisible ? 'resources-transition' : 'resources-hidden'}>
                    {
                        menuVisible ?
                            <img style={{ userSelect: 'none' }} src='/assets/iconuserconfig.png' />

                            :
                            <></>
                    }
                    {
                        menuVisible ?
                            <TitleOption className={menuVisible ? 'transition-opacity' : ''}>ADMINISTRAÇÃO</TitleOption>

                            :
                            <img style={{ userSelect: 'none' }} src='/assets/iconuserconfig.png' />

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
                <Row onClick={onClick}>
                    <ImgContainer>
                        <LogOutSharp
                            color={'#ffff'}
                            title={'deslogar'}
                            height="32px"
                            width="32px"
                            style={{ marginRight: menuVisible ? -8 : 0 }}
                        />
                    </ImgContainer>
                    <Button>
                        {menuVisible && (
                            <TitleOption>Sair</TitleOption>
                        )}
                    </Button>
                </Row>
                <text style={{ color: 'white', paddingTop: menuVisible ? 40 : 60, marginLeft: menuVisible ? 20 : 0 }} >V. 1.0.0</text>

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
    @media only screen and (max-device-width: 1679px) {
        width: 30px;
        height: 30px;
    }

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
    @media only screen and (max-device-width: 1679px) {
        font-size:14px;
        margin-left: 4px;
        letter-spacing: 0px;
    }
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 15px;
    margin-top: 12px;
    padding: 2;
    @media only screen and (max-device-width: 1679px) {
        margin-top: 8px;
        margin-left: 8px;
    }
`

const Resources = styled.div({
    backgroundColor: '#6D6262',
    width: '100%',
    height: 40,
    marginTop: 10,
    display: 'flex',
    alignItems: 'center',
    //justifyContent: 'center',
    paddingLeft: 9
})

const Button = styled.button`
    transition: opacity 0.3s;
    align-items: center;
    justify-content: center;
    &:hover {
        opacity: 0.2;
    }
`