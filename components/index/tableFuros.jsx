import { LogOutSharp, BarChartSharp, ArrowBackCircleSharp, ArrowForwardCircleSharp, CloseCircleSharp, CheckmarkCircleSharp } from 'react-ionicons'

export default function TableFuros({ furos }) {

    function formatTimestamp(timestamp) {
        const seconds = timestamp.seconds;
        const nanoseconds = timestamp.nanoseconds;
        const date = new Date(seconds * 1000 + nanoseconds / 1000000); // Convertendo nanossegundos para milissegundos
        const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} - ${date.getHours()}:${(date.getMinutes() < 10 ? '0' : '') + date.getMinutes()}`;
        return formattedDate;
    }

    return (
        <>
            <ul id="furos-list" style={{ display: 'flex', flexDirection: 'column', overflowX: 'auto', overflow: 'hidden' }} >
                <li style={{ marginLeft: 20, marginRight: 80, marginTop: 15, }}>
                    <div style={{ display: 'flex', flexDirection: 'row' }} >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 150, backgroundColor: '#d9d9d9', }}>
                            <h1 style={{ color: 'black', backgroundColor: '#d9d9d9', fontSize: 20 }}  >FURO</h1>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 120, marginLeft: 5, backgroundColor: '#fff', }}>
                            <div style={{ display: 'flex', flexDirection: 'column' }} >
                                <h1 style={{ color: 'black', fontSize: 20 }}  >Nº de </h1>
                                <h1 style={{ color: 'black', fontSize: 20 }}  >caixas</h1>
                            </div>
                        </div >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 180, marginLeft: 5, backgroundColor: '#d9d9d9', }}>
                            <h1 style={{ color: 'black', backgroundColor: '#d9d9d9', fontSize: 20 }}  >Finalizado</h1>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 180, marginLeft: 5, backgroundColor: '#fff', }}>
                            <h1 style={{ color: 'black', backgroundColor: '#fff', fontSize: 20 }}  >Conferido</h1>
                        </div>
                    </div>
                </li>
            </ul>

            <ul id="furos-list" style={{ display: 'flex', flexDirection: 'column', overflowX: 'auto', overflow: 'hidden' }} >
                {furos.map((furo) => (
                    <li style={{ marginLeft: 20, marginRight: 80, }} key={furo.id}>
                        {furo.title}{" "}
                        <div style={{ display: 'flex', flexDirection: 'row' }} >
                            <h1 style={{ color: 'black', width: 150, backgroundColor: '#d9d9d9', height: '100%', fontSize: 16 , paddingLeft:5}} onClick={() => console.log(furo.numero)} >{furo.numero}</h1>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 120, marginLeft: 5, backgroundColor: '#fff', }} >
                                <h1 style={{ color: 'black', fontSize: 16 }} onClick={() => console.log(furo.profundidade)} >{furo.profundidade}</h1>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', width: 180, marginLeft: 5, backgroundColor: '#d9d9d9', }} >

                                {
                                    !furo.dataFinalizado ?
                                        <CloseCircleSharp
                                            color={'red'}
                                            title={'   aaaa'}
                                            height="20px"
                                            width="20px"
                                            style={{ marginRight: 10, marginLeft: 10 }}
                                        />
                                        :
                                        <CheckmarkCircleSharp
                                            color={'green'}
                                            title={'asda'}
                                            height="20px"
                                            width="20px"
                                            style={{ marginRight: 10, marginLeft: 10 }}
                                        />
                                }
                                <h1 style={{ color: 'black', backgroundColor: '#d9d9d9', fontSize: 16 }} onClick={() => console.log(furo.dataFinalizado)} >    {furo.dataFinalizado ? formatTimestamp(furo.dataFinalizado) : 'Não finalizado'}</h1>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', width: 180, marginLeft: 5, backgroundColor: '#fff', }} >

                                {
                                    !furo.conferido ?
                                        <CloseCircleSharp
                                            color={'red'}
                                            title={'   aaaa'}
                                            height="20px"
                                            width="20px"
                                            style={{ marginRight: 10, marginLeft: 10 }}
                                        />
                                        :
                                        <CheckmarkCircleSharp
                                            color={'green'}
                                            title={'asda'}
                                            height="20px"
                                            width="20px"
                                            style={{ marginRight: 10, marginLeft: 10 }}
                                        />
                                }
                                <h1 style={{ color: 'black', backgroundColor: '#fff', fontSize: 16 }} onClick={() => console.log(furo.conferido)} >    {furo.conferido ? 'Conferido' : 'Não conferido'}</h1>
                            </div>
                        </div>

                    </li>
                ))}
            </ul>
        </>
    )
}