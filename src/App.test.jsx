import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Value Stream Mapping App title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Value Stream Mapping App/i);
  expect(titleElement).toBeInTheDocument();
});
