import { fireEvent, render, screen } from '@testing-library/react';

import Drover from './Drover';
import { DROVER_TEST_IDS } from './testIds';

const droverProps = {
  menu: [
    { name: 'Home', link: '/' },
    {
      name: 'Links',
      link: '/links',
    },
    {
      name: 'My profile',
      children: [
        {
          name: 'Favorite links',
          handleFunction: jest.fn(),
        },
        {
          name: 'Sign out',
          handleFunction: jest.fn(),
        },
      ],
    },
  ],
  isOpen: false,
  handleToggle: jest.fn(),
};

const setup = (props = {}) => render(<Drover {...droverProps} {...props} />);

describe('<Drover/>', () => {
  it('renders closed Drover', () => {
    setup();
    const droverRoot = screen.getByTestId(DROVER_TEST_IDS.ROOT);

    expect(droverRoot).toHaveClass('right-full');
  });

  it('renders open Drover', () => {
    setup({ isOpen: true });
    const droverRoot = screen.getByTestId(DROVER_TEST_IDS.ROOT);

    expect(droverRoot).toHaveClass('right-0');
  });

  it('calls handleToggle when button is clicked', () => {
    setup({ isOpen: true });
    const closeButton = screen.getByTestId(DROVER_TEST_IDS.CLOSE_BUTTON);

    expect(closeButton).not.toBeDisabled();
    closeButton.click();
    expect(droverProps.handleToggle).toHaveBeenCalled();
  });

  it('navigates to submenu and back on button click', () => {
    setup({ isOpen: true });

    const submenuButton = screen.getByText('My profile');
    fireEvent.click(submenuButton);

    const backButton = screen.getByText('back');
    expect(backButton).toBeInTheDocument();

    fireEvent.click(backButton);

    const homeButton = screen.getByText('Home');
    expect(homeButton).toBeInTheDocument();
  });
});
