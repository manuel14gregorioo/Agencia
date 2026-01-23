/**
 * ============================================
 * SCROLL TRACKING HOOK
 * ============================================
 * Trackea la profundidad de scroll del usuario
 */

import { useEffect, useRef } from 'react';
import { ConversionEvents } from '../../utils/analytics';

const useScrollTracking = () => {
  const trackedDepths = useRef(new Set());

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);

      // Trackear en intervalos de 25%
      const milestones = [25, 50, 75, 100];

      milestones.forEach((milestone) => {
        if (scrollPercent >= milestone && !trackedDepths.current.has(milestone)) {
          trackedDepths.current.add(milestone);
          ConversionEvents.scrollDepth(milestone);
        }
      });
    };

    // Throttle del scroll event
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledScroll);
  }, []);
};

export default useScrollTracking;
