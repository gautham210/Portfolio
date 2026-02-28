import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import './Hero.css';

const Hero = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
        },
    };

    return (
        <section className="hero-section">
            <motion.div
                className="hero-content container"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.h1 variants={itemVariants} className="hero-name glow-text">
                    Gautham Krishna K
                </motion.h1>

                <motion.h2 variants={itemVariants} className="hero-subtitle">
                    Creative Technologist
                </motion.h2>

                <motion.div variants={itemVariants} className="hero-roles text-muted">
                    <span>Freelance Video Editor</span>
                    <span className="dot">•</span>
                    <span>Website & App Builder</span>
                    <span className="dot">•</span>
                    <span>Photo Editor</span>
                </motion.div>

                <motion.p variants={itemVariants} className="hero-bio">
                    Freelance video editor and BSc Computer Science student specializing in high-retention edits,
                    <br className="desktop-break" /> creative development, robotics, and AI-driven workflows.
                </motion.p>
            </motion.div>

            <motion.div
                className="scroll-indicator"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
            >
                <div className="scroll-pulse"></div>
                <ChevronDown size={24} className="scroll-icon" />
            </motion.div>
        </section>
    );
};

export default Hero;
