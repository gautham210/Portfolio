import React from 'react';
import { motion } from 'framer-motion';
import { Award, Code, BookOpen, BrainCircuit, ExternalLink } from 'lucide-react';
import TiltWrapper from '../ui/TiltWrapper';
import './Certifications.css';
import './Certifications-drive.css';

const certs = [
    {
        org: "IIT Madras",
        title: "Cyber Security & Ethical Hacking Workshop",
        icon: <Award size={24} />
    },
    {
        org: "IIT Kharagpur",
        title: "Cyber Security Workshop",
        icon: <Award size={24} />
    },
    {
        org: "K-DISC",
        title: "YIP + VOS + Idea Recognition",
        icon: <BrainCircuit size={24} />
    },
    {
        org: "TinkerHub",
        title: "Git Set Go & App Building",
        icon: <Code size={24} />
    },
    {
        org: "School Innovation Marathon",
        title: "Design Thinking",
        icon: <BookOpen size={24} />
    }
];

const Certifications = () => {
    return (
        <section className="section cert-section container" id="certifications">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
            >
                <h2 className="section-title">Certifications & Workshops</h2>
                <div className="cert-grid">
                    {certs.map((cert, idx) => (
                        <TiltWrapper
                            key={idx}
                            className="cert-card"
                            style={{ animationDelay: `${idx * 0.1}s` }}
                        >
                            <div className="cert-icon">{cert.icon}</div>
                            <h3 className="cert-org">{cert.org}</h3>
                            <h4 className="cert-title">{cert.title}</h4>
                            {cert.details && (
                                <ul className="cert-details">
                                    {cert.details.map((detail, dIdx) => (
                                        <li key={dIdx}>{detail}</li>
                                    ))}
                                </ul>
                            )}
                        </TiltWrapper>
                    ))}
                </div>

                <motion.div
                    className="cert-action-container"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                >
                    <a href="https://drive.google.com/drive/folders/1szjhkjCo_X2wB37fmXzqECXEePoKgZku?usp=sharing" target="_blank" rel="noopener noreferrer" className="cert-drive-btn">
                        <span>View All Certificates</span>
                        <ExternalLink size={18} />
                    </a>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Certifications;
