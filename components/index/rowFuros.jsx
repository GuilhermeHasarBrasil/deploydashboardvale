import { LogOutSharp, BarChartSharp, ArrowBackCircleSharp, ArrowForwardCircleSharp, CloseCircleSharp, CheckmarkCircleSharp } from 'react-ionicons'

export default function RowFuros({  furos }) {

    const scrollList = (direction) => {
        const ul = document.getElementById('furos-list');
        const scrollAmount = 200;
        if (direction === 'left') {
            ul.scrollLeft -= scrollAmount;
        } else {
            ul.scrollLeft += scrollAmount;
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 5, }} >
            <ArrowBackCircleSharp
                color={'#00000'}
                title={'voltar'}
                height="40px"
                width="40px"
                onClick={() => scrollList('left')}
            />
            <ul id='furos-list' style={{ display: 'flex', flexDirection: 'row', overflowX: 'auto', overflow: 'hidden' }} >
                {furos.map((furo) => (
                    <li style={{ marginLeft: 80, marginRight: 80, }} key={furo.id}>
                        {furo.title}{" "}
                        <h1 style={{ color: furo.finalizado ? 'green' : 'red', width: 120, fontWeight: 'bold' }} onClick={() => console.log(furo.numero)} >{furo.numero}</h1>
                    </li>
                ))}
            </ul>
            <ArrowForwardCircleSharp
                color={'#00000'}
                title={'avançar'}
                height="40px"
                width="40px"
                onClick={() => scrollList('right')}
            />
        </div>
    )
}