import type { AppProps } from 'next/app';

import Header from '@/components/generic/header';
import Toast from '@/components/generic/toast';
import { wrapper } from '@/redux';

import '../styles/globals.css';
import '@/styles/globals.css';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Toast />
      <Component {...pageProps} />
    </>
  );
}

export default wrapper.withRedux(App);
