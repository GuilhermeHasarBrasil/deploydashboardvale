import { useEffect, useState } from "react";
import { useAuth } from "@/firebase/auth";
import { useRouter } from "next/router";
import Loader from "@/components/Loader";
import styled from 'styled-components'
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { Desktop, Newspaper, Print, DocumentAttach, StatsChart } from 'react-ionicons'
import * as furosmock from "@/components/mockedContent/furos";
import * as chipboxesmock from "@/components/mockedContent/chipboxes";
import Header from "@/components/Header";
import RowFuros from "@/components/index/rowFuros";
import TableFuros from "@/components/index/tableFuros";
import MenuLeft from "@/components/index/menuLeft";
import TopDashboard from "@/components/Dashboard/topDashboard";

export default function Home() {
    const [todoInput, setTodoInput] = useState("");
    const { signOut, authUser, isLoading } = useAuth();
    const router = useRouter();
    const [furos, setFuros] = useState(furosmock.furos)
    const [chipBoxes, setChipBoxes] = useState(chipboxesmock.chipboxes)
    const [chipBoxesInternos, setChipBoxesInternos] = useState([])

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
        }
    }, [chipBoxes])

    const [quantidadeConferidos, setQuantidadeConferidos] = useState(0);
    const [quantidadeFinalizados, setQuantidadeFinalizados] = useState(0);
    useEffect(()=>{
        const quantidadeConferidos = furos.filter(furo => furo.conferido === true).length;
        const quantidadeFinalizado = furos.filter(furo => furo.finalizado === true).length;
        setQuantidadeConferidos(quantidadeConferidos);
        setQuantidadeFinalizados(quantidadeFinalizado);
    },[furos])

    return !authUser ? (
        <Loader />
    ) : (
        <main className="">

            <Container>
                <Header onClick={signOut} authUser={authUser} />
                <RenderFunctions>
                    <MenuLeft />
                    <Content>
                        <RowFuros furos={furos} />
                        <TopDashboard finalizados={quantidadeFinalizados} conferidos={quantidadeConferidos} furos={furos}  />
                        <TableFuros furos={furos} />
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
