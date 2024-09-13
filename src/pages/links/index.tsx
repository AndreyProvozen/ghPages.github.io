import { type FC } from 'react';

import PageMeta from '@/atoms/PageMeta';
import LinksList from '@/containers/LinksListPage';
import { Heart, ThreeDots } from '@/icons';

const META_TITLE = 'Links List Page';
const META_DESCRIPTION = 'Explore and manage your shortened links with our Link Shortener project.';

const LinksListPage: FC = () => (
  <>
    <PageMeta title={META_TITLE} description={META_DESCRIPTION} noIndex />
    <LinksList />
    <div className="fixed opacity-0 pointer-events-none">
      <ThreeDots id="three-dots-icon" className="fill-darkPink hover:fill-pink" />
      <Heart id="heart-icon" className="fill-darkRed stroke-2 stroke-darkRed" />
      <Heart id="heart-outline-icon" className="fill-none stroke-2 stroke-darkRed" />
    </div>
  </>
);

export default LinksListPage;
