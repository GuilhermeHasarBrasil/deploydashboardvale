import { useEffect, useState } from "react";
import { useAuth } from "@/firebase/auth";
import { useRouter } from "next/router";
import Loader from "@/components/Loader";
import styled from 'styled-components'
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase";
import * as furosmock from "@/components/mockedContent/furos";
import * as chipboxesmock from "@/components/mockedContent/chipboxes";
import Header from "@/components/Header";
import RowFuros from "@/components/index/rowFuros";
import TableFuros from "@/components/index/tableFuros";
import MenuLeft from "@/components/index/menuLeft";
import TopDashboard from "@/components/Dashboard/topDashboard";
import { Divider } from '@mui/material';
import CircularChart from "@/components/Relatorios/pieChart";

export default function Home() {
    const [todoInput, setTodoInput] = useState("");
    const { signOut, authUser, isLoading } = useAuth();
    const router = useRouter();
    const [furos, setFuros] = useState(furosmock.furos)
    const [chipBoxes, setChipBoxes] = useState(chipboxesmock.chipboxes)
    const [chipBoxesInternos, setChipBoxesInternos] = useState([])
    const [selected, setSelected] = useState('Dashboard')
    const [furoSelecionado, setFuroSelecionado] = useState([furos[0].numero])

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

    console.log(furoSelecionado)
    const [quantidadeConferidos, setQuantidadeConferidos] = useState(0);
    const [quantidadeFinalizados, setQuantidadeFinalizados] = useState(0);
    const [filtroConferencia, setFiltroConferencia] = useState([])
    const [filtroMarcacao, setFiltroMarcacao] = useState([])
    const [filtroFotografia, setFiltroFotografia] = useState([])
    const [filtroDensidade, setFiltroDensidade] = useState([])
    const [filtroSerragem, setFiltroSerragem] = useState([])
    const [filtroArquivamento, setFiltroArquivamento] = useState([])
    
    useEffect(() => {
        const quantidadeConferidos = furos.filter(furo => furo.conferido === true).length;
        const quantidadeFinalizado = furos.filter(furo => furo.finalizado === true).length;
        setQuantidadeConferidos(quantidadeConferidos);
        setQuantidadeFinalizados(quantidadeFinalizado);
    }, [furos])


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

                                </>
                                :
                                <></>
                        }
                        {
                            selected === 'Relatórios' ?
                            <CircularChart/>
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
