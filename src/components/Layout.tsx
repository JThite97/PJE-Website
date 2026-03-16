import { Outlet } from 'react-router-dom';
import { MessageSquare } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

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
      <a 
        href="https://wa.me/919876543210" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-green-500/30 hover:scale-110 hover:bg-green-600 transition-all z-50 flex-shrink-0"
        aria-label="Chat with us on WhatsApp"
      >
        <MessageSquare size={28} />
      </a>
    </div>
  );
}
