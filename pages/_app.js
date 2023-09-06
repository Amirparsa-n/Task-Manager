import "@/styles/globals.css";
import { SessionProvider, getSession } from "next-auth/react";
import Layout from "@/components/layout/Layout";
import ContextProvide from "@/contexts/ContextProvide";

export default function App({ Component, pageProps }) {
    return (
        <SessionProvider session={pageProps.session}>
            <ContextProvide>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </ContextProvide>
        </SessionProvider>
    );
}
