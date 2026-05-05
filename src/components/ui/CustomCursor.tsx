"use client";

import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';

export default function CustomCursor() {
    const cursorDotRef = useRef<HTMLDivElement>(null);
    const cursorRingRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useIsomorphicLayoutEffect(() => {
        // Disable custom cursor on mobile / touch devices for performance
        if (typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches) return;

        const cursorDot = cursorDotRef.current;
        const cursorRing = cursorRingRef.current;
        if (!cursorDot || !cursorRing) return;

        // Use GSAP quickTo for performance
        const xDotTo = gsap.quickTo(cursorDot, "x", { duration: 0.1, ease: "power3.out" });
        const yDotTo = gsap.quickTo(cursorDot, "y", { duration: 0.1, ease: "power3.out" });

        const xRingTo = gsap.quickTo(cursorRing, "x", { duration: 0.3, ease: "power3.out" });
        const yRingTo = gsap.quickTo(cursorRing, "y", { duration: 0.3, ease: "power3.out" });

        const moveCursor = (e: MouseEvent) => {
            if (!isVisible) setIsVisible(true);
            xDotTo(e.clientX);
            yDotTo(e.clientY);
            xRingTo(e.clientX);
            yRingTo(e.clientY);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest('a') || target.closest('button') || target.closest('[role="button"]')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        const handleMouseLeave = () => {
            setIsVisible(false);
        };

        window.addEventListener("mousemove", moveCursor);
        document.addEventListener("mouseover", handleMouseOver);
        document.body.addEventListener("mouseleave", handleMouseLeave);

        // Initial positioning off-screen
        gsap.set([cursorDot, cursorRing], { x: window.innerWidth / 2, y: window.innerHeight / 2 });

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            document.removeEventListener("mouseover", handleMouseOver);
            document.body.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    // Animate scale/opacity when hovering
    useIsomorphicLayoutEffect(() => {
        const cursorDot = cursorDotRef.current;
        const cursorRing = cursorRingRef.current;
        if (!cursorDot || !cursorRing) return;

        if (isHovering) {
            gsap.to(cursorRing, {
                width: 64,
                height: 64,
                backgroundColor: 'rgba(255, 255, 255, 1)',
                borderWidth: 0,
                xPercent: -50,
                yPercent: -50,
                duration: 0.3,
                ease: 'power3.out'
            });
            gsap.to(cursorDot, {
                scale: 0,
                opacity: 0,
                duration: 0.2,
                ease: 'power3.out'
            });
        } else {
            gsap.to(cursorRing, {
                width: 32,
                height: 32,
                backgroundColor: 'rgba(255, 255, 255, 0)',
                borderWidth: 1,
                borderColor: 'rgba(255, 255, 255, 0.5)',
                xPercent: -50,
                yPercent: -50,
                duration: 0.3,
                ease: 'power3.out'
            });
            gsap.to(cursorDot, {
                scale: 1,
                opacity: 1,
                duration: 0.3,
                ease: 'power3.out'
            });
        }
    }, [isHovering]);

    return (
        <>
            <div
                ref={cursorRingRef}
                className={`hidden md:flex fixed top-0 left-0 rounded-full pointer-events-none z-[9999] mix-blend-difference transform shadow-sm items-center justify-center transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                style={{
                    width: '32px',
                    height: '32px',
                    border: '1px solid rgba(255, 255, 255, 0.5)',
                    transform: 'translate(-50%, -50%)',
                }}
            />
            <div
                ref={cursorDotRef}
                className={`hidden md:block fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference transform transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                style={{
                    transform: 'translate(-50%, -50%)',
                }}
            />
        </>
    );
}
