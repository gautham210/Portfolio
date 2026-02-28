import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Scissors, Image, MonitorPlay, Box, Gamepad2, Code2, Smartphone, Cpu, Sparkles } from 'lucide-react';
import './WhatIDo.css';

const skills = [
    {
        title: "Video Editing",
        software: "CapCut PC",
        level: "Advanced, 5+ years",
        icon: <Scissors size={32} />,
        primary: true
    },
    { title: "Photo Editing", icon: <Image size={24} /> },
    { title: "Motion Graphics", level: "Basic", icon: <MonitorPlay size={24} /> },
    { title: "Blender", level: "Basic", icon: <Box size={24} /> },
    { title: "Unreal Engine 5", level: "Basic", icon: <Gamepad2 size={24} /> },
    { title: "Vibe Coder", icon: <Code2 size={24} /> },
    { title: "App Development", icon: <Smartphone size={24} /> },
    { title: "Robotics Prototyping", icon: <Cpu size={24} /> },
    { title: "AI Tool Workflows", icon: <Sparkles size={24} /> }
];

import TiltWrapper from '../ui/TiltWrapper';

const TiltCard = ({ skill, index }) => {
    return (
        <TiltWrapper
            className={`skill-card glass-panel ${skill.primary ? 'skill-card-primary' : ''}`}
            style={{
                animationDelay: `${index * 0.1}s`
            }}
        >
            <div className="skill-icon">
                <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>{skill.icon}</motion.div>
            </div>
            <div className="skill-content">
                <h3>{skill.title}</h3>
                {skill.software && <h4 className="skill-software">{skill.software}</h4>}
                {skill.level && <span className="skill-level">{skill.level}</span>}
            </div>
            <div className="card-glow"></div>
        </TiltWrapper>
    );
};

const WhatIDo = () => {
    return (
        <section className="section what-i-do-section container" id="what-i-do">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="section-title">What I Do</h2>

                <div className="skills-grid">
                    {skills.map((skill, index) => (
                        <TiltCard key={index} skill={skill} index={index} />
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default WhatIDo;
