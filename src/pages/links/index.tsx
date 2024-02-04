import Head from 'next/head';

import LinksList from '@/containers/LinksListPage';

const metaTitle = 'Links List Page';
const metaDescription = 'Explore and manage your shortened links with our Link Shortener project.';

const LinksListPage = () => (
  <>
    <Head>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="robots" content="noindex" />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
    </Head>
    <LinksList />
  </>
);

export default LinksListPage;
