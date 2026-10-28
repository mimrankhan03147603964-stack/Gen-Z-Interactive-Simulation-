import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // Milliseconds delay (for staggered cards)
  duration?: number; // Milliseconds duration (around 450ms - 550ms)
  distance?: number; // Pixels slide distance (around 20px - 26px)
  direction?: 'up' | 'down' | 'none';
  resetOnLeave?: boolean;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 500,
  distance = 24,
  direction = 'up',
}) => {
  const domRef = useRef<HTMLDivElement | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const el = domRef.current;
    if (!el) return;

    // Respect reduced-motion preferences: immediately visible with no animation
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsRevealed(true);
      return;
    }

    // Check if the element is currently visible in the initial viewport
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

    // If already in the visible viewport on load, reveal immediately
    if (rect.top < windowHeight * 0.95 && rect.bottom > 0) {
      setIsRevealed(true);
      return;
    }

    // For elements below the viewport, observe for scroll entrance
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsRevealed(true);
            // Once revealed, keep it permanently visible to guarantee NO cards or elements are ever missed!
            observer.unobserve(entry.target);
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: '0px 0px -30px 0px', // Triggers naturally right as user scrolls toward the element
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  const getTransform = () => {
    if (isRevealed || direction === 'none') {
      return 'translateY(0px)';
    }
    return direction === 'up' ? `translateY(${distance}px)` : `translateY(-${distance}px)`;
  };

  return (
    <div
      ref={domRef}
      className={`scroll-reveal-container ${className}`}
      style={{
        opacity: isRevealed ? 1 : 0,
        transform: getTransform(),
        transitionProperty: 'opacity, transform',
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        transitionDelay: `${delay}ms`,
        willChange: isRevealed ? 'auto' : 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
};
