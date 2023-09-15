/* eslint-disable */
import styled from 'styled-components'

export default function InfoProcess({ total, iniciado, finalizado, naoIniciado }) {

    return (
        <Container>
            <Row>
                <BgImageCard BgImage={'#206F0D'}>
                    <img src="/assets/images/furoimg.png" style={{ userSelect: 'none' }} />
                </BgImageCard>
                <Card BgImage={'#2FAB10'}>
                    <Column>
                        <TitleBox>TOTAL DE CAIXAS</TitleBox>
                        <Number>{total}</Number>
                    </Column>
                </Card>
            </Row>
            <Row>
                <BgImageCard BgImage={'#2760BB'} >
                    <img src="/assets/images/furoimg.png" style={{ userSelect: 'none' }} />
                </BgImageCard>
                <Card BgImage={'#307BF4'}>
                    <Column>
                        <TitleBox>CAIXAS FINALIZADAS</TitleBox>
                        <Number>{finalizado?.length}</Number>
                    </Column>
                </Card>
            </Row>
            <Row>
                <BgImageCard BgImage={'#996501'}>
                    <img src="/assets/images/furoimg.png" style={{ userSelect: 'none' }} />
                </BgImageCard>
                <Card BgImage={'#E89E0E'} >
                    <Column>
                        <TitleBox>CAIXAS EM PROCESSAMENTO</TitleBox>
                        <Number>{iniciado?.length}</Number>
                    </Column>
                </Card>
            </Row>
            <Row>
                <BgImageCard BgImage={'#990113'}>
                    <img src="/assets/images/furoimg.png" style={{ userSelect: 'none' }} />
                </BgImageCard>
                <Card BgImage={'#990113'}>
                    <Column>
                        <TitleBox>CAIXAS NÃO INICIADAS</TitleBox>
                        <Number>{total - iniciado?.length - finalizado?.length}</Number>
                    </Column>
                </Card>
            </Row>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    margin-top: 0px;
`

const BgImageCard = styled.div`
    background-color: ${props => props.BgImage} ;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 55px;
    height: 55px;
`
const Card = styled.div`
    background-color: ${props => props.BgImage};
    height: 55px;
    width: 280px;
`

const Row = styled.div({
    display: 'flex',
    flexDirection: 'row', marginLeft: 25, marginRight: 25
})
const Column = styled.div({
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 15
})
const TitleBox = styled.text({
    color: 'white',
    fontSize: 15,
    fontWeight: '600', userSelect: 'none'
})
const Number = styled.text({
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold', userSelect: 'none'
})
