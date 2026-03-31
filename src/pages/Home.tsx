import { ArrowRight, ChevronDown, Quote, Factory, Building2, Truck, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';
import Partners from '../components/Partners';
import SEO from '../components/SEO';
import ScrollReveal from '../components/ScrollReveal';

const testimonials = [
  {
    name: 'Thomas Smith',
    text: 'This is due to their excellent service, competitive pricing, and technical support. Working with PJ Enterprise has been thoroughly refreshing since they truly prioritize a personal touch.',
  },
  {
    name: 'Thomas Alba',
    text: 'Their deep knowledge of industrial lubricants saved us significant downtime. I highly recommend their value-selling approach and dedication to customer success.',
  },
  {
    name: 'Ernest Smith',
    text: 'Outstanding delivery times and product quality. PJ Enterprise consistently goes above and beyond to ensure our manufacturing operations never skip a beat.',
  },
];

const industries = [
  { name: 'Manufacturing', icon: Factory },
  { name: 'Infrastructure', icon: Building2 },
  { name: 'Automotive', icon: Truck },
  { name: 'Heavy Machinery', icon: Wrench },
];

export default function Home() {
  return (
    <div className="w-full">
      {/* ✅ FIXED: Local SEO keywords for Vadodara visibility */}
      <SEO 
        title="PJ Enterprise | Shell Lubricants Distributor in Vadodara, Gujarat"
        description="Authorized Shell oil distributor in Vadodara. Premium industrial lubricants, Tyrolit grinding tools, Quaker Houghton fluids & EWAC welding solutions. 19+ years serving Gujarat & MP."
        path="/"
      />
      {/* Hero Section - Dark Immersive */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-ink-900">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2070"
            alt="Industrial Background"
            className="w-full h-full object-cover opacity-30"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink-900/90 via-ink-900/60 to-ink-900"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-20">
          <ScrollReveal delay={0} className="inline-flex items-center px-4 py-2 rounded-[50px] bg-white/10 border border-white/20 text-white text-sm font-medium mb-8 backdrop-blur-sm eyebrow">
            <span className="flex h-2 w-2 rounded-[50px] bg-brand-electric mr-2 animate-pulse shadow-[0_0_8px_var(--color-brand-electric)]"></span>
            Precision Industrial Solutions
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6 font-display">
              Powering Industry <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-brand-electric drop-shadow-sm">
                With Value Selling
              </span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-300 mb-10 leading-relaxed font-light">
              Your trusted partner for premium industrial products. We provide top-tier solutions including Shell lubricants and Tyrolit precision tools to keep your operations running smoothly.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={300} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/products"
              className="w-full sm:w-auto px-8 py-4 rounded-[50px] bg-brand-600 text-white font-medium hover:bg-brand-electric hover:text-ink-900 transition-all shadow-[0_0_15px_rgba(0,82,255,0.4)] hover:shadow-[0_0_20px_var(--color-brand-electric)] flex items-center justify-center group"
            >
              Explore Solutions
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </Link>
            <Link
              to="/about"
              className="w-full sm:w-auto px-8 py-4 rounded-[50px] bg-white/10 border border-white/10 text-white font-medium hover:bg-white/20 hover:border-white/30 backdrop-blur-sm transition-all flex items-center justify-center"
            >
              Our Story
            </Link>
          </ScrollReveal>
        </div>

        <ScrollReveal
          delay={1000}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 animate-bounce"
        >
          <a href="#about-company" className="text-slate-400 hover:text-brand-electric transition-colors">
            <ChevronDown size={32} />
          </a>
        </ScrollReveal>
      </section>

      {/* About Founder & Company Section */}
      <section id="about-company" className="py-24 bg-white relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 z-0"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal delay={0}>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 tracking-tight">
                Our Foundation & Vision
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                Founded in 2007 by Mr. Jigish Shah, P J Enterprise has established itself as a premier distributor in the industrial sector. Over the past 19+ years, under his visionary leadership, we have forged enduring partnerships with global manufacturing giants including Shell, Tyrolit, Quaker Houghton, and EWAC Alloys.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                We specialize in delivering targeted industrial solutions, offering a comprehensive range of products for lubrication, metalworking, grinding, welding, and tooling applications. Operating from our state-of-the-art warehouse in GIDC Makarpura, Vadodara, we are strategically positioned to serve our clients with unmatched efficiency.
              </p>
              <div className="bg-slate-50 border-l-2 border-brand-electric p-6">
                <p className="text-slate-800 font-medium italic">
                  "Our core philosophy is 'Value-Selling'—we don't just sell products; we partner with you to understand your exact requirements. From identifying the optimal product that maximizes performance and minimizes cost, to ensuring its safe and timely delivery, our team of seasoned professionals is dedicated to your total satisfaction."
                </p>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={200} className="relative">
              <div className="aspect-[4/3] rounded-sm overflow-hidden border border-slate-200">
                <img 
                  src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=1000" 
                  alt="Industrial Warehouse" 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-ink-900 p-6 shadow-xl border border-white/10 hidden md:block">
                <div className="text-4xl font-bold text-brand-electric mb-1">19+</div>
                <div className="eyebrow text-slate-300 uppercase tracking-wider text-xs">Years of Excellence</div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Brand Partners */}
      <Partners />

      {/* Industries Served */}
      <section className="py-24 bg-ink-900 text-white relative border-t border-white/10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 z-0"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <ScrollReveal delay={0}>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight font-display">
                Industries We Serve
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <p className="text-lg text-slate-400 leading-relaxed font-light">
                Our comprehensive solutions cater to a diverse range of industrial sectors, ensuring optimal performance across all applications.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {industries.map((industry, index) => (
              <ScrollReveal delay={index * 100} key={industry.name}>
                <div className="bg-white/5 backdrop-blur-sm p-8 shadow-sm border border-white/10 text-center hover:bg-white/10 hover:border-brand-electric/50 transition-all group h-full">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-[50px] bg-brand-electric/10 text-brand-electric mb-4 group-hover:scale-110 group-hover:bg-brand-electric group-hover:text-ink-900 group-hover:shadow-[0_0_15px_var(--color-brand-electric)] transition-all duration-300">
                    <industry.icon size={32} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-bold text-white font-display">{industry.name}</h3>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-slate-900 border-t border-white/5 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <ScrollReveal delay={0}>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
                What They Are Saying
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <p className="text-lg text-slate-400 leading-relaxed">
                Don't just take our word for it. Hear from our valued clients about their experience working with PJ Enterprise.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <ScrollReveal delay={index * 100} key={index}>
                <div className="bg-white/5 p-8 border border-white/10 relative h-full hover:border-white/20 transition-colors">
                  <Quote className="absolute top-6 right-6 text-slate-700 w-10 h-10" />
                  <p className="text-slate-300 leading-relaxed mb-6 relative z-10 font-light">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-[50px] bg-brand-600 flex items-center justify-center text-brand-electric font-bold text-xl mr-4 border border-brand-electric/30">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-white tracking-tight">{testimonial.name}</h4>
                      <p className="text-xs eyebrow text-slate-400 mt-1">Valued Client</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
