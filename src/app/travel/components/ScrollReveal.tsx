'use client';

import React, { useEffect, useRef, ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number; // ms delay
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
  threshold?: number; // 0–1
  once?: boolean;
}

/**
 * ScrollReveal — Pure Intersection Observer animation wrapper.
 * No external animation libraries required.
 * Uses CSS transitions only.
 */
export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  threshold = 0.12,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  const getInitialStyle = () => {
    switch (direction) {
      case 'up':    return { opacity: 0, transform: 'translateY(40px)' };
      case 'down':  return { opacity: 0, transform: 'translateY(-40px)' };
      case 'left':  return { opacity: 0, transform: 'translateX(40px)' };
      case 'right': return { opacity: 0, transform: 'translateX(-40px)' };
      case 'fade':  return { opacity: 0, transform: 'none' };
      default:      return { opacity: 0, transform: 'translateY(40px)' };
    }
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Set initial hidden state
    const init = getInitialStyle();
    el.style.opacity = String(init.opacity);
    el.style.transform = init.transform;
    el.style.transition = `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0) translateX(0)';
            if (once) observer.unobserve(el);
          } else if (!once) {
            el.style.opacity = String(init.opacity);
            el.style.transform = init.transform;
          }
        });
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay, direction, threshold, once]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

