import Top from "./top";
import Head from "next/head";

export default function LandingLayout({ children, ...pageProps }) {
  return (
    <>
      <Head>
        <title>{pageProps.pageTitle ? pageProps.pageTitle : "Loading..."} | Welcome to Redington</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Alegreya+Sans:wght@300;400;500;700;800&display=swap" rel="stylesheet" />
      </Head>
      <Top />
      <main>{children}</main>
    </>
  );
}