import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { Provider } from 'react-redux';

import store from '@/store';
import FlashMessage from '@/utils/FlashMessage';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
        <FlashMessage />
      </SessionProvider>
    </Provider>
  );
}
