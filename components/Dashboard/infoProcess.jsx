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
            <Row >
                <BgImageCard BgImage={'#990113'}>
                    <img src="/assets/images/furoimg.png" style={{ userSelect: 'none' }} />
                </BgImageCard>
                <Card ultima={true} BgImage={'#990113'}>
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
    @media only screen and (max-device-width: 1679px) {
        height: 53px;
        width: 53px;

        }
        @media only screen and (max-device-width: 1370px) {
            height: 42px;
            width: 42px;

        }
`
const Card = styled.div`
    background-color: ${props => props.BgImage};
    height: 55px;
    width: 280px;
    @media only screen and (max-device-width: 1679px) {
        height: 53px;
        width: 280px;

        }
        @media only screen and (max-device-width: 1370px) {
            height: 42px;
            width: 260px;
            margin-bottom: ${props=>props.ultima ? 50+'px': 0+'px'};
        }
`

const Row = styled.div({
    display: 'flex',
    flexDirection: 'row', marginLeft: 25, marginRight: 25, marginBottom: 6
})
const Column = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 15px;
    @media only screen and (max-device-width: 1679px) {
        
        }
        @media only screen and (max-device-width: 1370px) {
            flex-direction: column;
        }
`

const TitleBox = styled.text`
    color: white;
    font-size: 15px;
    font-weight: 600;
    user-select: none;
    @media only screen and (max-device-width: 1679px) {
        font-size: 14px;
    }
    @media only screen and (max-device-width: 1370px) {
        font-size: 12px;
    }

`
const Number = styled.text`
    font-size: 24px;
    color:white;
    font-weight: bold;
    user-select: none;
    @media only screen and (max-device-width: 1679px) {
        font-size: 22px;
    }
    @media only screen and (max-device-width: 1370px) {
        font-size: 17px;
    }
`
