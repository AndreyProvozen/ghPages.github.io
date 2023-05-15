import Head from 'next/head';
import Auth from '@/containers/AuthPage';

const AuthPage = () => {
  return (
    <>
      <Head>
        <title>Auth Page</title>
        <meta
          name="description"
          content="Sign up for our Link Shortener service today to easily create shortened URLs for your website. With our user-friendly registration process, you can get started in no time. Enjoy the benefits of our service, including custom link options, detailed analytics, and the ability to manage your links all in one place. Register now and take the first step to streamline your link sharing process."
        />
      </Head>
      <Auth />
    </>
  );
};

export default AuthPage;
