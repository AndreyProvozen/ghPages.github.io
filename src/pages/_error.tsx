import Head from 'next/head';

import Error from '@/containers/ErrorPage';

const ErrorPage = ({ statusCode }) => (
  <>
    <Head>
      <title>Error Page</title>
      <meta
        name="description"
        content="Sorry, it seems like there's been an error. We apologize for any inconvenience. Please return to the home page or contact our support team for assistance."
      />
    </Head>
    <Error statusCode={statusCode} />
  </>
);

ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;

  return { statusCode };
};

export default ErrorPage;
