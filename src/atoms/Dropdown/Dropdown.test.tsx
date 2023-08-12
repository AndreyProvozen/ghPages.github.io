import { render, screen, fireEvent } from '@testing-library/react';

import ClipBoard from '@/icons/svg/ClipBoard';
import ThreeDots from '@/icons/svg/ThreeDots';

import Dropdown from './Dropdown';
import { DROPDOWN_TEST_IDS } from './testIds';

const mockDropdownProps = {
  placeholder: <ThreeDots />,
  dropdownData: [
    {
      fieldTitle: 'Copy',
      fieldFunction: jest.fn(),
      fieldImage: <ClipBoard />,
    },
    {
      fieldTitle: 'Statistic',
      fieldFunction: jest.fn(),
    },
    {
      fieldTitle: 'Delete',
      fieldFunction: jest.fn(),
    },
  ],
};

const setup = () => render(<Dropdown {...mockDropdownProps} />);

describe('<Accordion/>', () => {
  it('should render correctly', () => {
    setup();

    const toggleButton = screen.getByTestId(DROPDOWN_TEST_IDS.TOGGLE_BUTTON);
    expect(toggleButton).toBeVisible();

    fireEvent.click(toggleButton);

    const popup = screen.getByTestId(DROPDOWN_TEST_IDS.POPUP_ROOT);
    expect(popup).toBeVisible();

    const dropdownItems = screen.getAllByTestId(DROPDOWN_TEST_IDS.POPUP_ITEM);
    expect(dropdownItems).toHaveLength(mockDropdownProps.dropdownData.length);

    const dropdownImage = screen.getByTestId(DROPDOWN_TEST_IDS.POPUP_ITEM_IMAGE);
    expect(dropdownImage).toBeInTheDocument();

    mockDropdownProps.dropdownData.forEach(({ fieldTitle }, index) => {
      const dropdownItem = dropdownItems[index];
      expect(dropdownItem).toBeVisible();

      const title = screen.getByText(fieldTitle);
      expect(title).toBeInTheDocument();
    });

    fireEvent.click(document.body);

    expect(popup).not.toBeInTheDocument();
  });
});
