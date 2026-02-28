import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, TrendingUp, Users, ExternalLink } from 'lucide-react';
import TiltWrapper from '../ui/TiltWrapper';
import './ContentCreation.css';

const prefersReducedMotion =
    typeof window !== 'undefined'
        ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
        : false;

// Parallax thumbnail — shifts background-position on mousemove
const ParallaxThumb = ({ thumb, bg, children }) => {
    const ref = useRef(null);
    const [pos, setPos] = useState({ x: 50, y: 50 }); // percentage

    const handleMouseMove = (e) => {
        if (prefersReducedMotion) return;
        const rect = ref.current.getBoundingClientRect();
        const xPct = ((e.clientX - rect.left) / rect.width) * 100;
        const yPct = ((e.clientY - rect.top) / rect.height) * 100;
        // Map 0-100% range into a tight 45-55% shift (±5%)
        setPos({
            x: 45 + (xPct / 100) * 10,
            y: 45 + (yPct / 100) * 10,
        });
    };

    const handleMouseLeave = () => setPos({ x: 50, y: 50 });

    return (
        <div
            ref={ref}
            className="thumbnail-placeholder"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                background: `url('${thumb}') ${pos.x}% ${pos.y}% / cover no-repeat, ${bg}`,
                transition: prefersReducedMotion ? 'none' : 'background-position 0.1s ease-out',
            }}
        >
            {children}
        </div>
    );
};


const thumbnails = [
    {
        views: "96.1K",
        title: "Max Verstappen — Beef with Kyle Larson",
        url: "https://www.instagram.com/p/DCef2EbvzEN/",
        bg: "linear-gradient(160deg, #000d1a 0%, #001f3f 40%, #003580 100%)",
        thumb: "/featured/max.jpg"
    },
    {
        views: "475K",
        title: "Lando Norris — 2025 Edit",
        url: "https://www.instagram.com/p/DKR6MiBhqbC/",
        bg: "linear-gradient(160deg, #1a0d00 0%, #4d2a00 40%, #e87722 100%)",
        thumb: "/featured/lando.jpg"
    },
    {
        views: "19.2K",
        title: "Ollie Bearman — Ferrari Debut",
        url: "https://www.instagram.com/reel/C5L0lukRBX6/",
        bg: "linear-gradient(160deg, #1a0000 0%, #4d0000 40%, #cc0000 100%)",
        thumb: "/featured/ollie.jpg"
    }
];

const ContentCreation = () => {
    return (
        <section className="section content-creation-section container" id="content">
            <motion.div
                className="creation-card glass-panel"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
            >
                <div className="creation-header">
                    <div className="header-info">
                        <h2 className="section-title creation-title">Content Creation</h2>
                        <div className="page-identity">
                            <h3 className="page-name glow-text">@icemanedits7</h3>
                            <a href="https://www.instagram.com/icemanedits7/" target="_blank" rel="noopener noreferrer" className="page-link">
                                <ExternalLink size={20} />
                            </a>
                        </div>
                        <p className="page-niche text-muted">Formula 1 &amp; Motorsports Edits</p>
                    </div>

                    <div className="stats-row">
                        <div className="stat-pill">
                            <Users size={20} className="stat-icon" />
                            <div className="stat-text">
                                <span className="stat-value">15K+</span>
                                <span className="stat-label">Followers</span>
                            </div>
                        </div>
                        <div className="stat-pill">
                            <Play size={20} className="stat-icon" />
                            <div className="stat-text">
                                <span className="stat-value">Millions</span>
                                <span className="stat-label">of Views</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="thumbnails-grid">
                    {thumbnails.map((thumb, idx) => (
                        <a
                            key={idx}
                            href={thumb.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="video-thumbnail"
                            style={{ textDecoration: 'none', display: 'block' }}
                        >
                            <TiltWrapper>
                                <motion.div
                                    whileHover="hover"
                                    initial="rest"
                                    style={{ height: "100%", width: "100%" }}
                                >
                                    <ParallaxThumb thumb={thumb.thumb} bg={thumb.bg}>
                                        <div className="play-overlay">
                                            <Play size={32} fill="white" />
                                        </div>
                                        <motion.div
                                            className="view-count"
                                            variants={{ rest: { y: 10, opacity: 0.8 }, hover: { y: -5, opacity: 1, scale: 1.05 } }}
                                        >
                                            <Play size={14} /> {thumb.views}
                                        </motion.div>

                                        <motion.div
                                            className="preview-fx"
                                            variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
                                        ></motion.div>
                                    </ParallaxThumb>
                                    <p className="thumbnail-title">{thumb.title}</p>
                                </motion.div>
                            </TiltWrapper>
                        </a>
                    ))}
                </div>

                <p className="featured-proof-line">
                    These are just a few featured picks — 345+ edits on this account alone.
                </p>

                <div className="creation-bg-glow"></div>
            </motion.div>
        </section>
    );
};

export default ContentCreation;

