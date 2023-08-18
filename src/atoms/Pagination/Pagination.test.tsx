import { render, screen } from '@testing-library/react';

import Pagination from './Pagination';
import { PAGINATION_TEST_IDS } from './testIds';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      query: '',
      push: jest.fn(),
    };
  },
}));

describe('Pagination', () => {
  it('disables prev button on the first page', () => {
    render(<Pagination perPage={10} count={100} />);
    const prevButton = screen.getByTestId(PAGINATION_TEST_IDS.PREV_BUTTON);

    expect(screen.getByText('Page 1 of 10')).toBeInTheDocument();
    expect(screen.getByText('Prev')).toBeInTheDocument();
    expect(prevButton).toBeDisabled();
  });
  it('disables next button on the last page', () => {
    render(<Pagination perPage={10} count={10} />);
    const nextButton = screen.getByTestId(PAGINATION_TEST_IDS.NEXT_BUTTON);

    expect(screen.getByText('Next')).toBeInTheDocument();
    expect(nextButton).toBeDisabled();
  });
});
