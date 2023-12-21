import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';

import LinkStatistic from '@/containers/LinkStatisticPage';

import { GetLinkFullData } from '../api/link';

const LinkStatisticPage = ({ data }) => (
  <>
    <Head>
      <title>Link Page</title>
      <meta
        name="description"
        content="LinkStatisticPage provides comprehensive insights and analytics for your shared links. Gain a deep understanding of user interactions, click rates, and engagement metrics, all in one centralized dashboard. Track the performance of your links, measure their impact, and optimize your strategies for maximum effectiveness. Explore detailed statistics, visualize trends, and make data-driven decisions to enhance your link sharing experience."
      />
    </Head>
    <LinkStatistic linkData={JSON.parse(data || '')} />
  </>
);

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const { code } = context.query;
  const data = await GetLinkFullData(String(code));

  return { props: { data } };
};

export default LinkStatisticPage;
