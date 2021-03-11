import type { AppProps } from 'next/app';

import Layout from '@/components/layout-component/Layout';
import ThemeContextProvider from '../context/theme-context/ThemeContext';

import '../styles/globals.scss'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeContextProvider>
  )
}

export default MyApp
