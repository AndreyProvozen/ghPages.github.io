import { render, screen } from '@testing-library/react';

import InfoBlock from './InfoBlock';

const infoBlockProps = {
  btnHref: '/test-link',
  btnText: 'Button Text',
  title: 'Info Title',
};

describe('<InfoBlock />', () => {
  it('renders InfoBlock component with correct props', () => {
    render(<InfoBlock {...infoBlockProps} />);

    const titleElement = screen.getByText(infoBlockProps.title);
    expect(titleElement).toBeInTheDocument();

    const buttonElement = screen.getByRole('link', { name: infoBlockProps.btnText });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveAttribute('href', infoBlockProps.btnHref);
  });
});
