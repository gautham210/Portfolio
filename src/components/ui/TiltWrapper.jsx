import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const TiltWrapper = ({ children, className = "", style = {} }) => {
    // Track mouse position natively
    const x = useMotionValue(0.5);
    const y = useMotionValue(0.5);

    // Add incredibly smooth spring physics to the mouse tracking
    const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    // Map the normalized cursor [0,1] coordinates to subtle rotation angles
    // For smaller components, a larger angle might feel faster, so keep it subtle
    const rotateX = useTransform(springY, [0, 1], [10, -10]);
    const rotateY = useTransform(springX, [0, 1], [-10, 10]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();

        // Calculate relative mouse position
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Normalize to [0, 1]
        x.set(mouseX / rect.width);
        y.set(mouseY / rect.height);
    };

    const handleMouseLeave = () => {
        // Return exactly to dead center when the mouse leaves
        x.set(0.5);
        y.set(0.5);
    };

    return (
        <motion.div
            className={className}
            style={{
                ...style,
                rotateX,
                rotateY,
                transformStyle: "preserve-3d", // Required for inner elements to pop
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            whileHover={{ scale: 1.02, y: -6, rotateX: 0, rotateY: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            // Add a base entrance animation just to ensure it gracefully appears
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
        >
            {children}
        </motion.div>
    );
};

export default TiltWrapper; 
