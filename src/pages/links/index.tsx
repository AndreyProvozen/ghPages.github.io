import Head from 'next/head';

import LinksList from '@/containers/LinksListPage';

const LinksListPage = () => (
  <>
    <Head>
      <title>Links List Page</title>
      <meta name="description" content="Explore and manage your shortened links with our Link Shortener project." />
    </Head>
    <LinksList />
  </>
);

export default LinksListPage;
