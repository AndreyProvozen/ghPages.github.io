import '@testing-library/jest-dom/extend-expect';

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock IntersectionObserver
let originalIntersectionObserver;
const mockedObserve = jest.fn();
const mockedUnobserve = jest.fn();
const mockedDisconnect = jest.fn();
const mockedIntersectionObserver = jest.fn((cb, options) => ({
  observe: mockedObserve,
  unobserve: mockedUnobserve,
  disconnect: mockedDisconnect,
  ...options,
}));

// Utility function to mock IntersectionObserver
const setupMockedIntersectionObserver = () => {
  originalIntersectionObserver = window.IntersectionObserver;
  window.IntersectionObserver = mockedIntersectionObserver;
};

// Utility function to restore original IntersectionObserver
const restoreOriginalIntersectionObserver = () => {
  window.IntersectionObserver = originalIntersectionObserver;
};

// Set up mocks before all tests
beforeAll(() => {
  setupMockedIntersectionObserver();
});

// Restore original behavior after all tests
afterAll(() => {
  restoreOriginalIntersectionObserver();
});
