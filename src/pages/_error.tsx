import { type NextPageContext } from 'next';

import PageMeta from '@/atoms/PageMeta';
import Error from '@/containers/ErrorPage';

const META_TITLE = 'Error Page';
const META_DESCRIPTION =
  "Sorry, it seems like there's been an error. We apologize for any inconvenience. Please return to the home page or contact our support team for assistance.";

interface Props {
  statusCode: number;
}

const ErrorPage = ({ statusCode }: Props) => (
  <>
    <PageMeta title={META_TITLE} description={META_DESCRIPTION} noIndex />
    <Error statusCode={statusCode} />
  </>
);

ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res?.statusCode || err?.statusCode || 404;

  return { statusCode };
};

export default ErrorPage;
