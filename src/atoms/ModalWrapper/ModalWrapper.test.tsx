import { render, screen } from '@testing-library/react';

import ModalWrapper from './ModalWrapper';

const childrenText = 'children test text';

const modalWrapperProps = {
  setIsModalOpen: jest.fn(),
  title: 'Test title',
  children: <p>{childrenText}</p>,
  onConfirm: jest.fn(),
};

jest.useFakeTimers();
jest.spyOn(global, 'setTimeout');

const setup = () => render(<ModalWrapper {...modalWrapperProps} />);

describe('<ModalWrapper/>', () => {
  it('should render correctly', () => {
    setup();
    const title = screen.getByText(modalWrapperProps.title);
    const children = screen.getByText(childrenText);

    expect(document.body.classList.contains('overflow-hidden')).toBeTruthy();
    expect(title).toBeVisible();
    expect(children).toBeVisible();
  });
});
