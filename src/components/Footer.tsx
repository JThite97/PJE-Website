import { motion } from 'motion/react';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 lg:col-span-1">
            <Link to="/" className="text-2xl font-bold tracking-tighter text-white mb-6 block">
              <span className="text-accent">PJ</span>
              <span> </span>
              <span className="text-accent">E</span>nterprise
            </Link>
            <p className="text-sm leading-relaxed mb-6">
              Your trusted partner for premium industrial products, providing top-tier solutions to keep your operations running smoothly.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Quick Links</h3>
            <ul className="space-y-4">
              <li><Link to="/" className="hover:text-blue-400 transition-colors flex items-center"><ArrowRight size={14} className="mr-2" /> Home</Link></li>
              <li><Link to="/about" className="hover:text-blue-400 transition-colors flex items-center"><ArrowRight size={14} className="mr-2" /> About Us</Link></li>
              <li><Link to="/products" className="hover:text-blue-400 transition-colors flex items-center"><ArrowRight size={14} className="mr-2" /> Products</Link></li>
              <li><Link to="/services" className="hover:text-blue-400 transition-colors flex items-center"><ArrowRight size={14} className="mr-2" /> Services</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-1 lg:col-span-2">
            <h3 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Get In Touch</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                <div className="text-sm leading-relaxed">
                  <span className="font-semibold text-white block mb-1">Address</span>
                  113/7 GIDC Makarpura ,<br />
                  Vadodara 390010<br />
                  Gujarat, India
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" />
                <div className="text-sm">
                  <span className="font-semibold text-white mr-2">Phone No.</span>
                  <a href="tel:+919979856997" className="hover:text-white transition-colors">
                    +91-9979856997
                  </a>
                </div>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" />
                <div className="text-sm">
                  <span className="font-semibold text-white mr-2">Email</span>
                  <a href="mailto:office@pjenterprise.in" className="hover:text-white transition-colors">
                    office@pjenterprise.in
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-xs">
          <p>&copy; {new Date().getFullYear()} PJ Enterprise. All rights reserved.</p>
          <div className="mt-4 md:mt-0 space-x-4">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
