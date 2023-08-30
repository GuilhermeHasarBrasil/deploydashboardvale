import { useEffect, useState } from 'react';
import Select from 'react-select';
import Checkbox from '@mui/material/Checkbox';
import styled from 'styled-components'
import handlePrint from './handleImpressao';
import { QRCodeSVG } from 'qrcode.react';
import { styles } from './styles';
import Alert from '@mui/material/Alert';
import { motion } from 'framer-motion';

export default function PrintButton({ furoSelecionado, chipBoxesInternos, furos }) {
    if (!furoSelecionado)
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                <text style={{ marginRight: 15, fontWeight: 'bold', fontSize: 30 }}>Selecione o furo acima</text>
            </div>
        )

    const [selectedIndex, setSelectedIndex] = useState(0); // Adiciona esse estado
    const [isLoading, setIsLoading] = useState(false);
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

    const [showAlert, setShowAlert] = useState(true)
    const [alert, setAlert] = useState()

    useEffect(() => {
        if (!SelectedStart || !SelectedEnd) {
            setAlert(<Alert style={{ marginBottom: 16, width: 300, fontWeight: 'bold' }} severity="warning">Insira o início e fim das caixas a serem impressas!</Alert>)
        }
        if (SelectedStart && SelectedEnd) {
            setAlert(<Alert style={{ marginBottom: 16, width: 300, fontWeight: 'bold' }} severity="success">Pronto para impressão!</Alert>)
        }
    }, [SelectedStart, SelectedEnd])

    const [selectedTipoImpressao, setSelectedTipoImpressao] = useState([]);
    const tipoImpressao = [
        { 'tipo': 'Caixa (Chip_Box)' },
        { 'tipo': 'Amostra (Sample_Bag)' },
        { 'tipo': 'Caixa de amostras' },
        { 'tipo': 'Palete' }
    ]

    function sett(selected) {
        setSelectedTipoImpressao(selected);
    }

    return (
        <Container>
            <TitleText style={{ fontWeight: '700', fontSize: 25 }} >Selecione o intervalo da impressão de etiquetas das caixas do furo {furoSelecionado.furo}</TitleText>
            <ul style={{ display: 'flex', flexDirection: 'row', overflowX: 'auto', overflow: 'hidden' }} >
                {tipoImpressao.map((tipo, index) => (
                    <li style={{ marginLeft: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 0, backgroundColor: tipo.tipo == selectedTipoImpressao ? '#008f83' : '#c4c4c4', padding: 8, borderRadius: 10 }} key={tipo.id}>
                        <Button2>
                            <h1 style={{ color: tipo.tipo !== selectedTipoImpressao ? 'black' : '#f3c108', width: 120, fontWeight: 'bold' }} onClick={() => sett(tipo.tipo, index)} >
                                {tipo.tipo}
                            </h1>
                        </Button2>
                    </li>
                ))}
            </ul>

            {
                selectedTipoImpressao === 'Caixa (Chip_Box)' ?
                    < div style={styles.etiquetaCard}>
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
                    :
                    <></>
                    }

                {  
                    selectedTipoImpressao === 'Amostra (Sample_Bag)' ?

                    < div style={{ marginTop:15, display: 'flex', flexDirection: 'column', alignItems:'center', borderWidth: 1, borderColor: '#000', borderRadius: 7, padding:8, paddingLeft:16, paddingRight:16 }}>
                        <div style={{ display: 'flex', flexDirection: 'row' }} >
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems:'flex-start' }} >
                                <TitleText style={styles.etiquetaTitle}>Furo: {furoSelecionado.furo}</TitleText>
                                <TitleText style={styles.etiquetaTitle}>Projeto:{chipBoxesInternos[furoSelecionado.index][0].furo.substring(0, 3)}</TitleText>
                                <TitleText style={styles.etiquetaTitle}>Amostra nº: {String(chipBoxesInternos[furoSelecionado.index][0].cx).padStart(3, '0')}</TitleText>
                            </div>
                            <QRCodeSVG style={{margin:10}} value={chipBoxesInternos[furoSelecionado.index][0].qrcode} size={55} />
                        </div>

                        <div style={{width: '70%', marginTop:15, display:'flex', alignItems:'center', justifyContent:'center', backgroundColor:'black'}}>
                            <TitleText style={{color:'white', fontSize: 16, fontWeight:'bold'}}>Intervalo da Amostra</TitleText>
                        </div>

                        <div style={{width: '100%', display:'flex', flexDirection: 'row', alignItems:'center', justifyContent:'space-between'}}>
                            <TitleText style={styles.subTitle}>De:{String(chipBoxesInternos[furoSelecionado.index][0].de.toFixed(2)).padStart(6, '0').replace('.', ',')} </TitleText>
                            <TitleText style={styles.subTitle}>Até:{String(chipBoxesInternos[furoSelecionado.index][0].ate.toFixed(2)).padStart(6, '0').replace('.', ',')}</TitleText>
                        </div>
                    </div>
                    :
                    <></>
            }

            <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-around', marginBottom: -40 }} >
                {
                    SelectedStart ?
                        <motion.div
                            style={{ marginLeft: 0 }}
                            initial={{ y: -10 }}
                            animate={{ y: 0 }}
                            transition={{ repeat: Infinity, duration: 1, repeatType: 'reverse' }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="60"
                                height="60"
                                fill="white"
                                className="bi bi-chevron-down"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M4.646 5.646a.5.5 0 0 1 .708 0L8 8.293l2.646-2.647a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 0-.708z"
                                />
                            </svg>
                        </motion.div> :
                        <motion.div
                            style={{ marginLeft: 0 }}
                            initial={{ y: -10 }}
                            animate={{ y: 0 }}
                            transition={{ repeat: Infinity, duration: 1, repeatType: 'reverse' }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="60"
                                height="60"
                                fill="currentColor"
                                className="bi bi-chevron-down"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M4.646 5.646a.5.5 0 0 1 .708 0L8 8.293l2.646-2.647a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 0-.708z"
                                />
                            </svg>
                        </motion.div>
                }
                {
                    SelectedEnd ?
                        <div style={{ width: 60, heigth: 60, backgroundColor: 'white' }} ></div>
                        :
                        <motion.div
                            style={{ marginLeft: 0 }}
                            initial={{ y: -10 }}
                            animate={{ y: 0 }}
                            transition={{ repeat: Infinity, duration: 1, repeatType: 'reverse' }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="60"
                                height="60"
                                fill="currentColor"
                                className="bi bi-chevron-down"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M4.646 5.646a.5.5 0 0 1 .708 0L8 8.293l2.646-2.647a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 0-.708z"
                                />
                            </svg>
                        </motion.div>
                }


            </div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginTop: '3%' }} >
                <Select
                    styles={{
                        control: (baseStyles, state) => ({
                            ...baseStyles,
                            borderColor: state.isFocused ? 'grey' : 'black',
                            width: 250
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
                            width: 250
                        }),
                    }}
                    placeholder='Final'
                    value={SelectedEnd}
                    onChange={handleBoxChangeEnd}
                    options={selectListEnd}
                />
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 10, marginBottom: 50 }} >
                <Checkbox
                    checked={PrintAll}
                    onChange={handleCheckboxChange}
                    color="primary"
                />
                <TitleText style={{ fontSize: 30, }} >Impressão completa ({chipBoxesInternos[furoSelecionado.index].length} etiquetas)</TitleText>

            </div>

            {
                showAlert ?
                    alert
                    :
                    <></>
            }

            <Button onClick={() => { handlePrint(paramsPrint, furoSelecionado, chipBoxesInternos[furoSelecionado.index], selectedTipoImpressao); setShowAlert(true) }} disabled={isLoading}>
                <TitleText style={{ color: 'white', fontSize: 26, fontWeight: 'bold' }} >{isLoading ? 'Enviando...' : 'Imprimir'}</TitleText>
            </Button>
        </Container >
    );
};
const Button = styled.button`
    background-color: #074F92;
    transition: opacity 0.3s;
    height: 80px;
    width: 210px;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    color: 'white';
    &:hover {
        opacity: 0.2;
    }

`
const Button2 = styled.button`
    transition: opacity 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
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