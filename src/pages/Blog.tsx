import { motion } from 'motion/react';
import SEO from '../components/SEO';
import { ArrowRight, Calendar, User } from 'lucide-react';

const mockPosts = [
  {
    title: "Understanding ISO Cleanliness Codes for Hydraulic Fluids",
    excerpt: "Learn how measuring and maintaining fluid cleanliness can extend equipment life by up to 3x and drastically reduce unplanned downtime.",
    date: "March 15, 2026",
    author: "Technical Team",
    category: "Technical Guide",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "The Transition to Shell Tellus S4: Is it Worth It?",
    excerpt: "A comprehensive cost-benefit analysis of upgrading your hydraulic systems to Shell's premium tier, energy-efficient fluids.",
    date: "February 28, 2026",
    author: "Jigish Shah",
    category: "Product Review",
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "5 Signs Your Grinding Wheels Need Immediate Replacement",
    excerpt: "Safety first. How to identify wear patterns on Tyrolit grinding wheels to prevent catastrophic failure in the workshop.",
    date: "February 10, 2026",
    author: "Safety Compliance",
    category: "Safety",
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=800"
  }
];

export default function Blog() {
  return (
    <div className="w-full min-h-screen bg-slate-50">
      <SEO 
        title="Industrial Resources & Blog | PJ Enterprise" 
        description="Expert insights, technical guides, and industry news for optimizing your manufacturing and industrial operations."
      />
      
      {/* Header */}
      <section className="bg-ink-900 pt-32 pb-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1581092335397-9583eb92d232?auto=format&fit=crop&q=80&w=2070')] bg-cover bg-center"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight font-display"
          >
            Insights & Resources
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-light"
          >
            Technical guides, case studies, and industry news to help you maximize operational efficiency.
          </motion.p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockPosts.map((post, index) => (
              <motion.article 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col"
              >
                <div className="relative h-56 overflow-hidden">
                  <div className="absolute inset-0 bg-brand-900/20 group-hover:bg-transparent transition-colors z-10"></div>
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 z-20">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-brand-700 text-xs font-bold rounded-full uppercase tracking-wider">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center text-xs text-slate-500 mb-4 space-x-4">
                    <span className="flex items-center"><Calendar size={14} className="mr-1" /> {post.date}</span>
                    <span className="flex items-center"><User size={14} className="mr-1" /> {post.author}</span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3 font-display leading-tight group-hover:text-brand-600 transition-colors">
                    <a href="#">{post.title}</a>
                  </h3>
                  
                  <p className="text-slate-600 mb-6 flex-grow">{post.excerpt}</p>
                  
                  <div className="mt-auto pt-6 border-t border-slate-100">
                    <a href="#" className="inline-flex items-center text-brand-600 font-medium group-hover:text-brand-700">
                      Read Article <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="mt-16 text-center">
            <button className="px-8 py-4 rounded-full border-2 border-slate-200 text-slate-600 font-bold hover:border-brand-600 hover:text-brand-600 transition-colors">
              Load More Articles
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
