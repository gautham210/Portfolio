import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Check, Mail, Instagram } from 'lucide-react';
import TiltWrapper from '../ui/TiltWrapper';
import './Contact.css';

// Magnetic wrapper component for buttons
const MagneticButton = ({ children, className }) => {
    const ref = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        // Magnetic pull strength
        setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
    };

    const reset = () => {
        setPosition({ x: 0, y: 0 });
    };

    const { x, y } = position;
    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            animate={{ x, y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

const Contact = () => {
    const options = [
        "Video Editing Project",
        "Website / App Development",
        "Creative Tech Collaboration",
        "Freelance / Part-time Role",
        "Something Experimental"
    ];

    return (
        <section className="section contact-section container" id="contact">
            <motion.div
                className="work-with-me"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <h2 className="section-title">Work With Me</h2>
                <div className="options-grid">
                    {options.map((option, idx) => (
                        <MagneticButton key={idx}>
                            <TiltWrapper>
                                <motion.div
                                    className="option-pill glass-panel"
                                    whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.05)" }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <motion.div animate={{ y: [0, -3, 0] }} transition={{ duration: 2, repeat: Infinity, delay: Math.random() }}>
                                        <Check size={16} className="option-icon" />
                                    </motion.div>
                                    <span>{option}</span>
                                </motion.div>
                            </TiltWrapper>
                        </MagneticButton>
                    ))}
                </div>
            </motion.div>

            <motion.footer
                className="footer"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
            >
                <div className="contact-links">
                    <a href="mailto:gauthamkrishna02102007@gmail.com" className="contact-link">
                        <Mail size={20} />
                        <span>gauthamkrishna02102007@gmail.com</span>
                    </a>
                    <a href="https://www.instagram.com/icemanedits7/" target="_blank" rel="noopener noreferrer" className="contact-link">
                        <Instagram size={20} />
                        <span>@icemanedits7</span>
                    </a>
                </div>
                <p className="copyright text-muted">© {new Date().getFullYear()} Gautham Krishna K. All rights reserved.</p>
            </motion.footer>
        </section>
    );
};

export default Contact;
