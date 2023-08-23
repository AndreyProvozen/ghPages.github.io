import { render, screen } from '@testing-library/react';

import { TEXT_WITH_IMAGE_TEST_IDS } from './testIds';
import TextWithImage from './TextWithImage';

const textWithImageProps = {
  linkData: { src: '/images/contentImage2.avif', alt: 'Link Performance image' },
  title: 'Link Performance',
  featuresListData: [
    'View click-through rates and link performance metrics',
    'Monitor link performance over time',
    'View statistics on user demographics and devices used to access your links',
    'Identify your top-performing links and focus your marketing efforts accordingly',
  ],
  text: '<p>test text content</p>',
};

const testClass = 'test-container-class';

const setup = (props = {}) => render(<TextWithImage {...textWithImageProps} {...props} />);

describe('<TextWithImage />', () => {
  let originalIntersectionObserver;
  const mockedObserve = jest.fn();
  const mockedUnobserve = jest.fn();
  const mockedDisconnect = jest.fn();
  const mockedIntersectionObserver = jest.fn((cb, options) => ({
    observe: mockedObserve,
    unobserve: mockedUnobserve,
    disconnect: mockedDisconnect,
    ...options,
  }));

  beforeAll(() => {
    originalIntersectionObserver = window.IntersectionObserver;
    window.IntersectionObserver = mockedIntersectionObserver;
  });

  afterAll(() => {
    window.IntersectionObserver = originalIntersectionObserver;
  });

  it('should render correctly', () => {
    setup({ containerClasses: testClass });

    const titleBlock = screen.getByText(textWithImageProps.title);
    expect(titleBlock).toBeInTheDocument();

    const textBlock = screen.getByText('test text content');
    expect(textBlock).toBeInTheDocument();

    const imageBlock = screen.getByAltText(textWithImageProps.linkData.alt);
    expect(imageBlock).toBeInTheDocument();

    const rootBlock = screen.getByTestId(TEXT_WITH_IMAGE_TEST_IDS.ROOT);
    expect(rootBlock).toHaveClass(testClass);

    textWithImageProps.featuresListData.forEach(feature => {
      const featureBlock = screen.getByText(feature);
      expect(featureBlock).toBeInTheDocument();
    });
  });

  it('should observe intersection when rendered', () => {
    setup();
    expect(mockedObserve).toHaveBeenCalled();
  });

  it('should disconnect when unmounted', () => {
    const { unmount } = setup();
    unmount();
    expect(mockedDisconnect).toHaveBeenCalled();
  });
});
