import Head from 'next/head';

import Error from '@/containers/ErrorPage';

const metaTitle = 'Error Page';
const metaDescription =
  "Sorry, it seems like there's been an error. We apologize for any inconvenience. Please return to the home page or contact our support team for assistance.";

const ErrorPage = ({ statusCode }) => (
  <>
    <Head>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="robots" content="noindex" />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
    </Head>
    <Error statusCode={statusCode} />
  </>
);

ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;

  return { statusCode };
};

export default ErrorPage;
