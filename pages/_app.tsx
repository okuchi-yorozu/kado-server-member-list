import '../style.css';
import {AppProps} from "next/app";
import {AuthProvider} from "../src/framework/context/AuthContext";
import Head from "next/head";

function MyApp({Component, pageProps}: AppProps) {
    return (
        <>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
                <link href="https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c&display=swap"
                      rel="stylesheet"/>

            </Head>
            <AuthProvider>
                <Component {...pageProps} />
            </AuthProvider>
        </>
    )
}

export default MyApp