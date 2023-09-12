import TableFuros from "./tableFuros"
import { useState, useEffect } from "react";
import styled from 'styled-components'
import Dropdown from 'react-dropdown-select';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br'; // localização
dayjs.locale('pt-br'); //localização
import { imageB64 } from "./image";
import { DownloadOutline } from 'react-ionicons'

export default function Relatorios({ furos, chipBoxes, furoSelecionado, filtroConferencia, filtroMarcacao, filtroFotografia, filtroDensidade, filtroSerragem, filtroArquivamento, chipBoxesInternos, setFuroSelecionado, authUser, whiteBoxes, paletes }) {
    function sett(selected, index, selectedInicio, selectedFim, quantidadeCaixas) {
        const inicio = dayjs.unix(selectedInicio?.seconds);
        const fim = dayjs.unix(selectedFim?.seconds);
        const diffInSeconds = fim.diff(inicio, 'second'); // Diferença em segundos
        const hours = Math.floor(diffInSeconds / 3600);
        const minutes = Math.floor((diffInSeconds % 3600) / 60);
        const seconds = diffInSeconds % 60;
        const formattedDate = dayjs.unix(selectedInicio.seconds).format('DD/MM/YYYY HH:mm:ss');

        setFuroSelecionado({
            furo: selected,
            index: index,
            tempoProcessamento: selectedInicio && selectedFim ? hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0') : 'Furo não finalizado',
            quantidadeCaixas: quantidadeCaixas,
            importadoEm: formattedDate
        })
    }

    function secondsToHMS(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;

        return `${hours}:${minutes.toString().padStart(2, '0')}:${Math.round(remainingSeconds).toString().padStart(2, '0')}`;
    }

    function formatTimestamp(timestamp) {
        const seconds = timestamp.seconds;
        const nanoseconds = timestamp.nanoseconds;
        const date = new Date(seconds * 1000 + nanoseconds / 1000000); // Convertendo nanossegundos para milissegundos
        const formattedDate = `${parseInt(date.getDate()) > 10 ? date.getDate() : '0' + date.getDate()}/${parseInt(date.getMonth() + 1) > 10 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1)}/${date.getFullYear()}`;
        return formattedDate;
    }

    const [filteredWhiteBoxFuro, setFilteredWhiteBoxFuro] = useState([])
    const [filteredPaleteFuro, setFilteredPaleteFuro] = useState([])

    useEffect(() => {
        const filterWhiteBox = whiteBoxes?.filter(whiteBox => whiteBox?.furo === furoSelecionado?.furo);
        const filterPaletes = paletes?.filter(palete => palete?.furo === furoSelecionado?.furo);

        setFilteredWhiteBoxFuro(filterWhiteBox)
        setFilteredPaleteFuro(filterPaletes)
    }, [furoSelecionado, whiteBoxes, paletes])

    function generatePDF(data) {
        const sortedChipBoxes = chipBoxesInternos[furoSelecionado?.index].slice().sort((a, b) => a.cx - b.cx);
        const doc = new jsPDF();
        const formattedDate = dayjs().format('DD/MMM/YYYY') + ', ' + dayjs().format('HH:mm:ss ');
        const data1 = [
            ['Usuário', 'Furo', 'Tempo em processamento', 'Caixas'],
            [authUser.email, furoSelecionado.furo, furoSelecionado.tempoProcessamento, furoSelecionado.quantidadeCaixas],
        ];
        const img = imageB64
        //primeira pagina do pdf: capa
        doc.addImage(img, 'jpg', 60, 10)
        doc.setFont('helvetica', 'normal', 'bold')

        doc.text(`Relatório de processamento do furo`, 64, 80)
        doc.text(`${furoSelecionado.furo}`, 94, 87)

        doc.text(`Paraupebas, ${formattedDate}`, 65, 135)
        if (selectedProcesses.length > 3) {
            doc.text(`Processos incluídos: ${selectedProcesses.slice(0, 3).join(', ')},`, 38, 145)
            doc.text(`${selectedProcesses.slice(3, 6).join(', ')}`, 38, 155)
            doc.text(`${selectedProcesses.slice(6, 9).join(', ')}`, 38, 165)
            doc.text(`${selectedProcesses.slice(9, 12).join(', ')}`, 38, 175)

        } else {
            doc.text(`Processos incluídos: ${selectedProcesses.join(', ')}`, 38, 145)
        }
        doc.text(`Relatório exportado por ${authUser.email}`, 10, 260)
        // segunda pagina do pdf
        doc.addPage(1, 'p')
        doc.text('Dados gerais do furo:', 10, 10)
        doc.autoTable({
            head: [data1[0]],
            body: data1.slice(1),
        });
        doc.text(`Furo importado no sistema em: ${furoSelecionado.importadoEm}h`, 15, 40)

        if (selectedProcesses.includes('Conferência')) {
            doc.addPage();
            doc.text('Tabela de Conferência:', 10, 9);

            const tableData = [
                ['Usuário', 'Furo', 'Tempo em processamento', 'Caixa'],
            ];

            sortedChipBoxes.forEach(caixa => {
                const conferenciaProcess = caixa.processos.conferencia;
                const startTimestamp = conferenciaProcess.ent ? conferenciaProcess.ent.seconds : 0;
                const endTimestamp = conferenciaProcess.sai ? conferenciaProcess.sai.seconds : 0;

                const timeInSeconds = endTimestamp - startTimestamp;
                const formattedTime = secondsToHMS(timeInSeconds);

                const user = conferenciaProcess.user || '-';

                tableData.push([user, caixa.furo, formattedTime, caixa.cx]);
            });

            doc.autoTable({
                head: [tableData[0]],
                body: tableData.slice(1),
            });
        }
        if (selectedProcesses.includes('Marcação')) {
            doc.addPage();
            doc.text('Tabela de Marcação:', 10, 9);

            const tableData = [
                ['Usuário', 'Furo', 'Tempo em processamento', 'Caixa'],
            ];

            sortedChipBoxes.forEach(caixa => {
                const conferenciaProcess = caixa.processos.marcacao;
                const startTimestamp = conferenciaProcess.ent ? conferenciaProcess.ent.seconds : 0;
                const endTimestamp = conferenciaProcess.sai ? conferenciaProcess.sai.seconds : 0;

                const timeInSeconds = endTimestamp - startTimestamp;
                const formattedTime = secondsToHMS(timeInSeconds);

                const user = conferenciaProcess.user || '-';

                tableData.push([user, caixa.furo, formattedTime, caixa.cx]);
            });

            doc.autoTable({
                head: [tableData[0]],
                body: tableData.slice(1),
            });
        }
        if (selectedProcesses.includes('Fotografia')) {
            doc.addPage();
            doc.text('Tabela de Fotografia:', 10, 9);

            const tableData = [
                ['Usuário', 'Furo', 'Tempo em processamento', 'Caixa'],
            ];

            sortedChipBoxes.forEach(caixa => {
                const conferenciaProcess = caixa.processos.fotografia;
                const startTimestamp = conferenciaProcess.ent ? conferenciaProcess.ent.seconds : 0;
                const endTimestamp = conferenciaProcess.sai ? conferenciaProcess.sai.seconds : 0;

                const timeInSeconds = endTimestamp - startTimestamp;
                const formattedTime = secondsToHMS(timeInSeconds);

                const user = conferenciaProcess.user || '-';

                tableData.push([user, caixa.furo, formattedTime, caixa.cx]);
            });

            doc.autoTable({
                head: [tableData[0]],
                body: tableData.slice(1),
            });
        }
        if (selectedProcesses.includes('Geologia')) {
            doc.addPage();
            doc.text('Processo de Geologia:', 10, 9);

            let startY1 = 40;


            doc.text('Descrição Geológica:', 10, startY1);
            const data1 = [
                ['Usuário', 'Furo', 'Tempo em processamento', 'Início', 'Fim'],
                [
                    furos[furoSelecionado.index]?.processos?.geologia?.descGeologica?.user,
                    furoSelecionado.furo,
                    secondsToHMS(furos[furoSelecionado.index]?.processos?.geologia?.descGeologica?.sai - furos[furoSelecionado.index]?.processos?.geologia?.descGeologica?.ent),
                    formatTimestamp(furos[furoSelecionado.index]?.processos?.geologia?.descGeologica?.ent),
                    formatTimestamp(furos[furoSelecionado.index]?.processos?.geologia?.descGeologica?.sai)
                ],
            ];

            doc.autoTable({
                head: [data1[0]],
                body: data1.slice(1),
                startY: startY1 + 10, // Define uma posição de início para a próxima tabela
            });

            let startY2 = doc.autoTable.previous.finalY + 10;

            doc.text('Descrição Geotécnica:', 10, startY2);
            const data2 = [
                ['Usuário', 'Furo', 'Tempo em processamento', 'Início', 'Fim'],
                [
                    furos[furoSelecionado.index]?.processos?.geologia?.descGeotecnica?.user,
                    furoSelecionado.furo,
                    secondsToHMS(furos[furoSelecionado.index]?.processos?.geologia?.descGeotecnica?.sai - furos[furoSelecionado.index]?.processos?.geologia?.descGeotecnica?.ent),
                    formatTimestamp(furos[furoSelecionado.index]?.processos?.geologia?.descGeotecnica?.ent),
                    formatTimestamp(furos[furoSelecionado.index]?.processos?.geologia?.descGeotecnica?.sai)
                ],
            ];
            doc.autoTable({
                head: [data2[0]],
                body: data2.slice(1),
                startY: startY2 + 10, // Define uma posição de início para a próxima tabela
            });


            let startY3 = doc.autoTable.previous.finalY + 10;
            doc.text('Descrição Estrutural:', 10, startY3);
            const data3 = [
                ['Usuário', 'Furo', 'Tempo em processamento', 'Início', 'Fim'],
                [
                    furos[furoSelecionado.index]?.processos?.geologia?.descEstrutural?.user,
                    furoSelecionado.furo,
                    secondsToHMS(furos[furoSelecionado.index]?.processos?.geologia?.descEstrutural?.sai - furos[furoSelecionado.index]?.processos?.geologia?.descEstrutural?.ent),
                    formatTimestamp(furos[furoSelecionado.index]?.processos?.geologia?.descEstrutural?.ent),
                    formatTimestamp(furos[furoSelecionado.index]?.processos?.geologia?.descEstrutural?.sai)
                ],
            ];

            doc.autoTable({
                head: [data3[0]],
                body: data3.slice(1),
                startY: startY3 + 10, // Define uma posição de início para a próxima tabela
            });
        }
        if (selectedProcesses.includes('Densidade')) {
            doc.addPage();
            doc.text('Processo de Densidade:', 10, 9);

            const data1 = [
                ['Usuário', 'Furo', 'Tempo em processamento', 'Início', 'Fim'],
                [
                    furos[furoSelecionado.index]?.processos?.densidade?.user,
                    furoSelecionado.furo,
                    secondsToHMS(furos[furoSelecionado.index]?.processos?.densidade?.sai - furos[furoSelecionado.index]?.processos?.densidade?.ent),
                    formatTimestamp(furos[furoSelecionado.index]?.processos?.densidade?.ent),
                    formatTimestamp(furos[furoSelecionado.index]?.processos?.densidade?.sai)
                ],
            ];

            doc.autoTable({
                head: [data1[0]],
                body: data1.slice(1),
            });
        }
        if (selectedProcesses.includes('Serragem')) {
            doc.addPage();
            doc.text('Processo de Serragem:', 10, 9);

            const data1 = [
                ['Usuário', 'Furo', 'Tempo em processamento', 'Início', 'Fim'],
                [
                    furos[furoSelecionado.index]?.processos?.serragem?.user,
                    furoSelecionado.furo,
                    secondsToHMS(furos[furoSelecionado.index]?.processos?.serragem?.sai - furos[furoSelecionado.index]?.processos?.serragem?.ent),
                    formatTimestamp(furos[furoSelecionado.index]?.processos?.serragem?.ent),
                    formatTimestamp(furos[furoSelecionado.index]?.processos?.serragem?.sai)
                ],
            ];

            doc.autoTable({
                head: [data1[0]],
                body: data1.slice(1),
            });
        }
        if (selectedProcesses.includes('Amostragem')) {
            doc.addPage();
            doc.text('Processo de Amostragem:', 10, 9);

            const data1 = [
                ['Usuário', 'Furo', 'Tempo em processamento', 'Início', 'Fim'],
                [
                    furos[furoSelecionado.index]?.processos?.amostragem?.user,
                    furoSelecionado.furo,
                    secondsToHMS(furos[furoSelecionado.index]?.processos?.amostragem?.sai - furos[furoSelecionado.index]?.processos?.amostragem?.ent),
                    formatTimestamp(furos[furoSelecionado.index]?.processos?.amostragem?.ent),
                    formatTimestamp(furos[furoSelecionado.index]?.processos?.amostragem?.sai)
                ],
            ];

            doc.autoTable({
                head: [data1[0]],
                body: data1.slice(1),
            });
        }
        if (selectedProcesses.includes('Despacho')) {
            doc.addPage();
            doc.text('Processo de Despacho:', 10, 9);
            const data1 = [
                ['Usuário', 'Furo', 'Tempo em processamento', 'Início', 'Fim'],
                [
                    furos[furoSelecionado.index]?.processos?.despacho?.user,
                    furoSelecionado.furo,
                    secondsToHMS(furos[furoSelecionado.index]?.processos?.despacho?.sai - furos[furoSelecionado.index]?.processos?.despacho?.ent),
                    formatTimestamp(furos[furoSelecionado.index]?.processos?.despacho?.ent),
                    formatTimestamp(furos[furoSelecionado.index]?.processos?.despacho?.sai)
                ],
            ];
            doc.autoTable({
                head: [data1[0]],
                body: data1.slice(1),
            });
            for (let i = 0; i < filteredWhiteBoxFuro.length; i++) {
                const spacing = 20; // Ajuste este valor para o espaçamento desejado
                const startY = 40 + (spacing * i);

                doc.text(`Usuário: ${filteredWhiteBoxFuro[i].user} - WhiteBox ${filteredWhiteBoxFuro[i].cx}:`, 10, startY);
                doc.text(`Caixas inseridas: ${filteredWhiteBoxFuro[i].chipboxes}; De: ${filteredWhiteBoxFuro[i].de}; Até: ${filteredWhiteBoxFuro[i].ate}`, 10, startY + 7);
            }
        }
        if (selectedProcesses.includes('Arquivamento')) {
            doc.addPage();
            doc.text('Tabela de Arquivamento:', 10, 9);

            const tableData = [
                ['Usuário', 'Furo', 'Tempo em processamento', 'Caixa'],
            ];

            sortedChipBoxes.forEach(caixa => {
                const conferenciaProcess = caixa.processos.arquivamento;
                const startTimestamp = conferenciaProcess.ent ? conferenciaProcess.ent.seconds : 0;
                const endTimestamp = conferenciaProcess.sai ? conferenciaProcess.sai.seconds : 0;

                const timeInSeconds = endTimestamp - startTimestamp;
                const formattedTime = secondsToHMS(timeInSeconds);

                const user = conferenciaProcess.user || '-';

                tableData.push([user, caixa.furo, formattedTime, caixa.cx]);
            });

            doc.autoTable({
                head: [tableData[0]],
                body: tableData.slice(1),
            });

            doc.text(`Paletes criados:`, 10, doc.autoTable.previous.finalY + 15);


            for (let i = 0; i < filteredPaleteFuro.length; i++) {
                const spacing = 25; // Ajuste este valor para o espaçamento desejado
                const startY = doc.autoTable.previous.finalY + 30 + (spacing * i);

                doc.text(`Usuário: ${filteredPaleteFuro[i].user} - Palete ${filteredPaleteFuro[i].numero}:`, 10, startY);
                doc.text(`Caixas inseridas: ${filteredPaleteFuro[i].caixas}; `, 10, startY + 7);
                doc.text(`Intervalo presente: De: ${filteredPaleteFuro[i].de} - Até: ${filteredPaleteFuro[i].ate}`, 10, startY + 13);

            }
        }

        const dataNow = new Date()
        const dia = String(dataNow.getDate()).padStart(2, '0');
        const mes = String(dataNow.getMonth() + 1).padStart(2, '0');
        const ano = dataNow.getFullYear();
        const hora = String(dataNow.getHours()).padStart(2, '0');
        const minuto = String(dataNow.getMinutes()).padStart(2, '0');
        const NomeArquivo = `-DIA${dia}-${mes}-${ano}--HORA${hora}-${minuto}`;

        doc.save(`${furoSelecionado.furo + '-' + NomeArquivo}.pdf`);
        setTimeout(() => {
            sendPdfToApi(NomeArquivo, formattedDate, selectedProcesses.join(', '));
        }, 5000);
    }

    async function sendPdfToApi(NomeArquivo, formattedDate, processos) {

        const arquivo = furoSelecionado.furo + '-' + NomeArquivo
        const data = formattedDate
        const furo = furoSelecionado.furo

        try {
            const response = await fetch('/api/sendpdf', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ arquivo, furo, data, processos }),
            });

            if (response.ok) {
                console.log('Arquivo enviado com sucesso');
            }
        } catch (error) {
            console.error('Erro na solicitação:', error);
        }
    }

    const [selectedProcesses, setSelectedProcesses] = useState([]);
    const processos = [
        { 'processo': 'Conferência' },
        { 'processo': 'Marcação' },
        { 'processo': 'Fotografia' },
        { 'processo': 'Geologia' },
        { 'processo': 'Densidade' },
        { 'processo': 'Serragem' },
        { 'processo': 'Amostragem' },
        { 'processo': 'Despacho' },
        { 'processo': 'Arquivamento' },

    ]

    function toggleProcess(processo) {
        if (selectedProcesses.includes(processo)) {
            setSelectedProcesses(selectedProcesses.filter(selected => selected !== processo));
        } else {
            setSelectedProcesses([...selectedProcesses, processo]);
        }
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
            <TableFuros furos={furos} />
            <Dropdown
                style={{ width: 577, marginTop: '4%', marginLeft: '2%', borderRadius: 10 }}
                options={furos.map((option, index) => ({ value: option.numero, label: option.numero, index: index, inicio: option.createdAt, fim: option.dataFinalizado, quantidadeCaixas: option.profundidade }))}
                onChange={(values) => {
                    if (values.length > 0) {
                        const selectedValue = values[0].value;
                        const selectedIndex = values[0].index;
                        const selectedInicio = values[0].inicio;
                        const selectedFim = values[0].fim
                        const selectedQtdCx = values[0].quantidadeCaixas
                        sett(selectedValue, selectedIndex, selectedInicio, selectedFim, selectedQtdCx);
                    }
                }}
                placeholder="Selecione um furo"
                multi={false}
            />

            <ul style={{ display: 'flex', flexDirection: 'row', marginTop: '2%' }}>
                {processos.map((furo, index) => (
                    <li
                        style={{
                            marginLeft: 30,
                            marginRight: 0,
                            backgroundColor: selectedProcesses.includes(furo.processo) ? '#008f83' : '#c4c4c4',
                            padding: 8,
                            borderRadius: 10
                        }}
                        key={index}
                    >
                        <button onClick={() => toggleProcess(furo.processo)}>
                            <h1
                                style={{
                                    color: selectedProcesses.includes(furo.processo) ? '#f3c108' : 'black',
                                    width: 120,
                                    fontWeight: 'bold', userSelect: 'none'
                                }}
                            >
                                {furo.processo}
                            </h1>
                        </button>
                    </li>
                ))}
            </ul>
            {furoSelecionado?.furo && (
                <div style={{ marginTop: 40, alignItems: 'center', display: 'flex', flexDirection: 'column' }} >
                    <p style={{ userSelect: 'none' }} >Furo selecionado: {furoSelecionado.furo}</p>
                    <p style={{ userSelect: 'none' }} >Processos selecionados: {selectedProcesses.length > 0 ? selectedProcesses.join(', ') : 'Nenhum'}</p>

                    <div style={{ height: 50 }} />

                    <Button
                        onClick={() => { generatePDF(chipBoxesInternos[furoSelecionado?.index]); }}
                        disabled={!furoSelecionado}
                    >
                        <h1 style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: 200, padding: 15, fontSize: 18, fontWeight: 'bold', color: 'white', backgroundColor: '#074F92', borderRadius: 10 }} >
                            Baixar PDF
                            <DownloadOutline
                                color={'#00000'}
                                title={''}
                                height="40px"
                                width="40px"
                            />
                        </h1>
                    </Button>

                </div>
            )}
        </div>
    )
}

const Button = styled.button`
    transition: opacity 0.3s;
    align-items: center;
    justify-content: center;
    &:hover {
        opacity: 0.2;
    }

`