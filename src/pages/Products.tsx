import { motion } from 'motion/react';
import { Download } from 'lucide-react';
import SEO from '../components/SEO';

const productBrands = [
  {
    name: 'Shell',
    description: 'Premium industrial lubricants, hydraulic fluids, and gear oils engineered for ultimate equipment protection.',
    logo: '/shell-4.svg',
    catalogUrl: '/catalog?brand=Shell',
  },
  {
    name: 'Tyrolit',
    description: 'World-leading precision tools for grinding, cut-off, sawing, and drilling applications.',
    logo: '/Tyrolit-Logo.svg-1024x421.png',
    catalogUrl: '/catalog?brand=Tyrolit',
  },
  {
    name: 'Quaker Houghton',
    description: 'Advanced metalworking fluids, coolants, and cleaners for optimum manufacturing performance.',
    logo: '/Quaker_Houghton_Logo.svg-1024x394.png',
    catalogUrl: '#',
  },
  {
    name: 'EWAC Alloys',
    description: 'Specialized welding solutions, protective coatings, and wear-resistant materials.',
    logo: '/EWAC_logo-e1572510444878.webp',
    catalogUrl: '#',
  },
];

export default function Products() {
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
              <input 
                type="text" 
                placeholder="Search products or brands..." 
                className="w-full md:w-80 px-4 py-2 rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {productBrands.map((brand, index) => (
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
                  
                  <a 
                    href={brand.catalogUrl}
                    className="inline-flex items-center justify-center sm:justify-start text-brand-600 font-bold hover:text-brand-700 transition-colors"
                  >
                    <Download size={18} className="mr-2" />
                    View Full Catalog
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 bg-blue-50 rounded-2xl p-8 md:p-12 text-center border border-blue-100">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Looking for a specific product?</h3>
            <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
              Our engineering team can help you source the exact industrial solution you need. We have access to thousands of SKUs across our authorized partner networks.
            </p>
            <a href="/contact" className="inline-block px-8 py-3 bg-brand-600 text-white font-bold rounded-full hover:bg-brand-700 transition-colors shadow-lg">
              Contact Sales Team
            </a>
          </div>

        </div>
      </section>
    </div>
  );
}
