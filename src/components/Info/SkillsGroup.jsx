import React from 'react';
import { motion } from 'framer-motion';
import TiltWrapper from '../ui/TiltWrapper';
import './SkillsGroup.css';

const skillCategories = [
    {
        title: "Video Editing",
        groups: [
            {
                name: "Primary Highlight",
                items: [{ name: "CapCut PC", level: "Advanced, 5+ years" }, { name: "DaVinci Resolve", level: "Working knowledge" }]
            }
        ]
    },
    {
        title: "Motion & 3D",
        groups: [
            {
                name: "Basic",
                items: [{ name: "After Effects", level: "Basic" }, { name: "Blender", level: "Basic" }, { name: "Unreal Engine 5", level: "Basic" }]
            }
        ]
    },
    {
        title: "Programming & Tech",
        groups: [
            {
                name: "Stack",
                items: [
                    { name: "Python" },
                    { name: "C++" },
                    { name: "Arduino / Embedded C++" },
                    { name: "Vibe Coder" },
                    { name: "App Development" }
                ]
            }
        ]
    },
    {
        title: "AI Workflow",
        groups: [
            {
                name: "Tools & Systems",
                items: [
                    { name: "Prompt Design" },
                    { name: "AI Image Generation" },
                    { name: "AI Video Generation" },
                    { name: "Stitch" },
                    { name: "Antigravity" }
                ]
            }
        ]
    }
];

const SkillsGroup = () => {
    return (
        <section className="section skills-group-section container" id="skills">
            <div className="skills-master-grid">
                {skillCategories.map((category, idx) => (
                    <motion.div
                        key={idx}
                        className={`skill-category`}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: idx * 0.1 }}
                    >
                        <h2 className="category-title">{category.title}</h2>

                        <div className="category-content-wrapper">
                            {category.groups.map((group, gIdx) => {
                                let glowClass = "";
                                if (category.title === "Video Editing") glowClass = "capcut-glow-card";
                                else if (category.title === "Motion & 3D") glowClass = "motion-glow-card";
                                else if (category.title === "Programming & Tech") glowClass = "dev-glow-card";
                                else glowClass = "ai-glow-card";

                                return (
                                    <TiltWrapper
                                        key={gIdx}
                                        className={`skill-group-box glass-panel ${glowClass}`}
                                        style={{ overflow: 'hidden' }}
                                    >
                                        <div className="mesh-bg"></div>
                                        {category.title === "Video Editing" && (
                                            <div className="capcut-glow-card-layer"></div>
                                        )}
                                        <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>
                                            <h3 className="group-name">{group.name}</h3>
                                            <ul className="group-items">
                                                {group.items.map((item, iIdx) => (
                                                    <li key={iIdx}>
                                                        <span className="item-name">{item.name}</span>
                                                        {item.level && <span className="item-level">{item.level}</span>}
                                                    </li>
                                                ))}
                                            </ul>

                                            {category.title === "Video Editing" && (
                                                <div className="editor-ui-mockup">
                                                    <div className="mock-reel">
                                                        <div className="play-triangle"></div>
                                                    </div>
                                                    <div className="mock-timeline">
                                                        <div className="track-layer bg-blue"></div>
                                                        <div className="track-layer bg-magenta"></div>
                                                        <div className="track-playhead"></div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </TiltWrapper>
                                );
                            })}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default SkillsGroup;
