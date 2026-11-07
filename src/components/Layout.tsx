import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingWA from './FloatingWA';

export default function Layout() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-500/30 flex flex-col relative">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-white focus:text-blue-600 top-0 left-0">Skip to main content</a>
      <Navbar />
      <main id="main-content" className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      
      {/* Floating WhatsApp Widget */}
      <FloatingWA />
    </div>
  );
}
