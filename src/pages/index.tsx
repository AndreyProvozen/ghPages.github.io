import Head from 'next/head';

import Home from '@/containers/HomePage';

const metaTitle = 'Link Shortener home';
const metaDescription =
  'Create short, custom links with ease using our Link Shortener. Boost your online presence and track link clicks with our advanced analytics. Try it now for free!';

const HomePage = () => (
  <>
    <Head>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="robots" content="index" />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
    </Head>
    <Home />
  </>
);

export default HomePage;
