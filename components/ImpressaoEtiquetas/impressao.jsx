import { useEffect, useState } from 'react';
import Select from 'react-select';
import Checkbox from '@mui/material/Checkbox';
import styled from 'styled-components'
import handlePrint from './handleImpressao';

export default function PrintButton({ furoSelecionado, chipBoxesInternos, furos }) {
    if (!furoSelecionado)
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                <text style={{ marginRight: 15, fontWeight: 'bold', fontSize: 30 }}>Selecione o furo acima</text>
            </div>
        )

    const [selectedIndex, setSelectedIndex] = useState(0); // Adiciona esse estado
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    useEffect(() => {
        if (furoSelecionado && chipBoxesInternos[furoSelecionado.index]) {
            const furoOptions = chipBoxesInternos[furoSelecionado.index].map((furo, index) => ({
                value: furo.cx,
                label: `Caixa ${index + 1}`
            }));
            setSelectListStart(furoOptions);
            setSelectListEnd(furoOptions.slice(selectedIndex)); // Filtra o selectListEnd
        }
    }, [furoSelecionado, chipBoxesInternos, selectedIndex]);
    const [selectListStart, setSelectListStart] = useState([])
    const [selectListEnd, setSelectListEnd] = useState([])
    const [SelectedStart, setSelectedStart] = useState();
    const [SelectedEnd, setSelectedEnd] = useState();

    const handleBoxChangeStart = (selectedOption) => {
        setSelectedStart(selectedOption);
        const selectedIndex = selectListStart.findIndex(option => option.value === selectedOption.value);
        setSelectedIndex(selectedIndex);
        setSelectListEnd(selectListStart.slice(selectedIndex));
    };
    const handleBoxChangeEnd = (selectedOption) => {
        setSelectedEnd(selectedOption);
    };

    const [PrintAll, setPrintAll] = useState(false);
    const handleCheckboxChange = (event) => {
        setPrintAll(event.target.checked);
    };
    

    const [paramsPrint, setParamsPrint] = useState({})

    useEffect(()=>{
        if(!PrintAll){
            setParamsPrint({
                inicio: SelectedStart?.value,
                fim: SelectedEnd?.value
            })
        }else{
            setParamsPrint({
                inicio: selectListStart[0].value,
                fim: selectListStart[selectListStart.length-1].value
            })
            setSelectedStart(selectListStart[0])
            setSelectedEnd(selectListStart[selectListStart.length-1])
        }
    },[SelectedStart, SelectedEnd, PrintAll])

    return (
        <Container>

            <TitleText>Selecione o intervalo da impressão de etiquetas das caixas do furo {furoSelecionado.furo}</TitleText>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }} >
                <Select
                    placeholder='Inicio'
                    value={SelectedStart}
                    onChange={handleBoxChangeStart}
                    options={selectListStart}
                />
                <Select
                    placeholder='Final'
                    value={SelectedEnd}
                    onChange={handleBoxChangeEnd}
                    options={selectListEnd}
                />
            </div>

            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} >
                <Checkbox
                    checked={PrintAll}
                    onChange={handleCheckboxChange}
                    color="primary"
                />
                <text>Impressão completa ({chipBoxesInternos[furoSelecionado.index].length} etiquetas)</text>

            </div>

            <button onClick={()=> handlePrint(paramsPrint, furoSelecionado, chipBoxesInternos[furoSelecionado.index]) } disabled={isLoading}>
                {isLoading ? 'Enviando...' : 'Imprimir'}
            </button>
            {message && <p>{message}</p>}
        </Container>
    );
};

const TitleText = styled.text`
    

`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 70vw;
    margin-left: 10vw;
    margin-right: 10vw;
    margin-top: 6vh;
    
`