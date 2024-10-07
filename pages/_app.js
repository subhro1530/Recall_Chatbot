// pages/_app.js
import { SessionProvider } from "next-auth/react";
import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <Head>
        <title>Recall | Your AI Brain</title> {/* Set your global title here */}
        <link rel="icon" href="/favicon.ico" /> {/* Path to your favicon */}
        {/* You can add more meta tags here if needed */}
      </Head>
      <SessionProvider session={session}>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </SessionProvider>
    </>
  );
}

export default MyApp;
