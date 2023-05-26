import { useEffect, useState } from 'react';

import ChartBlock from '@/components/ChartBlock';
import Footer from '@/components/Footer';
import HeroBlock from '@/components/HeroBlock';
import { FullLinkDataProps } from '@/constants';

const LinkStatistic = ({ data }) => {
  const [link, setLink] = useState<FullLinkDataProps | undefined>(undefined);

  useEffect(() => {
    setLink(JSON.parse(data));
  }, []);

  return (
    <>
      <HeroBlock
        backgroundImage={{ src: '/images/infoBlockBg.avif', alt: 'Link page background' }}
        title="Link Page"
        subTitle="View detailed statistics for your shortened links with our Link Shortener's statistics page. Track
            clicks, locations, and referral sources to gain insights on your link's performance."
      />
      {link && <ChartBlock metrics={link.metrics} />}
      <Footer containerClasses="mt-10" />
    </>
  );
};

export default LinkStatistic;
