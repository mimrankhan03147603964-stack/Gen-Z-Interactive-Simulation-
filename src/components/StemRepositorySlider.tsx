import React, { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import { STEM_REPO_BANNER_SLIDES } from '../data/stemRepoBannerImages';

const AUTO_SLIDE_MS = 4000;
const TRANSITION_MS = 800;

export const StemRepositorySlider: React.FC = () => {
  const realCount = STEM_REPO_BANNER_SLIDES.length; // 4 slides
  // Append cloned first slide at the end for seamless right-to-left infinite loop
  const trackSlides = React.useMemo(
    () => [...STEM_REPO_BANNER_SLIDES, { ...STEM_REPO_BANNER_SLIDES[0], isClone: true }],
    []
  );

  const [trackIndex, setTrackIndex] = useState<number>(0);
  const [isTransitionEnabled, setIsTransitionEnabled] = useState<boolean>(true);
  const [viewportHeight, setViewportHeight] = useState<number | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(() => {
    if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);
  const trackIndexRef = useRef<number>(0);
  trackIndexRef.current = trackIndex;

  const isAnimatingRef = useRef<boolean>(false);
  const autoTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const snapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafRef = useRef<number | null>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

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

  // Measure and sync viewport height to the natural proportional height of the active image
  const syncHeightToSlide = useCallback((idx: number) => {
    const imgEl = imgRefs.current[idx];
    const vpEl = viewportRef.current;
    if (!imgEl) return;

    const measuredHeight = imgEl.offsetHeight;
    if (measuredHeight > 0) {
      setViewportHeight(measuredHeight);
      return;
    }

    if (vpEl && imgEl.naturalWidth > 0 && imgEl.naturalHeight > 0) {
      const vpWidth = vpEl.clientWidth || vpEl.offsetWidth;
      if (vpWidth > 0) {
        setViewportHeight(Math.round((vpWidth * imgEl.naturalHeight) / imgEl.naturalWidth));
      }
    }
  }, []);

  useLayoutEffect(() => {
    syncHeightToSlide(trackIndex);
  }, [trackIndex, syncHeightToSlide]);

  // Recalculate slider height on window resize (and container resize)
  useEffect(() => {
    const handleResize = () => {
      syncHeightToSlide(trackIndexRef.current);
    };

    window.addEventListener('resize', handleResize);

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && viewportRef.current) {
      ro = new ResizeObserver(handleResize);
      ro.observe(viewportRef.current);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (ro) ro.disconnect();
    };
  }, [syncHeightToSlide]);

  const clearPendingReset = useCallback(() => {
    if (snapTimerRef.current !== null) {
      clearTimeout(snapTimerRef.current);
      snapTimerRef.current = null;
    }
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  const snapSilentlyTo = useCallback(
    (targetIdx: number, afterSnap?: () => void) => {
      setIsTransitionEnabled(false);
      setTrackIndex(targetIdx);
      trackIndexRef.current = targetIdx;

      rafRef.current = requestAnimationFrame(() => {
        // Force reflow so the no-transition transform is committed before re-enabling
        if (trackRef.current) {
          void trackRef.current.offsetHeight;
        }
        rafRef.current = requestAnimationFrame(() => {
          setIsTransitionEnabled(true);
          isAnimatingRef.current = false;
          if (afterSnap) afterSnap();
        });
      });
    },
    []
  );

  const slideNext = useCallback(() => {
    if (prefersReducedMotion) {
      const next = (trackIndexRef.current + 1) % realCount;
      setIsTransitionEnabled(false);
      setTrackIndex(next);
      trackIndexRef.current = next;
      return;
    }

    if (isAnimatingRef.current) return;
    clearPendingReset();

    const current = trackIndexRef.current;
    // If somehow still resting on the cloned slide, snap to 0 first then animate to 1
    if (current >= realCount) {
      snapSilentlyTo(0, () => {
        isAnimatingRef.current = true;
        setIsTransitionEnabled(true);
        setTrackIndex(1);
      });
      return;
    }

    const next = current + 1;
    isAnimatingRef.current = true;
    setIsTransitionEnabled(true);
    setTrackIndex(next);

    snapTimerRef.current = setTimeout(() => {
      if (next === realCount) {
        // Reached cloned Slide 1 at end -> seamlessly snap back to real Slide 1 (index 0)
        snapSilentlyTo(0);
      } else {
        isAnimatingRef.current = false;
      }
    }, TRANSITION_MS + 40);
  }, [prefersReducedMotion, realCount, clearPendingReset, snapSilentlyTo]);

  const slidePrev = useCallback(() => {
    if (prefersReducedMotion) {
      const prev = (trackIndexRef.current - 1 + realCount) % realCount;
      setIsTransitionEnabled(false);
      setTrackIndex(prev);
      trackIndexRef.current = prev;
      return;
    }

    if (isAnimatingRef.current) return;
    clearPendingReset();

    const current = trackIndexRef.current;
    if (current <= 0) {
      // Snap invisibly to cloned Slide 1 at end, then slide back to Slide 4
      snapSilentlyTo(realCount, () => {
        isAnimatingRef.current = true;
        setIsTransitionEnabled(true);
        setTrackIndex(realCount - 1);
        snapTimerRef.current = setTimeout(() => {
          isAnimatingRef.current = false;
        }, TRANSITION_MS + 40);
      });
      return;
    }

    const prev = current - 1;
    isAnimatingRef.current = true;
    setIsTransitionEnabled(true);
    setTrackIndex(prev);

    snapTimerRef.current = setTimeout(() => {
      isAnimatingRef.current = false;
    }, TRANSITION_MS + 40);
  }, [prefersReducedMotion, realCount, clearPendingReset, snapSilentlyTo]);

  const startAutoSlide = useCallback(() => {
    if (autoTimerRef.current !== null) {
      clearInterval(autoTimerRef.current);
      autoTimerRef.current = null;
    }
    if (prefersReducedMotion) return;

    autoTimerRef.current = setInterval(() => {
      slideNext();
    }, AUTO_SLIDE_MS);
  }, [prefersReducedMotion, slideNext]);

  // Continuous 4-second auto-slide: NEVER pauses on hover/mouse events
  useEffect(() => {
    startAutoSlide();
    return () => {
      if (autoTimerRef.current !== null) {
        clearInterval(autoTimerRef.current);
        autoTimerRef.current = null;
      }
      clearPendingReset();
    };
  }, [startAutoSlide, clearPendingReset]);

  // Touch swipe support on touch screens only (no visible controls)
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
        slideNext();
      } else {
        slidePrev();
      }
      startAutoSlide();
    }
  };

  const activeRealIndex = trackIndex % realCount;

  return (
    <section
      aria-label="STEM Repository Classroom Banner Carousel"
      className="gz-repo-slider-section"
      style={{
        width: '100%',
        marginTop: '24px',
        marginBottom: '24px',
        padding: 0,
        userSelect: 'none'
      }}
    >
      <style>{`
        .gz-repo-slider-viewport {
          position: relative;
          width: 100%;
          overflow: hidden;
          border-radius: 16px;
          background: transparent;
          box-shadow: 0 10px 30px rgba(15, 23, 42, 0.16), 0 4px 12px rgba(27, 42, 92, 0.10);
          -webkit-transition: height 0.6s ease-in-out;
          transition: height 0.6s ease-in-out;
          touch-action: pan-y;
        }
        .gz-repo-slider-track {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -ms-flex-wrap: nowrap;
          flex-wrap: nowrap;
          -webkit-box-align: start;
          -ms-flex-align: start;
          align-items: flex-start;
          width: 100%;
          margin: 0;
          padding: 0;
          will-change: transform;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
        }
        .gz-repo-slider-slide {
          -webkit-box-flex: 0;
          -ms-flex: 0 0 100%;
          flex: 0 0 100%;
          width: 100%;
          min-width: 100%;
          max-width: 100%;
          margin: 0;
          padding: 0;
        }
        .gz-repo-slider-img {
          width: 100%;
          height: auto;
          display: block;
          user-select: none;
          -webkit-user-drag: none;
        }
        @media (prefers-reduced-motion: reduce) {
          .gz-repo-slider-viewport,
          .gz-repo-slider-track {
            -webkit-transition: none !important;
            transition: none !important;
          }
        }
      `}</style>

      <div
        ref={viewportRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="Digital Laboratory Portal Classroom Highlights"
        className="gz-repo-slider-viewport"
        style={{
          height: viewportHeight !== null ? `${viewportHeight}px` : 'auto'
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          ref={trackRef}
          className="gz-repo-slider-track"
          style={{
            WebkitTransform: `translate3d(-${trackIndex * 100}%, 0, 0)`,
            transform: `translate3d(-${trackIndex * 100}%, 0, 0)`,
            WebkitTransition:
              isTransitionEnabled && !prefersReducedMotion
                ? '-webkit-transform 0.8s ease-in-out'
                : 'none',
            transition:
              isTransitionEnabled && !prefersReducedMotion
                ? 'transform 0.8s ease-in-out'
                : 'none'
          }}
        >
          {trackSlides.map((slide, idx) => {
            const isClone = 'isClone' in slide && slide.isClone;
            return (
              <div
                key={`gz-repo-slide-${idx}`}
                className="gz-repo-slider-slide"
                aria-hidden={isClone || idx !== activeRealIndex}
              >
                <img
                  ref={(el) => {
                    imgRefs.current[idx] = el;
                  }}
                  src={slide.src}
                  alt={slide.alt}
                  draggable={false}
                  onLoad={() => {
                    if (idx === trackIndexRef.current) {
                      syncHeightToSlide(idx);
                    }
                  }}
                  className="gz-repo-slider-img"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
