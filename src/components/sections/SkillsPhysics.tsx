"use client";

import React, { useRef, useState } from 'react';
import Matter from 'matter-js';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TABS = {
    'CORE CAPABILITIES': ['Creative frontend', 'Web apps', 'Less code', 'Headless CMS', 'Performance', 'Motion & Interaction', 'eCommerce', 'Full-stack', 'SEO', 'No code', 'AI'],
    'TECH STACKS': ['ReactJs', 'Next.JS', 'Laravel', 'PHP', 'Javascript', 'Bootstrap', 'Tailwind', 'SCSS', 'MERN STACK', 'Mongo DB', 'ExpressJS', 'Sanity CMS', 'Framer', 'Supabase', 'Webflow', 'GSAP', 'Shopify', 'HTML', 'CSS'],
    'SERVICES': ['Brand sites', 'Blogs', 'Booking platforms', 'eCommerce', 'Campaign sites', 'Appointment platforms', 'Business sites', 'Landing pages', 'Corporate sites', 'Portfolio sites', 'CMS systems']
};

const PILL_COLORS = [
    '#FFA873', // Orange
    '#58A484', // Green
    '#7D97F4', // Blue
    '#FF8FBB', // Pink
    '#B4B4B4', // Gray
    '#FF9F6D', // Darker Orange
];

const EMOJIS = ['🎮', '🎯', '🤝', '💻', '👻', '🪐', '🔥', '💪', '🏅', '✨', '👀', '👏'];

