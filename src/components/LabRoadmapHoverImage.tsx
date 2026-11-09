import React, { useState, useEffect, useRef } from 'react';

export const LabRoadmapHoverImage: React.FC = () => {
  const [isInView, setIsInView] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // IntersectionObserver: On laptop and computer screens, triggers the smooth right-to-left slide-in
  // as soon as the user scrolls to this section between the Lab card and Roadmap
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
            // Slide back out when scrolled away from viewport
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

  // When either in view on laptop/computer or hovered with mouse, the image slides in from the right edge toward the left
  const isSlideVisible = isInView || isHovered;

  return (
    <section
      ref={containerRef}
      id="lab-roadmap-fullwidth-section"
      aria-label="Photosynthesis Classroom Interactive Simulation Laboratory"
      className="lab-roadmap-image-section relative w-full my-6 sm:my-8 select-none"
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
            src="/assets/aistudio/WhatsApp_Image_2026-11-09_at_2.11.28_PM_d8eacfe8.jpeg"
            onError={(e) => {
              const target = e.currentTarget;
              if (!target.src.endsWith('photosynthesis-classroom-lab.jpg')) {
                target.src = '/assets/photosynthesis-classroom-lab.jpg';
              }
            }}
            alt="Photosynthesis Interactive Simulation Classroom Laboratory"
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
