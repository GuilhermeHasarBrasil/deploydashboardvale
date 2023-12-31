import { useState, useEffect } from "react"
import styled from "styled-components"
import { InformationCircleOutline } from 'react-ionicons'

export default function InfoBarChartHorizontal({ data, menuBig, caixasEmAndamento, caixasNaoIniciadas, furoSelecionado }) {

    const [somaTotal, setSomaTotal] = useState(0)
    const [somaProcessado, setSomaProcessado] = useState(0)

    useEffect(() => {
        setSomaTotal(data.reduce((a, b) => a + b.total, 0))
        setSomaProcessado(data.reduce((a, b) => a + b.processed, 0))
    }, [data])

    const [FilteredcaixasEmAndamento, setFilteredCaixasEmAndamento] = useState([])
    const [FilteredcaixasNaoIniciadas, setFilteredCaixasNaoIniciadas] = useState([])
    const [conferenciaEmAndamento, setConferenciaEmAndamento] = useState([])
    const [marcacaoEmAndamento, setMarcacaoEmAndamento] = useState([])
    const [fotogafiaEmAndamento, setFotografiaEmAndamento] = useState([])
    const [arquivamentoEmAndamento, setArquivamentoEmAndamento] = useState([])
    const [conferenciaNaoIniciada, setConferenciaNaoIniciada] = useState([])
    const [marcacaoNaoIniciada, setMarcacaoNaoIniciada] = useState([])
    const [fotogafiaNaoIniciada, setFotografiaNaoIniciada] = useState([])
    const [arquivamentoNaoIniciada, setArquivamentoNaoIniciada] = useState([])

    useEffect(() => {
        setFilteredCaixasEmAndamento(caixasEmAndamento?.filter((caixa) => caixa?.furo === furoSelecionado?.furo))
        setFilteredCaixasNaoIniciadas(caixasNaoIniciadas?.filter((caixa) => caixa?.furo === furoSelecionado?.furo))
    }, [furoSelecionado, caixasEmAndamento, caixasNaoIniciadas, data])

    useEffect(() => {
        setConferenciaEmAndamento(FilteredcaixasEmAndamento?.filter((caixa) => caixa?.processos?.conferencia?.sai == null && caixa?.processos?.conferencia?.ent !== null))
        setMarcacaoEmAndamento(FilteredcaixasEmAndamento?.filter((caixa) => caixa?.processos?.marcacao?.sai == null && caixa?.processos?.marcacao?.ent !== null))
        setFotografiaEmAndamento(FilteredcaixasEmAndamento?.filter((caixa) => caixa?.processos?.fotografia?.sai == null && caixa?.processos?.fotografia?.ent !== null))
        setArquivamentoEmAndamento(FilteredcaixasEmAndamento?.filter((caixa) => caixa?.processos?.arquivamento?.sai == null && caixa?.processos?.arquivamento?.ent !== null))
        setConferenciaNaoIniciada(FilteredcaixasNaoIniciadas?.filter((caixa) => caixa?.processos?.conferencia?.ent == null))
        setMarcacaoNaoIniciada(FilteredcaixasNaoIniciadas?.filter((caixa) => caixa?.processos?.marcacao?.ent == null))
        setFotografiaNaoIniciada(FilteredcaixasNaoIniciadas?.filter((caixa) => caixa?.processos?.fotogafia?.ent == null))
        setArquivamentoNaoIniciada(FilteredcaixasNaoIniciadas?.filter((caixa) => caixa?.processos?.arquivamento?.ent == null))
    }, [FilteredcaixasEmAndamento, FilteredcaixasNaoIniciadas])

    console.log(arquivamentoNaoIniciada)

    return (
        <Container>
            <Row  >
                <BgImageCardItem BgColor={'#206F0D'}>
                    <img src="/assets/images/furoimg.png" />
                </BgImageCardItem>
                <CardItem BgColor={'#2FAB10'}>
                    <Column grande={menuBig}>
                        <TitleBox>ETAPAS CONCLUÍDAS POR CAIXA (TOTAL)</TitleBox>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: -10 }} >
                            <Number>
                                {somaProcessado ? somaProcessado : 0}
                            </Number>
                        </div>
                    </Column>
                </CardItem>
            </Row>
            <Row  >
                <BgImageCardItem BgColor={'#2760BB'} >
                    <img src="/assets/images/furoimg.png" />
                </BgImageCardItem>
                <CardItem BgColor={'#307BF4'} >
                    <Column grande={menuBig}>
                        <TitleBox>ETAPAS POR CAIXA NÃO INICIADAS</TitleBox>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: -10 }} >
                            <Number>
                                {somaTotal-(somaProcessado? somaProcessado : 0) - (marcacaoEmAndamento.length + fotogafiaEmAndamento.length + arquivamentoEmAndamento.length) }
                            </Number>
                        </div>
                    </Column>
                </CardItem>
            </Row>
            <Row  >
                <BgImageCardItem BgColor={'#996501'} >
                    <img src="/assets/images/furoimg.png" />
                </BgImageCardItem>
                <CardItem BgColor={'#E89E0E'} >
                    <Column grande={menuBig}>
                        <TitleBox>ETAPAS EM ANDAMENTO APÓS CONFERÊNCIA</TitleBox>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: -10 }} >
                            <Number>
                                {conferenciaEmAndamento.length + marcacaoEmAndamento.length + fotogafiaEmAndamento.length + arquivamentoEmAndamento.length}
                            </Number>
                        </div>
                    </Column>
                </CardItem>
            </Row>
            <Row  >
                <BgImageCardItem BgColor={'#990101'} >
                    <img src="/assets/images/furoimg.png" />
                </BgImageCardItem>
                <CardItem BgColor={'#e8410e'} >
                    <Column grande={menuBig}>
                        <TitleBox>TOTAL DE ETAPAS POR CAIXA DO FURO</TitleBox>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: -10 }} >
                            <Number>
                                {somaTotal}
                            </Number>
                        </div>
                    </Column>
                </CardItem>
            </Row>
        </Container>
    )
}
const CardItem = styled.div`
    height: 90px;
    width: 350px;
    padding-right: 20px;
    background-color: ${props => props.BgColor};
    @media only screen and (max-device-width: 1679px) {
            width: 300px;
            height: 85px;

        }
        @media only screen and (max-device-width: 1370px) {
            width: 270px;
            height: 70px;

        }
`
const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 110px;
    margin-left: 50px;
    @media only screen and (max-device-width: 1679px) {
            margin-top: 30px;
            margin-left: 50px;
        }
