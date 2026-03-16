import { motion } from 'motion/react';
import { Target, Award, Users, TrendingUp, ShieldCheck, Zap, Globe } from 'lucide-react';
import SEO from '../components/SEO';

const timeline = [
  {
    year: '2007',
    title: 'Foundation',
    description: 'P J Enterprise was established by Mr. Jigish Shah, embarking on a journey in the distribution business.',
    icon: Target,
  },
  {
    year: 'Strategic Alliance',
    title: 'Partnering with Shell',
    description: 'Swiftly emerged as a trusted distribution business, forming a strategic alliance with industry giant Shell.',
    icon: Globe,
  },
  {
    year: 'Expansion',
    title: 'Growing Territory',
    description: 'Expanded our operational territory to better serve our growing customer base across the region.',
    icon: TrendingUp,
  },
  {
    year: 'Diversification',
    title: 'Tyrolit & Grinding Solutions',
    description: 'Diversified our business lines by partnering with a world leader in grinding solutions, solidifying our presence in Gujarat and Madhya Pradesh.',
    icon: Award,
  },
  {
    year: 'Portfolio Growth',
    title: 'Quaker-Houghton & More',
    description: 'Introduced Quaker-Houghton into our portfolio and introduced Ewac-Alloys to broaden our offerings.',
    icon: ShieldCheck,
  },
  {
    year: 'Today',
    title: 'Industry Leaders',
    description: 'Proudly serving over 1500+ customers with a dedicated team of 10 qualified engineers and 5 diligent back-office professionals.',
    icon: Users,
  },
];

export default function About() {
  return (
    <div className="w-full">
      <SEO 
        title="About Us | PJ Enterprise" 
        description="Learn about the history, mission, and vision of PJ Enterprise, your trusted industrial partner since 2007."
      />
      {/* Page Header */}
      <section className="bg-slate-900 pt-32 pb-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1565514020179-026b92b84bb6?auto=format&fit=crop&q=80&w=2070"
            alt="About Us Background"
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
            About PJ Enterprise
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-slate-300 max-w-2xl mx-auto"
          >
            A legacy of excellence, built on trust, quality, and unparalleled customer service.
          </motion.p>
        </div>
      </section>

      {/* Founder's Biography */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1"
            >
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-bold mb-6">
                Founder & Visionary
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 tracking-tight">
                Mr. Jigish Shah
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                Establishing P J Enterprise at the age of 33 in 2007, Mr. Jigish Shah embarked on a journey to redefine the distribution business. With a keen eye for quality and an unwavering commitment to customer satisfaction, he has been the driving force behind the company's growth for over a decade.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                Under his leadership, P J Enterprise shifted the industry paradigm from mere product selling to true "Value-Selling." His vision was clear: to thoroughly understand the exact needs of the customer and provide tailored solutions that deliver optimal performance at the right cost. This philosophy has been instrumental in forging strong, lasting partnerships with global giants like Shell, Tyrolit, Quaker Houghton, and EWAC Alloys.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
                  JS
                </div>
                <div>
                  <div className="font-bold text-slate-900">Jigish Shah</div>
                  <div className="text-sm text-slate-500">Founder & Managing Director</div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-1 lg:order-2 relative"
            >
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl relative">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=1000" 
                  alt="Mr. Jigish Shah - Founder" 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
              </div>
              
              {/* Floating Quote Badge */}
              <div className="absolute -bottom-6 -left-6 md:-left-12 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 max-w-xs">
                <p className="text-slate-800 font-medium italic text-sm">
                  "Success is built on understanding the customer's exact needs and delivering unwavering value."
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Company Overview, Vision, Mission */}
      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="col-span-1 md:col-span-3 lg:col-span-1"
            >
              <div className="bg-blue-50 p-8 rounded-2xl h-full border border-blue-100">
                <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center text-white mb-6 shadow-lg">
                  <Globe size={28} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Who We Are</h3>
                <p className="text-slate-600 leading-relaxed">
                  Established in 2007 by Mr. Jigish Shah, P J Enterprise is a prominent distributor of industrial solutions. Operating from a spacious warehouse in GIDC Makarpura, Vadodara, we serve over 1500 customers across micro, medium, and large-scale industries, as well as infrastructure developers.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="col-span-1 md:col-span-1 lg:col-span-1"
            >
              <div className="bg-white p-8 rounded-2xl h-full border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-6">
                  <Target size={28} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h3>
                <p className="text-slate-600 leading-relaxed">
                  To thoroughly understand the exact needs of our customers before selling a product, ensuring total satisfaction. We believe in value-selling, helping customers identify the right product that delivers desired performance at an optimum cost, right up to its safe delivery.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="col-span-1 md:col-span-1 lg:col-span-1"
            >
              <div className="bg-white p-8 rounded-2xl h-full border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-6">
                  <Zap size={28} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Vision</h3>
                <p className="text-slate-600 leading-relaxed">
                  To be the most trusted and preferred partner for industrial solutions across our operative territories, continuously expanding our portfolio with world-class brands and maintaining a strong team of experienced and talented professionals.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Meet the Team Placeholder */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">Meet the Experts</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Our strength lies in our dedicated team of 10 qualified engineers and 5 diligent back-office professionals.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="text-center group">
                <div className="w-48 h-48 mx-auto rounded-full bg-slate-100 mb-6 overflow-hidden border-4 border-white shadow-lg group-hover:border-blue-50 transition-colors">
                  <img src={`https://i.pravatar.cc/150?img=${i + 10}`} alt={`Team Member ${i}`} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Expert Name</h3>
                <p className="text-brand-600 font-medium mb-2">Technical Engineer</p>
                <p className="text-sm text-slate-500 px-4">Specializing in fluid dynamics and lubrication optimization.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Journey Timeline */}
      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight"
            >
              Our Journey So Far
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg text-slate-600 leading-relaxed"
            >
              A timeline of our growth, strategic partnerships, and milestones over the past 19+ years.
            </motion.p>
          </div>

          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-blue-200 transform md:-translate-x-1/2"></div>

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative flex flex-col md:flex-row items-start ${
                    index % 2 === 0 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-4 md:left-1/2 w-10 h-10 rounded-full bg-white border-4 border-blue-500 shadow-md transform -translate-x-1/2 flex items-center justify-center z-10 mt-1 md:mt-0">
                    <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                  </div>

                  {/* Content Box */}
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12 text-left md:text-right'}`}>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow relative group">
                      <div className={`absolute top-6 ${index % 2 === 0 ? '-left-3' : '-right-3 hidden md:block'} w-6 h-6 bg-white transform rotate-45 border-b border-l border-slate-100 ${index % 2 !== 0 && 'border-t-0 border-r-0 border-b-0 border-l-0 border-t border-r'}`}></div>
                      
                      <div className={`flex items-center mb-3 ${index % 2 === 0 ? 'justify-start' : 'md:justify-end justify-start'}`}>
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-blue-50 text-blue-600 mr-4 md:mr-0 md:ml-4 order-1 md:order-none">
                          <item.icon size={20} />
                        </span>
                        <span className="text-xl font-bold text-blue-600 order-2 md:order-none">{item.year}</span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                      <p className="text-slate-600 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
