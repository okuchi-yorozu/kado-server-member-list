import {AppProps} from "next/app";
import {AuthProvider} from "../src/framework/context/AuthContext";

function MyApp({Component, pageProps}: AppProps) {
    return (
        <AuthProvider>
            <Component {...pageProps} />
        </AuthProvider>
    )
}

export default MyApp