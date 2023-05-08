import Home from '@/containers/HomePage';
import Head from 'next/head';

const HomePage = () => {
  return (
    <>
      <Head>
        <title>Link Shortener home</title>
        <meta
          name="description"
          content=" Create short, custom links with ease using our Link Shortener. Boost your online presence and track link clicks with our advanced analytics. Try it now for free!"
        />
      </Head>
      <Home />
    </>
  );
};

export default HomePage;