`
const BgImageCardItem = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70px;
    height: 90px;
    background-color: ${props => props.BgColor};
    @media only screen and (max-device-width: 1679px) {
        width: 70px;
        height: 85px;
        }
        @media only screen and (max-device-width: 1370px) {
            width: 70px;
            height: 70px;
        }
`
const Row = styled.div`
    display: flex;
    flex-direction: row; 
    margin-bottom: 20px;
    @media only screen and (max-device-width: 1679px) {
                margin-bottom: 20px;
                margin-top: 20px;
        }
        @media only screen and (max-device-width: 1370px) {
                margin-bottom: 14px;
                margin-top: 0px;
        }
        
`
const Column = styled.div`
    display: flex;
    flex-direction:  ${props => (props.grande ? 'column' : 'column')};
    margin-left: 15px;
    
`
const TitleBox = styled.text`
    color: white;
    font-size: 17px;
    font-weight: bold;
    user-select: none;
    letter-spacing: 0.5px;
    @media only screen and (max-device-width: 1679px) {
                font-size: 15px;

        }
        @media only screen and (max-device-width: 1370px) {
                font-size: 15px;

        }
`

const Number = styled.text`
    font-size: 35px;
    color: white;
    font-weight: bold;
    user-select: none;
    text-shadow: -1.5px -1.5px 0 #000, 1.5px -1.5px 0 #000, -1.5px 1.5px 0 #000, 1.5px 1.5px 0 #000;
    font-family: 'Poppins', sans-serif;
    display: flex;
    @media only screen and (max-device-width: 1679px) {
                font-size: 30px;

        }
        @media only screen and (max-device-width: 1370px) {
                font-size: 25px;

        }

`