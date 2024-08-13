import { type FC } from 'react';

import PageMeta from '@/atoms/PageMeta';
import LinksList from '@/containers/LinksListPage';

const META_TITLE = 'Links List Page';
const META_DESCRIPTION = 'Explore and manage your shortened links with our Link Shortener project.';

const LinksListPage: FC = () => (
  <>
    <PageMeta title={META_TITLE} description={META_DESCRIPTION} noIndex />
    <LinksList />
  </>
);

export default LinksListPage;
