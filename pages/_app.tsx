import '../styles/globals.css'
import "../styles/embla.css";


import type { AppProps } from 'next/app'
import Header from '../components/Header';
import Footer from '../components/Footer';
import { AnimatePresence, motion } from 'framer-motion';

import { DefaultSeo } from 'next-seo';

function MyApp({ Component, pageProps }: AppProps) {
  return( 
  <div className='bg-stone-200'>
    <DefaultSeo
    title='Home'
    titleTemplate='%s | StoryBites'
    defaultTitle='StoryBites'
    description='We are a New Zealand based culinary brand mandated to empower one million people to find humanity in gastronomy.'
    canonical='https://storybites.co.nz/'
    openGraph={{
      url: 'https://storybites.co.nz/',
      title: 'StoryBites',
      description: 'We are a New Zealand based culinary brand mandated to empower one million people to find humanity in gastronomy.',
      images: [
        {
          url: '../public/images/og-image.png',
          width: 1200,
          height: 630,
          alt: "StoryBites"
        },
      ],
      type: 'website',
      locale: 'en_IE',
      site_name: 'StoryBites',
    }}
    />    
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
