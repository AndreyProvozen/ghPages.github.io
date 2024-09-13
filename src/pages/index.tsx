import { type FC } from 'react';

import PageMeta from '@/atoms/PageMeta';
import Home from '@/containers/HomePage';
import { Heart, Star, ThreeDots, Chevron } from '@/icons';

const META_TITLE = 'Link Shortener home';
const META_DESCRIPTION =
  'Create short, custom links with ease using our Link Shortener. Boost your online presence and track link clicks with our advanced analytics. Try it now for free!';

const HomePage: FC = () => (
  <>
    <PageMeta title={META_TITLE} description={META_DESCRIPTION} noIndex={false} />
    <Home />
    <div className="fixed opacity-0 pointer-events-none">
      <Star id="star-icon" className="fill-lightOrange" />
      <ThreeDots id="three-dots-icon" className="fill-darkPink" />
      <Heart id="heart-icon" className="fill-darkRed stroke-2 stroke-darkRed" />
      <Chevron id="chevron-icon" />
      <Heart id="heart-outline-icon" className="fill-none stroke-2 stroke-darkRed" />
    </div>
  </>
);

export default HomePage;
