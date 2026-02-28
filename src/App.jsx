import React, { useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import Lenis from '@studio-freight/lenis';
import Hero from './components/Hero/Hero';
import WhatIDo from './components/WhatIDo/WhatIDo';
import Roadmap from './components/Roadmap/Roadmap';
import Certifications from './components/Info/Certifications';
import SkillsGroup from './components/Info/SkillsGroup';
import ContentCreation from './components/Info/ContentCreation';
import Contact from './components/Info/Contact';
import Particles from './components/Atmosphere/Particles';
import Cursor from './components/ui/Cursor';
import './App.css';

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Hue-shift: cyan (0°) → violet (160°) as user scrolls to bottom
  const hue = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const progressFilter = useTransform(hue, (h) => `hue-rotate(${h}deg)`);

  // content-visibility:auto for off-screen sections (perceived performance)
  const lazy = { contentVisibility: 'auto', containIntrinsicSize: '0 800px' };

  return (
    <motion.div
      className="app-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
    >
      <Cursor />
      <motion.div
        className="scroll-progress-bar"
        style={{ scaleX, filter: progressFilter }}
        initial={{ y: -5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      />
      <Particles />
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 1.0, ease: "easeOut" }}
      >
        <Hero />
        <div style={lazy}><WhatIDo /></div>
        <div style={lazy}><Roadmap /></div>
        <div style={lazy}><Certifications /></div>
        <div style={lazy}><SkillsGroup /></div>
        <div style={lazy}><ContentCreation /></div>
        <div style={lazy}><Contact /></div>
      </motion.main>
    </motion.div>
  );
}

export default App;
