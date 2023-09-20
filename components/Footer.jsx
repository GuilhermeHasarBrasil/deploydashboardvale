import styled from "styled-components"

export default function Footer() {
    return (
        <Container>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} >
                <img style={{ height: window.screen.width>1900? 40 : window.screen.width>1580? 32 : 20, width:'auto'}} src="/assets/logohasarmini.png" />
                <TextBottom style={{color:'white', fontWeight:'bold', marginLeft:5}} >Hasar Brasil, All rights reserved 2023</TextBottom>
            </div>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    width: 100%;
    background-color: #6D6262;
    position: fixed;
    bottom: 0;
    @media only screen and (max-device-width: 1679px) {
        height: 43px;
    }
    @media only screen and (max-device-width: 1370px) {
        height: 28px;
    }
`
const TextBottom = styled.text`
    color: white;
    font-weight: bold;
    margin-left: 5px;
    font-size: 16px;
    @media only screen and (max-device-width: 1679px) {
        font-size: 14px;
    }
    @media only screen and (max-device-width: 1370px) {
        font-size: 12px;
    }
`