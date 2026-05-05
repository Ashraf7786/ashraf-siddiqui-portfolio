"use client";

import { ReactLenis } from '@studio-freight/react-lenis';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    const lenisRef = useRef<any>(null);

    useEffect(() => {
        function update(time: number) {
            lenisRef.current?.lenis?.raf(time * 1000);
        }

        gsap.ticker.add(update);
        gsap.ticker.lagSmoothing(0);

        return () => {
            gsap.ticker.remove(update);
        };
    }, []);

    // @ts-ignore - The react-lenis types are out of sync with React 19 nodes
    const LenisWrapper = ReactLenis as any;

    return (
        <LenisWrapper 
            ref={lenisRef} 
            root 
            autoRaf={false} 
            options={{ 
                lerp: 0.1, // Faster lerp is often better for performance feel
                syncTouch: false, // DO NOT sync touch on mobile, it's laggy
                smoothWheel: true,
                touchMultiplier: 2,
            }}
        >
            {children}
        </LenisWrapper>
    );
}
