import * as React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { ThemeProvider as PreferredThemeProvider } from "next-themes";
import { MuiThemeProvider } from "../src/theme/MuiThemeProvider";
import createEmotionCache from "../src/theme/createEmotionCache";
import { SearchContextProvider } from "../src/contexts/SearchContext";

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function App(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <PreferredThemeProvider>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <MuiThemeProvider>
          <SearchContextProvider>
            <Component {...pageProps} />
          </SearchContextProvider>
        </MuiThemeProvider>
      </CacheProvider>
    </PreferredThemeProvider>
  );
}
