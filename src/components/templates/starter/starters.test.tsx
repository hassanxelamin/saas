import { render, screen } from '@testing-library/react';
import { Starter } from '@/src/components';

describe('Starters Component', () => {
  test('renders Starter component and checks the text content', () => {
    render(<Starter />);
    const element = screen.getByText(/Starter/i);
    expect(element).toBeInTheDocument();
  });
});
