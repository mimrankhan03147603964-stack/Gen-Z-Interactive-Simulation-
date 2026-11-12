import React, { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import { SLIDER_BANNER_SLIDES } from '../data/sliderBannerImages';

const AUTO_SLIDE_MS = 4000;
const TRANSITION_MS = 800;

type SlideDirection = 'next' | 'prev';
type TransitionPhase = 'idle' | 'prepare' | 'animating';

export const ChemistryBiologySlider: React.FC = () => {
  const totalSlides = SLIDER_BANNER_SLIDES.length;

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [outgoingIndex, setOutgoingIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<SlideDirection>('next');
  const [phase, setPhase] = useState<TransitionPhase>('idle');
  const [viewportHeight, setViewportHeight] = useState<number | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(() => {
    if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  const viewportRef = useRef<HTMLDivElement>(null);
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);
  const prepRaf1Ref = useRef<number | null>(null);
  const prepRaf2Ref = useRef<number | null>(null);
  const endTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const activeIndexRef = useRef<number>(0);
  activeIndexRef.current = activeIndex;

  // Respect prefers-reduced-motion dynamically
  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setPrefersReducedMotion(mq.matches);
    update();
    if (typeof mq.addEventListener === 'function') {
      mq.addEventListener('change', update);
      return () => mq.removeEventListener('change', update);
    }
    mq.addListener(update);
    return () => mq.removeListener(update);
  }, []);

  const syncHeightToActiveImage = useCallback((idx: number) => {
    const imgEl = imgRefs.current[idx];
    if (imgEl && imgEl.offsetHeight > 0) {
      setViewportHeight(imgEl.offsetHeight);
    }
  }, []);

  // Measure active image height whenever activeIndex changes
  useLayoutEffect(() => {
    syncHeightToActiveImage(activeIndex);
  }, [activeIndex, syncHeightToActiveImage]);

  // Keep viewport height synced on window / container resize
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const handleResize = () => {
      syncHeightToActiveImage(activeIndexRef.current);
    };

    if (typeof ResizeObserver !== 'undefined') {
      const ro = new ResizeObserver(handleResize);
      ro.observe(el);
      return () => ro.disconnect();
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [syncHeightToActiveImage]);

  const clearTransitionTimers = useCallback(() => {
    if (prepRaf1Ref.current !== null) {
      cancelAnimationFrame(prepRaf1Ref.current);
      prepRaf1Ref.current = null;
    }
    if (prepRaf2Ref.current !== null) {
      cancelAnimationFrame(prepRaf2Ref.current);
      prepRaf2Ref.current = null;
    }
    if (endTimerRef.current !== null) {
      clearTimeout(endTimerRef.current);
      endTimerRef.current = null;
    }
  }, []);

  const goToSlide = useCallback(
    (targetIdx: number, dir: SlideDirection = 'next') => {
      const normalizedTarget = ((targetIdx % totalSlides) + totalSlides) % totalSlides;
      const current = activeIndexRef.current;
      if (normalizedTarget === current) return;

      clearTransitionTimers();

      if (prefersReducedMotion) {
        setOutgoingIndex(null);
        setActiveIndex(normalizedTarget);
        setDirection(dir);
        setPhase('idle');
        return;
      }

      setOutgoingIndex(current);
      setActiveIndex(normalizedTarget);
      setDirection(dir);
      setPhase('prepare');

      prepRaf1Ref.current = requestAnimationFrame(() => {
        prepRaf2Ref.current = requestAnimationFrame(() => {
          setPhase('animating');
        });
      });

      endTimerRef.current = setTimeout(() => {
        setOutgoingIndex(null);
        setPhase('idle');
      }, TRANSITION_MS + 40);
    },
    [totalSlides, prefersReducedMotion, clearTransitionTimers]
  );

  const startAutoSlide = useCallback(() => {
    if (autoTimerRef.current !== null) {
      clearInterval(autoTimerRef.current);
      autoTimerRef.current = null;
    }
    if (prefersReducedMotion) return;

    autoTimerRef.current = setInterval(() => {
      goToSlide((activeIndexRef.current + 1) % totalSlides, 'next');
    }, AUTO_SLIDE_MS);
  }, [prefersReducedMotion, goToSlide, totalSlides]);

  // Continuous 4-second auto-slide (never pauses on hover)
  useEffect(() => {
    startAutoSlide();
    return () => {
      if (autoTimerRef.current !== null) {
        clearInterval(autoTimerRef.current);
        autoTimerRef.current = null;
      }
    };
  }, [startAutoSlide]);

  // Cleanup transition timers on unmount
  useEffect(() => {
    return () => {
      clearTransitionTimers();
    };
  }, [clearTransitionTimers]);

  // Touch swipe support only (no visible controls)
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length !== 1) return;
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    };
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!touchStartRef.current || e.changedTouches.length === 0) return;
    const dx = e.changedTouches[0].clientX - touchStartRef.current.x;
    const dy = e.changedTouches[0].clientY - touchStartRef.current.y;
    touchStartRef.current = null;

    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) {
        goToSlide((activeIndexRef.current + 1) % totalSlides, 'next');
      } else {
        goToSlide((activeIndexRef.current - 1 + totalSlides) % totalSlides, 'prev');
      }
      startAutoSlide();
    }
  };

  const getSlideStyle = (idx: number): React.CSSProperties => {
    const isActive = idx === activeIndex;
    const isOutgoing = idx === outgoingIndex;
    const useRelativeFallback = viewportHeight === null && isActive;

    if (!isActive && !isOutgoing) {
      return {
        position: 'absolute',
        top: 0,
        left: 0,
        visibility: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
        transform: 'translate3d(100%, 0, 0)',
        transition: 'none'
      };
    }

    if (prefersReducedMotion || phase === 'idle') {
      return {
        position: useRelativeFallback ? 'relative' : 'absolute',
        top: 0,
        left: 0,
        visibility: isActive ? 'visible' : 'hidden',
        pointerEvents: isActive ? 'auto' : 'none',
        zIndex: isActive ? 2 : 0,
        transform: 'translate3d(0%, 0, 0)',
        transition: 'none'
      };
    }

    if (phase === 'prepare') {
      if (isActive) {
        return {
          position: 'absolute',
          top: 0,
          left: 0,
          visibility: 'visible',
          pointerEvents: 'auto',
          zIndex: 2,
          transform: direction === 'next' ? 'translate3d(100%, 0, 0)' : 'translate3d(-100%, 0, 0)',
          transition: 'none'
        };
      }
      // isOutgoing
      return {
        position: 'absolute',
        top: 0,
        left: 0,
        visibility: 'visible',
        pointerEvents: 'none',
        zIndex: 1,
        transform: 'translate3d(0%, 0, 0)',
        transition: 'none'
      };
    }

    // phase === 'animating'
    if (isActive) {
      return {
        position: 'absolute',
        top: 0,
        left: 0,
        visibility: 'visible',
        pointerEvents: 'auto',
        zIndex: 2,
        transform: 'translate3d(0%, 0, 0)',
        transition: 'transform 0.8s ease-in-out'
      };
    }

    // isOutgoing
    return {
      position: 'absolute',
      top: 0,
      left: 0,
      visibility: 'visible',
      pointerEvents: 'none',
      zIndex: 1,
      transform: direction === 'next' ? 'translate3d(-100%, 0, 0)' : 'translate3d(100%, 0, 0)',
      transition: 'transform 0.8s ease-in-out'
    };
  };

  return (
    <section
      aria-label="STEM Visual Highlights Banner Carousel"
      className="gz-cb-slider-wrapper w-full select-none"
      style={{
        marginTop: '40px',
        marginBottom: '40px',
        marginBlockStart: '40px',
        marginBlockEnd: '40px',
        width: '100%'
      }}
    >
      <style>{`
        .gz-cb-slider-viewport {
          position: relative;
          width: 100%;
          border-radius: 16px;
          overflow: hidden;
          background: transparent;
          box-shadow: 0 10px 30px rgba(15, 23, 42, 0.14), 0 4px 12px rgba(27, 42, 92, 0.08);
          transition: height 0.6s ease-in-out;
          touch-action: pan-y;
        }
        .gz-cb-slide {
          width: 100%;
          height: auto;
          will-change: transform;
          backface-visibility: hidden;
        }
        .gz-cb-slide-img {
          width: 100%;
          height: auto;
          display: block;
          user-select: none;
          -webkit-user-drag: none;
        }
        @media (prefers-reduced-motion: reduce) {
          .gz-cb-slider-viewport,
          .gz-cb-slide {
            transition: none !important;
          }
        }
      `}</style>

      <div
        ref={viewportRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="Science & Physics Interactive Diagrams Carousel"
        className="gz-cb-slider-viewport"
        style={{
          height: viewportHeight !== null ? `${viewportHeight}px` : 'auto'
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {SLIDER_BANNER_SLIDES.map((slide, idx) => (
          <div
            key={`gz-cb-slide-${idx}`}
            className="gz-cb-slide"
            style={getSlideStyle(idx)}
            aria-hidden={idx !== activeIndex}
          >
            <img
              ref={(el) => {
                imgRefs.current[idx] = el;
              }}
              src={slide.src}
              alt={slide.alt}
              draggable={false}
              onLoad={() => {
                if (idx === activeIndexRef.current) {
                  syncHeightToActiveImage(idx);
                }
              }}
              className="gz-cb-slide-img"
            />
          </div>
        ))}
      </div>
    </section>
  );
};
