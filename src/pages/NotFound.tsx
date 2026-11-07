// ✅ FIXED: 404 catch-all page for unknown routes
import { Link } from 'react-router-dom';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import SEO from '../components/SEO';

export default function NotFound() {
  return (
    <div className="w-full min-h-screen bg-ink-900 flex items-center justify-center relative overflow-hidden">
      <SEO
        title="Page Not Found | PJ Enterprise"
        description="The page you are looking for does not exist. Return to PJ Enterprise homepage."
        path="/404"
      />

      {/* Background grid effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] z-0"></div>

      <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-amber-500/10 text-amber-400 mb-8">
          <AlertTriangle size={40} strokeWidth={1.5} />
        </div>

        <h1 className="text-8xl md:text-9xl font-bold text-white/10 font-display tracking-tighter select-none mb-2">
          404
        </h1>

        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 font-display tracking-tight -mt-16 relative z-10">
          Page Not Found
        </h2>

        <p className="text-lg text-slate-400 mb-10 font-light leading-relaxed max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>

        <Link
          to="/"
          className="inline-flex items-center px-8 py-4 rounded-[50px] bg-brand-600 text-white font-medium hover:bg-brand-electric hover:text-ink-900 transition-all shadow-[0_0_15px_rgba(0,82,255,0.4)] hover:shadow-[0_0_20px_var(--color-brand-electric)] group"
        >
          <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" size={20} />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
