import styled from 'styled-components'
import { BarChartSharp } from 'react-ionicons'

export default function Header({ onClick, authUser }) {

    return (
        <Cont>
            <h1 style={{ color: 'white', marginLeft: 10, marginRight: 30 }} >Bem-vindo(a), {authUser.email}</h1>
            <Title>
                <BarChartSharp
                    color={'#fff'}
                    title={'iconapp'}
                    height={
                        window.screen.width >1900 ?
                        '27px' : 
                        window.screen.width > 1600 ? '25px' :
                        window.screen.width <1370 ? '20px' : '20px'
                    }
                    width={
                        window.screen.width >1900 ?
                        '27px' : 
                        window.screen.width > 1600 ? '25px' :
                        window.screen.width <1370 ? '20px' : '20px'
                    }
                />
                <FontTitle >
                    HSD - HASAR Sample Data
                </FontTitle>
            </Title>
        </Cont>
    )
}
const Title = styled.div`
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: row;
    padding-right:20;
`
const FontTitle = styled.div`
    color: white;
    font-size: 30px;
    margin-left: 10px;
    margin-right: 200px;
    font-weight: normal;
    @media only screen and (max-device-width: 1679px) {
            font-size: 25px;
        }
        @media only screen and (max-device-width: 1365px) {
            font-size: 20px;
        }
`
const Cont = styled.div({
    width: '100%',
    height: '4.16%',
    backgroundColor: '#074F92',
    display: 'flex', flexDirection: 'row',
    alignItems: 'center',
})