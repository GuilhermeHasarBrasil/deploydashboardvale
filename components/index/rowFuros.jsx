import { ArrowBackCircleSharp, ArrowForwardCircleSharp } from 'react-ionicons'
import styled from 'styled-components'
import { useState } from "react";

export default function RowFuros({ furos, setFuroSelecionado, selected }) {

    const [selectedItem, setSelectedItem] = useState(null);

    const scrollList = (direction) => {
        const ul = document.getElementById('furos-list');
        const scrollAmount = 200;
        if (direction === 'left') {
            ul.scrollLeft -= scrollAmount;
        } else {
            ul.scrollLeft += scrollAmount;
        }
    };

    function sett(selected, index) {
        setFuroSelecionado({ furo: selected, index: index })
        setSelectedItem(selected);
    }

    return (

        <div style={{ marginTop: selected === 'Impressão Etiquetas' || selected === 'Dados Processamento' ? 20 : 0, display: 'flex', flexDirection: 'row', display: selected == 'Relatórios' || selected === 'Mensagens/Avisos' || selected === 'Config. Impressora' || selected === 'Importar Arquivo' || selected === 'Usuário' || selected == 'Parâmetros' ? 'none' : 'flex', alignItems: 'center' }} >
            <text
                style={{
                    fontSize: window.screen.width > 1900 ?
                        20 :
                        window.screen.width > 1600 ? 18 :
                            window.screen.width < 1370 ? 16 : 16,
                    marginRight: 40, fontWeight: 'bold', color: "#000f000", marginLeft: 10,
                    display: selected == 'Relatórios' || selected === 'Mensagens/Avisos' || selected === 'Config. Impressora' || selected === 'Importar Arquivo' || selected === 'Usuário' ? 'none' : 'flex',
                }} >
                Furos:
            </text>
            <div style={{ maxWidth: '90%', display: selected == 'Relatórios' || selected === 'Mensagens/Avisos' || selected === 'Config. Impressora' || selected === 'Importar Arquivo' || selected === 'Usuário' ? 'none' : 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 0, }} >
                <BgIcon>
                    <ArrowBackCircleSharp
                        color={'#6b6b6b'}
                        title={'voltar'}
                        height={
                            window.screen.width > 1900 ?
                                '40px' :
                                window.screen.width > 1600 ? '35px' :
                                    window.screen.width < 1370 ? '28px' : '28px'
                        }
                        width={
                            window.screen.width > 1900 ?
                                '40px' :
                                window.screen.width > 1600 ? '35px' :
                                    window.screen.width < 1370 ? '28px' : '28px'
                        }
                        onClick={() => scrollList('left')}
                    />
                </BgIcon>

                <ul id='furos-list' style={{ display: 'flex', flexDirection: 'row', overflowX: 'auto', overflow: 'hidden' }} >

                    {
                        selected === 'Dashboard' ?
                            <li
                                style={{
                                    marginLeft: 40, marginRight: 40, backgroundColor: 'TODOS' == selectedItem ? '#008f83' : 'white',
                                    padding: window.screen.width > 1900 ?
                                        8 :
                                        window.screen.width > 1600 ? 7 :
                                            window.screen.width < 1370 ? 5 : 5,
                                    borderRadius: 10
                                }}
                            >
                                <Button>
                                    <h1 style={{ color: 'TODOS' !== selectedItem ? 'black' : '#fff', userSelect: 'none', width: 120, fontWeight: 'bold' }} onClick={() => sett('TODOS', 99999999)} >
                                        TODOS
                                    </h1>
                                </Button>
                            </li>
                            :
                            <></>
                    }

                    {furos.map((furo, index) => (
                        <li
                            style=
                            {{
                                marginLeft: 50, marginRight: 50, backgroundColor: furo.numero == selectedItem ? '#008f83' : 'white',
                                padding: window.screen.width > 1900 ?
                                    8 :
                                    window.screen.width > 1600 ? 7 :
                                        window.screen.width < 1370 ? 5 : 5,
                                borderRadius: 10
                            }}
                            key={furo.id}>
                            {furo.title}{" "}
                            <Button>
                                <h1 style={{ color: furo.numero !== selectedItem ? 'black' : 'white', userSelect: 'none', width: 120, fontWeight: 'bold' }} onClick={() => sett(furo.numero, index)} >
                                    {furo.numero}
                                </h1>
                            </Button>

                        </li>
                    ))}
                </ul>
                <BgIcon>
                    <ArrowForwardCircleSharp
                        color={'#6b6b6b'}
                        title={'avançar'}
                        height={
                            window.screen.width > 1900 ?
                                '40px' :
                                window.screen.width > 1600 ? '35px' :
                                    window.screen.width < 1370 ? '28px' : '28px'
                        }
                        width={
                            window.screen.width > 1900 ?
                                '40px' :
                                window.screen.width > 1600 ? '35px' :
                                    window.screen.width < 1370 ? '28px' : '28px'
                        }
                        onClick={() => scrollList('right')}
                    />
                </BgIcon>

            </div>
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
    @media only screen and (max-device-width: 1679px) {
            height: 38px;
        }
        @media only screen and (max-device-width: 1365px) {
            height: 30px;
        }

`

