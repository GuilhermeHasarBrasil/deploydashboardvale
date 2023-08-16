import { useEffect, useState } from 'react';
import Select from 'react-select';
import Checkbox from '@mui/material/Checkbox';
import styled from 'styled-components'

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

    const [SelectedStart, setSelectedStart] = useState(null);
    const [SelectedEnd, setSelectedEnd] = useState(null);
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
    const handlePrint = async () => {
        setIsLoading(true);
        setMessage('');
        const defaultLayout =
            '^XA' +
            '^CI27' +
            '^FT27,61^A0N,38,40^FH^FDCx.:^FS' +
            '^FT95,61^A0N,52,56^FH^FD@CX^FS' +
            '^FT185,118^A0N,48,48^FH^FD@FURO^FS' +
            '^FT174,177^A0N,32,32^FH^FDDe:^FS' +
            '^FT225,177^A0N,32,32^FH^FD@DE^FS' +
            '^FT347,177^A0N,32,32^FH^FDAte:^FS' +
            '^FT405,177^A0N,32,32^FH^FD@ATE^FS' +
            '^FT285,61^A0N,48,48^FH^FD@PROJETO^FS' +
            '^FT35,230' +
            '^BQN,5,5HSMX^FH^FDLA @QR' +
            '^PQ1,0,1,Y' +
            '^XZ'
        try {
            const response = await fetch('/api/imprimir', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ zpl: defaultLayout }),
            });
            if (response.ok) {
                setMessage('ZPL enviado com sucesso para impressão.');
            } else {
                setMessage('Erro ao enviar ZPL para impressão.');
            }
        } catch (error) {
            setMessage('Erro ao enviar a requisição.');
        }
        setIsLoading(false);
    };

    return (
        <Container>

            <text>Selecione o intervalo da impressão de etiquetas das caixas do furo {furoSelecionado.furo}</text>
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



            <button onClick={handlePrint} disabled={isLoading}>
                {isLoading ? 'Enviando...' : 'Imprimir'}
            </button>
            {message && <p>{message}</p>}
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 70vw;
    margin-left: 10vw;
    margin-right: 10vw;
    margin-top: 6vh;
    
`