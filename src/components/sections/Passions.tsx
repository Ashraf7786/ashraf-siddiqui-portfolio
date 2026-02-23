"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';
import { Fredoka } from 'next/font/google';

const fredoka = Fredoka({ subsets: ['latin'], weight: ['500'] });

const PASSIONS = [
    {
        id: 1,
        title: 'Audiophile',
        desc: "Appreciating high fidelity sound and immersive musical experiences in my free time.",
        image: "https://images.unsplash.com/photo-1542728928-1413d1894dcd?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 2,
        title: 'Wanderer',
        desc: "Exploring new places fuels me. Been around India, Japan, and Indonesia - Tokyo still tops the list.",
        image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 3,
        title: 'Rider at Heart',
        desc: "Riding is my therapy when life gets loud. I'm usually out on my bike for a spin.",
        image: "https://images.unsplash.com/photo-1558980394-4c7c9299fe96?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 4,
        title: 'Code Artist',
        desc: "Writing clean, scalable code and building robust architectures is more than just work—it's art.",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
    }
];

gsap.registerPlugin(ScrollTrigger);

export default function Passions() {
    const containerRef = useRef<HTMLElement>(null);

    useIsomorphicLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const items = gsap.utils.toArray<HTMLElement>('.passion-item');
            const texts = gsap.utils.toArray<HTMLElement>('.passion-text');

            ScrollTrigger.create({
                trigger: containerRef.current,
                pin: true,
                scrub: 1,
                start: "top top",
                end: "+=3000", // The scroll duration mapped to the animation
                onUpdate: (self) => {
                    const progress = self.progress;
                    const totalItems = PASSIONS.length;

                    items.forEach((item, i) => {
                        // Distance from center frame
                        const progressDiff = i - progress * (totalItems - 1);

                        const vw = window.innerWidth;
                        const x = progressDiff * (vw > 768 ? (vw * 0.35) : (vw * 0.6));
                        const y = Math.pow(progressDiff, 2) * (vw > 768 ? (vw * 0.04) : (vw * 0.1));
                        // Tops lean towards center
                        const rotate = progressDiff * -15;
                        const scale = Math.max(0.6, 1 - Math.abs(progressDiff) * 0.2);
                        const zIndex = Math.round(100 - Math.abs(progressDiff) * 10);

                        // Fade out the surrounding items
                        const brightness = Math.max(0.2, 1 - Math.abs(progressDiff) * 0.6);

                        gsap.set(item, {
                            x,
                            y,
                            rotation: rotate,
                            scale,
                            zIndex,
                            filter: `brightness(${brightness})`,
                            transformOrigin: "center center"
                        });
                    });

                    texts.forEach((text, i) => {
                        const progressDiff = i - progress * (totalItems - 1);
                        const absoluteDiff = Math.abs(progressDiff);
                        const opacity = 1 - Math.min(1, absoluteDiff * 2);
                        const yOffset = absoluteDiff * 20;

                        gsap.set(text, {
                            opacity,
                            y: yOffset,
                            pointerEvents: opacity > 0.5 ? 'auto' : 'none',
                            scale: opacity > 0 ? opacity : 0 // Fade + Shrink effect for smooth transit
                        });
                    });
                }
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} id="passions" className="h-screen w-full bg-[#0e0e11] relative overflow-hidden flex flex-col items-center justify-center border-t border-[#f5f5f5]/5">

            {/* Subtle Arc linking the covers */}
            <div className="absolute top-[35%] md:top-[25%] left-1/2 -translate-x-1/2 w-[250vw] h-[250vw] max-w-[4000px] max-h-[4000px] rounded-[100%] border-t border-[#f5f5f5]/10 pointer-events-none z-0" />

            {/* Floating Coverflow Elements */}
            <div className="relative w-full h-[55vh] flex items-center justify-center z-10 mt-[-5vh] touch-none">
                {PASSIONS.map((item) => (
                    <div
                        key={item.id}
                        className="passion-item absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55vw] md:w-[22vw] max-w-[320px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl bg-[#0a0a0a] border border-white/10"
                    >
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                ))}
            </div>

            {/* Synchronized Foreground Text */}
            <div className="relative w-full h-[15vh] mt-8 flex items-center justify-center z-20">
                {PASSIONS.map((item, i) => (
                    <div
                        key={item.id}
                        className="passion-text absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-md px-4 text-center flex flex-col items-center"
                        style={{ opacity: i === 0 ? 1 : 0, scale: i === 0 ? 1 : 0 }}
                    >
                        <h3 className={`text-4xl md:text-5xl font-bold text-[#f5f5f5] mb-4 tracking-wide ${fredoka.className}`}>
                            {item.title}
                        </h3>
                        <p className="text-[#f5f5f5]/60 text-sm md:text-base leading-relaxed">
                            {item.desc}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
