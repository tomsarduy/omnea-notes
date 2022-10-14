import React, { ReactNode } from "react";
import Head from "next/head";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import theme from "../theme";
import createEmotionCache from "../createEmotionCache";
import Header from "./Header";
const clientSideEmotionCache = createEmotionCache();
interface MyAppProps {
    emotionCache?: EmotionCache;
    children?: ReactNode;
}

const Layout = ({
    children,
    emotionCache = clientSideEmotionCache,
}: MyAppProps) => (
    <CacheProvider value={emotionCache}>
        <Head>
            <title>Omnea Notes</title>
            <meta charSet="utf-8" />
            <meta
                name="viewport"
                content="initial-scale=1.0, width=device-width"
            />
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
            />
        </Head>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header />
            {children}
            <CssBaseline />
        </ThemeProvider>
    </CacheProvider>
);

export default Layout;
