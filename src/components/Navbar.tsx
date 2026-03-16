import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Products', href: '/products' },
    { name: 'Services', href: '/services' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'pt-4 px-4 sm:px-6 lg:px-8' : 'pt-6 px-4 sm:px-6 lg:px-8'
      }`}
    >
      <div 
        className={`max-w-7xl mx-auto transition-all duration-300 rounded-2xl ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-sm border border-slate-200 py-3 px-6' 
            : 'bg-transparent py-2 px-2 sm:px-4'
        }`}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="text-2xl sm:text-3xl font-bold tracking-tighter font-display">
              <span className="text-accent">PJ</span>
              <span className={isScrolled ? "text-ink-900" : "text-white"}> </span>
              <span className="text-accent">E</span>
              <span className={isScrolled ? "text-ink-900" : "text-white"}>nterprise</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`text-base font-medium transition-colors hover:text-brand-500 ${
                  location.pathname === link.href 
                    ? 'text-brand-500' 
                    : isScrolled ? 'text-slate-600' : 'text-slate-200'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/contact"
              className={`px-6 py-2.5 rounded-full text-base font-medium transition-all shadow-md hover:shadow-lg ${
                isScrolled 
                  ? 'bg-brand-600 text-white hover:bg-brand-700 shadow-brand-600/20' 
                  : 'bg-white text-brand-600 hover:bg-slate-50'
              }`}
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-lg transition-colors ${
                isScrolled ? 'text-ink-900 hover:bg-slate-100' : 'text-white hover:bg-white/10'
              }`}
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden absolute top-full left-4 right-4 mt-2 bg-white rounded-2xl border border-slate-100 shadow-xl overflow-hidden"
          >
            <div className="px-4 pt-4 pb-6 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`block px-4 py-4 text-lg font-medium hover:text-brand-600 hover:bg-brand-50 rounded-xl flex items-center justify-between transition-colors ${
                    location.pathname === link.href ? 'text-brand-600 bg-brand-50' : 'text-slate-700'
                  }`}
                >
                  {link.name}
                  <ChevronRight size={20} className={location.pathname === link.href ? 'text-brand-600' : 'text-slate-400'} />
                </Link>
              ))}
              <div className="pt-4 px-2">
                <Link
                  to="/contact"
                  className="block w-full text-center px-6 py-4 rounded-xl text-lg font-medium bg-brand-600 text-white hover:bg-brand-700 shadow-md transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
