import { render, screen } from '@testing-library/react';

import ModalWrapper from './ModalWrapper';

const MOCK_CHILDREN_TEXT = 'children test text';

const MOCK_MODAL_WRAPPER_PROPS = {
  setIsModalOpen: jest.fn(),
  title: 'Test title',
  children: <p>{MOCK_CHILDREN_TEXT}</p>,
  onConfirm: jest.fn(),
};

jest.useFakeTimers();
jest.spyOn(global, 'setTimeout');

const setup = () => render(<ModalWrapper {...MOCK_MODAL_WRAPPER_PROPS} />);

describe('<ModalWrapper/>', () => {
  it('should render correctly', () => {
    setup();

    const title = screen.getByText(MOCK_MODAL_WRAPPER_PROPS.title);
    const children = screen.getByText(MOCK_CHILDREN_TEXT);

    expect(document.body.classList.contains('overflow-hidden')).toBeTruthy();
    expect(title).toBeVisible();
    expect(children).toBeVisible();
  });
});
