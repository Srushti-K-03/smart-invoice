import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Smart Invoice header', () => {
  render(<App />);
  const headerElement = screen.getByText(/Smart Invoice/i);
  expect(headerElement).toBeInTheDocument();
});