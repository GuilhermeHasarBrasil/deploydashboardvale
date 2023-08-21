import { useEffect, useState } from "react";
import { useAuth } from "../firebase/auth";
import { useRouter } from "next/router";
import Loader from "../components/Loader";
import styled from 'styled-components'
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase";
import * as furosmock from "../components/mockedContent/furos";
import * as chipboxesmock from "../components/mockedContent/chipboxes";
import Header from "../components/Header";
import RowFuros from "../components/index/rowFuros";
import TableFuros from "../components/index/tableFuros";
import MenuLeft from "../components/index/menuLeft";
import TopDashboard from "../components/Dashboard/topDashboard";
import { Divider } from '@mui/material';
import CircularChart from "../components/Relatorios/pieChart";
import Relatorio from "../components/Relatorios/relatorio";
import DadosProcessamento from "../components/DadosProcessamento/dadosProcessamento";
import PrintButton from "../components/ImpressaoEtiquetas/impressao";
import PrinterSettings from "../components/ConfigImpressora/ConfigImpressora";
import CustomBarChart from "../components/Dashboard/CustomBarChartHorizontal";
import SquareIcon from '@mui/icons-material/Square';
import BarChartWeek from "../components/Dashboard/WeekWorkBarchart";
import Messages from "../components/MensagensAvisos/messages";

