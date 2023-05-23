import Head from 'next/head';
import { getSession } from 'next-auth/react';

import Statistic from '@/containers/StatisticPage';

const StatisticPage = () => (
  <>
    <Head>
      <title>Statistic Page</title>
      <meta
        name="description"
        content="View detailed statistics for your shortened links with our Link Shortener's statistics page. Track clicks, locations, and referral sources to gain insights on your link's performance. Monitor your campaigns and optimize your marketing strategy for maximum engagement and results."
      />
    </Head>
    <Statistic />
  </>
);

export async function getServerSideProps(context) {
  return {
    props: {
      session: await getSession(context),
    },
  };
}

export default StatisticPage;
