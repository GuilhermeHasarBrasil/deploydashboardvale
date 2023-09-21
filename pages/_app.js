import "../styles/globals.css";
import Head from "next/head";
import { AuthUserProvider } from "../firebase/auth";
import BrowserPrintProvider from '../contexts/BrowserPrintContext'
import { PauseProvider } from '../contexts/PauseContext'

export default function App({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>Dashboards - Vale</title>
            </Head>
            <BrowserPrintProvider>
                <AuthUserProvider>
                    <PauseProvider>
                        <Component {...pageProps} />
                    </PauseProvider>
                </AuthUserProvider>
            </BrowserPrintProvider>
        </>
    );
}
