import Top from "./top";
import Left from "./left";
import Head from "next/head";
import { Inter } from '@next/font/google';

const myinter = Inter({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  display: 'swap'
})

export default function Layout({ children, ...pageProps }) {
  return (
    <>
      <Head>
        <title>{pageProps.pageTitle ? pageProps.pageTitle : "Loading..."} | Welcome to Redington</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Top />
      <Left />
      <main className={myinter.className}><div className="pt-[83px] pl-[90px] xl:pl-[4.688vw]">{children}</div></main>
    </>
  );
}