export default function SkillsPhysics() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const engineRef = useRef<Matter.Engine | null>(null);
    const [activeTab, setActiveTab] = useState<keyof typeof TABS>('TECH STACKS');

    useIsomorphicLayoutEffect(() => {
        if (!containerRef.current || !canvasRef.current) return;

        let render: Matter.Render;
        let runner: Matter.Runner;

        const initPhysics = () => {
            const canvasContainer = canvasRef.current!.parentElement!;
            const canvas = canvasRef.current!;
            const width = canvasContainer.clientWidth;
            const height = canvasContainer.clientHeight;

            canvas.width = width;
            canvas.height = height;

            // Matter.js setup
            const Engine = Matter.Engine,
                Render = Matter.Render,
                Runner = Matter.Runner,
                MouseConstraint = Matter.MouseConstraint,
                Mouse = Matter.Mouse,
                World = Matter.World,
                Bodies = Matter.Bodies,
                Composite = Matter.Composite;

            const engine = Engine.create({
                gravity: { x: 0, y: 0.8, scale: 0.001 },
                positionIterations: 10,
                velocityIterations: 10
            });
            engineRef.current = engine;
            const world = engine.world;

            render = Render.create({
                canvas: canvas,
                engine: engine,
                options: {
                    width,
                    height,
                    background: 'transparent',
                    wireframes: false,
                    pixelRatio: window.devicePixelRatio,
                }
            });

            // Boundaries
            const wallThickness = 200;
            const wallOptions = { isStatic: true, render: { visible: false }, friction: 0.8, restitution: 0.2 };
            // Raise the ground constraint slightly so pills rest completely on-screen instead of bleeding beyond bottom.
            const ground = Bodies.rectangle(width / 2, height + (wallThickness / 2) - 10, width * 2, wallThickness, wallOptions);
            const leftWall = Bodies.rectangle(0 - (wallThickness / 2), height / 2, wallThickness, height * 4, wallOptions);
            const rightWall = Bodies.rectangle(width + (wallThickness / 2), height / 2, wallThickness, height * 4, wallOptions);

            World.add(world, [ground, leftWall, rightWall]);

            // Add Mouse control
            const mouse = Mouse.create(render.canvas);
            const mouseConstraint = MouseConstraint.create(engine, {
                mouse: mouse,
                constraint: {
                    stiffness: 0.2,
                    render: { visible: false }
                }
            });
            World.add(world, mouseConstraint);
            render.mouse = mouse;

            // Run
            Render.run(render);
            runner = Runner.create();
            Runner.run(runner, engine);

            // Custom Render for Text and Emojis
            Matter.Events.on(render, 'afterRender', () => {
                const ctx = render.context;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';

                const bodies = Composite.allBodies(world).filter(b => !b.isStatic && !b.isSensor);

                bodies.forEach((body) => {
                    const { x, y } = body.position;
                    // @ts-ignore
                    if (!body.label) return;

                    ctx.save();
                    ctx.translate(x, y);
                    ctx.rotate(body.angle);

                    // @ts-ignore
                    if (body.label.startsWith('emoji:')) {
                        // @ts-ignore
                        const emoji = body.label.split(':')[1];
                        ctx.font = '36px Arial';
                        ctx.fillText(emoji, 0, 3); // Slight y-offset adjustment for emojis
                    } else {
                        ctx.font = '500 24px Inter, sans-serif';
                        ctx.fillStyle = '#ffffff';
                        // @ts-ignore
                        ctx.fillText(body.label, 0, 1);
                    }

                    ctx.restore();
                });
            });
        };

        let triggered = false;
        const st = ScrollTrigger.create({
            trigger: containerRef.current,
            start: 'top 70%',
            onEnter: () => {
                if (!triggered) {
                    triggered = true;
                    // Intro animation for the container
                    gsap.fromTo(containerRef.current,
                        { y: 100, opacity: 0 },
                        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
                    );
                    initPhysics();
                    spawnPills('CORE CAPABILITIES');
                }
            }
        });

        return () => {
            st.kill();
            if (engineRef.current) Matter.Engine.clear(engineRef.current);
            if (render) Matter.Render.stop(render);
            if (runner) Matter.Runner.stop(runner);
        };
    }, []);

    const spawnPills = (tab: keyof typeof TABS) => {
        setActiveTab(tab);
        if (!engineRef.current || !containerRef.current) return;
        const engine = engineRef.current;

        // Clear old items slowly dropping them through floor or just remove
        const nonStaticBodies = Matter.Composite.allBodies(engine.world).filter(b => !b.isStatic && !b.isSensor);
        Matter.World.remove(engine.world, nonStaticBodies);

        const width = containerRef.current.clientWidth;
        const baseItems = TABS[tab];
        // Duplicate items array to make a much denser, playable pile of elements
        const items = [...baseItems, ...baseItems];

        let bodiesToAdd: Matter.Body[] = [];

        // Spawn Text Pills
        items.forEach((item, i) => {
            const pillWidth = Math.max(160, item.length * 14 + 50);
            const pillHeight = 64;

            const x = (Math.random() * (width - 200)) + 100;
            const y = -50 - (i * 40) - (Math.random() * 50);

            const color = PILL_COLORS[i % PILL_COLORS.length];

            const body = Matter.Bodies.rectangle(x, y, pillWidth, pillHeight, {
                chamfer: { radius: pillHeight / 2 },
                restitution: 0.7, // Higher restitution for more bounciness
                friction: 0.1,
                frictionAir: 0.01,
                render: {
                    fillStyle: color
                }
            });
            // Random initial rotation
            Matter.Body.setAngle(body, (Math.random() - 0.5) * 0.5);
            // @ts-ignore
            body.label = item;
            bodiesToAdd.push(body);
        });

        // Spawn Emoji Circles
        const emojiCount = 15;
        for (let i = 0; i < emojiCount; i++) {
            const radius = 32;
            const x = (Math.random() * (width - 100)) + 50;
            const y = -50 - (i * 40) - 100;
            const color = PILL_COLORS[(i + 3) % PILL_COLORS.length];
            const emoji = EMOJIS[i % EMOJIS.length];

            const body = Matter.Bodies.circle(x, y, radius, {
                restitution: 0.9, // Make emojis very bouncy!
                friction: 0.1,
                frictionAir: 0.005,
                render: {
                    fillStyle: color
                }
            });
            // @ts-ignore
            body.label = `emoji:${emoji}`;
            bodiesToAdd.push(body);
        }

        // Shuffle bodies so they don't fall perfectly sequentially based on type
        bodiesToAdd.sort(() => Math.random() - 0.5);

        Matter.World.add(engine.world, bodiesToAdd);
    };

    return (
        <section
            ref={containerRef}
            id="services"
            className="relative w-full h-[80vh] md:h-[90vh] bg-white rounded-[30px] md:rounded-[60px] overflow-hidden flex flex-col pt-10 md:pt-24 z-20 shadow-[0_0_50px_rgba(0,0,0,0.5)] opacity-0 transform translate-y-10"
        >

            {/* Tabs Header */}
            <div className="z-10 w-full max-w-5xl mx-auto flex flex-col items-center gap-4 sm:gap-6 px-4 mb-2 sm:mb-4 select-none">
                <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-12">
                    {(Object.keys(TABS) as Array<keyof typeof TABS>).map((tab) => {
                        const isActive = activeTab === tab;
                        return (
                            <button
                                key={tab}
                                onClick={() => spawnPills(tab)}
                                className={`text-[10px] sm:text-xs md:text-sm font-mono tracking-widest transition-all duration-300 uppercase ${isActive ? 'text-black font-bold scale-110' : 'text-gray-400 font-medium hover:text-gray-600'
                                    }`}
                            >
                                {isActive ? `( ${tab} )` : tab}
                            </button>
                        );
                    })}
                </div>

                {/* Subtle Action Hint */}
                <div className="bg-[#D81B60] text-white text-[10px] md:text-xs px-4 py-1.5 rounded-full font-mono tracking-wider shadow-sm animate-pulse">
                    Click to explore more..
                </div>
            </div>

            {/* Physics Container */}
            <div className="flex-1 relative w-full touch-none mt-4">
                <canvas ref={canvasRef} className="absolute inset-0 z-0 w-full h-full cursor-grab active:cursor-grabbing" />
            </div>

        </section>
    );
}
