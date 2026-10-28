import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // Milliseconds delay
  duration?: number; // Milliseconds duration (400ms - 600ms)
  distance?: number; // Pixels slide distance (e.g. 16px - 24px)
  direction?: 'up' | 'down' | 'none';
  resetOnLeave?: boolean; // Re-animate when scrolling back in from above or below
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 500,
  distance = 20,
  direction = 'up',
  resetOnLeave = false,
}) => {
  const domRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = domRef.current;
    if (!el) return;

    // Respect reduced-motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    // Check if initially in viewport on page load
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    if (rect.top <= windowHeight * 0.92 && rect.bottom >= 0) {
      setIsVisible(true);
      if (!resetOnLeave) return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (!resetOnLeave) {
              observer.unobserve(entry.target);
            }
          } else if (resetOnLeave) {
            // Re-arm animation when scrolled well out of view
            setIsVisible(false);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [resetOnLeave]);

  const getTransform = () => {
    if (isVisible || direction === 'none') {
      return 'translateY(0px)';
    }
    return direction === 'up' ? `translateY(${distance}px)` : `translateY(-${distance}px)`;
  };

  return (
    <div
      ref={domRef}
      className={`scroll-reveal-container ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transitionProperty: 'opacity, transform',
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        transitionDelay: `${delay}ms`,
        willChange: isVisible ? 'auto' : 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
};
