import { motion } from 'motion/react';
import SEO from '../components/SEO';
import { HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: "What geographical areas do you serve?",
    answer: "We primarily serve industrial clients across Gujarat and Madhya Pradesh. However, for specialized requirements and bulk orders, we can facilitate deliveries across India through our extensive logistics network."
  },
  {
    question: "Do you offer bulk pricing or enterprise discounts?",
    answer: "Yes, we offer competitive bulk pricing and customized contractual rates for long-term supply agreements. Please contact our sales team with your specific volume requirements for a tailored quote."
  },
  {
    question: "Can I get technical support for product application?",
    answer: "Absolutely. Our core philosophy is 'Value-Selling'. We have a team of 10 qualified engineers who provide on-site assessments, product recommendations, and post-sales technical support to ensure optimal performance."
  },
  {
    question: "How do I request a quote for specific Shell lubricants?",
    answer: "You can request a quote by filling out the form on our Contact page, calling our direct sales line, or emailing sales@pjenterprise.in. Please provide as much detail as possible about your machinery and current usage."
  },
  {
    question: "Are you an authorized distributor?",
    answer: "Yes, we are officially authorized distributors for global brands including Shell, Tyrolit, Quaker Houghton, and EWAC Alloys. We guarantee 100% authentic products sourced directly from the manufacturers."
  }
];

export default function FAQ() {
  return (
    <div className="w-full min-h-screen bg-slate-50 pt-32 pb-24">
      <SEO 
        title="Frequently Asked Questions (FAQ) | PJ Enterprise" 
        description="Find answers to common questions about PJ Enterprise's products, services, delivery areas, and technical support."
      />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-100 text-brand-600 mb-6">
              <HelpCircle size={32} />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight font-display">Frequently Asked Questions</h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto font-light">
              Everything you need to know about partnering with PJ Enterprise.
            </p>
          </motion.div>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200"
            >
              <h3 className="text-xl font-bold text-slate-900 mb-3 font-display">{faq.question}</h3>
              <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center bg-brand-900 rounded-3xl p-10 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-800 to-transparent opacity-50"></div>
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-4 font-display">Still have questions?</h3>
            <p className="text-brand-100 mb-8">Our expert team is ready to provide the answers you need.</p>
            <a 
              href="/contact" 
              className="inline-block px-8 py-4 bg-white text-brand-900 font-bold rounded-full hover:bg-brand-50 transition-colors shadow-lg"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
