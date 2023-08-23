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

export default function Relatorios({ furos, chipBoxes, furoSelecionado, filtroConferencia, filtroMarcacao, filtroFotografia, filtroDensidade, filtroSerragem, filtroArquivamento, chipBoxesInternos, setFuroSelecionado, authUser }) {
    function sett(selected, index, selectedInicio, selectedFim, quantidadeCaixas) {
        const inicio = dayjs.unix(selectedInicio?.seconds);
        const fim = dayjs.unix(selectedFim?.seconds);
        const diffInSeconds = fim.diff(inicio, 'second'); // Diferença em segundos
        const hours = Math.floor(diffInSeconds / 3600);
        const minutes = Math.floor((diffInSeconds % 3600) / 60);
        const seconds = diffInSeconds % 60;

        setFuroSelecionado({
            furo: selected,
            index: index,
            tempoProcessamento: selectedInicio && selectedFim ? hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0') : 'Furo não finalizado',
            quantidadeCaixas: quantidadeCaixas
        })
    }

    function generatePDF(data) {
        const doc = new jsPDF();
        const formattedDate = dayjs().format('DD/MMM/YYYY') + ' as ' + dayjs().format('HH:mm:ss ');
        const data1 = [
            ['Usuário', 'Furo', 'Tempo em processamento', 'Caixas'],
            [authUser.email, furoSelecionado.furo, furoSelecionado.tempoProcessamento, furoSelecionado.quantidadeCaixas],
        ];
        const img = imageB64
        //primeira pagina do pdf: capa
        doc.addImage(img, 'jpg', 50, 10)
        doc.setFont('times', 'normal', 'bold')
        doc.text(`Dados do furo ${furoSelecionado.furo}`, 70, 80)
        doc.text(`Relatório exportado por ""${authUser.email}"" dia ${formattedDate}`, 0, 120)
        // segunda pagina do pdf
        doc.addPage(1, 'p')
        doc.text('Dados gerais do furo:', 10, 9)
        doc.autoTable({
            head: [data1[0]],
            body: data1.slice(1),
        });

        if (selectedProcesses.includes('Conferência')) {
            // Adicionar uma nova página para a tabela
            doc.addPage();
            doc.text('Tabela de Conferência:', 10, 9);
    
            const tableData = [
                ['Usuário', 'Furo', 'Tempo em processamento', 'Caixa'],
            ];
    
            // Percorrer o array de caixas e adicionar os dados de conferência à tabela
            chipBoxesInternos[furoSelecionado?.index].forEach(caixa => {
                const conferenciaProcess = caixa.processos.conferencia;
                const tempoProcessamento = ((conferenciaProcess.sai.seconds - conferenciaProcess.ent.seconds) +
                    (conferenciaProcess.sai.nanoseconds - conferenciaProcess.ent.nanoseconds) * 1e-9).toFixed(2);
                const user = conferenciaProcess.user;
    
                tableData.push([user, caixa.furo, tempoProcessamento, caixa.cx]);
            });
    
            doc.autoTable({
                head: [tableData[0]],
                body: tableData.slice(1),
            });
        }

        if (selectedProcesses.includes('Marcação')) {
            // Adicionar uma nova página para a tabela
            doc.addPage();
            doc.text('Tabela de Marcação:', 10, 9);
    
            const tableData = [
                ['Usuário', 'Furo', 'Tempo em processamento', 'Caixa'],
            ];
    
            // Percorrer o array de caixas e adicionar os dados de conferência à tabela
            chipBoxesInternos[furoSelecionado?.index].forEach(caixa => {
                const conferenciaProcess = caixa.processos.marcacao;
                const tempoProcessamento = ((conferenciaProcess.sai.seconds - conferenciaProcess.ent.seconds) +
                    (conferenciaProcess.sai.nanoseconds - conferenciaProcess.ent.nanoseconds) * 1e-9).toFixed(2);
                const user = conferenciaProcess.user;
    
                tableData.push([user, caixa.furo, tempoProcessamento, caixa.cx]);
            });
    
            doc.autoTable({
                head: [tableData[0]],
                body: tableData.slice(1),
            });
        }

        if (selectedProcesses.includes('Fotografia')) {
            // Adicionar uma nova página para a tabela
            doc.addPage();
            doc.text('Tabela de Fotografia:', 10, 9);
    
            const tableData = [
                ['Usuário', 'Furo', 'Tempo em processamento', 'Caixa'],
            ];
    
            // Percorrer o array de caixas e adicionar os dados de conferência à tabela
            chipBoxesInternos[furoSelecionado?.index].forEach(caixa => {
                const conferenciaProcess = caixa.processos.fotografia;
                const tempoProcessamento = ((conferenciaProcess.sai.seconds - conferenciaProcess.ent.seconds) +
                    (conferenciaProcess.sai.nanoseconds - conferenciaProcess.ent.nanoseconds) * 1e-9).toFixed(2);
                const user = conferenciaProcess.user;
    
                tableData.push([user, caixa.furo, tempoProcessamento, caixa.cx]);
            });
    
            doc.autoTable({
                head: [tableData[0]],
                body: tableData.slice(1),
            });
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
            sendPdfToApi(NomeArquivo);
        }, 5000);
    }

    async function sendPdfToApi(NomeArquivo) {

        const arquivo = furoSelecionado.furo + '-' + NomeArquivo

        try {
            const response = await fetch('/api/sendpdf', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ arquivo }),
            });

            if (response.ok) {
                console.log('Arquivo enviado com sucesso');
            }
        } catch (error) {
            console.error('Erro na solicitação:', error);
        }
    }

    //console.log(chipBoxesInternos[furoSelecionado?.index])
    const [selectedProcesses, setSelectedProcesses] = useState([]);
    const processos = [
        { 'processo': 'Conferência' },
        { 'processo': 'Marcação' },
        { 'processo': 'Fotografia' },
        { 'processo': 'Densidade' },
        { 'processo': 'Serragem' },
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

    console.log(selectedProcesses)


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
                placeholder="Selecione um número"
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
                                    fontWeight: 'bold'
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
                    <p>Furo selecionado: {furoSelecionado.furo}</p>
                    <p>Processos selecionados: {selectedProcesses.join(', ')}</p>

                    <div style={{ height: 50 }} />

                    <Button onClick={() => {
                        generatePDF(chipBoxesInternos[furoSelecionado?.index]);
                    }}>
                        <h1 style={{ padding: 15, fontSize: 18, fontWeight: 'bold', color: 'white', backgroundColor: '#074F92', borderRadius: 10 }} >
                            Enviar PDF
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