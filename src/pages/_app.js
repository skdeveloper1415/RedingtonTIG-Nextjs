import '@/styles/globals.css';
import '@/styles/skstyle.css';
import '@/styles/stylesheet.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "react-toastify/dist/ReactToastify.css";
import { Alegreya } from '@next/font/google';
import { ThemeProvider } from 'next-themes'
// import { Inter } from '@next/font/google';
import { ToastContainer } from "react-toastify";
import { Provider } from 'react-redux';
import store from '@/redux/store';

// const myInter = Inter({
//   weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
//   subsets: ['latin'],
// })

export default function App({ Component, pageProps }) {

  return <>
    {/* <main className={myInter.className}> */}
    <main>
      <Provider store={store}>
        <ThemeProvider attribute="class">
          <Component {...pageProps} /><ToastContainer autoClose={500} />
        </ThemeProvider>
      </Provider>
    </main>
  </>
}