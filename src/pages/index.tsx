import Head from 'next/head';
import { getSession } from 'next-auth/react';
import Home from '@/containers/HomePage';

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

export async function getServerSideProps(context) {
  return {
    props: {
      session: await getSession(context),
    },
  };
}

export default HomePage;
