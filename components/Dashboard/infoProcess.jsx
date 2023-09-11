/* eslint-disable */

import styled from 'styled-components'

export default function InfoProcess({ total, iniciado, finalizado, naoIniciado }) {

    return (
        <div style={{ display: 'flex', flexDirection: 'column', marginLeft:10, marginTop:0, }} >
            <Row>
                <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'center', backgroundColor: '#206F0D', width: 55, height: 55 }} >
                    <img src="/assets/images/furoimg.png" style={{userSelect:'none'}} />
                </div>
                <div style={{ backgroundColor: '#2FAB10', height: 55, width: 280 }} >
                    <Column>
                        <TitleBox>TOTAL DE CAIXAS</TitleBox>
                        <Number>{total}</Number>
                    </Column>
                </div>
            </Row>
            <Row>
                <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'center', backgroundColor: '#2760BB', width: 55, height: 55 }} >
                    <img src="/assets/images/furoimg.png" style={{userSelect:'none'}} />
                </div>
                <div style={{ backgroundColor: '#307BF4', height: 55, width: 280 }} >
                    <Column>
                        <TitleBox>CAIXAS FINALIZADAS</TitleBox>
                        <Number>{finalizado?.length}</Number>
                    </Column>
                </div>
            </Row>
            <Row>
                <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'center', backgroundColor: '#996501', width: 55, height: 55 }} >
                    <img src="/assets/images/furoimg.png" style={{userSelect:'none'}} />
                </div>
                <div style={{ backgroundColor: '#E89E0E', height: 55, width: 280 }} >
                    <Column>
                        <TitleBox>CAIXAS EM PROCESSAMENTO</TitleBox>
                        <Number>{ iniciado?.length }</Number>
                    </Column>
                </div>
            </Row>
            <Row>
                <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'center', backgroundColor: '#990113', width: 55, height: 55 }} >
                    <img src="/assets/images/furoimg.png" style={{userSelect:'none'}} />
                </div>
                <div style={{ backgroundColor: '#990113', height: 55, width: 280 }} >
                    <Column>
                        <TitleBox>CAIXAS NÃO INICIADAS</TitleBox>
                        <Number>{ total - iniciado?.length - finalizado?.length}</Number>
                    </Column>
                </div>
            </Row>
        </div>


    )
}
const Row = styled.div({
    display: 'flex',
    flexDirection: 'row', marginLeft:25, marginRight:25
})
const Column = styled.div({
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 15
})
const TitleBox = styled.text({
    color: 'white',
    fontSize: 15,
    fontWeight: '600', userSelect:'none'
})
const Number = styled.text({
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold', userSelect:'none'
})
