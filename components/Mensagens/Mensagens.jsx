import { useState } from "react"
import { sendMessage } from "../../hooks/sendMessage"

export default function Mensagens() {

    const [mensagem, setMensagem] = useState()

    return (
        <div style={{ display: 'flex', flexDirection: 'column', }} >
            <text>Insira a mensagem</text>
            <input
                style={{ width: '20%', backgroundColor: 'white', fontSize: 22, fontWeight: 'bold', borderWidth: 1, marginBottom: 10, borderColor: 'grey', borderRadius: 5, marginLeft: 5, paddingLeft: 5 }}
                value={mensagem}
                onChange={(value) => setMensagem(value.target.value)}
            />
            <button onClick={async () => {await sendMessage(mensagem), setMensagem('')}} >Enviar mensagem</button>
        </div>
    )
}