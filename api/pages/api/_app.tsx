import * as React from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
declare global {
  interface Window {
    ethereum: any;
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}

export default MyApp;
