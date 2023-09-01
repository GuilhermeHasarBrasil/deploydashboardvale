import "../styles/globals.css";
import Head from "next/head";
import { AuthUserProvider } from "../firebase/auth";
import BrowserPrintProvider from '../contexts/BrowserPrintContext'


export default function App({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>Dashboards - Vale</title>
            </Head>
            <BrowserPrintProvider>
                <AuthUserProvider>
                    <Component {...pageProps} />
                </AuthUserProvider>
            </BrowserPrintProvider>

        </>
    );
}
