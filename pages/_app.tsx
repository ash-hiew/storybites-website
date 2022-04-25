import '../styles/globals.css'
import "../styles/embla.css";

import type { AppProps } from 'next/app'


function MyApp({ Component, pageProps }: AppProps) {
  return( 
  <div className='bg-stone-200'>
    <Component {...pageProps} />
  </div>)
}

export default MyApp
