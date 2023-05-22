import { NextPageContext } from 'next';
import Head from 'next/head';

import LinkStatistic from '@/containers/LinkStatisticPage';

import { GetLinkFullData } from '../api/link';

const LinkStatisticPage = ({ data }) => {
  return (
    <>
      <Head>
        <title>Link Shortener home</title>
        <meta
          name="description"
          content=" Create short, custom links with ease using our Link Shortener. Boost your online presence and track link clicks with our advanced analytics. Try it now for free!"
        />
      </Head>
      <LinkStatistic data={data} />
    </>
  );
};

export const getServerSideProps = async (context: NextPageContext) => {
  const { code } = context.query;
  const data = await GetLinkFullData(String(code));

  return { props: { data } };
};

export default LinkStatisticPage;
