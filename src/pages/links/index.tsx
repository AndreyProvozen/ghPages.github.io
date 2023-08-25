import Head from 'next/head';

import LinksList from '@/containers/LinksListPage';

const LinksListPage = () => (
  <>
    <Head>
      <title>Statistic Page</title>
      <meta
        name="description"
        content="View detailed statistics for your shortened links with our Link Shortener's statistics page. Track clicks, locations, and referral sources to gain insights on your link's performance. Monitor your campaigns and optimize your marketing strategy for maximum engagement and results."
      />
    </Head>
    <LinksList />
  </>
);

export default LinksListPage;
