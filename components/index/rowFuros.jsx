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
    console.log(selected)

    return (
        <div style={{ display: selected == 'Relatórios' || selected === 'Mensagens/Avisos' || selected === 'Config. Impressora' || selected === 'Importar Arquivo' || selected === 'Usuário' ? 'none' : 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 5, }} >
            <BgIcon>
                <ArrowBackCircleSharp
                    color={'#00000'}
                    title={'voltar'}
                    height="40px"
                    width="40px"
                    onClick={() => scrollList('left')}
                />
            </BgIcon>

            <ul id='furos-list' style={{ display: 'flex', flexDirection: 'row', overflowX: 'auto', overflow: 'hidden' }} >

                {
                    selected === 'Dashboard' ?
                        <li style={{ marginLeft: 50, marginRight: 50, backgroundColor: 'TODOS' == selectedItem ? '#008f83' : 'white', padding: 8, borderRadius: 10 }}>
                            <Button>
                                <h1 style={{ color: 'TODOS' !== selectedItem ? 'black' : '#f3c108', width: 120, fontWeight: 'bold' }} onClick={() => sett('TODOS', 99999999)} >
                                    TODOS
                                </h1>
                            </Button>
                        </li>
                        :
                        <></>
                }

                {furos.map((furo, index) => (
                    <li style={{ marginLeft: 50, marginRight: 50, backgroundColor: furo.numero == selectedItem ? '#008f83' : 'white', padding: 8, borderRadius: 10 }} key={furo.id}>
                        {furo.title}{" "}
                        <Button>
                            <h1 style={{ color: furo.numero !== selectedItem ? 'black' : '#f3c108', width: 120, fontWeight: 'bold' }} onClick={() => sett(furo.numero, index)} >
                                {furo.numero}
                            </h1>
                        </Button>

                    </li>
                ))}
            </ul>
            <BgIcon>
                <ArrowForwardCircleSharp
                    color={'#00000'}
                    title={'avançar'}
                    height="40px"
                    width="40px"
                    onClick={() => scrollList('right')}
                />
            </BgIcon>

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

`

