import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Catalog from '../pages/Catalog';
import Contact from '../pages/Contact';

describe('Catalog', () => {
  it('finds a Shell grade from the family overview search', () => {
    render(<MemoryRouter initialEntries={['/catalog?brand=shell']}><Catalog /></MemoryRouter>);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Tellus S2 M 46' } });
    expect(screen.getByText('Shell Tellus S2 M 46')).toBeInTheDocument();
  });

  it('closes the enquiry modal with Escape', () => {
    render(<MemoryRouter initialEntries={['/catalog?brand=shell']}><Catalog /></MemoryRouter>);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Argina X 40' } });
    fireEvent.click(screen.getAllByText('Enquire about this product')[0]);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});

describe('Contact', () => {
  it('pre-fills subject and message from the Products page enquiry link', () => {
    render(<MemoryRouter initialEntries={['/contact?subject=sales&product=Groz']}><Contact /></MemoryRouter>);
    expect((screen.getByLabelText(/Subject/) as HTMLSelectElement).value).toBe('sales');
    expect((screen.getByLabelText(/Message/) as HTMLTextAreaElement).value).toContain('Groz');
  });
});
