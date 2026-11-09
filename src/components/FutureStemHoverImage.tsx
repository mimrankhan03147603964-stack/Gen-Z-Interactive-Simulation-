import React, { useState, useEffect, useRef } from 'react';

export const FutureStemHoverImage: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileInView, setIsMobileInView] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Detect whether the device has a fine pointer (mouse / trackpad) vs purely touch device
  useEffect(() => {
    const checkPointer = () => {
      if (typeof window === 'undefined') return;
      const finePointerMedia = window.matchMedia('(hover: hover) and (pointer: fine)');
      setIsFinePointer(finePointerMedia.matches);
    };

    checkPointer();
    window.addEventListener('resize', checkPointer);
    return () => window.removeEventListener('resize', checkPointer);
  }, []);

  // IntersectionObserver for mobile / touch devices: triggers slide-in when scrolled into view
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsMobileInView(entry.isIntersecting);
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Mouse hover handlers with slight debounce to prevent micro-stuttering
  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 75);
  };

  // On desktop / fine pointer: trigger on mouse hover
  // On mobile / touch devices: trigger when section scrolls into view
  const isVisible = isFinePointer ? isHovered : (isMobileInView || isHovered);

  return (
    <div
      ref={containerRef}
      id="future-stem-hover-image-section"
      className="future-stem-hover-section relative w-full select-none"
      style={{
        overflowX: 'hidden',
        overflowY: 'hidden',
        marginTop: isVisible ? '1.5rem' : '0px',
        marginBottom: isVisible ? '1.5rem' : '0px',
        transition: 'margin 0.6s ease-in-out',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Invisible Hover Sensor across the gap between the Future STEM card and Developer section */}
      {!isVisible && (
        <div
          className="absolute -top-6 left-0 right-0 h-16 z-30 cursor-pointer pointer-events-auto"
          aria-hidden="true"
        />
      )}

      {/* Full-Width Expandable Wrapper: edge-to-edge 100vw with no horizontal scrollbars */}
      <div
        className="w-full relative"
        style={{
          width: '100vw',
          maxWidth: '100vw',
          position: 'relative',
          left: '50%',
          right: '50%',
          marginLeft: '-50vw',
          marginRight: '-50vw',
          overflowX: 'hidden',
          overflowY: 'hidden',
          maxHeight: isVisible ? 'min(78vh, 720px)' : '0px',
          opacity: isVisible ? 1 : 0,
          transition: 'max-height 0.6s ease-in-out, opacity 0.4s ease-in-out',
        }}
      >
        {/* Sliding Layer: translateX(100%) when hidden, translateX(0) when visible */}
        <div
          className="w-full relative shadow-2xl"
          style={{
            transform: isVisible ? 'translateX(0%)' : 'translateX(100%)',
            transition: 'transform 0.6s ease-in-out',
            willChange: 'transform',
          }}
        >
          <img
            src="/assets/aistudio/WhatsApp_Image_2026-11-08_at_8.43.40_AM_d5cb944e.jpeg"
            onError={(e) => {
              // Fallback if hashed asset name differs
              const target = e.currentTarget;
              if (!target.src.endsWith('stem-classroom-future.jpg')) {
                target.src = '/assets/stem-classroom-future.jpg';
              }
            }}
            alt="Future STEM Classroom Interactive Simulation Laboratory"
            className="w-full block select-none pointer-events-none"
            style={{
              width: '100vw',
              maxWidth: '100vw',
              height: 'auto',
              aspectRatio: '16 / 9',
              maxHeight: 'min(78vh, 720px)',
              objectFit: 'cover',
              objectPosition: 'center 35%',
              display: 'block',
            }}
            loading="eager"
            decoding="async"
          />
        </div>
      </div>
    </div>
  );
};
