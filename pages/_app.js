import "@/styles/globals.css";
import { SessionProvider, getSession } from "next-auth/react";
import Layout from "@/components/layout/Layout";
import ContextProvide from "@/contexts/ContextProvide";

import { ThemeProvider } from "next-themes";

export default function App({ Component, pageProps }) {
    return (
        <SessionProvider session={pageProps.session}>
            <ContextProvide>
                <ThemeProvider attribute="class">
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </ThemeProvider>
            </ContextProvide>
        </SessionProvider>
    );
}
