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
import CustomHorizontalBarChart from "../components/Dashboard/CustomBarChartHorizontal";
import SquareIcon from '@mui/icons-material/Square';
import BarChartWeek from "../components/Dashboard/WeekWorkBarchart";
import Mensagens from "../components/Mensagens/Mensagens";
import Box from '@mui/material/Box';
import Relatorios from "../components/Relatorios/Relatorios";
import Import from "../components/ImportarArquivo/importar";
import CustomBarChartMes from "../components/Dashboard/BarChartMes";
import PrintLabelNovo from "../components/ImpressaoEtiquetas/impressaoEtiquetasNOVO";
import Users from "../components/Usuarios/Users";
import InfoBarChartHorizontal from "../components/Dashboard/InfoBarChartHorizontal";
import PauseTopDashboard from "../components/PauseTopDashboard";

export default function Home() {
    const { signOut, authUser, isLoading } = useAuth();
    const router = useRouter();
    const [furos, setFuros] = useState([])
    const [chipBoxes, setChipBoxes] = useState([])
    const [whiteBoxes, setWhiteBoxes] = useState([])
    const [paletes, setPaletes] = useState([])

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

    const [dataBarChartTodos, setDataBarChartTodos] = useState()
    const [dataTopDashboard, setDataTopDashboard] = useState()
    const [caixasFinalizadas, setCaixasFinalizadas] = useState()
    const [caixasEmAndamento, setCaixasEmAndamento] = useState()
    const [caixasNaoIniciadas, setCaixasNaoIniciadas] = useState()

    const [dataBarChart, setDataBarChart] = useState([])

    const [filtroConferenciaEnt, setFiltroConferenciaEnt] = useState([])
    const [filtroMarcacaoEnt, setFiltroMarcacaoEnt] = useState([])
    const [filtroFotografiaEnt, setFiltroFotografiaEnt] = useState([])
    const [filtroDensidadeEnt, setFiltroDensidadeEnt] = useState([])
    const [filtroSerragemEnt, setFiltroSerragemEnt] = useState([])
    const [filtroArquivamentoEnt, setFiltroArquivamentoEnt] = useState([])

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

    // info furos top dashboard
    useEffect(() => {
        const quantidadeConferidos = furos.filter(furo => furo?.conferido === true)
        const quantidadeFinalizado = furos.filter(furo => furo?.finalizado === true)
        const quantidadeEmProcessamento = furos.filter(furo => furo?.conferido === true && !furo?.finalizado)
        const quantidadeDeNaoIniciado = furos.filter(furo => !furo?.conferido && !furo?.finalizado)
        setQuantidadeConferidos(quantidadeConferidos);
        setQuantidadeFinalizados(quantidadeFinalizado);
        setQuantidadeProcessamento(quantidadeEmProcessamento)
        setQuantidadeNaoIniciado(quantidadeDeNaoIniciado)
    }, [furos])

    useEffect(() => {
        setDataBarChart([
            {
                name: 'Conferência',
                processed: filtroConferencia[furoSelecionado?.index]?.length,
                total: chipBoxesInternos[furoSelecionado?.index]?.length,
                totalteste: filtroConferencia[furoSelecionado?.index]?.length / chipBoxesInternos[furoSelecionado?.index]?.length
            },
            {
                name: 'Marcação',
                processed: filtroMarcacao[furoSelecionado?.index]?.length,
                total: chipBoxesInternos[furoSelecionado?.index]?.length,
                totalteste: filtroMarcacao[furoSelecionado?.index]?.length / chipBoxesInternos[furoSelecionado?.index]?.length
            },
            {
                name: 'Fotografia',
                processed: filtroFotografia[furoSelecionado?.index]?.length,
                total: chipBoxesInternos[furoSelecionado?.index]?.length,
                totalteste: filtroFotografia[furoSelecionado?.index]?.length / chipBoxesInternos[furoSelecionado?.index]?.length
            },
            {
                name: 'Arquivamento',
                processed: filtroArquivamento[furoSelecionado?.index]?.length,
                total: chipBoxesInternos[furoSelecionado?.index]?.length,
                totalteste: filtroArquivamento[furoSelecionado?.index]?.length / chipBoxesInternos[furoSelecionado?.index]?.length
            },
        ]);
    }, [furoSelecionado, filtroArquivamento, filtroConferencia, filtroDensidade, filtroFotografia, filtroMarcacao, filtroSerragem])

    useEffect(() => {

        const AllChipBoxesFiltradosConferencia = chipBoxes.sort((a, b) => {
            // Ordenar pelo campo 'furo' em ordem alfabética
            if (a.furo < b.furo) return -1;
            if (a.furo > b.furo) return 1;
            // Se 'furo' for igual, ordenar pelo campo 'cx' em ordem alfabética
            if (a.cx < b.cx) return -1;
            if (a.cx > b.cx) return 1;
            return 0;
        }).filter(chipbox =>
            chipbox.processos.conferencia?.sai !== null
        );

        const AllChipBoxesFiltradosConferenciaAndamentoTopDashboard = chipBoxes.sort((a, b) => {
            // Ordenar pelo campo 'furo' em ordem alfabética
            if (a.furo < b.furo) return -1;
            if (a.furo > b.furo) return 1;
            // Se 'furo' for igual, ordenar pelo campo 'cx' em ordem alfabética
            if (a.cx < b.cx) return -1;
            if (a.cx > b.cx) return 1;
            return 0;
        }).filter(chipbox =>
            chipbox.processos.conferencia?.ent !== null && chipbox.processos.conferencia?.sai == null
        );

        const AllChipBoxesFiltradosMarcacao = chipBoxes.sort((a, b) => {
            // Ordenar pelo campo 'furo' em ordem alfabética
            if (a.furo < b.furo) return -1;
            if (a.furo > b.furo) return 1;
            // Se 'furo' for igual, ordenar pelo campo 'cx' em ordem alfabética
            if (a.cx < b.cx) return -1;
            if (a.cx > b.cx) return 1;
            return 0;
        }).filter(chipbox =>
            chipbox.processos.marcacao?.sai !== null
        );

        const AllChipBoxesFiltradosMarcacaoAndamentoTopDashboard = chipBoxes.sort((a, b) => {
            // Ordenar pelo campo 'furo' em ordem alfabética
            if (a.furo < b.furo) return -1;
            if (a.furo > b.furo) return 1;
            // Se 'furo' for igual, ordenar pelo campo 'cx' em ordem alfabética
            if (a.cx < b.cx) return -1;
            if (a.cx > b.cx) return 1;
            return 0;
        }).filter(chipbox =>
            chipbox.processos.marcacao?.ent !== null && chipbox.processos.marcacao?.sai == null
        );

        const AllChipBoxesFiltradosFotografia = chipBoxes.sort((a, b) => {
            // Ordenar pelo campo 'furo' em ordem alfabética
            if (a.furo < b.furo) return -1;
            if (a.furo > b.furo) return 1;
            // Se 'furo' for igual, ordenar pelo campo 'cx' em ordem alfabética
            if (a.cx < b.cx) return -1;
            if (a.cx > b.cx) return 1;
            return 0;
        }).filter(chipbox =>
            chipbox.processos.fotografia?.sai !== null
        );

        const AllChipBoxesFiltradosFotografiaAndamentoTopDashboard = chipBoxes.sort((a, b) => {
            // Ordenar pelo campo 'furo' em ordem alfabética
            if (a.furo < b.furo) return -1;
            if (a.furo > b.furo) return 1;
            // Se 'furo' for igual, ordenar pelo campo 'cx' em ordem alfabética
            if (a.cx < b.cx) return -1;
            if (a.cx > b.cx) return 1;
            return 0;
        }).filter(chipbox =>
            chipbox.processos.fotografia?.ent !== null && chipbox.processos.fotografia?.sai == null
        );

        const AllChipBoxesFiltradosArquivamento = chipBoxes.sort((a, b) => {
            // Ordenar pelo campo 'furo' em ordem alfabética
            if (a.furo < b.furo) return -1;
            if (a.furo > b.furo) return 1;
            // Se 'furo' for igual, ordenar pelo campo 'cx' em ordem alfabética
            if (a.cx < b.cx) return -1;
            if (a.cx > b.cx) return 1;
            return 0;
        }).filter(chipbox =>
            chipbox.processos.arquivamento?.sai !== null
        );
        setCaixasFinalizadas(AllChipBoxesFiltradosArquivamento)

        const AllChipBoxesEmProcessamento = chipBoxes.sort((a, b) => {
            // Ordenar pelo campo 'furo' em ordem alfabética
            if (a.furo < b.furo) return -1;
            if (a.furo > b.furo) return 1;
            // Se 'furo' for igual, ordenar pelo campo 'cx' em ordem alfabética
            if (a.cx < b.cx) return -1;
            if (a.cx > b.cx) return 1;
            return 0;
        }).filter(chipbox =>
            chipbox.processos?.conferencia?.ent !== null && chipbox.processos?.arquivamento?.sai == null
        );
        setCaixasEmAndamento(AllChipBoxesEmProcessamento)

        const AllChipBoxesFiltradosArquivamentoAndamentoTopDashboard = chipBoxes.sort((a, b) => {
            // Ordenar pelo campo 'furo' em ordem alfabética
            if (a.furo < b.furo) return -1;
            if (a.furo > b.furo) return 1;
            // Se 'furo' for igual, ordenar pelo campo 'cx' em ordem alfabética
            if (a.cx < b.cx) return -1;
            if (a.cx > b.cx) return 1;
            return 0;
        }).filter(chipbox =>
            chipbox.processos.arquivamento?.ent !== null && chipbox.processos.arquivamento?.sai == null
        );

        const AllChipBoxesNaoIniciadas = chipBoxes.sort((a, b) => {
            // Ordenar pelo campo 'furo' em ordem alfabética
            if (a.furo < b.furo) return -1;
            if (a.furo > b.furo) return 1;
            // Se 'furo' for igual, ordenar pelo campo 'cx' em ordem alfabética
            if (a.cx < b.cx) return -1;
            if (a.cx > b.cx) return 1;
            return 0;
        }).filter(chipbox =>
            chipbox.processos.conferencia?.ent == null
        );
        setCaixasNaoIniciadas(AllChipBoxesNaoIniciadas)


        setDataBarChartTodos([
            {
                name: 'Conferência',
                processed: AllChipBoxesFiltradosConferencia?.length,
                total: chipBoxes?.length,
                totalteste: AllChipBoxesFiltradosConferencia?.length / chipBoxes?.length
            },
            {
                name: 'Marcação',
                processed: AllChipBoxesFiltradosMarcacao?.length,
                total: chipBoxes?.length,
                totalteste: AllChipBoxesFiltradosMarcacao?.length / chipBoxes?.length
            },
            {
                name: 'Fotografia',
                processed: AllChipBoxesFiltradosFotografia?.length,
                total: chipBoxes?.length,
                totalteste: AllChipBoxesFiltradosFotografia?.length / chipBoxes?.length
            },
            {
                name: 'Arquivamento',
                processed: AllChipBoxesFiltradosArquivamento?.length,
                total: chipBoxes?.length,
                totalteste: AllChipBoxesFiltradosArquivamento?.length / chipBoxes?.length
            },
        ]);

        setDataTopDashboard([
            {
                name: 'Conferência',
                andamento: AllChipBoxesFiltradosConferenciaAndamentoTopDashboard?.length
            },

            {
                name: 'Marcação',
                andamento: AllChipBoxesFiltradosMarcacaoAndamentoTopDashboard?.length
            },

            {
                name: 'Fotografia',
                andamento: AllChipBoxesFiltradosFotografiaAndamentoTopDashboard?.length
            },

            {
                name: 'Arquivamento',
                andamento: AllChipBoxesFiltradosArquivamentoAndamentoTopDashboard?.length
            }
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
                    <MenuLeft setSelected={setSelected} selected={selected} setMenuBig={setMenuBig} onClick={signOut} />
                    <Content>
                        <TopDashboard
                            finalizados={quantidadeFinalizados}
                            conferidos={quantidadeConferidos}
                            quantidadeDeNaoIniciado={quantidadeNaoIniciado}
                            processamento={quantidadeProcessamento}
                            furos={furos}
                            selected={selected}
                            chipBoxes={chipBoxes}
                            menuBig={menuBig}
                            dataTopDashboard={dataTopDashboard}
                            dataBarChartTodos={dataBarChartTodos}
                            caixasFinalizadas={caixasFinalizadas}
                            caixasEmAndamento={caixasEmAndamento}
                            caixasNaoIniciadas={caixasNaoIniciadas}
                        />
                        <Divider
                            sx={{
                                display: selected === 'Dashboard' ? 'flex' : 'none',
                                borderWidth: window.screen.width > 1900 ?
                                    '1px' :
                                    window.screen.width > 1600 ? '0.8px' :
                                        window.screen.width < 1370 ? '0.5px' : '0.5px',
                                backgroundColor: '#008F83',
                                marginTop: 1,
                                boxShadow: window.screen.width > 1900 ?
                                    '10px 4px 4px rgba(0, 0, 0, 0.6)' :
                                    window.screen.width > 1600 ? '8px 3px 3px rgba(0, 0, 0, 0.6)' :
                                        window.screen.width < 1370 ? '8px 2px 2px rgba(0, 0, 0, 0.6)' : '8px 2px 2px rgba(0, 0, 0, 0.6)',
                                marginBottom: 1
                            }}
                        />
                        <RowFuros furos={furos} setFuroSelecionado={setFuroSelecionado} selected={selected} />
                        {
                            selected === 'Dashboard' ?
                                <>
                                    <Divider
                                        sx={{
                                            borderWidth: window.screen.width > 1900 ?
                                                '1px' :
                                                window.screen.width > 1600 ? '0.8px' :
                                                    window.screen.width < 1370 ? '0.5px' : '0.5px',
                                            backgroundColor: '#008F83',
                                            marginTop: window.screen.width > 1900 ?
                                                1 :
                                                window.screen.width > 1600 ? 0.8 :
                                                    window.screen.width < 1370 ? 0.5 : 0.5,
                                            boxShadow: window.screen.width > 1900 ?
                                                '10px 4px 4px rgba(0, 0, 0, 0.6)' :
                                                window.screen.width > 1600 ? '8px 3px 3px rgba(0, 0, 0, 0.6)' :
                                                    window.screen.width < 1370 ? '8px 2px 2px rgba(0, 0, 0, 0.6)' : '8px 2px 2px rgba(0, 0, 0, 0.6)',
                                            marginBottom: 1
                                        }}
                                    />
                                    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                                        {
                                            furoSelecionado ?
                                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }} >
                                                    <text style={
                                                        {
                                                            fontSize: window.screen.width > 1900 ?
                                                                20 :
                                                                window.screen.width > 1600 ? 18 :
                                                                    window.screen.width < 1370 ? 16 : 16,
                                                            fontWeight: 'bold', color: "#000f000",
                                                            marginLeft: 10,
                                                            display: selected == 'Relatórios' || selected === 'Mensagens/Avisos' || selected === 'Config. Impressora' || selected === 'Importar Arquivo' || selected === 'Usuário' ? 'none' : 'flex',
                                                        }
                                                    } >
                                                        Filtros:
                                                    </text>
                                                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width: '100%' }} >
                                                        <FilterOption opcao={value === 0} onClick={() => handleChange(0)} >
                                                            <ContainerItemFilter >
                                                                <ContainerImgFilter >
                                                                    <img src="assets/value1.png" style={
                                                                        {
                                                                            marginRight: 4, width: window.screen.width > 1900 ?
                                                                                50 :
                                                                                window.screen.width > 1600 ? 45 :
                                                                                    window.screen.width < 1370 ? 30 : 30, height: 'auto'
                                                                        }
                                                                    } />
                                                                </ContainerImgFilter>
                                                                <ContainerTextFilter >
                                                                    <TextFilterOption opcao={value === 0} >QUANTIDADE DE CAIXAS FINALIZADAS</TextFilterOption>
                                                                    <TextFilterOption opcao={value === 0} style={{ fontWeight: 'bold' }} >(TOTAL DE FUROS)</TextFilterOption>
                                                                </ContainerTextFilter>
                                                            </ContainerItemFilter>
                                                        </FilterOption>
                                                        <FilterOption opcao={value === 1} onClick={() => handleChange(1)}>
                                                            <ContainerItemFilter >
                                                                <ContainerImgFilter >
                                                                    <img src="assets/value2.png" style={
                                                                        {
                                                                            marginRight: 4, width: window.screen.width > 1900 ?
                                                                                50 :
                                                                                window.screen.width > 1600 ? 45 :
                                                                                    window.screen.width < 1370 ? 30 : 30, height: 'auto'
                                                                        }
                                                                    } />
                                                                </ContainerImgFilter>
                                                                <ContainerTextFilter  >
                                                                    <TextFilterOption opcao={value === 1}>TEMPO DE PROCESSAMENTO DE CADA</TextFilterOption>
                                                                    <TextFilterOption opcao={value === 1} style={{ fontWeight: 'bold' }} >CAIXA POR PROCESSO</TextFilterOption>
                                                                </ContainerTextFilter>
                                                            </ContainerItemFilter>
                                                        </FilterOption>
                                                        <FilterOption opcao={value === 2} onClick={() => handleChange(2)}>
                                                            <ContainerItemFilter >
                                                                <ContainerImgFilter >
                                                                    <img src="assets/value3.png" style={
                                                                        {
                                                                            marginRight: 4, width: window.screen.width > 1900 ?
                                                                                50 :
                                                                                window.screen.width > 1600 ? 45 :
                                                                                    window.screen.width < 1370 ? 30 : 30, height: 'auto'
                                                                        }
                                                                    } />
                                                                </ContainerImgFilter>
                                                                <ContainerTextFilter >
                                                                    <TextFilterOption opcao={value === 2} >CAIXAS PROCESSADAS POR DIA</TextFilterOption>
                                                                    <TextFilterOption opcao={value === 2} style={{ fontWeight: 'bold' }} >NA SEMANA</TextFilterOption>
                                                                </ContainerTextFilter>
                                                            </ContainerItemFilter>
                                                        </FilterOption>
                                                        <FilterOption opcao={value === 3} onClick={() => handleChange(3)}>
                                                            <ContainerItemFilter >
                                                                <ContainerImgFilter >
                                                                    <img src="assets/value4.png" style={
                                                                        {
                                                                            marginRight: 4, width: window.screen.width > 1900 ?
                                                                                50 :
                                                                                window.screen.width > 1600 ? 45 :
                                                                                    window.screen.width < 1370 ? 30 : 30, height: 'auto'
                                                                        }
                                                                    } />
                                                                </ContainerImgFilter>
                                                                <ContainerTextFilter  >
                                                                    <TextFilterOption opcao={value === 3} >PROCESSAMENTO POR PERÍODO EM</TextFilterOption>
                                                                    <TextFilterOption opcao={value === 3} style={{ fontWeight: 'bold' }} >METROS (TODAS AS CAIXAS)</TextFilterOption>
                                                                </ContainerTextFilter>
                                                            </ContainerItemFilter>
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
                                        <Divider
                                            sx={{
                                                borderWidth:
                                                    window.screen.width > 1900 ?
                                                        '1px' :
                                                        window.screen.width > 1600 ? '0.8px' :
                                                            window.screen.width < 1370 ? '0.5px' : '0.5px',
                                                backgroundColor: '#008F83',
                                                marginTop: window.screen.width > 1900 ?
                                                    1 :
                                                    window.screen.width > 1600 ? 0.8 :
                                                        window.screen.width < 1370 ? 0.5 : 0.5,
                                                boxShadow: window.screen.width > 1900 ?
                                                    '10px 4px 4px rgba(0, 0, 0, 0.6)' :
                                                    window.screen.width > 1600 ? '8px 3px 3px rgba(0, 0, 0, 0.6)' :
                                                        window.screen.width < 1370 ? '8px 2px 2px rgba(0, 0, 0, 0.6)' : '8px 2px 2px rgba(0, 0, 0, 0.6)',
                                                marginBottom: 1
                                            }}
                                        />

                                    </Box>
                                    {
                                        furoSelecionado && value === 0 ?
                                            //aqqqqqq
                                            <QtdCxFinalizadasContainer >
                                                <div style={{ marginLeft: 20, marginTop: 7, display: 'flex', flexDirection: 'column' }} >
                                                    <text style={{ fontSize: 20, fontWeight: 'bold', userSelect: 'none' }} >
                                                        Quantidade de caixas finalizadas por processo
                                                    </text>
                                                    <text style={{ margin: 5, fontWeight: 'bold', marginLeft: 55, userSelect: 'none' }} >
                                                        Total {<SquareIcon style={{ color: '#ef3a25', userSelect: 'none' }} />}
                                                    </text>
                                                    <text style={{ margin: 5, fontWeight: 'bold', userSelect: 'none' }} >
                                                        Finalizadas {<SquareIcon style={{ color: '#008f83', userSelect: 'none' }} />}
                                                    </text>
                                                    <CustomHorizontalBarChart
                                                        data={furoSelecionado.furo === 'TODOS' ?
                                                            dataBarChartTodos
                                                            :
                                                            dataBarChart
                                                        }
                                                        maxValue={furoSelecionado.furo === 'TODOS' ?
                                                            chipBoxes?.length
                                                            :
                                                            chipBoxesInternos[furoSelecionado?.index]?.length}
                                                        menuBig={menuBig}
                                                    />
                                                </div>
                                                <div>
                                                    <InfoBarChartHorizontal data={furoSelecionado.furo === 'TODOS' ?
                                                        dataBarChartTodos
                                                        :
                                                        dataBarChart

                                                    }
                                                        menuBig={menuBig}
                                                        caixasEmAndamento={caixasEmAndamento}
                                                        caixasNaoIniciadas={caixasNaoIniciadas}
                                                        furoSelecionado={furoSelecionado}
                                                    />
                                                </div>
                                            </QtdCxFinalizadasContainer>
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
                                                menuBig={menuBig}
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
                                                authUser={authUser} menuBig={menuBig}
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
                            selected === 'Parâmetros' ?
                                <PauseTopDashboard />
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
const QtdCxFinalizadasContainer = styled.div`
    display: flex;
    flex-direction: row;
    @media only screen and (max-device-width: 1679px) {
            flex-direction: row;
        }
`
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
    background-color: ${props => (props.opcao ? '#008F83' : 'whitesmoke')};
    transition: opacity 0.3s;
    user-select: none;
    border-radius: 10px;
    &:hover {
        opacity: 0.7;
    }
`;
const ContainerItemFilter = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-radius: 10px;
    border-width: 2px;
    border-color: #008F83;
    @media only screen and (max-device-width: 1679px) {
            border-width: 2px;
        }
        @media only screen and (max-device-width: 1370px) {
            border-width: 2px;
        }
`
const ContainerImgFilter = styled.div`
    background-color: #008f83;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
    @media only screen and (max-device-width: 1679px) {
            padding: 4px;
        }
        @media only screen and (max-device-width: 1370px) {
            padding: 4px;
        }
`
const ContainerTextFilter = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`
const TextFilterOption = styled.text`
    font-size: 16px;
    font-weight: bold;
    margin-left: 4px;
    margin-right: 4px;
    color: ${props => (props.opcao ? 'white' : 'black')};
    @media only screen and (max-device-width: 1679px) {
            font-size: 12px;
        }
        @media only screen and (max-device-width: 1370px) {
            font-size: 10px;
        }
`