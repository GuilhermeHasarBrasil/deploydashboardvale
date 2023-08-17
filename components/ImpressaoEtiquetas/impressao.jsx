import { useEffect, useState } from 'react';
import Select from 'react-select';
import Checkbox from '@mui/material/Checkbox';
import styled from 'styled-components'
import handlePrint from './handleImpressao';
import { QRCodeSVG } from 'qrcode.react';
import { styles } from './styles';

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

    useEffect(() => {
        if (!PrintAll) {
            setParamsPrint({
                inicio: SelectedStart?.value,
                fim: SelectedEnd?.value
            })
        } else {
            setParamsPrint({
                inicio: selectListStart[0].value,
                fim: selectListStart[selectListStart.length - 1].value
            })
            setSelectedStart(selectListStart[0])
            setSelectedEnd(selectListStart[selectListStart.length - 1])
        }
    }, [SelectedStart, SelectedEnd, PrintAll])

    console.log(chipBoxesInternos[furoSelecionado.index][0])

    return (
        <Container>
            <TitleText style={{ fontWeight: '700', fontSize: 25 }} >Selecione o intervalo da impressão de etiquetas das caixas do furo {furoSelecionado.furo}</TitleText>
            <div style={styles.etiquetaCard}>
                <div style={styles.contentEsquerda}>
                    <TitleText style={styles.etiquetaTitle}>Cx: {String(chipBoxesInternos[furoSelecionado.index][0].cx).padStart(3, '0')}</TitleText>
                    <QRCodeSVG value={chipBoxesInternos[furoSelecionado.index][0].qrcode} size={90} />
                </div>
                <div style={styles.contentDireita}>
                    <div style={{ display: 'flex', flexDirection: 'column' }} >
                        <TitleText style={styles.etiquetaTitle}>{chipBoxesInternos[furoSelecionado.index][0].furo.substring(0, 3)}</TitleText>
                        <TitleText style={styles.etiquetaTitle}>{furoSelecionado.furo}</TitleText>
                    </div>

                    <div style={styles.etiquetaRodape}>
                        <TitleText style={styles.subTitle}>De:{String(chipBoxesInternos[furoSelecionado.index][0].de.toFixed(2)).padStart(6, '0').replace('.', ',')} </TitleText>
                        <TitleText style={styles.subTitle}>Até:{String(chipBoxesInternos[furoSelecionado.index][0].ate.toFixed(2)).padStart(6, '0').replace('.', ',')}</TitleText>
                    </div>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginTop: '3%' }} >
                <Select
                    styles={{
                        control: (baseStyles, state) => ({
                            ...baseStyles,
                            borderColor: state.isFocused ? 'grey' : 'black',
                            width:250
                        }),
                    }}
                    placeholder='Inicio'
                    value={SelectedStart}
                    onChange={handleBoxChangeStart}
                    options={selectListStart}
                />
                <Select
                    styles={{
                        control: (baseStyles, state) => ({
                            ...baseStyles,
                            borderColor: state.isFocused ? 'grey' : 'black',
                            width:250
                        }),
                    }}
                    placeholder='Final'
                    value={SelectedEnd}
                    onChange={handleBoxChangeEnd}
                    options={selectListEnd}
                />
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop:10, marginBottom:50 }} >
                <Checkbox
                    checked={PrintAll}
                    onChange={handleCheckboxChange}
                    color="primary"
                />
                <TitleText style={{fontSize:30,}} >Impressão completa ({chipBoxesInternos[furoSelecionado.index].length} etiquetas)</TitleText>

            </div>

            <Button onClick={() => handlePrint(paramsPrint, furoSelecionado, chipBoxesInternos[furoSelecionado.index])} disabled={isLoading}>
                <TitleText style={{color:'white', fontSize:20, fontWeight:'bold'}} >{isLoading ? 'Enviando...' : 'Imprimir'}</TitleText>
            </Button>
            {message && <p>{message}</p>}
        </Container>
    );
};
const Button = styled.button`
    background-color: #074F92;
    transition: opacity 0.3s;
    height: 80px;
    width: 170px;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    color: 'white';
    &:hover {
        opacity: 0.2;
    }

`
const TitleText = styled.text`
    

`
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 70vw;
    margin-left: 10vw;
    margin-right: 10vw;
    margin-top: 6vh;
    
`