"use client";

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { RefreshCcw, Home, Skull } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const ctx = gsap.context(() => {
            gsap.from(contentRef.current, {
                scale: 0.9,
                opacity: 0,
                duration: 0.8,
                ease: "back.out(1.7)"
            });

            // Glitch effect animation
            const glitchTimeline = gsap.timeline({ repeat: -1 });
            glitchTimeline
                .to(".error-code", { x: 2, skewX: 2, duration: 0.1, ease: "power1.inOut" })
                .to(".error-code", { x: -2, skewX: -2, duration: 0.1, ease: "power1.inOut" })
                .to(".error-code", { x: 0, skewX: 0, duration: 0.1 });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div 
            ref={containerRef}
            className="relative min-h-screen w-full bg-[#0a0a0a] flex flex-col items-center justify-center overflow-hidden font-outfit"
        >
            {/* Background Static/Grain Effect */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            <div ref={contentRef} className="relative z-10 text-center px-6 max-w-2xl">
                <div className="mb-8 flex justify-center">
                    <div className="bg-red-500/10 p-6 rounded-full border border-red-500/20 animate-pulse">
                        <Skull size={64} className="text-red-500" />
                    </div>
                </div>

                <h1 className="error-code text-7xl md:text-9xl font-black text-white mb-4 tracking-tighter uppercase">
                    System <span className="text-red-600">Crash</span>
                </h1>

                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-white/90 uppercase tracking-widest">
                        Something went wrong
                    </h2>
                    <div className="bg-white/5 border border-white/10 p-4 rounded-2xl font-mono text-xs text-red-400/80 overflow-hidden text-ellipsis whitespace-nowrap">
                        {error.message || "Unknown Runtime Error Occurred"}
                    </div>
                    
                    <p className="text-gray-400 text-lg leading-relaxed">
                        The application encountered an unexpected error. Our digital architect has been notified of the disturbance.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
                        <button 
                            onClick={() => reset()}
                            className="group flex items-center gap-2 px-8 py-4 bg-red-600 text-white rounded-full font-bold text-sm tracking-widest uppercase transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(220,38,38,0.3)]"
                        >
                            <RefreshCcw size={18} />
                            <span>Retry System</span>
                        </button>
                        
                        <Link 
                            href="/"
                            className="flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-bold text-sm tracking-widest uppercase transition-all hover:bg-white/10"
                        >
                            <Home size={18} />
                            <span>Safety Home</span>
                        </Link>
                    </div>
                </div>
            </div>
            
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-red-600/20 blur-sm pointer-events-none" />
        </div>
    );
}
