import { Html, Head, Main, NextScript } from 'next/document';

const Document = () => (
  <Html lang="en" dir="ltr">
    <Head>
      <link rel="manifest" href="/manifest.json" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <meta name="theme-color" content="#000" />

      <meta property="og:site_name" content="Link Shortener" />
      <meta name="keywords" content="link shortener, custom links, online presence, link analytics" />
      <meta property="og:type" content="website" />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
