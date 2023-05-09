import React, { useEffect, useState } from 'react';
import { NextPageContext } from 'next';
import { GetLinkFullData } from '../api/link';

const LinkStatistic = ({ data }) => {
  const [link, setLink] = useState(undefined);
  useEffect(() => {
    setLink(JSON.parse(data));
  }, []);

  return (
    <>
      <div>LinkPage </div>
      {link && <div>{link.url}</div>}
    </>
  );
};

export const getServerSideProps = async (context: NextPageContext) => {
  const { code } = context.query;
  const data = await GetLinkFullData(String(code));

  return { props: { data } };
};

export default LinkStatistic;
