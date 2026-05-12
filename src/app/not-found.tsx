"use client";

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { Home, ArrowLeft, AlertCircle } from 'lucide-react';

export default function NotFound() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const shapesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Animate the main content
        const ctx = gsap.context(() => {
            gsap.from(textRef.current, {
                y: 100,
                opacity: 0,
                duration: 1,
                ease: "power4.out"
            });

            // Physics-like floating animation for background elements
            const shapes = shapesRef.current?.querySelectorAll('.shape');
            if (shapes) {
                shapes.forEach((shape, index) => {
                    gsap.to(shape, {
                        x: "random(-100, 100)",
                        y: "random(-100, 100)",
                        rotation: "random(-180, 180)",
                        duration: "random(10, 20)",
                        repeat: -1,
                        yoyo: true,
                        ease: "sine.inOut",
                        delay: index * 0.2
                    });
                });
            }

            // Pulse effect for the 404 text
            gsap.to(".digit", {
                scale: 1.1,
                opacity: 0.8,
                duration: 2,
                repeat: -1,
                yoyo: true,
                stagger: 0.2,
                ease: "power1.inOut"
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div 
            ref={containerRef}
            className="relative min-h-screen w-full bg-[#0a0a0a] flex flex-col items-center justify-center overflow-hidden font-outfit"
        >
            {/* Background Animated Shapes */}
            <div ref={shapesRef} className="absolute inset-0 pointer-events-none opacity-20">
                <div className="shape absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-[100px]" />
                <div className="shape absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px]" />
                <div className="shape absolute bottom-1/4 left-1/2 w-48 h-48 bg-pink-500/20 rounded-full blur-[80px]" />
            </div>

            <div ref={textRef} className="relative z-10 text-center px-6">
                <div className="mb-8 flex justify-center">
                    <div className="bg-white/5 p-4 rounded-3xl border border-white/10 backdrop-blur-md">
                        <AlertCircle size={48} className="text-white/80" />
                    </div>
                </div>

                <h1 className="text-[12rem] md:text-[20rem] font-bold leading-none tracking-tighter mix-blend-difference select-none flex justify-center items-baseline gap-2">
                    <span className="digit">4</span>
                    <span className="digit text-blue-500">0</span>
                    <span className="digit">4</span>
                </h1>

                <div className="max-w-md mx-auto space-y-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-tight">
                        Lost in the Void
                    </h2>
                    <p className="text-gray-400 text-lg leading-relaxed">
                        The page you are looking for has drifted away. It might have been moved or deleted while you were exploring.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
                        <Link 
                            href="/"
                            className="group flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-bold text-sm tracking-widest uppercase transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                        >
                            <Home size={18} />
                            <span>Return Home</span>
                        </Link>
                        
                        <button 
                            onClick={() => window.history.back()}
                            className="flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-bold text-sm tracking-widest uppercase transition-all hover:bg-white/10"
                        >
                            <ArrowLeft size={18} />
                            <span>Go Back</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Floating particles or noise could go here */}
            <div className="absolute bottom-10 left-10 text-white/10 font-mono text-xs uppercase tracking-[0.5em] vertical-text hidden md:block">
                Error Protocol 404 // Page Not Found
            </div>
            <div className="absolute top-10 right-10 text-white/10 font-mono text-xs uppercase tracking-[0.5em] hidden md:block">
                Ashraf Siddiqui Portfolio // 2026
            </div>
        </div>
    );
}
