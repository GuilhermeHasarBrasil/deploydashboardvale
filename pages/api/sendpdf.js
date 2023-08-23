import fs from 'fs';
import { Telegraf } from 'telegraf';
import dotenv from 'dotenv';
import 'firebase/storage';
import { getStorage, ref, uploadBytes } from 'firebase/storage';

dotenv.config();
const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = '-707399392';
const bot = new Telegraf(BOT_TOKEN);

// Fazer o upload do arquivo PDF para o Firebase Storage
async function uploadPdfToStorage(pdfFilePath) {
    const storage = getStorage();
    const storageRef = ref(storage, 'pdfs/nomeArquivo.pdf'); // Caminho no Storage
    const fileBlob = fs.readFileSync(pdfFilePath);

    try {
        const snapshot = await uploadBytes(storageRef, fileBlob);
        const downloadToken = snapshot.metadata.downloadTokens;
        const fileDownloadUrl = `https://firebasestorage.googleapis.com/v0/b/hsbrsampledata-dev.appspot.com/o/pdfs%2FnomeArquivo.pdf?alt=media&token=${downloadToken}`;

        await sendFileLink(fileDownloadUrl);
    } catch (error) {
        console.error('Erro ao enviar o arquivo para o Firebase Storage:', error);
    }
}

// Enviar link do arquivo pelo bot do Telegram
async function sendFileLink(fileUrl) {
    try {
        await bot.telegram.sendMessage(CHAT_ID, 'Link para o arquivo:');
        await bot.telegram.sendMessage(CHAT_ID, fileUrl);
    } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
    }
}

export default async function handler(req, res) {

    try {
        const pdfFilePath = 'C:\\Users\\Hasar\\Downloads\\tabela.pdf'; // caminho do arquivo
        await uploadPdfToStorage(pdfFilePath);
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}
