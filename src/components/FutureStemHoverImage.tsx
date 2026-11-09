import React, { useState, useEffect, useRef } from 'react';

export const FutureStemHoverImage: React.FC = () => {
  const [isInView, setIsInView] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // IntersectionObserver: Triggers the smooth right-to-left slide-in as soon as the section scrolls into view
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
          } else {
            // Slides back out when scrolled well away from viewport
            if (entry.boundingClientRect.top > window.innerHeight || entry.boundingClientRect.bottom < 0) {
              setIsInView(false);
            }
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '50px 0px 50px 0px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // When either in view or hovered, the image slides in from the right edge toward the left
  const isSlideVisible = isInView || isHovered;

  return (
    <section
      ref={containerRef}
      id="future-stem-fullwidth-section"
      aria-label="Future STEM Classroom Interactive Simulation Laboratory"
      className="future-stem-image-section relative w-full my-6 sm:my-8 select-none"
      style={{
        overflowX: 'hidden',
        width: '100vw',
        maxWidth: '100vw',
        position: 'relative',
        left: '50%',
        right: '50%',
        marginLeft: '-50vw',
        marginRight: '-50vw',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Full-Width Responsive Wrapper with overflow-x: hidden to prevent any scrollbars during animation */}
      <div 
        className="w-full relative overflow-hidden shadow-md border-y border-[#DDE5F3]"
        style={{
          backgroundColor: '#FFFFFF',
          aspectRatio: '16 / 9',
          maxHeight: 'min(78vh, 720px)',
          minHeight: '260px',
        }}
      >
        {/* Sliding Layer: translateX(100%) when hidden, translateX(0%) when visible with 0.6s ease-in-out */}
        <div
          className="w-full h-full relative"
          style={{
            transform: isSlideVisible ? 'translateX(0%)' : 'translateX(100%)',
            transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
            willChange: 'transform',
          }}
        >
          <img
            src="/assets/stem-classroom-future.jpg"
            onError={(e) => {
              // Direct fallback to alternate public path
              const target = e.currentTarget;
              if (!target.src.includes('WhatsApp_Image_2026-11-08_at_8.43.40_AM_d5cb944e.jpeg')) {
                target.src = '/assets/aistudio/WhatsApp_Image_2026-11-08_at_8.43.40_AM_d5cb944e.jpeg';
              }
            }}
            alt="Future STEM Applied & Emerging STEM Simulations Classroom Lab"
            className="w-full h-full block object-cover select-none pointer-events-none transition-transform duration-700 ease-out"
            style={{
              width: '100vw',
              maxWidth: '100vw',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 35%',
              display: 'block',
              transform: isHovered ? 'scale(1.02)' : 'scale(1)',
            }}
            loading="eager"
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
};
