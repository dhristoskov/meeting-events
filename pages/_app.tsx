import type { AppProps } from 'next/app';

import Layout from '@/components/layout-component/Layout';
import ContextLayout from '@/components/layout-component/ContextLayout';

import '../styles/globals.scss';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ContextLayout>
        <Layout>
          <Component {...pageProps} />
        </Layout>
    </ContextLayout>
  )
}

export default MyApp
