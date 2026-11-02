/**
 * Global Scroll Reveal Manager for Laptop & Desktop Optimization
 * - IntersectionObserver with ~0.2 threshold
 * - Directions:
 *     .reveal-left (translateX -120px)
 *     .reveal-right (translateX 120px)
 *     .reveal-up (translateY 90px)
 *     .reveal-zoom (scale 0.6 for icons/images only)
 * - Transitions: opacity 0.8s ease, transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)
 * - Re-play: when element exits from bottom of viewport, reset; re-trigger when scrolled back into view
 * - Crisp text on desktop: final state is strictly transform: none and will-change: auto
 * - Safety fallback: ensures all elements visible within 3s
 * - Excludes simulations completely
 */

const REVEAL_SELECTOR = '.reveal-left, .reveal-right, .reveal-up, .reveal-zoom';

/**
 * Check if element is inside any interactive simulation player or modal
 * STRICT RULE 3: Nothing inside a simulation should ever be animated or touched by scroll reveal
 */
function isInsideSimulation(el: Element): boolean {
  return !!el.closest(
    '#simulation-viewer-modal, [data-simulation-modal], .standalone-lab-player, #stage, iframe, [data-simulation-container]'
  );
}

class ScrollRevealEngine {
  private observer: IntersectionObserver | null = null;
  private mutationObserver: MutationObserver | null = null;
  private observedElements = new WeakSet<Element>();
  private safetyTimeoutId: number | null = null;
  private isReducedMotion = false;

  public init() {
    if (typeof window === 'undefined') return;

    // Respect prefers-reduced-motion
    this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (this.isReducedMotion) {
      this.forceRevealAllImmediate();
      return;
    }

    // Fallback if IntersectionObserver is unsupported
    if (!('IntersectionObserver' in window)) {
      this.forceRevealAllImmediate();
      return;
    }

    this.createObserver();
    this.scanAndObserve();
    this.setupMutationObserver();

    // 3-second safety fallback: guarantee NO card, section, or panel ever stays empty
    this.safetyTimeoutId = window.setTimeout(() => {
      this.forceRevealUnrevealed();
    }, 3000);

    // Refresh when user returns to tab or window resizes
    window.addEventListener('resize', this.handleResize, { passive: true });
    window.addEventListener('pageshow', this.handlePageShow);
  }

  private createObserver() {
    this.observer = new IntersectionObserver(
      (entries) => {
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;

        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (isInsideSimulation(el)) return;

          if (entry.isIntersecting) {
            // Element entered viewport: smoothly animate in
            if (!el.classList.contains('reveal-show')) {
              el.classList.add('reveal-animating');
              el.classList.add('reveal-show');

              const onTransitionEnd = (e?: TransitionEvent) => {
                if (e && e.target !== el) return;
                // Once finished, strictly set transform: none and remove will-change
                el.classList.remove('reveal-animating');
                el.classList.add('reveal-settled');
                el.style.transform = 'none';
                el.style.willChange = 'auto';
                el.removeEventListener('transitionend', onTransitionEnd);
              };

              el.addEventListener('transitionend', onTransitionEnd);
              // Safety timeout in case transitionend does not fire on desktop
              const delay = parseFloat(getComputedStyle(el).transitionDelay || '0') * 1000;
              window.setTimeout(onTransitionEnd, 1000 + delay);
            }
          } else {
            // Re-play rule: "remove the visible class when it leaves from the bottom of the screen, add it back when it enters"
            // If the element's top is beyond 85% of the viewport height, it exited through the bottom
            const rect = entry.boundingClientRect;
            if (rect.top >= windowHeight * 0.85) {
              el.classList.remove('reveal-show', 'reveal-settled', 'reveal-animating');
              el.style.transform = '';
              el.style.willChange = '';
            }
          }
        });
      },
      {
        threshold: 0.18, // ~0.2 threshold as requested
        rootMargin: '0px 0px -20px 0px',
      }
    );
  }

  public register(el: HTMLElement) {
    if (!el || this.observedElements.has(el) || isInsideSimulation(el)) return;

    if (this.isReducedMotion) {
      el.classList.add('reveal-show', 'reveal-settled');
      el.style.transform = 'none';
      el.style.willChange = 'auto';
      return;
    }

    // If element is already in the viewport on initial discovery, show immediately
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const rect = el.getBoundingClientRect();
    if (rect.top < windowHeight * 0.95 && rect.bottom > 0) {
      el.classList.add('reveal-show', 'reveal-settled');
      el.style.transform = 'none';
      el.style.willChange = 'auto';
    }

    this.observedElements.add(el);
    this.observer?.observe(el);
  }

  public scanAndObserve(root: Element | Document = document) {
    const elements = root.querySelectorAll<HTMLElement>(REVEAL_SELECTOR);
    elements.forEach((el) => this.register(el));
  }

  private setupMutationObserver() {
    this.mutationObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const el = node as HTMLElement;
            if (isInsideSimulation(el)) return;

            if (el.matches && el.matches(REVEAL_SELECTOR)) {
              this.register(el);
            }
            if (el.querySelectorAll) {
              const children = el.querySelectorAll<HTMLElement>(REVEAL_SELECTOR);
              children.forEach((child) => this.register(child));
            }
          }
        });
      }
    });

    this.mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  /**
   * Safety Fallback: After 3 seconds, force any unrevealed elements to be visible
   */
  public forceRevealUnrevealed() {
    const hiddenEls = document.querySelectorAll<HTMLElement>(
      '.reveal-left:not(.reveal-show), .reveal-right:not(.reveal-show), .reveal-up:not(.reveal-show), .reveal-zoom:not(.reveal-show)'
    );
    hiddenEls.forEach((el) => {
      if (isInsideSimulation(el)) return;
      el.classList.add('reveal-show', 'reveal-settled');
      el.style.transform = 'none';
      el.style.willChange = 'auto';
    });
  }

  public forceRevealAllImmediate() {
    const allEls = document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR);
    allEls.forEach((el) => {
      el.classList.add('reveal-show', 'reveal-settled');
      el.style.transform = 'none';
      el.style.willChange = 'auto';
    });
  }

  private handleResize = () => {
    // Re-check unrevealed elements on resize
    this.scanAndObserve();
  };

  private handlePageShow = () => {
    this.scanAndObserve();
  };

  public destroy() {
    if (this.safetyTimeoutId) clearTimeout(this.safetyTimeoutId);
    this.observer?.disconnect();
    this.mutationObserver?.disconnect();
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('pageshow', this.handlePageShow);
  }
}

export const scrollRevealEngine = new ScrollRevealEngine();
