import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Film, Settings, Monitor, Scissors, Trophy, Box } from 'lucide-react';
import TiltWrapper from '../ui/TiltWrapper';
import './Roadmap.css';

const milestones = [
    { year: "2019", title: "India's Robotic League", subtitle: "Senior Champion", side: "left", type: "major", iconType: "robotics" },
    { year: "2020", title: "Started Mobile Editing", subtitle: "Kinemaster & VivaVideo", side: "right", type: "minor", iconType: "editing" },
    { year: "2020", title: "Evolve Robotics Olympiad", subtitle: "Runner-up", side: "left", type: "major", iconType: "robotics" },
    { year: "2021", title: "Switched to PC", subtitle: "Filmora 9", side: "right", type: "minor", iconType: "pc" },
    { year: "2022", title: "CapCut PC becomes primary", side: "left", type: "minor", iconType: "editing" },
    { year: "2022–23", title: "ATL Marathon", subtitle: "Top 400 National", side: "right", type: "major", iconType: "robotics" },
    { year: "2023", title: "Evolve Robotics Olympiad & CURIOCON", subtitle: "Evolve: Second Runner-up\nCURIOCON NIT Calicut: Best School Prize", side: "left", type: "major", iconType: "robotics" },
    { year: "2024", title: "Learning Phase", subtitle: "Premiere Pro, After Effects, DaVinci Resolve, Blender, UE5", side: "right", type: "minor", iconType: "learning" },
    { year: "2025", title: "Officially Started Freelancing", subtitle: "Transitioned from free edits to paid client work — turning video editing into a professional service.", side: "right", type: "minor", iconType: "editing" },
    { year: "2025", title: "Turbo Frames", subtitle: "Winner", side: "left", type: "major", iconType: "editing" },
    { year: "2026", title: "INNOAiTE 24-Hour National Hackathon", subtitle: "WINNER", side: "center", type: "final", iconType: "hackathon" }
];

const getIcon = (type) => {
    switch (type) {
        case 'editing': return <Scissors size={18} />;
        case 'pc': return <Monitor size={18} />;
        case 'robotics': return <Settings size={18} />;
        case 'learning': return <Box size={18} />;
        case 'hackathon': return <Trophy size={28} />;
        default: return <Film size={18} />;
    }
};

const verticalSpacing = 200;
const totalHeight = (milestones.length * verticalSpacing) + 200;

const nodes = milestones.map((item, index) => {
    const yPos = index * verticalSpacing + 20;
    const phase = (index / milestones.length) * Math.PI * 2.5;
    let xOffset = Math.sin(phase) * 200;
    if (item.type === 'final') xOffset = 0;
    return { ...item, index, yPos, xOffset };
});

const generateSVGPath = () => {
    let path = "";
    const firstNode = nodes[0];
    path += `M 500,0 `;
    path += `L ${500 + firstNode.xOffset},${firstNode.yPos} `;
    for (let i = 1; i < nodes.length; i++) {
        const prev = nodes[i - 1];
        const node = nodes[i];
        const cp1Y = prev.yPos + (node.yPos - prev.yPos) / 2;
        path += `C ${500 + prev.xOffset},${cp1Y} ${500 + node.xOffset},${cp1Y} ${500 + node.xOffset},${node.yPos} `;
    }
    return path;
};

const svgPath = generateSVGPath();

const prefersReducedMotion =
    typeof window !== 'undefined'
        ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
        : false;

// ─── RoadmapItem ───────────────────────────────────────────────
const RoadmapItem = ({ item, isActive }) => {
    const isFinal = item.type === 'final';
    const isMinor = item.type === 'minor';

    return (
        <motion.div
            className={`roadmap-item roadmap-${item.side} ${isFinal ? 'roadmap-final' : ''} ${isMinor ? 'roadmap-minor' : ''}`}
            data-year={item.year}
            style={{
                top: `${item.yPos}px`,
                left: `calc(50% + ${item.xOffset}px)`,
                willChange: 'transform',
            }}
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            animate={
                !prefersReducedMotion && isActive && !isFinal
                    ? { scale: 1.04 }
                    : { scale: 1 }
            }
        >
            {isFinal ? (
                <div className="roadmap-card-wrapper roadmap-final-wrapper">
                    <div className="roadmap-content glass-panel major-panel hackathon-panel">
                        <h3 className="roadmap-year">{item.year}</h3>
                        <h4 className="roadmap-title">{item.title}</h4>
                        {item.subtitle && <p className="roadmap-subtitle" style={{ whiteSpace: "pre-line", lineHeight: 1.4 }}>{item.subtitle}</p>}
                    </div>
                </div>
            ) : (
                <div className="roadmap-card-wrapper">
                    <TiltWrapper>
                        <div className={`roadmap-content ${isMinor ? 'glass-panel minor-panel' : 'glass-panel major-panel'} ${isActive ? 'node-active' : ''}`}>
                            <h3 className="roadmap-year">{item.year}</h3>
                            <h4 className="roadmap-title">{item.title}</h4>
                            {item.subtitle && <p className="roadmap-subtitle" style={{ whiteSpace: "pre-line", lineHeight: 1.4 }}>{item.subtitle}</p>}
                        </div>
                    </TiltWrapper>
                </div>
            )}

            {!isFinal && (
                <div className={`roadmap-node ${isMinor ? 'node-minor' : ''} ${isActive ? 'node-focused' : ''}`}>
                    <div className="node-icon">{getIcon(item.iconType)}</div>
                    <div className="node-pulse"></div>
                </div>
            )}
        </motion.div>
    );
};

