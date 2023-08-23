import TableFuros from "./tableFuros"
import { useState, useEffect } from "react";
import styled from 'styled-components'
import Dropdown from 'react-dropdown-select';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br'; // localização
dayjs.locale('pt-br'); // Defina a localização
import { imageB64 } from "./image";

export default function Relatorios({ furos, chipBoxes, furoSelecionado, filtroConferencia, filtroMarcacao, filtroFotografia, filtroDensidade, filtroSerragem, filtroArquivamento, chipBoxesInternos, setFuroSelecionado, authUser }) {
    console.log(chipBoxesInternos[furoSelecionado?.index])
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
        
        doc.save(`${furoSelecionado.furo}.pdf`);
        sendPdfToApi(`C:\\Users\\Hasar\\Downloads\\${furoSelecionado.furo}.pdf`);
    }

    async function sendPdfToApi() {

        const arquivo = furoSelecionado.furo

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

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }} >
            <TableFuros furos={furos} />

            <Dropdown
                style={{ width: '40%', marginTop: 8, }}
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
            {furoSelecionado?.furo && (
                <div>
                    <p>Furo selecionado: {furoSelecionado.furo}</p>
                    <p>Índice do furo selecionado: {furoSelecionado.index}</p>
                    <Button onClick={() => {
                        generatePDF(chipBoxesInternos[furoSelecionado?.index]);
                         // Chamar a função para enviar o arquivo para a rota de API
                    }}>
                        Gerar PDF
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