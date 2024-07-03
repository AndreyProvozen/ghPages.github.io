import { render } from '@testing-library/react';

import PageMeta from './PageMeta';

jest.mock('next/head', () => {
  const Head = ({ children }) => <>{children}</>;
  return Head;
});

describe('<PageMeta />', () => {
  const defaultProps = {
    title: 'Test Title',
    description: 'Test Description',
  };

  it('should render the title and description meta tags', () => {
    render(<PageMeta {...defaultProps} />);

    const metaDescription = document.querySelector('meta[name="description"]');
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');

    expect(document.title).toBe(defaultProps.title);
    expect(metaDescription).toHaveAttribute('content', defaultProps.description);
    expect(ogTitle).toHaveAttribute('content', defaultProps.title);
    expect(ogDescription).toHaveAttribute('content', defaultProps.description);
  });

  it('should render the noindex robots meta tag when noIndex is true', () => {
    render(<PageMeta {...defaultProps} noIndex />);

    const robotsMeta = document.querySelector('meta[name="robots"]');

    expect(robotsMeta).toHaveAttribute('content', 'noindex');
  });

  it('should not render the robots meta tag when noIndex is false or not provided', () => {
    render(<PageMeta {...defaultProps} />);

    const robotsMeta = document.querySelector('meta[name="robots"]');

    expect(robotsMeta).not.toBeInTheDocument();
  });
});
