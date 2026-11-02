import React, { useEffect, useRef } from 'react';
import { scrollRevealEngine } from '../utils/scrollRevealManager';

export interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'left' | 'right' | 'up' | 'zoom' | 'none';
  delay?: 0 | 1 | 2 | 3 | 4 | number; // 1 = 0.15s, 2 = 0.3s, 3 = 0.45s, 4 = 0.6s, or milliseconds
  as?: React.ElementType;
  style?: React.CSSProperties;
  distance?: number;
  duration?: number;
  resetOnLeave?: boolean;
}

/**
 * Reusable ScrollReveal wrapper component
 * - Applies hidden direction classes (.reveal-left, .reveal-right, .reveal-up, .reveal-zoom)
 * - Managed globally by scrollRevealEngine for smooth entrance, bottom exit replay, and zero blur
 * - Protects inner elements (e.g. hover transforms) by applying the reveal to this outer wrapper
 */
export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  as: Component = 'div',
  style = {},
  duration,
}) => {
  const domRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = domRef.current;
    if (!el) return;

    scrollRevealEngine.register(el as HTMLElement);
  }, []);

  if (direction === 'none') {
    return (
      <Component className={className} style={style}>
        {children}
      </Component>
    );
  }

  // Determine direction class
  let dirClass = 'reveal-up';
  if (direction === 'left') dirClass = 'reveal-left';
  else if (direction === 'right') dirClass = 'reveal-right';
  else if (direction === 'zoom') dirClass = 'reveal-zoom';

  // Determine delay class or inline delay
  let delayClass = '';
  let inlineAnimStyle: React.CSSProperties = {};

  if (delay === 1) delayClass = 'reveal-delay-1';
  else if (delay === 2) delayClass = 'reveal-delay-2';
  else if (delay === 3) delayClass = 'reveal-delay-3';
  else if (delay === 4) delayClass = 'reveal-delay-4';
  else if (typeof delay === 'number' && delay > 0) {
    inlineAnimStyle.transitionDelay = `${delay}ms`;
  }
  if (typeof duration === 'number' && duration > 0) {
    inlineAnimStyle.transitionDuration = `${duration}ms`;
  }

  return (
    <Component
      ref={domRef}
      className={`${dirClass} ${delayClass} ${className}`}
      style={{
        ...style,
        ...inlineAnimStyle,
      }}
    >
      {children}
    </Component>
  );
};
