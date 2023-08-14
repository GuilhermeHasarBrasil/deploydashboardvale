import styled from 'styled-components'

export default function TopDashboard({ finalizados, conferidos, furos }) {

    console.log(finalizados, conferidos, furos.length)

    return (
        <div style={{ display: 'flex', flexDirection: 'row', marginLeft:10, marginTop:10, }} >
            <Row>
                <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'center', backgroundColor: '#206F0D', width: 80, height: 80 }} >
                    <img src="/assets/images/furoimg.png" />
                </div>
                <div style={{ backgroundColor: '#2FAB10', height: 80, width: 300 }} >
                    <Column>
                        <TitleBox>FUROS PROCESSADOS</TitleBox>
                        <Number>{finalizados}</Number>
                    </Column>
                </div>
            </Row>
            <Row>
                <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'center', backgroundColor: '#2760BB', width: 80, height: 80 }} >
                    <img src="/assets/images/furoimg.png" />
                </div>
                <div style={{ backgroundColor: '#307BF4', height: 80, width: 300 }} >
                    <Column>
                        <TitleBox>FUROS NÃO PROCESSADOS</TitleBox>
                        <Number>{furos.length - conferidos}</Number>
                    </Column>
                </div>
            </Row>
            <Row>
                <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'center', backgroundColor: '#996501', width: 80, height: 80 }} >
                    <img src="/assets/images/furoimg.png" />
                </div>
                <div style={{ backgroundColor: '#E89E0E', height: 80, width: 300 }} >
                    <Column>
                        <TitleBox>FUROS EM PROCESSAMENTO</TitleBox>
                        <Number>{ conferidos - finalizados }</Number>
                    </Column>
                </div>
            </Row>
        </div>


    )
}
const Row = styled.div({
    display: 'flex',
    flexDirection: 'row', marginLeft:10, marginRight:20
})
const Column = styled.div({
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 15
})
const TitleBox = styled.text({
    color: 'white',
    fontSize: 17,
    fontWeight: '600'
})
const Number = styled.text({
    fontSize: 40,
    color: 'white',
    fontWeight: 'bold'
})

