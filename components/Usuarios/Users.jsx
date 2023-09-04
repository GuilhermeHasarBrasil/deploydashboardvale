import React, { useState, useEffect } from "react"
import { auth } from "../../firebase/firebase"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { useRouter } from "next/router"
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import {
    getDocs,
    where,
    updateDoc,
    doc,
    setDoc,
    Timestamp,
} from "firebase/firestore";
import { db } from "../../firebase/firebase"
import { AddCircleOutline } from 'react-ionicons'
import FormControlLabel from '@mui/material/FormControlLabel';
import { Checkbox } from "@mui/material"
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import Alert from '@mui/material/Alert';

export default function Users() {

    const router = useRouter()
    const [name, setName] = useState(null)
    const [surname, setSurname] = useState(null)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [userType, setUserType] = useState('administrador');
    const [todosSetores, setTodosSetores] = useState(false);
    const [setoresSelecionados, setSetoresSelecionados] = useState([]);
    const handleUserTypeChange = (event) => {
        setUserType(event.target.value);
    };

    const [users, setUsers] = useState([])

    useEffect(() => {
        console.log('rodei')
        const unsubscribeUsers = onSnapshot(query(collection(db, "Users"), orderBy('email')), (snapshot) => {
            const updatedUsers = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            const updatedUser = updatedUsers?.map(user => {
                const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16).padEnd(6, '0');
                return { ...user, cor: randomColor };
            });
            setUsers(updatedUser);
        });
        return () => {
            unsubscribeUsers();
        };
    }, [])

    const setores = [
        'Conferência',
        'Marcação',
        'Fotografia',
        'Geologia',
        'Densidade',
        'Serragem',
        'Amostragem',
        'Despacho',
        'Arquivamento',
    ];

    function handleSetor(setor, checked) {
        if (checked) {
            setSetoresSelecionados(old => old.filter(item => item !== setor));
        } else {
            setSetoresSelecionados(old => [...old, setor]);
        }
    }

    useEffect(() => {
        if (userType === 'administrador') {
            setSetoresSelecionados([
                'Conferência',
                'Marcação',
                'Fotografia',
                'Geologia',
                'Densidade',
                'Serragem',
                'Amostragem',
                'Despacho',
                'Arquivamento',
            ])
        }
        if (userType !== 'administrador') {
            setSetoresSelecionados(
                [
                    'Conferência',
                ]
            )
        }
    }, [userType])

    async function SaveNewUser() {
        try {
            const UserId = email
            const UsersCollectionRef = collection(db, "Users"); // Referência da coleção
            const UserDocRef = doc(UsersCollectionRef, UserId); // Cria uma referência ao documento com ID personalizado
            await createUserWithEmailAndPassword(auth, email, password)
            await setDoc(UserDocRef, {
                admin: userType === 'administrador' ? true : false,
                email: email,
                id: email,
                nome: name,
                sobrenome: surname,
                senha: password,
                setores: setoresSelecionados,
                uid: uuidv4()
            })
        } catch (error) {
            console.log(error)
        }
    }

    const [validForm, setValidForm] = useState(false)
    const [alertForm, setAlertForm] = useState(
        <Alert style={{ marginBottom: 16, width: 300, fontWeight: 'bold' }} severity="warning">
            Preencha todos os campos!
        </Alert>)

    useEffect(() => {
        if (name !== null && surname !== null && email !== null && password !== null && email?.includes('@')) {
            setValidForm(true)
        }
        else {
            setValidForm(false)
        }

    }, [name, surname, email, password])

    console.log('validForm', validForm)

    return (
        <div style={{ display: 'flex', justifyContent: 'row', padding: 20, justifyContent: 'space-around' }} >

            <div style={{ backgroundColor: '#074F92', padding: 10, paddingLeft: 20, paddingRight: 20, borderRadius: 8 }} >
                <text style={{ fontSize: 30, color: 'white', marginBottom: 12, fontWeight: 'bold' }} >Usuários:</text>
                {users.map((usuario, index) => (
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 8 }} >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: usuario.cor, width: 60, height: 60, borderRadius: 25 }} >
                            <text style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }} >
                                {usuario.nome.substring(0, 1).toUpperCase() +
                                    usuario.sobrenome.substring(0, 1).toUpperCase()}
                            </text>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 10 }} >
                            <text style={{ fontSize: 25, color: 'white', fontWeight: 'bold' }} >{usuario.nome}</text>
                            <text style={{ fontSize: 16, color: 'white' }} >{usuario.email}</text>
                        </div>

                    </div>
                ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', borderRadius: 8, width: '40%' }} >
                <div style={{ display: 'flex', flexDirection: 'row', borderRadius: 8, justifyContent: 'space-between', paddingLeft: 8, paddingRight: 8, marginBottom: 15, alignItems: 'center', backgroundColor: '#074F92' }} >
                    <AddCircleOutline
                        color={'#fff'}
                        title={'addUser'}
                        height="30px"
                        width="30px"
                    />
                    <text style={{ fontSize: 25, color: 'white' }} >Cadastrar novo usuário</text>
                </div>

                <div style={{ backgroundColor: '#074F92', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: 8, padding: 15 }} >
                    <div style={{ borderRadius: 15, backgroundColor: '#fff', display: 'flex', padding: 8, flexDirection: 'column', alignItems: 'center', }} >
                        <text style={{ color: 'black', fontSize: 22, fontWeight: 'bold' }} >Novo usuário:</text>
                        <div style={{ display: 'flex', flexDirection: 'column' }} >
                            <text style={{ fontSize: 20, color: 'black', fontWeight: 'bold' }} >Nome:</text>
                            <input
                                type="text"
                                name="Nome"
                                style={{ backgroundColor: 'white', width: 400, marginBottom: 15, height: 40, padding: 2, borderRadius: 5, borderWidth: 1, borderColor: 'black' }}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }} >
                            <text style={{ fontSize: 20, color: 'black', fontWeight: 'bold' }} >Sobrenome:</text>
                            <input
                                type="text"
                                name="Sobrenome"
                                style={{ backgroundColor: 'white', width: 400, marginBottom: 15, height: 40, padding: 2, borderRadius: 5, borderWidth: 1, borderColor: 'black' }}
                                onChange={(e) => setSurname(e.target.value)}
                            />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }} >
                            <text style={{ fontSize: 20, color: 'black', fontWeight: 'bold' }} >Email:</text>
                            <input
                                type="email"
                                name="e-mail"
                                style={{ backgroundColor: 'white', width: 400, marginBottom: 15, height: 40, padding: 2, borderRadius: 5, borderWidth: 1, borderColor: 'black' }}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }} >
                            <text style={{ fontSize: 20, color: 'black', fontWeight: 'bold' }} >Senha:</text>
                            <input
                                type="password"
                                name="senha"
                                style={{ backgroundColor: 'white', width: 400, marginBottom: 15, height: 40, padding: 2, borderRadius: 5, borderWidth: 1, borderColor: 'black' }}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontSize: 20, color: 'black', fontWeight: 'bold' }}>
                                Tipo de usuário:
                            </span>
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} >
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={userType === 'administrador'}
                                            onChange={handleUserTypeChange}
                                            value="administrador"
                                        />
                                    }
                                    label="Administrador"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={userType === 'operador'}
                                            onChange={handleUserTypeChange}
                                            value="operador"
                                        />
                                    }
                                    label="Operador"
                                />
                            </div>

                        </div>
                        <div style={{
                            display: 'flex', flexWrap: 'wrap', rowGap: 12, flexDirection: 'row', alignItems: 'center',
                            marginTop: 14, columnGap: 60,
                        }}>
                            {setores.map((setor, index) => (
                                <View>
                                    <Checkbox
                                        checked={setoresSelecionados.includes(setor)}
                                        onChange={checked => handleSetor(setor, setoresSelecionados.includes(setor))}
                                    />
                                    <Text>{setor}</Text>
                                </View>
                            ))}
                        </div>

                        {
                            !validForm ?
                                alertForm
                                :
                                <Button
                                    //onClick={SaveNewUser}
                                    onClick={() => console.log('salva user')}
                                    disabled={!name || !surname || !email || !password}
                                >
                                    <text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }} >Salvar</text>
                                </Button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

const View = styled.div`
    width: 20%;
    display: flex;
    flex-direction: row;
    align-items: center;
`
const Text = styled.text`
    font-size: 16px;
    color: black;
    font-weight: 500;
`

const Button = styled.button`
    background-color: #074F92;
    transition: opacity 0.3s;
    margin-top: 15px;
    height: 50px;
    width: 120px;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    color: 'white';
    &:hover {
        opacity: 0.2;
    }

`