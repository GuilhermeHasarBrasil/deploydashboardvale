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

    useEffect(()=>{
        setFilteredCaixasEmAndamento(caixasEmAndamento?.filter((caixa)=>caixa?.furo===furoSelecionado?.furo))
        setFilteredCaixasNaoIniciadas(caixasNaoIniciadas?.filter((caixa)=>caixa?.furo===furoSelecionado?.furo))
    },[furoSelecionado, caixasEmAndamento, caixasNaoIniciadas, data])

    useEffect(()=>{
        setConferenciaEmAndamento(FilteredcaixasEmAndamento?.filter((caixa)=>caixa?.processos?.conferencia?.sai==null && caixa?.processos?.conferencia?.ent!==null))
        setMarcacaoEmAndamento(FilteredcaixasEmAndamento?.filter((caixa)=>caixa?.processos?.marcacao?.sai==null && caixa?.processos?.marcacao?.ent!==null))
        setFotografiaEmAndamento(FilteredcaixasEmAndamento?.filter((caixa)=>caixa?.processos?.fotografia?.sai==null && caixa?.processos?.fotografia?.ent!==null))
        setArquivamentoEmAndamento(FilteredcaixasEmAndamento?.filter((caixa)=>caixa?.processos?.arquivamento?.sai==null && caixa?.processos?.arquivamento?.ent!==null))
        setConferenciaNaoIniciada(FilteredcaixasNaoIniciadas?.filter((caixa)=>caixa?.processos?.conferencia?.ent==null))
        setMarcacaoNaoIniciada(FilteredcaixasNaoIniciadas?.filter((caixa)=>caixa?.processos?.marcacao?.ent==null))
        setFotografiaNaoIniciada(FilteredcaixasNaoIniciadas?.filter((caixa)=>caixa?.processos?.fotogafia?.ent==null))
        setArquivamentoNaoIniciada(FilteredcaixasNaoIniciadas?.filter((caixa)=>caixa?.processos?.arquivamento?.ent==null))
    },[FilteredcaixasEmAndamento, FilteredcaixasNaoIniciadas])

    return (
        <Container>
            <Row  >
                <BgImageCardItem BgColor= {'#206F0D'}>
                    <img src="/assets/images/furoimg.png" />
                </BgImageCardItem>
                <div style={{ backgroundColor: '#2FAB10', height: 90, paddingRight: 20, width: 350 }}>
                    <Column grande={menuBig}>
                        <TitleBox>ETAPAS CONCLUÍDAS (PROCESSADAS)</TitleBox>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: -10 }} >
                            <Number>
                                {somaProcessado ? somaProcessado : 0}
                            </Number>
                        </div>
                    </Column>
                </div>
            </Row>
            <Row  >
                <BgImageCardItem BgColor= {'#2760BB'} >
                    <img src="/assets/images/furoimg.png" />
                </BgImageCardItem>
                <div style={{ backgroundColor: '#307BF4', height: 90, paddingRight: 20, width: 350 }} >
                    <Column grande={menuBig}>
                        <TitleBox>ETAPAS NÃO INICIADAS (TOTAL)</TitleBox>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: -10 }} >
                            <Number>
                                {conferenciaNaoIniciada.length+marcacaoNaoIniciada.length+fotogafiaNaoIniciada.length+arquivamentoNaoIniciada.length}
                            </Number>
                        </div>
                    </Column>
                </div>
            </Row>
            <Row  >
                <BgImageCardItem BgColor= {'#996501'} >
                    <img src="/assets/images/furoimg.png" />
                </BgImageCardItem>
                <div style={{ backgroundColor: '#E89E0E', height: 90, paddingRight: 20, width: 350 }} >
                    <Column grande={menuBig}>
                        <TitleBox>ETAPAS EM ANDAMENTO APÓS CONFERÊNCIA</TitleBox>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: -10 }} >
                            <Number>
                                {conferenciaEmAndamento.length+marcacaoEmAndamento.length+fotogafiaEmAndamento.length+arquivamentoEmAndamento.length}
                            </Number>
                        </div>
                    </Column>
                </div>
            </Row>
            <Row  >
                <BgImageCardItem BgColor= {'#990101'} >
                    <img src="/assets/images/furoimg.png" />
                </BgImageCardItem>
                <div style={{ backgroundColor: '#e8410e', height: 90, paddingRight: 20, width: 350 }} >
                    <Column grande={menuBig}>
                        <TitleBox>TOTAL DE ETAPAS DO FURO</TitleBox>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: -10 }} >
                            <Number>
                                {somaTotal}
                            </Number>
                        </div>
                    </Column>
                </div>
            </Row>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 110px;
    margin-left: 50px;
`
const BgImageCardItem = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70px;
    height: 90px;
    background-color: ${props=>props.BgColor};
`
const Row = styled.div`
    display: flex;
    flex-direction: row; 
    //margin-left : 25px;
    margin-right: 25px;
`
const Column = styled.div`
    display: flex;
    flex-direction:  ${props => (props.grande ? 'column' : 'column')};
    margin-left: 15px;
    
`
const TitleBox = styled.text({
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
    userSelect: 'none',

    WebkitTextStrokeWidth: 0.1,
    WebkitTextStrokeColor: 'black',
})
const Number = styled.text({
    fontSize: 35,
    color: 'white',
    fontWeight: 'bold',
    userSelect: 'none',
    WebkitTextStrokeWidth: 0.2,
    WebkitTextStrokeColor: 'white',
    display:'flex'
})