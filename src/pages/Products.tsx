import { useState } from 'react';
import { motion } from 'motion/react';
import { Download, MessageCircle, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const productBrands = [
  {
    name: 'Shell',
    description: 'Premium industrial lubricants, hydraulic fluids, and gear oils engineered for ultimate equipment protection.',
    logo: '/shell-4.svg',
    catalogUrl: '/catalog?brand=Shell',
    catalogType: 'page',
  },
  {
    name: 'Tyrolit',
    description: 'World-leading precision tools for grinding, cut-off, sawing, and drilling applications.',
    logo: '/Tyrolit-Logo.svg-1024x421.png',
    catalogUrl: '/catalog?brand=Tyrolit',
    catalogType: 'page',
  },
  {
    name: 'Quaker Houghton',
    description: 'Advanced metalworking fluids, coolants, and cleaners for optimum manufacturing performance.',
    logo: '/Quaker_Houghton_Logo.svg-1024x394.png',
    catalogUrl: '/PJ_Enterprise_Catalog/Quaker_Houghton_Catalog.pdf',
    catalogType: 'pdf',
  },
  {
    name: 'EWAC Alloys',
    description: 'Specialized welding solutions, protective coatings, and wear-resistant materials.',
    logo: '/EWAC_logo-e1572510444878.webp',
    catalogUrl: '/PJ_Enterprise_Catalog/EWAC_Alloys_Catalog.pdf',
    catalogType: 'pdf',
  },
  {
    name: 'Groz',
    description: 'Professional tools and equipment for lubrication, fluid handling, and precision engineering.',
    logo: '/groz-logo.svg',
    catalogUrl: '/PJ_Enterprise_Catalog/Groz_Catalog.pdf',
    catalogType: 'pdf',
  },
];

export default function Products() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBrands = productBrands.filter((brand) => {
    const q = searchQuery.toLowerCase();
    return brand.name.toLowerCase().includes(q) || brand.description.toLowerCase().includes(q);
  });

  return (
    <div className="w-full min-h-screen bg-slate-50">
      <SEO 
        title="Shell Oil, Tyrolit & Industrial Products | PJ Enterprise Vadodara" 
        description="Authorized Shell lubricants, Tyrolit grinding tools, Quaker Houghton metalworking fluids & EWAC welding alloys. Buy industrial products in Vadodara, Gujarat."
        path="/products"
      />
      {/* Page Header */}
      <section className="bg-slate-900 pt-32 pb-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=2070"
            alt="Products Background"
            className="w-full h-full object-cover opacity-20"
            loading="eager"
            fetchPriority="high"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight"
          >
            Our Products
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-slate-300 max-w-2xl mx-auto"
          >
            Explore our comprehensive range of premium industrial solutions from authorized world-leading brands.
          </motion.p>
        </div>
      </section>

      {/* Product Catalogs */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 md:mb-0">Brand Catalogs</h2>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input 
                type="text"
                id="brand-search"
                aria-label="Search products or brands"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products or brands..."
                className="w-full md:w-80 pl-9 pr-4 py-2 rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          {filteredBrands.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
              <Search size={40} className="mx-auto text-slate-300 mb-4" />
              <h3 className="text-lg font-bold text-slate-700">No brands found</h3>
              <p className="text-slate-500 mt-1">Try a different search term.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredBrands.map((brand, index) => (
                <motion.div
                  key={brand.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col sm:flex-row items-center p-8 hover:shadow-md transition-shadow group"
                >
                  <div className="w-full sm:w-1/3 h-32 flex items-center justify-center mb-6 sm:mb-0 sm:pr-8 border-b sm:border-b-0 sm:border-r border-slate-100">
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="max-h-full max-w-full object-contain"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                  </div>
                  <div className="w-full sm:w-2/3 sm:pl-8 flex flex-col justify-between h-full text-center sm:text-left">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-2">{brand.name}</h3>
                      <p className="text-slate-600 mb-6 text-sm">{brand.description}</p>
                    </div>
                    
                    {brand.catalogType === 'page' && (
                      <Link
                        to={brand.catalogUrl}
                        className="inline-flex items-center justify-center sm:justify-start text-brand-600 font-bold hover:text-brand-700 transition-colors"
                      >
                        <Download size={18} className="mr-2" />
                        View Full Catalog
                      </Link>
                    )}
                    {brand.catalogType === 'pdf' && (
                      <div className="flex flex-col sm:flex-row gap-4">
                        <a
                          href={brand.catalogUrl}
                          download
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center sm:justify-start text-brand-600 font-bold hover:text-brand-700 transition-colors"
                        >
                          <Download size={18} className="mr-2" />
                          Download Catalog PDF
                        </a>
                        <Link
                          to={`/contact?subject=sales&product=${encodeURIComponent(brand.name)}`}
                          className="inline-flex items-center justify-center sm:justify-start text-slate-500 font-medium hover:text-brand-600 transition-colors ml-0 sm:ml-4 mt-2 sm:mt-0"
                        >
                          <MessageCircle size={16} className="mr-1.5" />
                          Enquire
                        </Link>
                      </div>
                    )}
                    {brand.catalogType === 'none' && (
                      <Link
                        to={brand.catalogUrl}
                        className="inline-flex items-center justify-center sm:justify-start text-amber-600 font-bold hover:text-amber-700 transition-colors"
                      >
                        <MessageCircle size={18} className="mr-2" />
                        Enquire About Products
                      </Link>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          <div className="mt-16 bg-blue-50 rounded-2xl p-8 md:p-12 text-center border border-blue-100">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Looking for a specific product?</h3>
            <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
              Our engineering team can help you source the exact industrial solution you need. We have access to thousands of SKUs across our authorized partner networks.
            </p>
            <Link to="/contact" className="inline-block px-8 py-3 bg-brand-600 text-white font-bold rounded-full hover:bg-brand-700 transition-colors shadow-lg">
              Contact Sales Team
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
}
