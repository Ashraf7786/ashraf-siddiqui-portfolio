"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const badgeRef = useRef<HTMLDivElement>(null);
    const badgeTextRef = useRef<HTMLDivElement>(null);

    const chars1Ref = useRef<(HTMLSpanElement | null)[]>([]);
    const chars2Ref = useRef<(HTMLSpanElement | null)[]>([]);

    const image1Ref = useRef<HTMLDivElement>(null);
    const image2Ref = useRef<HTMLDivElement>(null);
    const image3Ref = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);

    const creativeText = "CREATIVE".split("");
    const devText = "DEV".split("");

    useIsomorphicLayoutEffect(() => {
        let ctx = gsap.context(() => {
            // Badge Rotation
            gsap.to(badgeTextRef.current, {
                rotation: 360,
                duration: 20,
                repeat: -1,
                ease: "linear",
            });

            const allChars = [...chars1Ref.current, ...chars2Ref.current];
            gsap.set(allChars, { transformPerspective: 1000, display: 'inline-block' });

            // Unbelievable explosive 3D entrance animation
            gsap.from(allChars, {
                y: () => gsap.utils.random(100, 300),
                x: () => gsap.utils.random(-100, 100),
                z: () => gsap.utils.random(-200, 200),
                rotationX: () => gsap.utils.random(-90, 90),
                rotationY: () => gsap.utils.random(-90, 90),
                rotationZ: () => gsap.utils.random(-45, 45),
                opacity: 0,
                scale: () => gsap.utils.random(0.1, 2.5),
                stagger: {
                    each: 0.05,
                    from: "random"
                },
                duration: 2.5,
                ease: 'expo.out',
                delay: 0.1,
            });

            // Images Entrance
            gsap.from([badgeRef.current, image1Ref.current, image2Ref.current, image3Ref.current], {
                opacity: 0,
                scale: 0.3,
                rotation: () => gsap.utils.random(-30, 30),
                duration: 2,
                stagger: 0.1,
                ease: 'back.out(1.2)',
                delay: 0.8,
            });

            // Glowing cursor tracker
            const xTo = gsap.quickTo(glowRef.current, "x", { duration: 0.8, ease: "power3" });
            const yTo = gsap.quickTo(glowRef.current, "y", { duration: 0.8, ease: "power3" });

            const handleMouseMove = (e: MouseEvent) => {
                const { clientX, clientY } = e;
                const innerWidth = window.innerWidth;
                const innerHeight = window.innerHeight;

                // Track glow spot centrally
                xTo(clientX - innerWidth / 2);
                yTo(clientY - innerHeight / 2);

                const x = (clientX / innerWidth - 0.5);
                const y = (clientY / innerHeight - 0.5);

                // Crazy deep parallax
                gsap.to(image1Ref.current, { x: x * -150, y: y * -150, rotationZ: x * -15, duration: 2, ease: 'power2.out' });
                gsap.to(image2Ref.current, { x: x * 200, y: y * 200, rotationZ: x * 20, duration: 2, ease: 'power2.out' });
                gsap.to(image3Ref.current, { x: x * -100, y: y * 150, rotationZ: x * 25, duration: 2, ease: 'power2.out' });

                // Magnetic hover physics for characters
                allChars.forEach((char) => {
                    if (!char) return;
                    const rect = char.getBoundingClientRect();
                    const charX = rect.left + rect.width / 2;
                    const charY = rect.top + rect.height / 2;

                    const distX = clientX - charX;
                    const distY = clientY - charY;
                    const dist = Math.sqrt(distX * distX + distY * distY);

                    const maxDist = 200; // Activation radius
                    if (dist < maxDist) {
                        const intensity = 1 - (dist / maxDist);
                        const pushX = (distX / dist) * -50 * intensity;
                        const pushY = (distY / dist) * -50 * intensity;
                        const rot = (distX / dist) * 20 * intensity;
                        const zAxis = 50 * intensity;

                        const isStroked = char.dataset.stroked === 'true';

                        gsap.to(char, {
                            x: pushX,
                            y: pushY,
                            z: zAxis,
                            rotationZ: rot,
                            scale: 1 + (0.3 * intensity),
                            color: isStroked ? `rgba(255,255,255, ${0.4 * intensity})` : '#ffffff',
                            textShadow: isStroked ? 'none' : `0 0 ${20 * intensity}px rgba(255,255,255,0.8)`,
                            duration: 0.4,
                            ease: 'power2.out'
                        });
                    } else {
                        const isStroked = char.dataset.stroked === 'true';
                        gsap.to(char, {
                            x: 0,
                            y: 0,
                            z: 0,
                            rotationZ: 0,
                            scale: 1,
                            color: isStroked ? 'transparent' : 'white',
                            textShadow: 'none',
                            duration: 0.8,
                            ease: 'power2.out'
                        });
                    }
                });
            };

            const handleMouseLeave = () => {
                allChars.forEach((char) => {
                    if (!char) return;
                    const isStroked = char.dataset.stroked === 'true';
                    gsap.to(char, { x: 0, y: 0, z: 0, rotationZ: 0, scale: 1, color: isStroked ? 'transparent' : 'white', textShadow: 'none', duration: 1, ease: 'elastic.out(1, 0.3)' });
                });
            };

            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseleave', handleMouseLeave);

            return () => {
                window.removeEventListener('mousemove', handleMouseMove);
                window.removeEventListener('mouseleave', handleMouseLeave);
            };
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative w-full h-[100vh] min-h-[500px] md:min-h-[800px] overflow-hidden bg-[#050505] flex flex-col items-center justify-center pt-16 md:pt-24 perspective-[1000px]"
        >
            {/* Dynamic Interactive Glow Spot */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[800px] max-h-[800px] pointer-events-none z-0 mix-blend-screen opacity-50">
                <div ref={glowRef} className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(80,80,180,0.4)_0%,transparent_60%)] rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            </div>

            {/* Parallax Floating Images Background */}
            <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden origin-center z-0">
                <div ref={image1Ref} className="absolute top-[15%] left-[10%] w-[35vw] max-w-[300px] h-[45vh] max-h-[400px] rounded-3xl overflow-hidden opacity-30 hover:opacity-80 grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl z-0">
                    <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c" alt="Coding" className="w-full h-full object-cover scale-105" />
                </div>
                <div ref={image2Ref} className="absolute bottom-[10%] right-[10%] w-[40vw] max-w-[400px] h-[35vh] max-h-[350px] rounded-3xl overflow-hidden opacity-20 hover:opacity-80 grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl z-0">
                    <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085" alt="Tech" className="w-full h-full object-cover scale-105" />
                </div>
                <div ref={image3Ref} className="absolute top-[20%] right-[25%] lg:right-[35%] w-[20vw] h-[20vw] max-w-[200px] max-h-[200px] rounded-full overflow-hidden opacity-10 hover:opacity-80 grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl z-0">
                    <img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97" alt="Abstract" className="w-full h-full object-cover scale-105" />
                </div>
            </div>

            {/* Rotating Badge */}
            <div ref={badgeRef} className="absolute top-16 right-4 sm:top-24 sm:right-8 md:top-32 md:right-16 lg:right-32 z-20 w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 rounded-full flex items-center justify-center mix-blend-difference pointer-events-none">
                <div className="absolute w-2 h-2 sm:w-3 sm:h-3 md:w-5 md:h-5 rounded-full bg-white z-10" />
                <div ref={badgeTextRef} className="w-full h-full">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100">
                        <path id="circlePath" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="transparent" />
                        <text className="text-[9px] md:text-[8px] font-mono tracking-widest uppercase fill-white">
                            <textPath href="#circlePath" startOffset="0%">
                                HELLO! I'm Ashraf Siddiqui, a web developer. Welcome to my portfolio! &nbsp;
                            </textPath>
                        </text>
                    </svg>
                </div>
            </div>

            {/* Main Typography */}
            <div className="z-10 flex flex-col justify-center w-full px-4 text-center pointer-events-none mix-blend-difference mt-20 relative">
                <div className="flex justify-center flex-wrap h-[20vw] max-h-[300px] items-center perspective-[1000px]">
                    <h1
                        className="text-[20vw] md:text-[18vw] font-black uppercase tracking-tighter leading-none text-white mr-0 md:-mr-[10vw] relative z-20 flex gap-1 md:gap-2"
                        style={{ fontFamily: 'var(--font-outfit)' }}
                    >
                        {creativeText.map((char, i) => (
                            <span
                                key={i}
                                ref={(el) => { chars1Ref.current[i] = el; }}
                                data-stroked="false"
                                className="inline-block whitespace-pre"
                            >
                                {char}
                            </span>
                        ))}
                    </h1>
                </div>
                <div className="flex justify-center flex-wrap h-[20vw] max-h-[300px] items-center -mt-[8vw] md:-mt-[6vw] perspective-[1000px]">
                    <h1
                        className="text-[20vw] md:text-[18vw] font-black uppercase tracking-tighter leading-none text-transparent text-right ml-0 md:ml-[30vw] relative z-10 flex gap-1 md:gap-2"
                        style={{
                            fontFamily: 'var(--font-outfit)',
                            WebkitTextStroke: '2px white',
                            color: 'transparent'
                        }}
                    >
                        {devText.map((char, i) => (
                            <span
                                key={i}
                                ref={(el) => { chars2Ref.current[i] = el; }}
                                data-stroked="true"
                                className="inline-block whitespace-pre transition-colors duration-300"
                            >
                                {char}
                            </span>
                        ))}
                    </h1>
                </div>
            </div>

            {/* Scroll Hint */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/30 text-[10px] md:text-xs font-mono tracking-[0.3em] uppercase animate-pulse z-10">
                Move your cursor
            </div>
        </section>
    );
}
