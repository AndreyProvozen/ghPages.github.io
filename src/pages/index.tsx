import PageMeta from '@/atoms/PageMeta';
import Home from '@/containers/HomePage';

const META_TITLE = 'Link Shortener home';
const META_DESCRIPTION =
  'Create short, custom links with ease using our Link Shortener. Boost your online presence and track link clicks with our advanced analytics. Try it now for free!';

const HomePage = () => (
  <>
    <PageMeta title={META_TITLE} description={META_DESCRIPTION} noIndex={false} />
    <Home />
  </>
);

export default HomePage;
