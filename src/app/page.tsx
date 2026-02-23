import React from 'react';
import Header from '@/components/layout/Header';
import Hero from '@/components/sections/Hero';
import Projects from '@/components/sections/Projects';
import About from '@/components/sections/About';
import Passions from '@/components/sections/Passions';
import Playground from '@/components/sections/Playground';
import SkillsPhysics from '@/components/sections/SkillsPhysics';
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
    <>
      <Header />
      <main className="w-full bg-[#0a0a0a]">
        <Hero />
        <Projects />
        <About />
        <Passions />
        <Playground />
        <SkillsPhysics />
      </main>
      <Contact />
    </>
  );
}
