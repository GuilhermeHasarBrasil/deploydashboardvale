import React from "react";
import { useState, useEffect } from "react";
import { auth } from "../firebase/firebase";
import {
    signInWithEmailAndPassword, sendPasswordResetEmail
} from "firebase/auth";
import { useRouter } from "next/router";
import { useAuth } from "../firebase/auth";
import Loader from "../components/Loader";
import styled from 'styled-components'
import { MailOutline, LockClosedOutline } from 'react-ionicons'

const LoginForm = () => {
    const router = useRouter();
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const { authUser, isLoading } = useAuth();

    const [emptyEmail, setEmptyEmail] = useState(false);

    useEffect(() => {
        if (!isLoading && authUser) {
            router.push("/");
        }
    }, [authUser, isLoading]);

    const [erroRecoverPassword, setErroRecoverPassword] = useState(false);
    const loginHandler = async () => {
        if (!email || !password) return;
        try {
            setErroRecoverPassword(false)
            await signInWithEmailAndPassword(auth, email.trim().toLowerCase(), password);
        } catch (error) {
            setErroRecoverPassword(true)
            console.error("An error occured", error);
        }
    };

    useEffect(() => {
        if (erroRecoverPassword == true) {
            setTimeout(() => {
                setErroRecoverPassword(false)
            }, 5000);
        }
    }, [erroRecoverPassword])

    const triggerResetEmail = async () => {
        if (email.length < 7) {
            window.prompt('Insira o email para recuperação no campo de email')
            setEmptyEmail(true)
            return
        } else {
            await sendPasswordResetEmail(auth, email);
        }
    }

    return isLoading || (!isLoading && !!authUser) ? (
        <Loader />
    ) : (

        <Container>
            <Bg />
            <div style={{ position: 'absolute', zIndex: 5 }} className="w-full lg:w-[100%] p-8 md:p-14 flex items-center justify-center lg:justify-start">

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
                    <img src='/assets/valelogin.png' style={{ width: 600 }} />
                    <text style={
                        {
                            color: '#12969E', fontSize: 36,
                            fontWeight: 'bold',
                            textShadow: '-1.5px -1.5px 0 #000, 1.5px -1.5px 0 #000, -1.5px 1.5px 0 #000, 1.5px 1.5px 0 #000',
                            fontFamily: 'Poppins', marginLeft: 20
                        }
                    } >
                        HSD - HASAR Sample Data
                    </text>
                </div>

                <div style={{ marginLeft: '25%', width: 600, display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="mt-10 pl-1 flex flex-col">
                            <label style={{
                                color: '#12969E', fontWeight: 'bold', fontSize: 24,
                                textShadow: '-0.7px -0.7px 0 #fff, 0.7px -0.7px 0 #fff, -0.7px 0.7px 0 #fff, 0.7px 0.7px 0 #fff',
                                fontFamily: 'Poppins', marginLeft: 0,
                                letterSpacing: 2
                            }} >
                                LOGIN
                            </label>
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} >
                                <input
                                    type="email"
                                    name="email"
                                    style={{ backgroundColor: 'white', width: 400, height: 50, padding: 4, borderRadius: 5, borderWidth: 2, borderColor: 'black' }}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <div style={{ backgroundColor: '#074F92', alignItems: 'center', justifyContent: 'center', padding: 6, borderRadius: 2 }} >
                                    <MailOutline
                                        color={'#ffff'}
                                        title={'iconmail'}
                                        height="38px"
                                        width="38px"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mt-10 pl-1 flex flex-col">
                            <label style={{
                                color: '#12969E', fontWeight: 'bold',
                                fontSize: 24,
                                textShadow: '-0.7px -0.7px 0 #fff, 0.7px -0.7px 0 #fff, -0.7px 0.7px 0 #fff, 0.7px 0.7px 0 #fff',
                                fontFamily: 'Poppins', marginLeft: 0, letterSpacing: 2
                            }} >SENHA</label>
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} >
                                <input
                                    type="password"
                                    name="password"
                                    style={{ backgroundColor: 'white', width: 400, height: 50, padding: 4, borderRadius: 5, borderWidth: 2, borderColor: 'black' }}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <div style={{ backgroundColor: '#074F92', alignItems: 'center', justifyContent: 'center', padding: 6, borderRadius: 2 }} >
                                    <LockClosedOutline
                                        color={'#ffff'}
                                        title={'iconsenha'}
                                        height="38px"
                                        width="38px"
                                    />
                                </div>
                            </div>
                        </div>
                        <StyledButton onClick={loginHandler}>
                            <h3 style={{ color: 'white', fontSize: 25, fontWeight: 'bold', textShadow: '0 0 6px rgba(255, 255, 255, 0.6)' }} >Entrar</h3>
                        </StyledButton>
                    </form>

                    <button style={{ marginTop: 20 }} type="button" onClick={triggerResetEmail}   disabled={!email || email.length < 7 || !email.includes('@')}>
                        <text style={{
                            color: '#12969E', fontSize: 22, fontWeight: 'bold', marginLeft: 0, marginTop: 40, textShadow: '-0.7px -0.7px 0 #fff, 0.7px -0.7px 0 #fff, -0.7px 0.7px 0 #fff, 0.7px 0.7px 0 #fff',
                            fontFamily: 'Poppins',
                        }}>Esqueceu sua senha? Clique para recuperar</text>
                    </button>
                    {
                        erroRecoverPassword ?
                            <div style={{ backgroundColor: "#074F92", padding: 10, borderRadius: 5 }} ><text style={{ color: 'white', fontWeight: 'bold' }} >O email não está cadastrado ou a senha está incorreta!</text></div>
                            :
                            <></>
                    }
                    <img src='/assets/hasarbrasillogin.png' style={{ width: 250, marginTop: 40 }} />

                </div>
            </div>
        </Container>
    );
};

export default LoginForm;
const StyledButton = styled.button`
    background-color: #074F92;
    transition: opacity 0.3s;
    margin-left: 5px;
    margin-top: 20px;
    height: 50px;
    width: 450px;
    border-radius: 20px;
    &:hover {
        opacity: 0.8;
    }
`;
const Container = styled.div({
    width: '100vw', // Usar a largura total da viewport
    height: '100vh', // Usar a altura total da viewport
    // backgroundImage: `url(${'/assets/backgroundimage.png'})`,
    // backgroundRepeat: 'no-repeat',
    // backgroundSize: 'cover', // Para cobrir toda a área disponível
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
})

const Bg = styled.div({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: `url(${'/assets/backgroundimage.png'})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    opacity: 0.57, // Ajuste a opacidade conforme desejado
})