// ✅ FIXED: Loading skeleton for React.lazy Suspense fallback
export default function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-ink-900 flex items-center justify-center">
      <div className="text-center">
        {/* Animated brand mark */}
        <div className="text-3xl font-bold tracking-tighter font-display mb-6 animate-pulse">
          <span className="text-accent">PJ</span>
          <span className="text-white"> </span>
          <span className="text-accent">E</span>
          <span className="text-white">nterprise</span>
        </div>

        {/* Loading bar */}
        <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden mx-auto">
          <div
            className="h-full bg-brand-electric rounded-full"
            style={{
              animation: 'loading-bar 1.2s ease-in-out infinite',
              width: '40%',
            }}
          />
        </div>

        <style>{`
          @keyframes loading-bar {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(350%); }
          }
        `}</style>
      </div>
    </div>
  );
}
