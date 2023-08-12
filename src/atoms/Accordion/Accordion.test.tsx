import { render, screen, fireEvent } from '@testing-library/react';

import Accordion from './Accordion';

const mockAccordionItem = [
  {
    title: 'Test title',
    description: 'Test description',
  },
];

const [{ title, description }] = mockAccordionItem;

const setup = () => {
  render(<Accordion questions={[mockAccordionItem[0]]} />);

  const titleBlock = screen.getByText(title);
  const descriptionBlock = screen.getByText(description);

  return { titleBlock, descriptionBlock };
};

describe('<Accordion/>', () => {
  it('should render correctly', () => {
    const { titleBlock, descriptionBlock } = setup();

    expect(titleBlock).toBeVisible();
    expect(descriptionBlock).toHaveClass('max-h-0');
    expect(descriptionBlock).toHaveTextContent(description);
  });

  it('should expand description when clicked', () => {
    const { titleBlock, descriptionBlock } = setup();

    fireEvent.click(titleBlock);

    expect(descriptionBlock).toHaveClass('max-h-[1000px]');
  });
});
