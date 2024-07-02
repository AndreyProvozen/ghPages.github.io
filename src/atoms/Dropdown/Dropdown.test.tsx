import { render, screen, fireEvent } from '@testing-library/react';

import ClipBoard from '@/icons/ClipBoard';

import Dropdown from './Dropdown';
import { DROPDOWN_TEST_IDS } from './testIds';

const MOCK_DROPDOWN_PROPS = {
  placeholder: <ClipBoard />,
  dropdownData: [
    { fieldTitle: 'Copy', fieldFunction: jest.fn(), fieldImage: <ClipBoard /> },
    { fieldTitle: 'Statistic', fieldFunction: jest.fn() },
    { fieldTitle: 'Delete', fieldFunction: jest.fn() },
  ],
};

const setup = () => render(<Dropdown {...MOCK_DROPDOWN_PROPS} />);

describe('<Dropdown/>', () => {
  it('should render correctly', () => {
    setup();

    const toggleButton = screen.getByTestId(DROPDOWN_TEST_IDS.TOGGLE_BUTTON);
    expect(toggleButton).toBeVisible();

    fireEvent.click(toggleButton);

    const popup = screen.getByTestId(DROPDOWN_TEST_IDS.POPUP_ROOT);
    expect(popup).toBeVisible();

    const dropdownItems = screen.getAllByTestId(DROPDOWN_TEST_IDS.POPUP_ITEM);
    expect(dropdownItems).toHaveLength(MOCK_DROPDOWN_PROPS.dropdownData.length);

    const dropdownImage = screen.getByTestId(DROPDOWN_TEST_IDS.POPUP_ITEM_IMAGE);
    expect(dropdownImage).toBeInTheDocument();

    MOCK_DROPDOWN_PROPS.dropdownData.forEach(({ fieldTitle }, index) => {
      const dropdownItem = dropdownItems[index];
      expect(dropdownItem).toBeVisible();

      const title = screen.getByText(fieldTitle);
      expect(title).toBeInTheDocument();
    });

    fireEvent.click(document.body);

    expect(popup).not.toBeInTheDocument();
  });
});
