import { motion } from 'motion/react';
import SEO from '../components/SEO';

export default function Terms() {
  return (
    <div className="w-full min-h-screen bg-slate-50 pt-32 pb-24">
      <SEO 
        title="Terms of Service | PJ Enterprise" 
        description="Read the terms and conditions that govern your use of the PJ Enterprise website and our industrial products."
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-200"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 tracking-tight font-display">Terms of Service</h1>
          
          <div className="prose prose-slate max-w-none prose-headings:font-display prose-headings:font-bold prose-a:text-brand-600 hover:prose-a:text-brand-700">
            <p className="text-slate-500 mb-8">Last updated: March 2026</p>
            
            <h2>1. Agreement to Terms</h2>
            <p>By accessing or using our website, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.</p>

            <h2>2. Use License</h2>
            <p>Permission is granted to temporarily download one copy of the materials (information or software) on PJ Enterprise's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
            <ul>
              <li>Modify or copy the materials;</li>
              <li>Use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
              <li>Attempt to decompile or reverse engineer any software contained on PJ Enterprise's website;</li>
              <li>Remove any copyright or other proprietary notations from the materials; or</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server.</li>
            </ul>

            <h2>3. Disclaimer</h2>
            <p>The materials on PJ Enterprise's website are provided on an 'as is' basis. PJ Enterprise makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>

            <h2>4. Limitations</h2>
            <p>In no event shall PJ Enterprise or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on PJ Enterprise's website, even if PJ Enterprise or a PJ Enterprise authorized representative has been notified orally or in writing of the possibility of such damage.</p>

            <h2>5. Revisions and Errata</h2>
            <p>The materials appearing on PJ Enterprise's website could include technical, typographical, or photographic errors. PJ Enterprise does not warrant that any of the materials on its website are accurate, complete, or current. PJ Enterprise may make changes to the materials contained on its website at any time without notice.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
