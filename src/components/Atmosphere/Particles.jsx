import React from 'react';
import { motion } from 'framer-motion';
import './Particles.css';

const Particles = () => {
    // Generate random particles
    const particlesArray = Array.from({ length: 40 });

    return (
        <div className="particles-container">
            {particlesArray.map((_, i) => {
                const size = Math.random() * 4 + 1;
                const startX = Math.random() * 100;
                const startY = Math.random() * 100;
                const duration = Math.random() * 20 + 10;
                const delay = Math.random() * 5;

                return (
                    <motion.div
                        key={i}
                        className="particle"
                        style={{
                            width: size,
                            height: size,
                            left: `${startX}vw`,
                            top: `${startY}vh`,
                            mixBlendMode: "screen",
                        }}
                        animate={{
                            y: [0, -100, -200],
                            x: [0, (Math.random() - 0.5) * 100],
                            opacity: [0, 0.15, 0],
                        }}
                        transition={{
                            duration: duration * 2,
                            repeat: Infinity,
                            ease: "linear",
                            delay: delay,
                        }}
                    />
                );
            })}
        </div>
    );
};

export default Particles;
