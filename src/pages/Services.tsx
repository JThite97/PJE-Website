import { motion } from 'motion/react';
import { 
  Activity, 
  Recycle, 
  GraduationCap, 
  Wrench, 
  Settings, 
  ClipboardList, 
  Wifi, 
  Cpu, 
  MessageCircle, 
  ShieldCheck, 
  Video, 
  Search,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import SEO from '../components/SEO';

const shellServices = [
  {
    title: 'Shell LubeAnalyst',
    description: 'Advanced oil condition monitoring service that helps you ensure your equipment and lubricants are in optimum working order.',
    icon: Activity,
  },
  {
    title: 'Shell Waste Oil Management',
    description: 'Environmentally responsible disposal and recycling of used lubricants to meet regulatory compliance and sustainability goals.',
    icon: Recycle,
  },
  {
    title: 'Shell LubeCoach',
    description: 'Comprehensive training programs designed to empower your team with expert lubrication knowledge and best practices.',
    icon: GraduationCap,
  },
  {
    title: 'Shell LubeAdvisor',
    description: 'Expert technical support and on-site assessments to help you select the right lubricants and improve maintenance practices.',
    icon: Wrench,
  },
  {
    title: 'Shell LubeOptimiser',
    description: 'Advanced fluid management and filtration services to maintain fluid cleanliness, reduce wear, and extend equipment life.',
    icon: Settings,
  },
  {
    title: 'Shell Lubricants Management Program',
    description: 'End-to-end lubrication management solutions tailored to streamline your operations and reduce Total Cost of Ownership (TCO).',
    icon: ClipboardList,
  },
  {
    title: 'MachineMax Wireless Telematics',
    description: 'Revolutionary equipment tracking and telematics to maximize fleet utilization, reduce idling, and boost profitability.',
    icon: Wifi,
  },
  {
    title: 'Shell Remote Sense',
    description: 'Smart, real-time oil condition monitoring using advanced sensors for predictive maintenance and reduced downtime.',
    icon: Cpu,
  },
  {
    title: 'Shell LubeChat',
    description: 'AI-powered digital assistant providing instant, 24/7 access to Shell\'s extensive lubrication knowledge base and product data.',
    icon: MessageCircle,
  },
  {
    title: 'Shell LubeExpert',
    description: 'Specialized on-site support for critical applications, complex problem-solving, and major equipment overhauls.',
    icon: ShieldCheck,
  },
  {
    title: 'Shell LubeVideoCheck',
    description: 'High-tech fiber-optic inspections to assess internal engine conditions without the need for costly equipment dismantling.',
    icon: Video,
  },
  {
    title: 'Shell LubeMatch',
    description: 'An intuitive online tool to instantly find the right lubricant recommendations for your specific vehicles and machinery.',
    icon: Search,
  },
];

export default function Services() {
  return (
    <div className="w-full min-h-screen bg-paper">
      <SEO 
        title="Technical Services | PJ Enterprise" 
        description="Expert technical support, oil condition monitoring, and value-added industrial services to maximize your operational efficiency."
      />
      {/* Page Header - Dark Immersive */}
      <section className="bg-ink-900 pt-32 pb-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=2070"
            alt="Services Background"
            className="w-full h-full object-cover opacity-20"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink-900/80 to-ink-900"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight font-display"
          >
            Our Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-light"
          >
            Expert technical support and value-added services to maximize your operational efficiency.
          </motion.p>
        </div>
      </section>

      {/* Shell Services - Split Layout with Sticky Image */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            
            {/* Left Content - Services List */}
            <div className="lg:w-3/5">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-12"
              >
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-yellow-50 border border-yellow-200 text-yellow-700 text-sm font-bold mb-6">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/en/thumb/e/e8/Shell_logo.svg/120px-Shell_logo.svg.png" 
                    alt="Shell" 
                    className="h-4 mr-2"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  Shell Services Portfolio
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-ink-900 mb-6 tracking-tight font-display">
                  Maximizing Performance with Shell Expertise
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed font-light">
                  As an authorized distributor of Shell lubricants, we offer more than just products. We provide a comprehensive suite of technical services designed to help you get the most out of your machinery, reduce downtime, and lower your total cost of ownership.
                </p>
              </motion.div>

              <div className="space-y-6">
                {shellServices.map((service, index) => (
                  <motion.div 
                    key={index} 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="flex items-start p-6 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 group"
                  >
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600 shadow-sm group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
                        <service.icon size={24} strokeWidth={1.5} />
                      </div>
                    </div>
                    <div className="ml-6">
                      <h4 className="text-xl font-bold text-ink-900 mb-2 font-display">{service.title}</h4>
                      <p className="text-slate-600 leading-relaxed font-light">{service.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Content - Sticky Image */}
            <div className="lg:w-2/5 sticky top-32 hidden lg:block">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl relative">
                  <img 
                    src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&q=80&w=1000" 
                    alt="Shell Services" 
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-brand-900/40 to-transparent mix-blend-multiply"></div>
                </div>
                
                {/* Floating Badge */}
                <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-ink-900">Shell Expert Solutions</div>
                    <div className="text-xs text-slate-500">Technical Services</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-ink-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=2070')] bg-cover bg-center mix-blend-luminosity"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 font-display">Ready to optimize your operations?</h2>
          <p className="text-xl text-slate-300 mb-10 font-light max-w-2xl mx-auto">
            Contact our technical experts today to discuss which Shell services can bring the most value to your specific industry applications.
          </p>
          <a 
            href="/contact" 
            className="inline-flex items-center px-8 py-4 rounded-[50px] bg-brand-600 text-white font-medium hover:bg-brand-electric hover:text-ink-900 transition-all shadow-md hover:shadow-[0_0_15px_var(--color-brand-electric)]"
          >
            Consult an Expert
            <ArrowRight className="ml-2" size={20} />
          </a>
        </div>
      </section>
    </div>
  );
}
