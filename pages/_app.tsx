import '../styles/globals.css'
import "../styles/embla.css";

import type { AppProps } from 'next/app'
import Header from '../components/Header';
import Footer from '../components/Footer';
import Head from 'next/head';
import { AnimatePresence, motion } from 'framer-motion';

function MyApp({ Component, pageProps }: AppProps) {
  return( 
  <div className='bg-stone-200'>    
  <Head>
    <title>Storybites</title>
          <link rel="icon" href="/favicon.ico" />
    </Head>
    <Header />
    <AnimatePresence>
    <motion.div
         initial="initial"
         animate="animate"
         variants={{
           initial: {
             opacity: 0,
           },
           animate: {
             opacity: 1,
           },
         }}
       >
          
        <Component {...pageProps} />    
    </motion.div>
    </AnimatePresence>

    <Footer />

  </div>)
}

export default MyApp
