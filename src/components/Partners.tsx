import { motion } from 'motion/react';
import { ShieldCheck, Award, CheckCircle2 } from 'lucide-react';

const partners = [
  {
    name: 'Shell',
    logo: '/shell-4.svg',
    description: 'Premium Industrial Lubricants',
  },
  {
    name: 'Tyrolit',
    logo: '/Tyrolit-Logo.svg-1024x421.png',
    description: 'Precision Grinding Tools',
  },
  {
    name: 'Quaker Houghton',
    logo: '/Quaker_Houghton_Logo.svg-1024x394.png',
    description: 'Advanced Metalworking Fluids',
  },
  {
    name: 'EWAC Alloys',
    logo: '/EWAC_logo-e1572510444878.webp',
    description: 'Welding Solutions',
  },
];

export default function Partners() {
  return (
    <section id="partners" className="py-24 bg-paper">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-brand-50 text-brand-600 text-sm font-semibold tracking-wide uppercase mb-6"
          >
            <span className="flex h-2 w-2 rounded-full bg-brand-600 mr-3"></span>
            Trusted Network
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-ink-900 mb-6 tracking-tight font-display"
          >
            Our Brand Partners
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-600 leading-relaxed font-light"
          >
            We collaborate with industry-leading brands to bring you the highest quality products and solutions for your manufacturing needs.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center justify-center p-8 rounded-[2rem] bg-white border border-slate-100 hover:shadow-xl hover:border-brand-100 transition-all group"
            >
              <div className="h-24 w-full flex items-center justify-center mb-6 px-4">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-full max-w-full object-contain filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h3 className="text-lg font-bold text-ink-900 mb-2 font-display text-center group-hover:text-brand-600 transition-colors">{partner.name}</h3>
              <p className="text-sm text-slate-500 text-center font-light">{partner.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 flex justify-center"
        >
          <div className="inline-flex items-center gap-4 px-6 py-4 rounded-2xl bg-white border border-slate-100 shadow-sm cursor-default">
            <div className="flex-shrink-0 w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-emerald-600" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-base font-bold text-slate-900 leading-tight mb-0.5">Shell Expert Solutions</span>
              <span className="text-sm text-slate-500 font-medium">Authorized Service Provider</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
