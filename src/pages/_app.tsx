import '../../public/styles/animate.min.css';
import '@/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { Provider } from 'react-redux';

import store from '@/store';
import FlashMessage from '@/utils/FlashMessage';

const App = ({ Component, pageProps }: AppProps) => (
  <Provider store={store}>
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
      <FlashMessage />
    </SessionProvider>
  </Provider>
);

export default App;
