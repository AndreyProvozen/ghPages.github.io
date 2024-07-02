import { render, screen, fireEvent } from '@testing-library/react';

import Accordion from './Accordion';

const MOCK_ACCORDION_ITEM = [{ title: 'Test title', description: 'Test description' }];
const [{ title, description }] = MOCK_ACCORDION_ITEM;

const setup = () => render(<Accordion questions={[MOCK_ACCORDION_ITEM[0]]} />);

describe('<Accordion/>', () => {
  it('should render correctly', () => {
    setup();

    const titleBlock = screen.getByText(title);
    const descriptionBlock = screen.getByText(description);

    expect(titleBlock).toBeVisible();
    expect(descriptionBlock).toHaveClass('max-h-0');
    expect(descriptionBlock).toHaveTextContent(description);

    fireEvent.click(titleBlock);

    expect(descriptionBlock).toHaveClass('max-h-[1000px]');
  });
});
