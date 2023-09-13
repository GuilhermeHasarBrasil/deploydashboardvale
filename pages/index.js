import { useEffect, useState } from "react";
import { useAuth } from "../firebase/auth";
import { useRouter } from "next/router";
import Loader from "../components/Loader";
import styled from 'styled-components'
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase";
import Header from "../components/Header";
import RowFuros from "../components/index/rowFuros";
import MenuLeft from "../components/index/menuLeft";
import TopDashboard from "../components/Dashboard/topDashboard";
import { Divider } from '@mui/material';
import Relatorio from "../components/Dashboard/relatorio";
import DadosProcessamento from "../components/DadosProcessamento/dadosProcessamento";
import PrinterSettings from "../components/ConfigImpressora/ConfigImpressora";
import CustomBarChart from "../components/Dashboard/CustomBarChartHorizontal";
import SquareIcon from '@mui/icons-material/Square';
import BarChartWeek from "../components/Dashboard/WeekWorkBarchart";
import Mensagens from "../components/Mensagens/Mensagens";
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Relatorios from "../components/Relatorios/Relatorios";
import Import from "../components/ImportarArquivo/importar";
import CustomBarChartMes from "../components/Dashboard/BarChartMes";
import PrintLabelNovo from "../components/ImpressaoEtiquetas/impressaoEtiquetasNOVO";
import Users from "../components/Usuarios/Users";

