import styled from 'styled-components'
import * as React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function DadosProcessamento({ chipBoxes, furoSelecionado, filtroConferencia, filtroMarcacao, filtroFotografia, filtroDensidade, filtroSerragem, filtroArquivamento, chipBoxesInternos, furos }) {

    const COLORS = ['#008F83', '#ef3a25 '];
    const conferencia = [
        { name: 'Executada', value: filtroConferencia[furoSelecionado?.index]?.length },
        { name: 'Restante', value: chipBoxesInternos[furoSelecionado?.index]?.length - filtroConferencia[furoSelecionado?.index]?.length }
    ];
    const marcacao = [
        { name: 'Executada', value: filtroMarcacao[furoSelecionado?.index]?.length },
        { name: 'Restante', value: chipBoxesInternos[furoSelecionado?.index]?.length - filtroMarcacao[furoSelecionado?.index]?.length }
    ];
    const fotografia = [
        { name: 'Executada', value: filtroFotografia[furoSelecionado?.index]?.length },
        { name: 'Restante', value: chipBoxesInternos[furoSelecionado?.index]?.length - filtroFotografia[furoSelecionado?.index]?.length }
    ];
    const arquivamento = [
        { name: 'Executada', value: filtroArquivamento[furoSelecionado?.index]?.length },
        { name: 'Restante', value: chipBoxesInternos[furoSelecionado?.index]?.length - filtroArquivamento[furoSelecionado?.index]?.length }
    ];

    if (!furoSelecionado)
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                <text style={{ marginRight: 15, fontWeight: 'bold', fontSize: 30 }}>Selecione o furo acima</text>
            </div>
        )

    function formatTimestamp(timestamp) {
        const seconds = timestamp?.seconds;
        const nanoseconds = timestamp?.nanoseconds;
        const date = new Date(seconds * 1000 + nanoseconds / 1000000); // Convertendo nanossegundos para milissegundos
        const formattedDate = `${parseInt(date.getDate()) > 10 ? date.getDate() : '0' + date.getDate()}/${parseInt(date.getMonth() + 1) > 10 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1)}/${date.getFullYear()}`;
        return formattedDate;
    }

    function segundosParaHHMMSS(segundos) {
        const horas = Math.floor(segundos / 3600);
        segundos %= 3600;
        const minutos = Math.floor(segundos / 60);
        segundos %= 60;
        segundos = Math.floor(segundos);
        return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
    }

    const [anchorEl, setAnchorEl] = React.useState();
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const [anchorElDensidade, setAnchorElDensidade] = React.useState();
    const handleClickDensidade = (event) => {
        setAnchorElDensidade(event.currentTarget);
    };
    const handleCloseDensidade = () => {
        setAnchorElDensidade(null);
    };
    const openDensidade = Boolean(anchorElDensidade);
    const idDensidade = openDensidade ? 'simple-popover' : undefined;

    const [anchorElSerragem, setAnchorElSerragem] = React.useState();
    const handleClickSerragem = (event) => {
        setAnchorElSerragem(event.currentTarget);
    };
    const handleCloseSerragem = () => {
        setAnchorElSerragem(null);
    };
    const openSerragem = Boolean(anchorElSerragem);
    const idSerragem = openSerragem ? 'simple-popover' : undefined;

    const [anchorElAmostragem, setAnchorElAmostragem] = React.useState();
    const handleClickAmostragem = (event) => {
        setAnchorElAmostragem(event.currentTarget);
    };
    const handleCloseAmostragem = () => {
        setAnchorElAmostragem(null);
    };
    const openAmostragem = Boolean(anchorElAmostragem);
    const idAmostragem = openAmostragem ? 'simple-popover' : undefined;

    const [anchorElDespacho, setAnchorElDespacho] = React.useState();
    const handleClickDespacho = (event) => {
        setAnchorElDespacho(event.currentTarget);
    };
    const handleCloseDespacho = () => {
        setAnchorElDespacho(null);
    };
    const openDespacho = Boolean(anchorElDespacho);
    const idDespacho = openDespacho ? 'simple-popover' : undefined;

    return (
        <>
            {
                furoSelecionado.furo === 'TODOS' ?
                    <>
                        <div style={{ display: 'flex', justifyContent: 'center', padding: 5, fontWeight: 'bold', color: '#008F83', fontSize: 35 }} >
                            <text>Selecione o furo acima</text>
                        </div>
                    </>
                    :
                    <>
                        <div style={{ display: 'flex', justifyContent: 'center', padding: 5, fontWeight: 'bold', color: '#008F83', fontSize: 35 }} >
                            <text>Furo: {furoSelecionado.furo}</text>
                        </div>
                        <Row>
                            <Column>
                                <text style={{ marginRight: 15, fontWeight: 'bold' }}>Conferência: {((filtroConferencia[furoSelecionado.index]?.length / chipBoxesInternos[furoSelecionado.index]?.length).toFixed(3) * 100).toString().replace('.', ',')}% </text>
                                <PieChart width={320} height={320}>
                                    <Pie
                                        data={conferencia}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="35%"
                                        outerRadius={110}
                                        fill="#84d8b1"
                                        label
                                    >
                                        {conferencia.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend verticalAlign="top" height={50} />
                                </PieChart>
                            </Column>
                            <Column>
                                <text style={{ marginRight: 15, fontWeight: 'bold' }}>Marcação: {((filtroMarcacao[furoSelecionado.index]?.length / chipBoxesInternos[furoSelecionado.index]?.length).toFixed(3) * 100).toString().replace('.', ',')}% </text>
                                <PieChart width={320} height={320} >
                                    <Pie
                                        data={marcacao}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="35%"
                                        outerRadius={110}
                                        fill="#84d8b1"
                                        label
                                    >
                                        {conferencia.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend verticalAlign="top" height={50} />
                                </PieChart>
                            </Column>
                            <Column>
                                <text style={{ marginRight: 15, fontWeight: 'bold' }} >Fotografia: {((filtroFotografia[furoSelecionado.index]?.length / chipBoxesInternos[furoSelecionado.index]?.length).toFixed(3) * 100).toString().replace('.', ',')}% </text>
                                <PieChart width={320} height={320}>
                                    <Pie
                                        data={fotografia}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="35%"
                                        outerRadius={110}
                                        fill="#84d8b1"
                                        label
                                    >
                                        {conferencia.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend verticalAlign="top" height={50} />
                                </PieChart>
                            </Column>

                            {/* geologia */}
                            <Column3>
                                <text style={{ marginRight: 15, fontWeight: 'bold' }} >Geologia: </text>
                                <Button aria-describedby={id} style={{ backgroundColor: '#008F83', height: 220, width: 220, marginTop: 30, fontWeight: 'bold' }} variant="contained" onClick={handleClick}>
                                    {
                                        furos[furoSelecionado?.index].processos?.geologia?.descGeologica?.ent &&
                                            furos[furoSelecionado?.index].processos?.geologia?.descEstrutural?.sai ?
                                            'Geologia Finalizado!'
                                            :
                                            ''
                                    }
                                    {
                                        furos[furoSelecionado?.index].processos?.geologia?.descGeologica?.ent &&
                                            !furos[furoSelecionado?.index].processos?.geologia?.descEstrutural?.sai ?
                                            'Geologia Em andamento'
                                            :
                                            ''
                                    }
                                    {
                                        !furos[furoSelecionado?.index].processos?.geologia?.descGeologica?.ent &&
                                            !furos[furoSelecionado?.index].processos?.geologia?.descEstrutural?.sai ?
                                            'Geologia Em andamento'
                                            :
                                            ''
                                    }
                                    <br></br>
                                    <br></br>
                                    Clique para ver detalhes
                                </Button>
                                <Popover
                                    id={id}
                                    open={open}
                                    anchorEl={anchorEl}
                                    onClose={handleClose}
                                    anchorOrigin={{
                                        vertical: 'center',
                                        horizontal: 'left',
                                    }}
                                >
                                    <Column2>
                                        <Column>
                                            <text style={{ marginRight: 15, fontWeight: 'bold' }} > Descrição Geológica: {<br></br>}
                                                {
                                                    furos[furoSelecionado?.index].processos?.geologia?.descGeologica?.sai ?

                                                        <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#008f83', borderRadius: 7, padding: 8 }}>
                                                            <text style={{ color: 'white', fontWeight: 'bold' }} >
                                                                Iniciado em {formatTimestamp(furos[furoSelecionado?.index].processos?.geologia?.descGeologica?.ent)}
                                                            </text>
                                                            <text style={{ color: 'white', fontWeight: 'bold' }} >
                                                                Finalizado em {formatTimestamp(furos[furoSelecionado?.index].processos?.geologia?.descGeologica?.sai)}
                                                            </text>
                                                            <text style={{ color: 'white', fontWeight: 'bold' }} >Duração: {segundosParaHHMMSS(furos[furoSelecionado?.index].processos?.geologia.descGeologica.sai - furos[furoSelecionado?.index].processos.geologia.descGeologica.ent)}</text>
                                                            <text style={{ color: 'white', fontWeight: 'bold' }} >
                                                                Realizado por: {furos[furoSelecionado?.index].processos?.geologia?.descGeologica.user}
                                                            </text>
                                                        </div>
                                                        :
                                                        <></>
                                                }
                                                {
                                                    furos[furoSelecionado?.index].processos?.geologia?.descGeologica.ent && !furos[furoSelecionado?.index].processos?.geologia?.descGeologica.sai ?
                                                        `Iniciado em ${formatTimestamp(furos[furoSelecionado?.index].processos?.geologia.descGeologica.ent)}`
                                                        :
                                                        <></>
                                                }
                                                {
                                                    !furos[furoSelecionado?.index].processos?.geologia?.descGeologica.ent && !furos[furoSelecionado?.index].processos?.geologia?.descGeologica.sai ?
                                                        `Não iniciado!`
                                                        :
                                                        <></>
                                                }
                                            </text>
                                        </Column>
                                        <Column>
                                            <text style={{ marginRight: 15, fontWeight: 'bold' }} > Descrição Geotécnica: {<br></br>}
                                                {
                                                    furos[furoSelecionado?.index].processos?.geologia?.descGeotecnica?.sai ?

                                                        <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#008f83', borderRadius: 7, padding: 8 }}>
                                                            <text style={{ color: 'white', fontWeight: 'bold' }} >
                                                                Iniciado em {formatTimestamp(furos[furoSelecionado?.index].processos?.geologia?.descGeotecnica?.ent)}
                                                            </text>
                                                            <text style={{ color: 'white', fontWeight: 'bold' }} >
                                                                Finalizado em {formatTimestamp(furos[furoSelecionado?.index].processos?.geologia?.descGeotecnica?.sai)}
                                                            </text>
                                                            <text style={{ color: 'white', fontWeight: 'bold' }} >Duração: {segundosParaHHMMSS(furos[furoSelecionado?.index].processos?.geologia.descGeotecnica.sai - furos[furoSelecionado?.index].processos.geologia.descGeotecnica.ent)}</text>
                                                            <text style={{ color: 'white', fontWeight: 'bold' }} >
                                                                Realizado por: {furos[furoSelecionado?.index].processos?.geologia?.descGeotecnica.user}
                                                            </text>
                                                        </div>
                                                        :
                                                        <></>
                                                }
                                                {
                                                    furos[furoSelecionado?.index].processos?.geologia?.descGeotecnica.ent && !furos[furoSelecionado?.index].processos?.geologia?.descGeotecnica.sai ?
                                                        `Iniciado em ${formatTimestamp(furos[furoSelecionado?.index].processos?.geologia.descGeotecnica.ent)}`
                                                        :
                                                        <></>
                                                }
                                                {
                                                    !furos[furoSelecionado?.index].processos?.geologia?.descGeotecnica.ent && !furos[furoSelecionado?.index].processos?.geologia?.descGeotecnica.sai ?
                                                        `Não iniciado!`
                                                        :
                                                        <></>
                                                }
                                            </text>
                                        </Column>
                                        <Column>
                                            <text style={{ marginRight: 15, fontWeight: 'bold' }} > Descrição Estrutural: {<br></br>}
                                                {
                                                    furos[furoSelecionado?.index].processos?.geologia?.descEstrutural?.sai ?

                                                        <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#008f83', borderRadius: 7, padding: 8 }}>
                                                            <text style={{ color: 'white', fontWeight: 'bold' }} >
                                                                Iniciado em {formatTimestamp(furos[furoSelecionado?.index].processos?.geologia?.descEstrutural?.ent)}
                                                            </text>
                                                            <text style={{ color: 'white', fontWeight: 'bold' }} >
                                                                Finalizado em {formatTimestamp(furos[furoSelecionado?.index].processos?.geologia?.descEstrutural?.sai)}
                                                            </text>
                                                            <text style={{ color: 'white', fontWeight: 'bold' }} >Duração: {segundosParaHHMMSS(furos[furoSelecionado?.index].processos?.geologia.descEstrutural.sai - furos[furoSelecionado?.index].processos.geologia.descEstrutural.ent)}</text>
                                                            <text style={{ color: 'white', fontWeight: 'bold' }} >
                                                                Realizado por: {furos[furoSelecionado?.index].processos?.geologia?.descEstrutural.user}
                                                            </text>
                                                        </div>
                                                        :
                                                        <></>
                                                }
                                                {
                                                    furos[furoSelecionado?.index].processos?.geologia?.descEstrutural.ent && !furos[furoSelecionado?.index].processos?.geologia?.descEstrutural.sai ?
                                                        `Iniciado em ${formatTimestamp(furos[furoSelecionado?.index].processos?.geologia.descEstrutural.ent)}`
                                                        :
                                                        <></>
                                                }
                                                {
                                                    !furos[furoSelecionado?.index].processos?.geologia?.descEstrutural.ent && !furos[furoSelecionado?.index].processos?.geologia?.descEstrutural.sai ?
                                                        `Não iniciado!`
                                                        :
                                                        <></>
                                                }
                                            </text>
                                        </Column>
                                    </Column2>
                                </Popover>
                            </Column3>

                            {/* densidade */}
                            <Column3>
                                <text style={{ marginRight: 15, fontWeight: 'bold' }} >Densidade: </text>
                                <Button aria-describedby={idDensidade} onClick={handleClickDensidade} style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#008F83', height: 220, width: 220, marginTop: 30, fontWeight: 'bold', color: 'white' }} variant="contained" >
                                    {
                                        furos[furoSelecionado?.index].processos?.densidade?.sai?.seconds ?
                                            'Densidade Finalizado!'
                                            :
                                            furos[furoSelecionado?.index].processos?.densidade?.ent?.seconds ?
                                                'Densidade Em andamento' : 'Densidade Não iniciado!'
                                    }

                                    <br></br>
                                    <br></br>
                                    Clique para ver detalhes
                                </Button>
                                <Popover
                                    id={idDensidade}
                                    open={openDensidade}
                                    anchorEl={anchorElDensidade}
                                    onClose={handleCloseDensidade}
                                    anchorOrigin={{
                                        vertical: 'center',
                                        horizontal: 'left',
                                    }}
                                >
                                    <Column2>
                                        <Column>
                                            <text style={{ marginRight: 15, fontWeight: 'bold' }} > Dados do procesos de densidade: {<br></br>}
                                                {
                                                    furos[furoSelecionado?.index].processos?.densidade?.sai ?

                                                        <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#008F83', padding: 8, paddingTop: 12, paddingBottom: 12, borderRadius: 8 }}>
                                                            <text style={{ color: 'white', fontWeight: 'bold' }} >
                                                                Iniciado em {formatTimestamp(furos[furoSelecionado?.index].processos?.densidade?.ent)}
                                                            </text>
                                                            <text style={{ color: 'white', fontWeight: 'bold' }} >
                                                                Finalizado em {formatTimestamp(furos[furoSelecionado?.index].processos?.densidade?.sai)}
                                                            </text>
                                                            <text style={{ color: 'white', fontWeight: 'bold' }} >
                                                                Duração: {segundosParaHHMMSS(furos[furoSelecionado?.index].processos?.densidade.sai - furos[furoSelecionado?.index].processos.densidade.ent)}
                                                            </text>
                                                            <text style={{ color: 'white', fontWeight: 'bold' }} >
                                                                Realizado por: {furos[furoSelecionado?.index].processos?.densidade.user}
                                                            </text>
                                                        </div>
                                                        :
                                                        <></>
                                                }
                                                {
                                                    furos[furoSelecionado?.index].processos?.densidade?.ent && !furos[furoSelecionado?.index].processos?.densidade?.sai ?
                                                        `Iniciado em ${formatTimestamp(furos[furoSelecionado?.index].processos?.geologia.descGeologica.ent)}`
                                                        :
                                                        <></>
                                                }
                                                {
                                                    !furos[furoSelecionado?.index].processos?.densidade?.ent && !furos[furoSelecionado?.index].processos?.densidade?.sai ?
                                                        `Não iniciado!`
                                                        :
                                                        <></>
                                                }
                                            </text>
                                        </Column>
                                    </Column2>
                                </Popover>
                            </Column3>

                            {/* serragem */}
                            <Column3>
                                <text style={{ marginRight: 15, fontWeight: 'bold' }} >Serragem: </text>
                                <Button aria-describedby={idSerragem} onClick={handleClickSerragem} style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#008F83', height: 220, width: 220, marginTop: 30, fontWeight: 'bold', color: 'white' }} variant="contained" >
                                    {
                                        furos[furoSelecionado?.index].processos?.serragem?.sai?.seconds ?
                                            'Serragem Finalizado!'
                                            :
                                            furos[furoSelecionado?.index].processos?.serragem?.ent?.seconds ?
                                                'Serragem Em andamento' : 'Serragem Não iniciado!'
                                    }

                                    <br></br>
                                    <br></br>
                                    Clique para ver detalhes
                                </Button>
                                <Popover
                                    id={idSerragem}
                                    open={openSerragem}
                                    anchorEl={anchorElSerragem}
                                    onClose={handleCloseSerragem}
                                    anchorOrigin={{
                                        vertical: 'center',
                                        horizontal: 'left',
                                    }}
                                >
                                    <Column2>
                                        <Column>
                                            <text style={{ marginRight: 15, fontWeight: 'bold' }} > Dados do procesos de serragem: {<br></br>}
                                                {
                                                    furos[furoSelecionado?.index].processos?.serragem?.sai ?

                                                        <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#008F83', padding: 8, paddingTop: 12, paddingBottom: 12, borderRadius: 8 }}>
                                                            <text style={{ color: 'white', fontWeight: 'bold' }} >
                                                                Iniciado em {formatTimestamp(furos[furoSelecionado?.index].processos?.serragem?.ent)}
                                                            </text>
                                                            <text style={{ color: 'white', fontWeight: 'bold' }} >
                                                                Finalizado em {formatTimestamp(furos[furoSelecionado?.index].processos?.serragem?.sai)}
                                                            </text>
                                                            <text style={{ color: 'white', fontWeight: 'bold' }} >
                                                                Duração: {segundosParaHHMMSS(furos[furoSelecionado?.index].processos?.serragem?.sai - furos[furoSelecionado?.index].processos?.serragem?.ent)}
                                                            </text>
                                                            <text style={{ color: 'white', fontWeight: 'bold' }} >
                                                                Realizado por: {furos[furoSelecionado?.index].processos?.serragem.user}
                                                            </text>
                                                        </div>
                                                        :
                                                        <></>
                                                }
                                                {
                                                    furos[furoSelecionado?.index].processos?.serragem?.ent && !furos[furoSelecionado?.index].processos?.serragem?.sai ?
                                                        `Iniciado em ${formatTimestamp(furos[furoSelecionado?.index].processos?.serragem?.ent)}`
                                                        :
                                                        <></>
                                                }
                                                {
                                                    !furos[furoSelecionado?.index].processos?.serragem?.ent && !furos[furoSelecionado?.index].processos?.serragem?.sai ?
                                                        `Não iniciado!`
                                                        :
                                                        <></>
                                                }
                                            </text>
                                        </Column>
                                    </Column2>
                                </Popover>
                            </Column3>

                            {/* amostragem */}
                            <Column3>
                                <text style={{ marginRight: 15, fontWeight: 'bold' }} >Amostragem: </text>
                                <Button aria-describedby={idAmostragem} onClick={handleClickAmostragem} style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#008F83', height: 220, width: 220, marginTop: 30, fontWeight: 'bold', color: 'white' }} variant="contained" >
                                    {
                                        furos[furoSelecionado?.index].processos?.amostragem?.sai?.seconds ?
                                            'Amostragem Finalizado!'
                                            :
                                            furos[furoSelecionado?.index].processos?.amostragem?.ent?.seconds ?
                                                'Amostragem Em andamento' : 'Amostragem Não iniciado!'
                                    }

                                    <br></br>
                                    <br></br>
                                    Clique para ver detalhes
                                </Button>
                                <Popover
                                    id={idAmostragem}
                                    open={openAmostragem}
                                    anchorEl={anchorElAmostragem}
                                    onClose={handleCloseAmostragem}
                                    anchorOrigin={{
                                        vertical: 'center',
                                        horizontal: 'left',
                                    }}
                                >
                                    <Column2>
                                        <Column>
                                            <text style={{ marginRight: 15, fontWeight: 'bold' }} > Dados do procesos de amostragem: {<br></br>}
                                                {
                                                    furos[furoSelecionado?.index].processos?.amostragem?.sai ?

                                                        <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#008F83', padding: 8, paddingTop: 12, paddingBottom: 12, borderRadius: 8 }}>
                                                            <text style={{ color: 'white', fontWeight: 'bold' }} >
                                                                Iniciado em {formatTimestamp(furos[furoSelecionado?.index].processos?.amostragem?.ent)}
                                                            </text>
                                                            <text style={{ color: 'white', fontWeight: 'bold' }} >
                                                                Finalizado em {formatTimestamp(furos[furoSelecionado?.index].processos?.amostragem?.sai)}
                                                            </text>
                                                            <text style={{ color: 'white', fontWeight: 'bold' }} >
                                                                Duração: {segundosParaHHMMSS(furos[furoSelecionado?.index].processos?.amostragem?.sai - furos[furoSelecionado?.index].processos?.amostragem?.ent)}
                                                            </text>
                                                            <text style={{ color: 'white', fontWeight: 'bold' }} >
                                                                Realizado por: {furos[furoSelecionado?.index].processos?.amostragem.user}
                                                            </text>
                                                        </div>
                                                        :
                                                        <></>
                                                }
                                                {
                                                    furos[furoSelecionado?.index].processos?.amostragem?.ent && !furos[furoSelecionado?.index].processos?.amostragem?.sai ?
                                                        `Iniciado em ${formatTimestamp(furos[furoSelecionado?.index].processos?.geologia.descGeologica.ent)}`
                                                        :
                                                        <></>
                                                }
                                                {
                                                    !furos[furoSelecionado?.index].processos?.amostragem?.ent && !furos[furoSelecionado?.index].processos?.amostragem?.sai ?
                                                        `Não iniciado!`
                                                        :
                                                        <></>
                                                }
                                            </text>
                                        </Column>
                                    </Column2>
                                </Popover>
                            </Column3>


                            {/* despacho */}
                            <Column3>
                                <text style={{ marginRight: 15, fontWeight: 'bold' }} >Despacho: </text>
                                <Button aria-describedby={idDespacho} onClick={handleClickDespacho} style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#008F83', height: 220, width: 220, marginTop: 30, fontWeight: 'bold', color: 'white' }} variant="contained" >
                                    {
                                        furos[furoSelecionado?.index].processos?.despacho?.sai?.seconds ?
                                            'Despacho Finalizado!'
                                            :
                                            furos[furoSelecionado?.index].processos?.despacho?.ent?.seconds ?
                                                'Despacho Em andamento' : 'Despacho Não iniciado!'
                                    }

                                    <br></br>
                                    <br></br>
                                    Clique para ver detalhes
                                </Button>
                                <Popover
                                    id={idDespacho}
                                    open={openDespacho}
                                    anchorEl={anchorElDespacho}
                                    onClose={handleCloseDespacho}
                                    anchorOrigin={{
                                        vertical: 'center',
                                        horizontal: 'left',
                                    }}
                                >
                                    <Column2>
                                        <Column>
                                            <text style={{ marginRight: 15, fontWeight: 'bold' }} > Dados do procesos de despacho: {<br></br>}
                                                {
                                                    furos[furoSelecionado?.index].processos?.despacho?.sai ?

                                                        <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#008F83', padding: 8, paddingTop: 12, paddingBottom: 12, borderRadius: 8 }}>
                                                            <text style={{ color: 'white', fontWeight: 'bold' }} >
                                                                Iniciado em {formatTimestamp(furos[furoSelecionado?.index].processos?.despacho?.ent)}
                                                            </text>
                                                            <text style={{ color: 'white', fontWeight: 'bold' }} >
                                                                Finalizado em {formatTimestamp(furos[furoSelecionado?.index].processos?.despacho?.sai)}
                                                            </text>
                                                            <text style={{ color: 'white', fontWeight: 'bold' }} >
                                                                Duração: {segundosParaHHMMSS(furos[furoSelecionado?.index].processos?.despacho?.sai - furos[furoSelecionado?.index].processos?.despacho?.ent)}
                                                            </text>
                                                            <text style={{ color: 'white', fontWeight: 'bold' }} >
                                                                Realizado por: {furos[furoSelecionado?.index].processos?.despacho.user}
                                                            </text>
                                                        </div>
                                                        :
                                                        <></>
                                                }
                                                {
                                                    furos[furoSelecionado?.index].processos?.despacho?.ent && !furos[furoSelecionado?.index].processos?.despacho?.sai ?
                                                        `Iniciado em ${formatTimestamp(furos[furoSelecionado?.index].processos?.geologia.descGeologica.ent)}`
                                                        :
                                                        <></>
                                                }
                                                {
                                                    !furos[furoSelecionado?.index].processos?.despacho?.ent && !furos[furoSelecionado?.index].processos?.despacho?.sai ?
                                                        `Não iniciado!`
                                                        :
                                                        <></>
                                                }
                                            </text>
                                        </Column>
                                    </Column2>
                                </Popover>
                            </Column3>

                            <Column>
                                <text style={{ marginRight: 15, fontWeight: 'bold' }} >Arquivamento: {((filtroArquivamento[furoSelecionado.index]?.length / chipBoxesInternos[furoSelecionado.index]?.length).toFixed(3) * 100).toString().replace('.', ',')}% </text>
                                <PieChart width={320} height={320}>
                                    <Pie
                                        data={arquivamento}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="35%"
                                        outerRadius={110}
                                        fill="#84d8b1"
                                        label
                                    >
                                        {conferencia.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend verticalAlign="top" height={36} />
                                </PieChart>
                            </Column>
                        </Row>
                    </>
            }

        </>
    )
}

const Row = styled.div`
    display: flex;
    flex-wrap: wrap;
`;
const Column = styled.div({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', marginLeft: 20, marginRight: 20
});
const Column2 = styled.div({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', paddingBottom: 12, paddingTop: 6
})

const Column3 = styled.div({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', marginLeft: 70,
})

