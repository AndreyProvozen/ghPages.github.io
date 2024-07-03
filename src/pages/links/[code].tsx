import { GetServerSidePropsContext } from 'next';

import PageMeta from '@/atoms/PageMeta';
import LinkStatistic from '@/containers/LinkStatisticPage';

import { GetLinkFullData } from '../api/link';

const META_TITLE = 'Shortened Link Page';
const META_DESCRIPTION =
  'Shortened Link Page provides comprehensive insights and analytics for your shared links. Gain a deep understanding of user interactions, click rates, and engagement metrics, all in one centralized dashboard. Track the performance of your links, measure their impact, and optimize your strategies for maximum effectiveness. Explore detailed statistics, visualize trends, and make data-driven decisions to enhance your link sharing experience.';

const LinkStatisticPage = ({ data }) => (
  <>
    <PageMeta title={META_TITLE} description={META_DESCRIPTION} noIndex />
    <LinkStatistic linkData={JSON.parse(data || '')} />
  </>
);

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const data = await GetLinkFullData(String(context.query.code));

  return { props: { data } };
};

export default LinkStatisticPage;
