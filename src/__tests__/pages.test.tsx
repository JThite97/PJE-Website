// ✅ FIXED: Smoke tests — each page component renders without crashing
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

// Helper to render a component inside a router context
function renderWithRouter(ui: React.ReactElement, { route = '/' } = {}) {
  return render(<MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>);
}

// Import all page components
import Home from '../pages/Home';
import About from '../pages/About';
import Products from '../pages/Products';
import Services from '../pages/Services';
import Contact from '../pages/Contact';
import Privacy from '../pages/Privacy';
import Terms from '../pages/Terms';
import FAQ from '../pages/FAQ';
import Blog from '../pages/Blog';
import NotFound from '../pages/NotFound';

describe('Page Smoke Tests', () => {
  it('Home renders without crashing', () => {
    renderWithRouter(<Home />);
    expect(document.title).toContain('PJ Enterprise');
  });

  it('About renders without crashing', () => {
    renderWithRouter(<About />);
    expect(document.title).toContain('About');
  });

  it('Products renders without crashing', () => {
    renderWithRouter(<Products />);
    expect(document.title).toContain('Products');
  });

  it('Services renders without crashing', () => {
    renderWithRouter(<Services />);
    expect(document.title).toContain('Services');
  });

  it('Contact renders without crashing', () => {
    renderWithRouter(<Contact />);
    expect(document.title).toContain('Contact');
  });

  it('Privacy renders without crashing', () => {
    renderWithRouter(<Privacy />);
    expect(document.title).toContain('Privacy');
  });

  it('Terms renders without crashing', () => {
    renderWithRouter(<Terms />);
    expect(document.title).toContain('Terms');
  });

  it('FAQ renders without crashing', () => {
    renderWithRouter(<FAQ />);
    expect(document.title).toContain('FAQ');
  });

  it('Blog renders without crashing', () => {
    renderWithRouter(<Blog />);
    expect(document.title).toContain('Blog');
  });

  it('NotFound (404) renders without crashing', () => {
    renderWithRouter(<NotFound />);
    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
  });
});
