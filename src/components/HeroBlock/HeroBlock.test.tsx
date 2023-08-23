import { render, screen } from '@testing-library/react';

import HeroBlock from './HeroBlock';

const heroBlockProps = {
  bgSrc: '/background-image.jpg',
  bgAlt: 'Background',
  title: 'Welcome to My Website',
  subTitle: 'Discover amazing things...',
};

const setup = () => render(<HeroBlock {...heroBlockProps} />);

jest.mock('next-auth/react', () => {
  const originalModule = jest.requireActual('next-auth/react');
  const mockSession = {
    expires: new Date(Date.now() + 2 * 86400).toISOString(),
    user: { username: 'admin' },
  };
  return {
    __esModule: true,
    ...originalModule,
    useSession: jest.fn(() => {
      return { data: mockSession, status: 'authenticated' };
    }),
  };
});

jest.mock('next/router', () => ({
  useRouter() {
    return {
      query: '',
      push: jest.fn(),
    };
  },
}));

describe('<HeroBlock />', () => {
  it('renders component with correct content', () => {
    setup();

    const title = screen.getByText(heroBlockProps.title);
    expect(title).toBeInTheDocument();

    const subTitle = screen.getByText(heroBlockProps.subTitle);
    expect(subTitle).toBeInTheDocument();

    const backgroundImage = screen.getByAltText(heroBlockProps.bgAlt);
    expect(backgroundImage).toBeInTheDocument();
  });
});
