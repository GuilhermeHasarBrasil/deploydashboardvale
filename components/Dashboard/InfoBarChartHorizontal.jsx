import { useState, useEffect } from "react"
import styled from "styled-components"
import { InformationCircleOutline } from 'react-ionicons'

export default function InfoBarChartHorizontal({data, menuBig}){

    const [somaTotal, setSomaTotal] = useState(0)
    const [somaProcessado, setSomaProcessado] = useState(0)

    useEffect(() => {
        setSomaTotal(data.reduce((a, b) => a + b.total, 0))
        setSomaProcessado(data.reduce((a, b) => a + b.processed, 0))
    }, [data])

    return(
        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 50, justifyContent: 'space-between', marginTop: 110, }} >
                <Row  >
                    <div
                        style={{
                            alignItems: 'center',
                            display: 'flex',
                            justifyContent: 'center',
                            backgroundColor: '#206F0D',
                            width: 70,
                            height: 90,
                        }}
                    >
                        <img src="/assets/images/furoimg.png" />
                    </div>
                    <div style={{ backgroundColor: '#2FAB10', height: 90, paddingRight: 20, width: 350  }}>
                        <Column grande={menuBig}>
                            <TitleBox>ETAPAS CONCLUÍDAS (PROCESSADAS)</TitleBox>
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: -10 }} >
                                <Number>
                                    {somaProcessado? somaProcessado : 0}
                                </Number>
                            </div>
                        </Column>
                    </div>
                </Row>
                <Row  >
                    <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'center', backgroundColor: '#2760BB', width: 70, height: 90 }} >
                        <img src="/assets/images/furoimg.png" />
                    </div>
                    <div style={{ backgroundColor: '#307BF4', height: 90, paddingRight: 20,  width: 350}} >
                        <Column grande={menuBig}>
                            <TitleBox>ETAPAS NÃO INICIADAS (TOTAL)</TitleBox>
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: -10 }} >
                                <Number>
                                    { somaTotal && somaProcessado? somaTotal - somaProcessado : 0}
                                </Number>
                            </div>
                        </Column>
                    </div>
                </Row>
                <Row  >
                    <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'center', backgroundColor: '#996501', width: 70, height: 90 }} >
                        <img src="/assets/images/furoimg.png" />
                    </div>
                    <div style={{ backgroundColor: '#E89E0E', height: 90, paddingRight: 20 , width: 350}} >
                        <Column grande={menuBig}>
                            <TitleBox>ETAPAS (TOTAL) EM ANDAMENTO</TitleBox>
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: -10 }} >
                                <Number>
                                    {0}
                                </Number>
                            </div>
                        </Column>
                    </div>
                </Row>
                <Row  >
                    <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'center', backgroundColor: '#990101', width: 70, height: 90, padding:9 }} >
                        <img src="/assets/images/furoimg.png" />
                    </div>
                    <div style={{ backgroundColor: '#e8410e', height: 90, paddingRight: 20 , width: 350}} >
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
            </div>
    )
}

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
    WebkitTextStrokeColor: 'black'
})
const Number = styled.text({
    fontSize: 35,
    color: 'white',
    fontWeight: 'bold',
    userSelect: 'none',
    WebkitTextStrokeWidth: 0.2,
    WebkitTextStrokeColor: 'white', marginTop:5
})