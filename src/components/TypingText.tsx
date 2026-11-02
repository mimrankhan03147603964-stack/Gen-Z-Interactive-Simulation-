import React, { useState, useEffect, useMemo, useRef } from 'react';

export interface TypingTextProps {
  text: string;
  startDelay?: number;
  speed?: number;
  cycle: number;
  forceComplete?: boolean;
  className?: string;
  style?: React.CSSProperties;
  as?: React.ElementType;
  cursorColor?: string;
  title?: string;
  onComplete?: () => void;
}

/**
 * Zero-layout-shift typing effect component:
 * - Keeps full text in the DOM with visibility styling so elements maintain exact dimensions from start.
 * - Blinking cursor ( | ) renders with zero-width layout impact right after the active letter.
 * - Seamlessly transitions to standard native text on completion for maximum sharpness.
 * - Supports prefers-reduced-motion, aria-label accessibility, and 8-second safety fallback.
 */
export const TypingText: React.FC<TypingTextProps> = ({
  text,
  startDelay = 0,
  speed = 25,
  cycle,
  forceComplete = false,
  className = '',
  style,
  as: Component = 'span',
  cursorColor,
  title,
  onComplete
}) => {
  const [charsCount, setCharsCount] = useState<number>(0);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  // Respect prefers-reduced-motion
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useEffect(() => {
    // If cycle is 0 (not yet entered viewport), keep chars hidden while maintaining full layout
    if (cycle === 0) {
      setCharsCount(0);
      setIsTyping(false);
      setIsComplete(false);
      return;
    }

    // If reduced motion or forced complete, show full text immediately
    if (prefersReducedMotion || forceComplete) {
      setCharsCount(text.length);
      setIsTyping(false);
      setIsComplete(true);
      onCompleteRef.current?.();
      return;
    }

    setCharsCount(0);
    setIsTyping(false);
    setIsComplete(false);

    let animationFrameId: number;
    let timeoutId: number;

    timeoutId = window.setTimeout(() => {
      setIsTyping(true);
      const startTimestamp = performance.now();

      const tick = (now: number) => {
        const elapsed = now - startTimestamp;
        const currentChars = Math.min(text.length, Math.floor(elapsed / Math.max(1, speed)) + 1);
        setCharsCount(currentChars);

        if (currentChars >= text.length) {
          setIsTyping(false);
          setIsComplete(true);
          onCompleteRef.current?.();
        } else {
          animationFrameId = requestAnimationFrame(tick);
        }
      };

      animationFrameId = requestAnimationFrame(tick);
    }, Math.max(0, startDelay));

    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(animationFrameId);
    };
  }, [cycle, text, startDelay, speed, forceComplete, prefersReducedMotion]);

  // When complete or reduced motion, render pure native text for 100% sharpness and zero layout shift
  if (isComplete || prefersReducedMotion || forceComplete) {
    return (
      <Component className={className} style={style} title={title}>
        {text}
      </Component>
    );
  }

  // Pre-split characters for zero-layout-shift letter reveal
  const chars = text.split('');

  return (
    <Component 
      className={className} 
      style={style} 
      title={title}
      aria-label={text}
    >
      <span aria-hidden="true" style={{ whiteSpace: 'inherit' }}>
        {chars.map((char, index) => {
          const isVisible = index < charsCount;
          const isCurrentActive = isTyping && index === charsCount - 1;

          return (
            <span
              key={index}
              style={{
                visibility: isVisible ? 'visible' : 'hidden'
              }}
            >
              {char}
              {isCurrentActive && (
                <span
                  className="hub-typing-cursor"
                  style={{
                    color: cursorColor || 'currentColor'
                  }}
                  aria-hidden="true"
                >
                  |
                </span>
              )}
            </span>
          );
        })}
      </span>
    </Component>
  );
};
