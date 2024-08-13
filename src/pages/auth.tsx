import { type GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth/next';
import { type FC } from 'react';

import PageMeta from '@/atoms/PageMeta';
import Auth from '@/containers/AuthPage';

import { authConfig } from './api/auth/[...nextauth]';

const META_TITLE = 'Login Page';
const META_DESCRIPTION =
  'Sign up for our Link Shortener service today to easily create shortened URLs for your website. With our user-friendly registration process, you can get started in no time. Enjoy the benefits of our service, including custom link options, detailed analytics, and the ability to manage your links all in one place. Register now and take the first step to streamline your link sharing process.';

const AuthPage: FC = () => (
  <>
    <PageMeta title={META_TITLE} description={META_DESCRIPTION} noIndex />
    <Auth />
  </>
);

export const getServerSideProps = async ({ req, res }: GetServerSidePropsContext) => {
  const session = await getServerSession(req, res, authConfig);

  if (session) return { redirect: { destination: '/' } };

  return { props: {} };
};

export default AuthPage;
