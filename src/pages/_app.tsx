import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import FlashMessageProvider from '@/utils/FlashMessage';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <FlashMessageProvider>
        <Component {...pageProps} />
      </FlashMessageProvider>
    </SessionProvider>
  );
}
