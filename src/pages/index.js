import React, { useEffect } from 'react';
import Image from "next/image";
import { useTheme } from "next-themes";
import Head from 'next/head';
import "aos/dist/aos.css";
import AOS from "aos";
import { useRouter } from 'next/router';


export default function Index() {

  const router = useRouter();
  useEffect(() => {

    if(!window.location.pathname.startsWith('/landing')){
      const timeout = setTimeout(() => {
      // window.location.replace('/landing');
      router.push('/landing');
    }, 1000);
    return () => clearTimeout(timeout);
    }

    
    AOS.init();
  }, [])
 

  return (
    <>
    <Head>
    <title>TSG</title>
    <meta name="description" content="" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="/favicon.png" />
  </Head>
      <div className="home-bg">
        <div className="px-20 ">
          <div className="pt-12 flex  flex-shrink-0 justify-center text-center h-screen items-center">
            <Image src="/assets/images/landing-logo-white.png" width={352} height={112} alt="" />
          </div>
          
        </div>
      </div>
      
      </>

  );
}