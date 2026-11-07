// ✅ FIXED: Respects prefers-reduced-motion — shows content immediately without animation
import React, { useEffect, useRef } from 'react';

interface ScrollRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  key?: React.Key;
}

export default function ScrollReveal({ children, className = '', delay = 0, ...props }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // ✅ FIXED: Skip animation entirely if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      element.classList.add('is-revealed');
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay > 0) {
            setTimeout(() => {
              if (ref.current) ref.current.classList.add('is-revealed');
            }, delay);
          } else {
            element.classList.add('is-revealed');
          }
          observer.unobserve(element);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [delay]);

  return (
    <div ref={ref} className={`scroll-reveal ${className}`} {...props}>
      {children}
    </div>
  );
}
