import '../../public/styles/animate.min.css';
import '@/globals.css';

import type { AppContext, AppProps } from 'next/app';
import Head from 'next/head';
import { SessionProvider, getSession } from 'next-auth/react';
import { Provider } from 'react-redux';

import store from '@/store';
import FlashMessage from '@/utils/FlashMessage';

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=2.0, minimal-ui" />
    </Head>
    <Provider store={store}>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
        <FlashMessage />
      </SessionProvider>
    </Provider>
  </>
);

App.getInitialProps = async ({ ctx, Component }: AppContext) => {
  const session = await getSession(ctx);
  const pageProps = (await Component.getInitialProps?.(ctx)) || {};

  return { pageProps: { ...pageProps, session } };
};

export default App;
