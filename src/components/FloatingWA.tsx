import { motion } from 'motion/react';

export default function FloatingWA() {
  const whatsappNumber = "919979856997";
  const message = encodeURIComponent("Hello PJ Enterprise, I have an inquiry about your industrial products.");
  const url = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <div className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 z-50 flex items-center">
      <motion.a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center w-14 h-14 bg-emerald-500 rounded-full text-white shadow-lg shadow-emerald-500/40 hover:bg-emerald-600 transition-colors group"
        aria-label="Chat with PJ Enterprise on WhatsApp"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {/* Tooltip */}
        <span className="absolute right-16 bg-slate-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-md border border-slate-800 tracking-wider">
          Chat on WhatsApp
        </span>

        {/* Pulse Ripple Effect */}
        <span className="absolute inset-0 rounded-full bg-emerald-500 opacity-25 animate-ping group-hover:animate-none pointer-events-none"></span>

        {/* Official WhatsApp Logo SVG */}
        <svg
          className="w-7 h-7 fill-current relative z-10"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.413 9.863-9.832.002-2.623-1.023-5.09-2.885-6.957C16.59 1.953 14.129.93 11.517.93c-5.44 0-9.866 4.415-9.87 9.836 0 1.63.45 3.22 1.302 4.637L1.863 22.39l7.093-1.86c-1.578.86-2.18 1.09-2.31 1.624zm11.236-6.195c-.3-.15-1.774-.875-2.05-.975-.276-.1-.476-.15-.676.15-.2.3-.775.975-.95 1.175-.175.2-.35.225-.65.075-.3-.15-1.265-.467-2.41-1.485-.89-.794-1.49-1.775-1.665-2.075-.175-.3-.02-.46.13-.61.135-.135.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.676-1.625-.925-2.225-.244-.589-.49-.51-.676-.52-.175-.01-.375-.01-.575-.01-.2 0-.525.075-.8.375-.275.3-1.05 1.025-1.05 2.5 0 1.475 1.075 2.9 1.225 3.1.15.2 2.11 3.22 5.11 4.52.714.31 1.272.495 1.708.634.717.228 1.37.195 1.887.118.577-.087 1.774-.725 2.025-1.425.25-.7.25-1.3 1.175-1.3.075-.1.075-.2.025-.3z" />
        </svg>
      </motion.a>
    </div>
  );
}
