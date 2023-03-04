import type { AppProps } from 'next/app';

import Toast from '@/components/generic/toast';
import { wrapper } from '@/redux';

import '@/styles/globals.css';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Toast />
      <Component {...pageProps} />
    </>
  );
}

export default wrapper.withRedux(App);