export default function Home() {
    const { signOut, authUser, isLoading } = useAuth();
    const router = useRouter();
    const [furos, setFuros] = useState(furosmock.furos)
    const [chipBoxes, setChipBoxes] = useState(chipboxesmock.chipboxes)
    const [chipBoxesInternos, setChipBoxesInternos] = useState([])
    const [selected, setSelected] = useState('Dashboard')
    const [furoSelecionado, setFuroSelecionado] = useState()
    const [quantidadeConferidos, setQuantidadeConferidos] = useState(0);
    const [quantidadeFinalizados, setQuantidadeFinalizados] = useState(0);
    const [filtroConferencia, setFiltroConferencia] = useState([])
    const [filtroMarcacao, setFiltroMarcacao] = useState([])
    const [filtroFotografia, setFiltroFotografia] = useState([])
    const [filtroDensidade, setFiltroDensidade] = useState([])
    const [filtroSerragem, setFiltroSerragem] = useState([])
    const [filtroArquivamento, setFiltroArquivamento] = useState([])

    const [contagensPorDiaConferencia, setContagensPorDiaConferencia] = useState({}); // Estado para armazenar as contagens por dia
    const [contagensPorDiaMarcacao, setContagensPorDiaMarcacao] = useState({});
    const [contagensPorDiaFotografia, setContagensPorDiaFotografia] = useState({});
    const [contagensPorDiaDensidade, setContagensPorDiaDensidade] = useState({});
    const [contagensPorDiaSerragem, setContagensPorDiaSerragem] = useState({});
    const [contagensPorDiaDespacho, setContagensPorDiaDespacho] = useState({});
    const [contagensPorDiaArquivamento, setContagensPorDiaArquivamento] = useState({});

    useEffect(() => {
        if (!isLoading && !authUser) {
            router.push("/login");
        }

        // if (!!authUser) {
        //     const unsubscribeFuros = onSnapshot(query(collection(db, "Furos"), orderBy('numero')), (snapshot) => {
        //         const updatedFuros = snapshot.docs.map((doc) => ({
        //             id: doc.id,
        //             ...doc.data()
        //         }));
        //         setFuros(updatedFuros);
        //     });

        //     const unsubscribeChipBoxes = onSnapshot(query(collection(db, "ChipBoxes"), orderBy('furo')), (snapshot) => {
        //         const updatedChipBoxes = snapshot.docs.map((doc) => ({
        //             id: doc.id,
        //             ...doc.data()
        //         }));
        //         setChipBoxes(updatedChipBoxes);
        //     });

        //     return () => {
        //         unsubscribeFuros();
        //         unsubscribeChipBoxes();
        //     };
        // }
    }, [authUser, isLoading]);

    useEffect(() => {
        if (chipBoxes) {
            const chipboxesPorFuro = {};
            for (const chipbox of chipBoxes) {
                const furo = chipbox.furo;
                if (chipboxesPorFuro[furo]) {
                    chipboxesPorFuro[furo].push(chipbox);
                } else {
                    chipboxesPorFuro[furo] = [chipbox];
                }
            }
            const arraysInternos = Object.values(chipboxesPorFuro);
            setChipBoxesInternos(arraysInternos)

            const arraysFiltradosConferencia = arraysInternos.map(arrayInterno =>
                arrayInterno.filter(chipbox =>
                    chipbox.processos.conferencia.sai !== null
                )
            );
            setFiltroConferencia(arraysFiltradosConferencia)

            const arraysFiltradosMarcacao = arraysInternos.map(arrayInterno =>
                arrayInterno.filter(chipbox =>
                    chipbox.processos.marcacao.sai !== null
                )
            );
            setFiltroMarcacao(arraysFiltradosMarcacao)

            const arraysFiltradosFotografia = arraysInternos.map(arrayInterno =>
                arrayInterno.filter(chipbox =>
                    chipbox.processos.fotografia.sai !== null
                )
            );
            setFiltroFotografia(arraysFiltradosFotografia)

            const arraysFiltradosDensidade = arraysInternos.map(arrayInterno =>
                arrayInterno.filter(chipbox =>
                    chipbox.processos.densidade.sai !== null
                )
            );
            setFiltroDensidade(arraysFiltradosDensidade)

            const arraysFiltradosSerragem = arraysInternos.map(arrayInterno =>
                arrayInterno.filter(chipbox =>
                    chipbox.processos.serragem.sai !== null
                )
            );
            setFiltroSerragem(arraysFiltradosSerragem)

            const arraysFiltradosArquivamento = arraysInternos.map(arrayInterno =>
                arrayInterno.filter(chipbox =>
                    chipbox.processos.arquivamento.sai !== null
                )
            );
            setFiltroArquivamento(arraysFiltradosArquivamento)
        }
    }, [chipBoxes])

    useEffect(() => {
        const quantidadeConferidos = furos.filter(furo => furo.conferido === true).length;
        const quantidadeFinalizado = furos.filter(furo => furo.finalizado === true).length;
        setQuantidadeConferidos(quantidadeConferidos);
        setQuantidadeFinalizados(quantidadeFinalizado);
    }, [furos])

    const [dataBarChart, setDataBarChart] = useState([])
    useEffect(() => {
        setDataBarChart([
            {
                name: 'Conferência',
                processed: filtroConferencia[furoSelecionado?.index]?.length,
                total: chipBoxesInternos[furoSelecionado?.index]?.length,
            },
            {
                name: 'Marcação',
                processed: filtroMarcacao[furoSelecionado?.index]?.length,
                total: chipBoxesInternos[furoSelecionado?.index]?.length,
            },
            {
                name: 'Fotografia',
                processed: filtroFotografia[furoSelecionado?.index]?.length,
                total: chipBoxesInternos[furoSelecionado?.index]?.length,
            },
            {
                name: 'Densidade',
                processed: filtroDensidade[furoSelecionado?.index]?.length,
                total: chipBoxesInternos[furoSelecionado?.index]?.length,
            },
            {
                name: 'Serragem',
                processed: filtroSerragem[furoSelecionado?.index]?.length,
                total: chipBoxesInternos[furoSelecionado?.index]?.length,
            },
            {
                name: 'Arquivamento',
                processed: filtroArquivamento[furoSelecionado?.index]?.length,
                total: chipBoxesInternos[furoSelecionado?.index]?.length,
            },
        ]);
    }, [furoSelecionado, filtroArquivamento, filtroConferencia, filtroDensidade, filtroFotografia, filtroMarcacao, filtroSerragem])

    useEffect(() => {
        function getDayOfWeek(date) {
            const daysOfWeek = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
            const dayIndex = date.getDay();
            return daysOfWeek[dayIndex];
        }
        function processarDadosConferencia() {
            const novaContagemPorDia = {};
            chipBoxes.forEach(item => {
                if (item.processos && item.processos.conferencia && item.processos.conferencia.sai) {
                    const timestamp = item.processos.conferencia.sai.seconds * 1000; // Converter para milissegundos
                    const data = new Date(timestamp);
                    const diaDaSemana = getDayOfWeek(data);
                    if (novaContagemPorDia[diaDaSemana]) {
                        novaContagemPorDia[diaDaSemana]++;
                    } else {
                        novaContagemPorDia[diaDaSemana] = 1;
                    }
                }
            });
            setContagensPorDiaConferencia(novaContagemPorDia);
        }
        function processarDadosMarcacao() {
            const novaContagemPorDia = {};
            chipBoxes.forEach(item => {
                if (item.processos && item.processos.marcacao && item.processos.marcacao.sai) {
                    const timestamp = item.processos.marcacao.sai.seconds * 1000; // Converter para milissegundos
                    const data = new Date(timestamp);
                    const diaDaSemana = getDayOfWeek(data);
                    if (novaContagemPorDia[diaDaSemana]) {
                        novaContagemPorDia[diaDaSemana]++;
                    } else {
                        novaContagemPorDia[diaDaSemana] = 1;
                    }
                }
            });
            setContagensPorDiaMarcacao(novaContagemPorDia);
        }
        function processarDadosFotografia() {
            const novaContagemPorDia = {};
            chipBoxes.forEach(item => {
                if (item.processos && item.processos.fotografia && item.processos.fotografia.sai) {
                    const timestamp = item.processos.fotografia.sai.seconds * 1000; // Converter para milissegundos
                    const data = new Date(timestamp);
                    const diaDaSemana = getDayOfWeek(data);
                    if (novaContagemPorDia[diaDaSemana]) {
                        novaContagemPorDia[diaDaSemana]++;
                    } else {
                        novaContagemPorDia[diaDaSemana] = 1;
                    }
                }
            });
            setContagensPorDiaFotografia(novaContagemPorDia);
        }
        function processarDadosDensidade() {
            const novaContagemPorDia = {};
            chipBoxes.forEach(item => {
                if (item.processos && item.processos.densidade && item.processos.densidade.sai) {
                    const timestamp = item.processos.densidade.sai.seconds * 1000; // Converter para milissegundos
                    const data = new Date(timestamp);
                    const diaDaSemana = getDayOfWeek(data);
                    if (novaContagemPorDia[diaDaSemana]) {
                        novaContagemPorDia[diaDaSemana]++;
                    } else {
                        novaContagemPorDia[diaDaSemana] = 1;
                    }
                }
            });
            setContagensPorDiaDensidade(novaContagemPorDia);
        }
        function processarDadosSerragem() {
            const novaContagemPorDia = {};
            chipBoxes.forEach(item => {
                if (item.processos && item.processos.serragem && item.processos.serragem.sai) {
                    const timestamp = item.processos.serragem.sai.seconds * 1000; // Converter para milissegundos
                    const data = new Date(timestamp);
                    const diaDaSemana = getDayOfWeek(data);
                    if (novaContagemPorDia[diaDaSemana]) {
                        novaContagemPorDia[diaDaSemana]++;
                    } else {
                        novaContagemPorDia[diaDaSemana] = 1;
                    }
                }
            });
            setContagensPorDiaSerragem(novaContagemPorDia);
        }
        function processarDadosDespacho() {
            const novaContagemPorDia = {};
            chipBoxes.forEach(item => {
                if (item.processos && item.processos.despacho && item.processos.despacho.sai) {
                    const timestamp = item.processos.despacho.sai.seconds * 1000; // Converter para milissegundos
                    const data = new Date(timestamp);
                    const diaDaSemana = getDayOfWeek(data);
                    if (novaContagemPorDia[diaDaSemana]) {
                        novaContagemPorDia[diaDaSemana]++;
                    } else {
                        novaContagemPorDia[diaDaSemana] = 1;
                    }
                }
            });
            setContagensPorDiaDespacho(novaContagemPorDia);
        }
        function processarDadosArquivamento() {
            const novaContagemPorDia = {};
            chipBoxes.forEach(item => {
                if (item.processos && item.processos.arquivamento && item.processos.arquivamento.sai) {
                    const timestamp = item.processos.arquivamento.sai.seconds * 1000; // Converter para milissegundos
                    const data = new Date(timestamp);
                    const diaDaSemana = getDayOfWeek(data);
                    if (novaContagemPorDia[diaDaSemana]) {
                        novaContagemPorDia[diaDaSemana]++;
                    } else {
                        novaContagemPorDia[diaDaSemana] = 1;
                    }
                }
            });
            setContagensPorDiaArquivamento(novaContagemPorDia);
        }
        processarDadosConferencia();
        processarDadosMarcacao();
        processarDadosFotografia();
        processarDadosDensidade();
        processarDadosSerragem();
        processarDadosDespacho();
        processarDadosArquivamento();
    }, [chipBoxes]);

    return !authUser ? (
        <Loader />
    ) : (
        <main className="">
            <Container>
                <Header onClick={signOut} authUser={authUser} />
                <RenderFunctions>
                    <MenuLeft setSelected={setSelected} />
                    <Content>
                        <RowFuros furos={furos} setFuroSelecionado={setFuroSelecionado} />
                        {
                            selected === 'Dashboard' ?
                                <>
                                    <Divider sx={{ borderWidth: '1px', backgroundColor: 'grey', }} />
                                    <TopDashboard finalizados={quantidadeFinalizados} conferidos={quantidadeConferidos} furos={furos} />
                                    <Divider sx={{ borderWidth: '2px', backgroundColor: 'red', marginTop: 1, boxShadow: '10px 6px 6px rgba(0, 0, 0, 0.6)' }} />
                                    <TableFuros furos={furos} />
                                    <Divider sx={{ borderWidth: '2px', backgroundColor: '#3699FF', marginTop: 1, boxShadow: '10px 6px 6px rgba(0, 0, 0, 0.6)' }} />
                                    {
                                        furoSelecionado ?
                                            <div style={{ marginLeft: 100, marginTop: 20 }} >
                                                <text style={{ fontSize: 20, fontWeight: 'bold' }} >Quantidade de caixas finalizadas por processo</text>
                                                <br />
                                                <br />
                                                <text style={{ margin: 5 }} >Legenda: Finalizadas {<SquareIcon style={{ color: '#008f83' }} />} | Total {<SquareIcon style={{ color: '#ef3a25' }} />}  </text>
                                                <CustomBarChart data={dataBarChart} maxValue={chipBoxesInternos[furoSelecionado?.index]?.length} />
                                            </div>
                                            :
                                            <></>
                                    }
                                    <BarChartWeek contagensPorDiaConferencia={contagensPorDiaConferencia}
                                                  contagensPorDiaMarcacao={contagensPorDiaMarcacao}
                                                  contagensPorDiaFotografia={contagensPorDiaFotografia}
                                                  contagensPorDiaDensidade={contagensPorDiaDensidade}
                                                  contagensPorDiaSerragem={contagensPorDiaSerragem}
                                                  contagensPorDiaDespacho={contagensPorDiaDespacho}
                                                  contagensPorDiaArquivamento={contagensPorDiaArquivamento}
                                                  chipBoxes={chipBoxes}
                                    />
                                </>
                                :
                                <></>
                        }
                        {
                            selected === 'Relatórios' ?
                                <Relatorio
                                    chipBoxes={chipBoxes} furoSelecionado={furoSelecionado}
                                    filtroConferencia={filtroConferencia} filtroMarcacao={filtroMarcacao}
                                    filtroFotografia={filtroFotografia} filtroDensidade={filtroDensidade}
                                    filtroSerragem={filtroSerragem} filtroArquivamento={filtroArquivamento}
                                    chipBoxesInternos={chipBoxesInternos}
                                />
                                :
                                <></>
                        }
                        {
                            selected === 'Dados Processamento' ?
                                <DadosProcessamento
                                    chipBoxes={chipBoxes} furoSelecionado={furoSelecionado}
                                    filtroConferencia={filtroConferencia} filtroMarcacao={filtroMarcacao}
                                    filtroFotografia={filtroFotografia} filtroDensidade={filtroDensidade}
                                    filtroSerragem={filtroSerragem} filtroArquivamento={filtroArquivamento}
                                    chipBoxesInternos={chipBoxesInternos}
                                />
                                :
                                <></>
                        }
                        {
                            selected === 'Impressão Etiquetas' ?
                                <PrintButton furoSelecionado={furoSelecionado} chipBoxesInternos={chipBoxesInternos} furos={furos} />
                                :
                                <></>
                        }
                        {
                            selected === 'Config. Impressora' ?
                                <PrinterSettings />
                                :
                                <></>
                        }
                        {
                            selected === 'Mensagens/Avisos' ?
                                <Messages/>
                                :
                                <></>
                        }
                    </Content>
                </RenderFunctions>
            </Container>
        </main>
    );
}

const Container = styled.div({
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '100%',
})
const Content = styled.div({
    flex: 1,
    width: '80%',
})
const RenderFunctions = styled.div({
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
})