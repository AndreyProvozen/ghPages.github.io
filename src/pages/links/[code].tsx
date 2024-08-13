import { type GetServerSidePropsContext } from 'next';
import { type FC } from 'react';

import PageMeta from '@/atoms/PageMeta';
import { type FullLinkDataProps } from '@/constants';
import LinkStatistic from '@/containers/LinkStatisticPage';

import { GetLinkFullData } from '../api/link';

const META_TITLE = 'Shortened Link Page';
const META_DESCRIPTION =
  'Shortened Link Page provides comprehensive insights and analytics for your shared links. Gain a deep understanding of user interactions, click rates, and engagement metrics, all in one centralized dashboard. Track the performance of your links, measure their impact, and optimize your strategies for maximum effectiveness. Explore detailed statistics, visualize trends, and make data-driven decisions to enhance your link sharing experience.';

interface Props {
  data: string;
}

const LinkStatisticPage: FC<Props> = ({ data }) => (
  <>
    <PageMeta title={META_TITLE} description={META_DESCRIPTION} noIndex />
    <LinkStatistic linkData={JSON.parse(data || '') as FullLinkDataProps} />
  </>
);

export const getServerSideProps = async ({ query }: GetServerSidePropsContext) => {
  const data = await GetLinkFullData(String(query.code));

  return { props: { data } };
};

export default LinkStatisticPage;