// ─── Roadmap ───────────────────────────────────────────────────
const Roadmap = () => {
    const sectionRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    // 1. Node-synced path draw — pathLength tracks the active node's position
    // Each node occupies an equal slice of the normalised 0→1 range
    const nodeProgress = nodes.map((_, i) => i / (nodes.length - 1));

    const rawPathLength = useMotionValue(0);
    const pathLength = prefersReducedMotion
        ? rawPathLength
        : useSpring(rawPathLength, { stiffness: 70, damping: 28 });

    // Drive pathLength from activeIndex changes
    useEffect(() => {
        rawPathLength.set(nodeProgress[activeIndex] ?? 0);
    }, [activeIndex]);

    // 2. Active node focus — closest node to 45% viewport height
    useEffect(() => {
        if (prefersReducedMotion) return;
        const onScroll = () => {
            const viewportMid = window.scrollY + window.innerHeight * 0.45;
            const sectionTop = sectionRef.current?.offsetTop ?? 0;
            const relY = viewportMid - sectionTop - 160; // 160 ≈ header+margin
            let closest = 0, minDist = Infinity;
            nodes.forEach((node, i) => {
                const d = Math.abs(node.yPos - relY);
                if (d < minDist) { minDist = d; closest = i; }
            });
            setActiveIndex(closest);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <section ref={sectionRef} className="section roadmap-section container" id="roadmap">
            <div style={{ marginBottom: "40px" }}>
                <h2 className="section-title" style={{ marginBottom: "0.2rem" }}>Achievements</h2>
                <p className="text-muted" style={{ margin: 0 }}>A journey through creativity and tech.</p>
            </div>

            <div className="roadmap-viewport">
                <div className="roadmap-track" style={{ height: `${totalHeight}px` }}>

                    <div className="roadmap-curve-svg">
                        <svg width="100%" height="100%" viewBox={`0 0 1000 ${totalHeight}`} preserveAspectRatio="xMidYMin slice">
                            <defs>
                                <linearGradient id="cyanGlow" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#00e5ff" />
                                    <stop offset="50%" stopColor="#7c3aed" />
                                    <stop offset="100%" stopColor="#2563eb" />
                                </linearGradient>
                                <filter id="pathBlur">
                                    <feGaussianBlur stdDeviation="9" />
                                </filter>
                                <filter id="nodeGlow" x="-80%" y="-80%" width="260%" height="260%">
                                    <feGaussianBlur stdDeviation="14" />
                                </filter>
                            </defs>

                            {/* Static ambient glow behind the path */}
                            <path
                                d={svgPath}
                                fill="none"
                                stroke="rgba(0,240,255,0.12)"
                                strokeWidth="32"
                                filter="url(#pathBlur)"
                            />

                            {/* Scroll-drawn glowing path */}
                            <motion.path
                                d={svgPath}
                                fill="none"
                                stroke="url(#cyanGlow)"
                                strokeWidth="6"
                                strokeLinecap="round"
                                style={{ pathLength }}
                            />

                            {/* Active-node glow dot that springs between nodes */}
                            {!prefersReducedMotion && (
                                <motion.circle
                                    r="18"
                                    fill="rgba(0,240,255,0.3)"
                                    filter="url(#nodeGlow)"
                                    initial={{
                                        cx: 500 + nodes[0].xOffset,
                                        cy: nodes[0].yPos,
                                        opacity: 0.35,
                                    }}
                                    animate={{
                                        cx: 500 + (nodes[activeIndex]?.xOffset ?? nodes[0].xOffset),
                                        cy: nodes[activeIndex]?.yPos ?? nodes[0].yPos,
                                        opacity: [0.35, 0.85, 0.35],
                                    }}
                                    transition={{
                                        cx: { type: "spring", stiffness: 55, damping: 18 },
                                        cy: { type: "spring", stiffness: 55, damping: 18 },
                                        opacity: { duration: 1.6, repeat: Infinity, ease: "easeInOut" },
                                    }}
                                />
                            )}
                        </svg>

                        {/* Trophy at final node */}
                        <div
                            className="roadmap-node node-final trophy-node"
                            style={{
                                position: "absolute",
                                left: "50%",
                                top: `${nodes[nodes.length - 1].yPos}px`,
                                transform: "translate(-50%, -50%) rotateX(-12deg)",
                                zIndex: 10,
                            }}
                        >
                            <div className="node-icon">{getIcon(nodes[nodes.length - 1].iconType)}</div>
                            <div className="node-pulse"></div>
                        </div>
                    </div>

                    {nodes.map((item, i) => (
                        <RoadmapItem key={i} item={item} isActive={i === activeIndex} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Roadmap;