export default function Home() {
    const { signOut, authUser, isLoading } = useAuth();
    const router = useRouter();
    const [furos, setFuros] = useState([])
    const [chipBoxes, setChipBoxes] = useState([])
    const [chipBoxesInternos, setChipBoxesInternos] = useState([])
    const [selected, setSelected] = useState('Dashboard')
    const [furoSelecionado, setFuroSelecionado] = useState()
    const [quantidadeConferidos, setQuantidadeConferidos] = useState();
    const [quantidadeProcessamento, setQuantidadeProcessamento] = useState();
    const [quantidadeNaoIniciado, setQuantidadeNaoIniciado] = useState()

    const [quantidadeFinalizados, setQuantidadeFinalizados] = useState();
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

    const [whiteBoxes, setWhiteBoxes] = useState([])
    const [paletes, setPaletes] = useState([])

    useEffect(() => {
        if (!isLoading && !authUser) {
            router.push("/login");
        }
        if (!!authUser) {
            const unsubscribeFuros = onSnapshot(query(collection(db, "Furos"), orderBy('numero')), (snapshot) => {
                const updatedFuros = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setFuros(updatedFuros);
            });

            const unsubscribeChipBoxes = onSnapshot(query(collection(db, "ChipBoxes"), orderBy('furo')), (snapshot) => {
                const updatedChipBoxes = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setChipBoxes(updatedChipBoxes);
            });

            const unsubscribeWhiteBoxes = onSnapshot(query(collection(db, "WhiteBoxes"), orderBy('furo')), (snapshot) => {
                const WhiteBoxes = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setWhiteBoxes(WhiteBoxes);
            });

            const unsubscribePaletes = onSnapshot(query(collection(db, "Paletes"), orderBy('furo')), (snapshot) => {
                const Paletes = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setPaletes(Paletes);
            });

            return () => {
                unsubscribeFuros();
                unsubscribeChipBoxes();
                unsubscribeWhiteBoxes();
                unsubscribePaletes();
            };
        }
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
                    chipbox.processos.conferencia?.sai !== null
                )
            );
            setFiltroConferencia(arraysFiltradosConferencia)

            const arraysFiltradosMarcacao = arraysInternos.map(arrayInterno =>
                arrayInterno.filter(chipbox =>
                    chipbox.processos.marcacao?.sai !== null
                )
            );
            setFiltroMarcacao(arraysFiltradosMarcacao)

            const arraysFiltradosFotografia = arraysInternos.map(arrayInterno =>
                arrayInterno.filter(chipbox =>
                    chipbox.processos.fotografia?.sai !== null
                )
            );
            setFiltroFotografia(arraysFiltradosFotografia)

            const arraysFiltradosDensidade = arraysInternos.map(arrayInterno =>
                arrayInterno.filter(chipbox =>
                    chipbox.processos.densidade?.sai !== null
                )
            );
            setFiltroDensidade(arraysFiltradosDensidade)

            const arraysFiltradosSerragem = arraysInternos.map(arrayInterno =>
                arrayInterno.filter(chipbox =>
                    chipbox.processos.serragem?.sai !== null
                )
            );
            setFiltroSerragem(arraysFiltradosSerragem)

            const arraysFiltradosArquivamento = arraysInternos.map(arrayInterno =>
                arrayInterno.filter(chipbox =>
                    chipbox.processos.arquivamento?.sai !== null
                )
            );
            setFiltroArquivamento(arraysFiltradosArquivamento)
        }
    }, [chipBoxes, furoSelecionado, furos])

    useEffect(() => {
        const quantidadeConferidos = furos.filter(furo => furo.conferido === true)
        const quantidadeFinalizado = furos.filter(furo => furo.finalizado === true)
        const quantidadeEmProcessamento = furos.filter(furo => furo.conferido === true && !furo.finalizado)
        const quantidadeDeNaoIniciado = furos.filter(furo => !furo.conferido && !furo.finalizado)

        setQuantidadeConferidos(quantidadeConferidos);
        setQuantidadeFinalizados(quantidadeFinalizado);
        setQuantidadeProcessamento(quantidadeEmProcessamento)
        setQuantidadeNaoIniciado(quantidadeDeNaoIniciado)
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
            // {
            //     name: 'Densidade',
            //     processed: filtroDensidade[furoSelecionado?.index]?.length,
            //     total: chipBoxesInternos[furoSelecionado?.index]?.length,
            // },
            // {
            //     name: 'Serragem',
            //     processed: filtroSerragem[furoSelecionado?.index]?.length,
            //     total: chipBoxesInternos[furoSelecionado?.index]?.length,
            // },
            {
                name: 'Arquivamento',
                processed: filtroArquivamento[furoSelecionado?.index]?.length,
                total: chipBoxesInternos[furoSelecionado?.index]?.length,
            },
        ]);
    }, [furoSelecionado, filtroArquivamento, filtroConferencia, filtroDensidade, filtroFotografia, filtroMarcacao, filtroSerragem])

    const [dataBarChartTodos, setDataBarChartTodos] = useState()
    useEffect(() => {
        const AllChipBoxesFiltradosConferencia = chipBoxes.filter(chipbox =>
            chipbox.processos.conferencia?.sai !== null
        );

        const AllChipBoxesFiltradosMarcacao = chipBoxes.filter(chipbox =>
            chipbox.processos.marcacao?.sai !== null
        );

        const AllChipBoxesFiltradosFotografia = chipBoxes.filter(chipbox =>
            chipbox.processos.fotografia?.sai !== null
        );

        const AllChipBoxesFiltradosArquivamento = chipBoxes.filter(chipbox =>
            chipbox.processos.arquivamento?.sai !== null
        );

        setDataBarChartTodos([
            {
                name: 'Conferência',
                processed: AllChipBoxesFiltradosConferencia?.length,
                total: chipBoxes?.length,
            },
            {
                name: 'Marcação',
                processed: AllChipBoxesFiltradosMarcacao?.length,
                total: chipBoxes?.length,
            },
            {
                name: 'Fotografia',
                processed: AllChipBoxesFiltradosFotografia?.length,
                total: chipBoxes?.length,
            },
            // {
            //     name: 'Densidade',
            //     processed: 0,
            //     total: 0,
            // },
            // {
            //     name: 'Serragem',
            //     processed: 0,
            //     total: 0,
            // },
            {
                name: 'Arquivamento',
                processed: AllChipBoxesFiltradosArquivamento?.length,
                total: chipBoxes?.length,
            },
        ]);
    }, [chipBoxes, furoSelecionado])

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
    }, [chipBoxes, furoSelecionado]);

    const [value, setValue] = useState(0);

    const handleChange = (option) => {
        setValue(option);
    };

    const [filtroConferenciaEnt, setFiltroConferenciaEnt] = useState([])
    const [filtroMarcacaoEnt, setFiltroMarcacaoEnt] = useState([])
    const [filtroFotografiaEnt, setFiltroFotografiaEnt] = useState([])
    const [filtroDensidadeEnt, setFiltroDensidadeEnt] = useState([])
    const [filtroSerragemEnt, setFiltroSerragemEnt] = useState([])
    const [filtroArquivamentoEnt, setFiltroArquivamentoEnt] = useState([])

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

            const arraysFiltradosConferencia = arraysInternos.map(arrayInterno =>
                arrayInterno.filter(chipbox =>
                    chipbox.processos.conferencia?.sai !== null
                )
            );
            setFiltroConferenciaEnt(arraysFiltradosConferencia)

            const arraysFiltradosMarcacao = arraysInternos.map(arrayInterno =>
                arrayInterno.filter(chipbox =>
                    chipbox.processos.marcacao?.sai !== null
                )
            );
            setFiltroMarcacaoEnt(arraysFiltradosMarcacao)

            const arraysFiltradosFotografia = arraysInternos.map(arrayInterno =>
                arrayInterno.filter(chipbox =>
                    chipbox.processos.fotografia?.sai !== null
                )
            );
            setFiltroFotografiaEnt(arraysFiltradosFotografia)

            const arraysFiltradosDensidade = arraysInternos.map(arrayInterno =>
                arrayInterno.filter(chipbox =>
                    chipbox.processos.densidade?.sai !== null
                )
            );
            setFiltroDensidadeEnt(arraysFiltradosDensidade)

            const arraysFiltradosSerragem = arraysInternos.map(arrayInterno =>
                arrayInterno.filter(chipbox =>
                    chipbox.processos.serragem?.sai !== null
                )
            );
            setFiltroSerragemEnt(arraysFiltradosSerragem)

            const arraysFiltradosArquivamento = arraysInternos.map(arrayInterno =>
                arrayInterno.filter(chipbox =>
                    chipbox.processos.arquivamento?.sai !== null
                )
            );
            setFiltroArquivamentoEnt(arraysFiltradosArquivamento)
        }
    }, [chipBoxes])

    const [menuBig, setMenuBig] = useState(false)

    return !authUser ? (
        <Loader />
    ) : (
        <main className="">
            <Container>
                <Header onClick={signOut} authUser={authUser} />
                <RenderFunctions>
                    <MenuLeft setSelected={setSelected} selected={selected} setMenuBig={setMenuBig} />
                    <Content>
                        <TopDashboard
                            finalizados={quantidadeFinalizados}
                            conferidos={quantidadeConferidos}
                            quantidadeDeNaoIniciado={quantidadeNaoIniciado}
                            processamento={quantidadeProcessamento}
                            furos={furos}
                            selected={selected}
                        />
                        <Divider sx={{ display: selected === 'Dashboard' ? 'flex' : 'none', borderWidth: '2px', backgroundColor: '#008F83', marginTop: 1, boxShadow: '10px 4px 4px rgba(0, 0, 0, 0.6)', marginBottom: 1 }} />
                        <RowFuros furos={furos} setFuroSelecionado={setFuroSelecionado} selected={selected} />
                        {
                            selected === 'Dashboard' ?
                                <>
                                    <Divider sx={{ borderWidth: '2px', backgroundColor: '#008F83', marginTop: 1, boxShadow: '10px 4px 4px rgba(0, 0, 0, 0.6)', marginBottom: 1 }} />
                                    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                                        {
                                            furoSelecionado ?
                                                <div style={{display:'flex', flexDirection:'row', alignItems:'center', width:'100%'}} >
                                                    <text style={{fontSize:20, fontWeight:'bold', color:"#000f000", marginLeft:10,display: selected == 'Relatórios' || selected === 'Mensagens/Avisos' || selected === 'Config. Impressora' || selected === 'Importar Arquivo' || selected === 'Usuário' ? 'none' : 'flex',}} >Filtros: </text>
                                                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width:'100%' }} >
                                                        <FilterOption opcao={value === 0} onClick={() => handleChange(0)} >
                                                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderRadius: 10, borderWidth: 2, borderColor: '#008F83' }} >
                                                                <div style={{backgroundColor: '#008F83', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 5 }} >
                                                                    <img src="assets/value1.png" width={50} style={{ marginRight: 4 }} />
                                                                </div>
                                                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
                                                                    <text style={{fontWeight:'bold', margin:4}} >QUANTIDADE DE CAIXAS FINALIZADAS</text>
                                                                    <text style={{fontWeight:'bold'}} >(TOTAL DE FUROS)</text>
                                                                </div>
                                                            </div>
                                                        </FilterOption>
                                                        <FilterOption opcao={value === 1} onClick={() => handleChange(1)}>
                                                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderRadius: 10, borderWidth: 2, borderColor: '#008F83' }} >
                                                                <div style={{backgroundColor: '#008F83', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 5 }} >
                                                                    <img src="assets/value2.png" width={50} style={{ marginRight: 4 }} />
                                                                </div>
                                                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
                                                                    <text style={{fontWeight:'bold', margin:4}} >TEMPO DE PROCESSAMENTO DE CADA</text>
                                                                    <text style={{fontWeight:'bold'}} >CAIXA POR PROCESSO</text>
                                                                </div>
                                                            </div>
                                                        </FilterOption>
                                                        <FilterOption opcao={value === 2} onClick={() => handleChange(2)}>
                                                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderRadius: 10, borderWidth: 2, borderColor: '#008F83' }} >
                                                                <div style={{backgroundColor: '#008F83', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 5 }} >
                                                                    <img src="assets/value3.png" width={50} style={{ marginRight: 4 }} />
                                                                </div>
                                                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
                                                                    <text style={{fontWeight:'bold', margin:4}} >CAIXAS PROCESSADAS POR DIA</text>
                                                                    <text style={{fontWeight:'bold'}} >NA SEMANA</text>
                                                                </div>
                                                            </div>
                                                        </FilterOption>
                                                        <FilterOption opcao={value === 3} onClick={() => handleChange(3)}>
                                                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderRadius: 10, borderWidth: 2, borderColor: '#008F83' }} >
                                                                <div style={{backgroundColor: '#008F83', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 5 }} >
                                                                    <img src="assets/value4.png" width={50} style={{ marginRight: 4, borderBottomWidth: 2, borderColor: '#008f83' }} />
                                                                </div>
                                                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
                                                                    <text style={{fontWeight:'bold', margin:4}} >PROCESSAMENTO POR PERÍODO EM</text>
                                                                    <text style={{fontWeight:'bold'}} >METROS (TODAS AS CAIXAS)</text>
                                                                </div>
                                                            </div>
                                                        </FilterOption>
                                                    </div>
                                                </div>

                                                :
                                                <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                                                    <text style={{ fontSize: 29, fontWeight: 'bold', userSelect: 'none' }} >
                                                        Selecione o furo para vizualizar os gráficos
                                                    </text>
                                                </div>
                                        }
                                    <Divider sx={{ borderWidth: '2px', backgroundColor: '#008F83', marginTop: 0.7, boxShadow: '10px 4px 4px rgba(0, 0, 0, 0.6)', marginBottom: 1 }} />

                                    </Box>
                                    {
                                        furoSelecionado && value === 0 ?
                                            <div style={{ marginLeft: 100, marginTop: 20, display: 'flex', flexDirection: 'column' }} >
                                                <text style={{ fontSize: 20, fontWeight: 'bold', userSelect: 'none' }} >
                                                    Quantidade de caixas finalizadas por processo
                                                </text>
                                                <text style={{ margin: 5, marginLeft: 55, userSelect: 'none' }} >
                                                    Total {<SquareIcon style={{ color: '#ef3a25', userSelect: 'none' }} />}
                                                </text>
                                                <text style={{ margin: 5, userSelect: 'none' }} >
                                                    Finalizadas {<SquareIcon style={{ color: '#008f83', userSelect: 'none' }} />}
                                                </text>
                                                <CustomBarChart
                                                    data={furoSelecionado.furo === 'TODOS' ?
                                                        dataBarChartTodos
                                                        :
                                                        dataBarChart
                                                    }
                                                    maxValue={furoSelecionado.furo === 'TODOS' ?
                                                        chipBoxes?.length
                                                        :
                                                        chipBoxesInternos[furoSelecionado?.index]?.length}
                                                />
                                            </div>
                                            :
                                            <></>
                                    }
                                    {
                                        furoSelecionado && value === 1 ?
                                            <div style={{ marginLeft: 100, marginTop: 12, display: 'flex', flexDirection: 'column' }} >
                                                <Relatorio
                                                    chipBoxes={chipBoxes} furoSelecionado={furoSelecionado}
                                                    filtroConferencia={filtroConferencia} filtroMarcacao={filtroMarcacao}
                                                    filtroFotografia={filtroFotografia} filtroDensidade={filtroDensidade}
                                                    filtroSerragem={filtroSerragem} filtroArquivamento={filtroArquivamento}
                                                    chipBoxesInternos={chipBoxesInternos}
                                                    authUser={authUser} menuBig={menuBig}
                                                />

                                            </div>
                                            :
                                            <></>
                                    }
                                    {
                                        value === 2 ?
                                            <BarChartWeek contagensPorDiaConferencia={contagensPorDiaConferencia}
                                                contagensPorDiaMarcacao={contagensPorDiaMarcacao}
                                                contagensPorDiaFotografia={contagensPorDiaFotografia}
                                                contagensPorDiaDensidade={contagensPorDiaDensidade}
                                                contagensPorDiaSerragem={contagensPorDiaSerragem}
                                                contagensPorDiaDespacho={contagensPorDiaDespacho}
                                                contagensPorDiaArquivamento={contagensPorDiaArquivamento}
                                                chipBoxes={chipBoxes}
                                            />
                                            :
                                            <></>
                                    }
                                    {
                                        value === 3 ?
                                            <CustomBarChartMes
                                                chipBoxes={chipBoxes} furoSelecionado={furoSelecionado}
                                                filtroConferencia={filtroConferencia} filtroMarcacao={filtroMarcacao}
                                                filtroFotografia={filtroFotografia} filtroDensidade={filtroDensidade}
                                                filtroSerragem={filtroSerragem} filtroArquivamento={filtroArquivamento}
                                                chipBoxesInternos={chipBoxesInternos}
                                                authUser={authUser}
                                            />
                                            :
                                            <></>
                                    }
                                </>
                                :
                                <></>
                        }
                        {
                            selected === 'Relatórios' ?
                                <div style={{ display: 'flex', flexDirection: 'column' }} >
                                    <Relatorios furos={furos}
                                        chipBoxes={chipBoxes}
                                        furoSelecionado={furoSelecionado}
                                        filtroConferencia={filtroConferenciaEnt}
                                        filtroMarcacao={filtroMarcacaoEnt}
                                        filtroFotografia={filtroFotografiaEnt}
                                        filtroDensidade={filtroDensidadeEnt}
                                        filtroSerragem={filtroSerragemEnt}
                                        filtroArquivamento={filtroArquivamentoEnt}
                                        chipBoxesInternos={chipBoxesInternos}
                                        setFuroSelecionado={setFuroSelecionado}
                                        authUser={authUser}
                                        whiteBoxes={whiteBoxes}
                                        paletes={paletes}
                                    />
                                </div>
                                :
                                <></>
                        }
                        {
                            selected === 'Impressão Etiquetas' ?
                                // <PrintLabel furoSelecionado={furoSelecionado} chipBoxesInternos={chipBoxesInternos} furos={furos} whiteBoxes={whiteBoxes} paletes={paletes} />
                                <PrintLabelNovo
                                    furoSelecionado={furoSelecionado}
                                    chipBoxesInternos={chipBoxesInternos}
                                    furos={furos}
                                    whiteBoxes={whiteBoxes}
                                    paletes={paletes} />
                                :
                                <></>
                        }
                        {
                            selected === 'Importar Arquivo' ?
                                <Import />
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
                                    chipBoxesInternos={chipBoxesInternos} furos={furos}
                                />
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
                            selected === 'Usuário' ?
                                <Users />
                                :
                                <></>
                        }
                        {
                            selected === 'Mensagens/Avisos' ?
                                <Mensagens
                                    chipBoxes={chipBoxes}
                                    furos={furos}
                                />
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

const FilterOption = styled.button`
    background-color: ${props => (props.opcao ? '#fbca4d' : 'whitesmoke')};
    transition: opacity 0.3s;
    user-select: none;
    border-radius: 10px;
    &:hover {
        opacity: 0.7;
    }
`;