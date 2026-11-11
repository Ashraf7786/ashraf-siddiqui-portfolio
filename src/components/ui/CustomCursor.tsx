"use client";

import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';

export default function CustomCursor() {
    const cursorDotRef = useRef<HTMLDivElement>(null);
    const cursorRingRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useIsomorphicLayoutEffect(() => {
        // Disable custom cursor on mobile / touch devices for native performance
        if (typeof window === 'undefined') return;
        if (window.matchMedia('(max-width: 768px)').matches || ('ontouchstart' in window) || navigator.maxTouchPoints > 0) return;

        const cursorDot = cursorDotRef.current;
        const cursorRing = cursorRingRef.current;
        if (!cursorDot || !cursorRing) return;

        // High-performance GSAP quickTo tweens for 0-latency tracking
        const xDotTo = gsap.quickTo(cursorDot, "x", { duration: 0.08, ease: "power2.out" });
        const yDotTo = gsap.quickTo(cursorDot, "y", { duration: 0.08, ease: "power2.out" });

        const xRingTo = gsap.quickTo(cursorRing, "x", { duration: 0.22, ease: "power2.out" });
        const yRingTo = gsap.quickTo(cursorRing, "y", { duration: 0.22, ease: "power2.out" });

        let isVisibleLocal = false;
        const moveCursor = (e: MouseEvent) => {
            if (!isVisibleLocal) {
                isVisibleLocal = true;
                setIsVisible(true);
            }
            xDotTo(e.clientX);
            yDotTo(e.clientY);
            xRingTo(e.clientX);
            yRingTo(e.clientY);
        };

        // Track hover state directly without triggering React re-renders
        let isHovering = false;
        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement | null;
            if (!target) return;
            const interactive = !!target.closest('a, button, [role="button"], input, select, textarea, .cursor-pointer');
            if (interactive !== isHovering) {
                isHovering = interactive;
                if (isHovering) {
                    gsap.to(cursorRing, {
                        width: 48,
                        height: 48,
                        backgroundColor: 'rgba(255, 255, 255, 0.12)',
                        borderColor: 'rgba(255, 255, 255, 0.8)',
                        duration: 0.2,
                        ease: 'power2.out',
                        overwrite: 'auto'
                    });
                    gsap.to(cursorDot, {
                        scale: 0,
                        opacity: 0,
                        duration: 0.15,
                        ease: 'power2.out',
                        overwrite: 'auto'
                    });
                } else {
                    gsap.to(cursorRing, {
                        width: 30,
                        height: 30,
                        backgroundColor: 'transparent',
                        borderColor: 'rgba(255, 255, 255, 0.5)',
                        duration: 0.2,
                        ease: 'power2.out',
                        overwrite: 'auto'
                    });
                    gsap.to(cursorDot, {
                        scale: 1,
                        opacity: 1,
                        duration: 0.2,
                        ease: 'power2.out',
                        overwrite: 'auto'
                    });
                }
            }
        };

        const handleMouseLeave = () => {
            isVisibleLocal = false;
            setIsVisible(false);
        };

        window.addEventListener("mousemove", moveCursor, { passive: true });
        document.addEventListener("mouseover", handleMouseOver, { passive: true });
        document.body.addEventListener("mouseleave", handleMouseLeave);

        // Initial off-screen position
        gsap.set([cursorDot, cursorRing], { x: -100, y: -100 });

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            document.removeEventListener("mouseover", handleMouseOver);
            document.body.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    return (
        <>
            <div
                ref={cursorRingRef}
                className={`hidden md:flex fixed top-0 left-0 rounded-full pointer-events-none z-[9999] shadow-sm items-center justify-center transition-opacity duration-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                style={{
                    width: '30px',
                    height: '30px',
                    border: '1px solid rgba(255, 255, 255, 0.5)',
                    transform: 'translate(-50%, -50%)',
                    willChange: 'transform',
                }}
            />
            <div
                ref={cursorDotRef}
                className={`hidden md:block fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-[9999] shadow-[0_0_6px_rgba(255,255,255,0.8)] transition-opacity duration-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                style={{
                    transform: 'translate(-50%, -50%)',
                    willChange: 'transform',
                }}
            />
        </>
    );
}
