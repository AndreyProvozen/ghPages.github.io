import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import FlashMessageProvider from '@/utils/FlashMessage';

interface AppData extends AppProps {
  session: any;
}

export default function App({ Component, pageProps, session }: AppData) {
  return (
    <SessionProvider session={session}>
      <FlashMessageProvider>
        <Component {...pageProps} />
      </FlashMessageProvider>
    </SessionProvider>
  );
}
