import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';
import SEO from '../components/SEO';

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission to third-party endpoint
    const form = e.target as HTMLFormElement;
    
    // In production, this would be an actual fetch to Formspree or EmailJS
    // fetch('https://formspree.io/f/placeholder', { method: 'POST', body: new FormData(form) })
    
    setIsSubmitted(true);
    form.reset();
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <div className="w-full min-h-screen bg-slate-50">
      <SEO 
        title="Contact Us | PJ Enterprise" 
        description="Get in touch with the industrial experts at PJ Enterprise. Request quotes, technical support, or consultation."
      />
      {/* Page Header */}
      <section className="bg-slate-900 pt-32 pb-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1587560699334-cc4ff634909a?auto=format&fit=crop&q=80&w=2070"
            alt="Contact Us Background"
            className="w-full h-full object-cover opacity-20"
            loading="lazy"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-slate-300 max-w-2xl mx-auto"
          >
            Get in touch with our experts for inquiries, quotes, or technical support.
          </motion.p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Left Column: Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Get In Touch</h2>
              <p className="text-slate-600 mb-10 leading-relaxed">
                Whether you need a specific product, technical consultation, or want to discuss a long-term partnership, our team is ready to assist you. Reach out to us using the details below or fill out the contact form.
              </p>

              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mt-1">
                    <MapPin size={24} />
                  </div>
                  <div className="ml-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-1">Head Office & Warehouse</h3>
                    <p className="text-slate-600">
                      113/7 GIDC Makarpura ,<br />
                      Vadodara 390010<br />
                      Gujarat, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mt-1">
                    <Phone size={24} />
                  </div>
                  <div className="ml-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-1">Phone</h3>
                    <p className="text-slate-600">
                      +91-9979856997
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mt-1">
                    <Mail size={24} />
                  </div>
                  <div className="ml-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-1">Email</h3>
                    <p className="text-slate-600">
                      office@pjenterprise.in
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mt-1">
                    <Clock size={24} />
                  </div>
                  <div className="ml-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-1">Business Hours</h3>
                    <p className="text-slate-600">
                      Monday - Saturday: 9:00 AM - 6:30 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 md:p-14 rounded-3xl shadow-2xl border border-slate-100"
            >
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Send us a Message</h3>
              
              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center"
                >
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={32} />
                  </div>
                  <h4 className="text-xl font-bold text-emerald-800 mb-2">Message Sent!</h4>
                  <p className="text-emerald-600">
                    Thank you for reaching out. One of our representatives will get back to you shortly.
                  </p>
                </motion.div>
              ) : (
                <form 
                  onSubmit={handleSubmit} 
                  className="space-y-6"
                  action="https://formspree.io/f/placeholder"
                  method="POST"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-slate-700 mb-2">First Name *</label>
                      <input 
                        type="text" 
                        name="first_name"
                        id="firstName" 
                        required
                        className="w-full px-0 py-3 bg-transparent border-0 border-b border-slate-300 focus:ring-0 focus:border-brand-electric rounded-none outline-none transition-all text-slate-900 placeholder:text-slate-400"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-slate-700 mb-2">Last Name *</label>
                      <input 
                        type="text" 
                        name="last_name"
                        id="lastName" 
                        required
                        className="w-full px-0 py-3 bg-transparent border-0 border-b border-slate-300 focus:ring-0 focus:border-brand-electric rounded-none outline-none transition-all text-slate-900 placeholder:text-slate-400"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-2">Company Name</label>
                    <input 
                      type="text" 
                      name="company"
                      id="company" 
                      className="w-full px-0 py-3 bg-transparent border-0 border-b border-slate-300 focus:ring-0 focus:border-brand-electric rounded-none outline-none transition-all text-slate-900 placeholder:text-slate-400"
                      placeholder="Your Company Ltd."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">Email Address *</label>
                      <input 
                        type="email" 
                        name="email"
                        id="email" 
                        required
                        className="w-full px-0 py-3 bg-transparent border-0 border-b border-slate-300 focus:ring-0 focus:border-brand-electric rounded-none outline-none transition-all text-slate-900 placeholder:text-slate-400"
                        placeholder="john@company.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
                      <input 
                        type="tel" 
                        name="phone"
                        id="phone" 
                        className="w-full px-0 py-3 bg-transparent border-0 border-b border-slate-300 focus:ring-0 focus:border-brand-electric rounded-none outline-none transition-all text-slate-900 placeholder:text-slate-400"
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-2">Subject *</label>
                    <select 
                      id="subject" 
                      name="subject"
                      required
                      className="w-full px-0 py-3 bg-transparent border-0 border-b border-slate-300 focus:ring-0 focus:border-brand-electric rounded-none outline-none transition-all text-slate-900 placeholder:text-slate-400"
                    >
                      <option value="">Select a subject...</option>
                      <option value="sales">Sales Inquiry</option>
                      <option value="support">Technical Support</option>
                      <option value="partnership">Partnership Opportunities</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">Message *</label>
                    <textarea 
                      id="message" 
                      name="message"
                      required
                      rows={4}
                      className="w-full px-0 py-3 bg-transparent border-0 border-b border-slate-300 focus:ring-0 focus:border-brand-electric rounded-none outline-none transition-all text-slate-900 placeholder:text-slate-400 resize-none"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-4 px-6 rounded-[50px] bg-brand-600 hover:bg-brand-electric hover:text-ink-900 text-white font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-[0_0_15px_var(--color-brand-electric)]"
                  >
                    <Send size={20} />
                    Send Message
                  </button>
                </form>
              )}
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
}
