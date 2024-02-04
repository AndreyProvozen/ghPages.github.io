import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { getServerSession } from 'next-auth/next';

import Auth from '@/containers/AuthPage';

import { authConfig } from './api/auth/[...nextauth]';

const metaTitle = 'Login Page';
const metaDescription =
  'Sign up for our Link Shortener service today to easily create shortened URLs for your website. With our user-friendly registration process, you can get started in no time. Enjoy the benefits of our service, including custom link options, detailed analytics, and the ability to manage your links all in one place. Register now and take the first step to streamline your link sharing process.';

const AuthPage = () => (
  <>
    <Head>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="robots" content="noindex" />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
    </Head>
    <Auth />
  </>
);

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const session = await getServerSession(context.req, context.res, authConfig);

  if (session) {
    return { redirect: { destination: '/' } };
  }

  return { props: {} };
};

export default AuthPage;
