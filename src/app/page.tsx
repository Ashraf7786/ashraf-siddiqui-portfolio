import React from 'react';
import Header from '@/components/layout/Header';
import Hero from '@/components/sections/Hero';
import Projects from '@/components/sections/Projects';
import ProjectArchive from '@/components/sections/ProjectArchive';
import About from '@/components/sections/About';
import Passions from '@/components/sections/Passions';
import Playground from '@/components/sections/Playground';
import SkillsPhysics from '@/components/sections/SkillsPhysics';
import Approach from '@/components/sections/Approach';
import Contact from '@/components/sections/Contact';
import ActiveSectionTracker from '@/components/layout/ActiveSectionTracker';

export default function Home() {
  return (
    <>
      <Header />
      <ActiveSectionTracker />
      <main className="w-full bg-[#0a0a0a]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Ashraf Siddiqui",
              url: "https://ashrafsiddiqui.com",
              jobTitle: "Full Stack Web Developer",
              description: "Expert in React, Next.js, Laravel, PHP, and modern web applications.",
              sameAs: [
                "https://github.com/Ashraf7786",
                "https://linkedin.com/in/ashraf-siddiqui"
              ]
            })
          }}
        />
        <section id="hero">
          <Hero />
        </section>
        <Projects />
        <ProjectArchive />
        <About />
        <Approach />
        <Passions />
        <Playground />
        <SkillsPhysics />
      </main>
      <Contact />
    </>
  );
}
