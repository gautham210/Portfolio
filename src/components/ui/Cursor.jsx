import React, { useEffect, useRef, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import './Cursor.css';

const TRAIL_COUNT = 4;

const prefersReducedMotion =
    typeof window !== 'undefined'
        ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
        : false;

const Cursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    // Trail: each dot is a delayed spring follower
    const trailX = Array.from({ length: TRAIL_COUNT }, () => useMotionValue(0));
    const trailY = Array.from({ length: TRAIL_COUNT }, () => useMotionValue(0));
    const trailSpringX = trailX.map((mv) =>
        useSpring(mv, { stiffness: 100 - Math.random() * 40, damping: 14, mass: 0.4 })
    );
    const trailSpringY = trailY.map((mv) =>
        useSpring(mv, { stiffness: 100 - Math.random() * 40, damping: 14, mass: 0.4 })
    );

    useEffect(() => {
        const moveCursor = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
            if (!prefersReducedMotion) {
                trailX.forEach((mv, i) => {
                    // Each dot lags more than the previous
                    setTimeout(() => mv.set(e.clientX - 4), i * 30);
                });
                trailY.forEach((mv, i) => {
                    setTimeout(() => mv.set(e.clientY - 4), i * 30);
                });
            }
        };

        const handleMouseOver = (e) => {
            if (
                e.target.closest('a') ||
                e.target.closest('button') ||
                e.target.closest('.glass-panel') ||
                e.target.closest('.page-link')
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    const spring = {
        type: "spring",
        stiffness: 150,
        damping: 15,
        mass: 0.5
    };

    return (
        <>
            {/* Primary cursor dot */}
            <motion.div
                className="cursor-dot"
                animate={{
                    x: mousePosition.x - 4,
                    y: mousePosition.y - 4,
                    scale: isHovering ? 0 : 1
                }}
                transition={{ type: "tween", ease: "backOut", duration: 0.1 }}
            />

            {/* Ambient glow */}
            <motion.div
                className="cursor-glow"
                animate={{
                    x: mousePosition.x - 150,
                    y: mousePosition.y - 150,
                    scale: isHovering ? 1.5 : 1,
                    opacity: isHovering ? 0.3 : 0.15
                }}
                transition={spring}
            />

            {/* Trail dots — hidden if reduced-motion */}
            {!prefersReducedMotion && trailSpringX.map((sx, i) => (
                <motion.div
                    key={i}
                    className="cursor-trail"
                    style={{
                        x: sx,
                        y: trailSpringY[i],
                        opacity: 0.5 - i * 0.1,
                        scale: 0.6 - i * 0.1,
                    }}
                />
            ))}
        </>
    );
};

export default Cursor;
