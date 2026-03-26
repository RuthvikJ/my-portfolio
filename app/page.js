"use client";
import HeroCore from '../src/components/HeroCore';
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import BootSequence from "../src/components/BootSequence";
import AboutSection from '../src/components/AboutSection';
import ModulesSection from '../src/components/ModulesSection';
import ContactSection from '../src/components/ContactSection';
import ExperienceSection from '../src/components/ExperienceSection';

const customStyles = `
  @keyframes glitch {
    0%, 100% { transform: translate(-50%, -50%) translate(0, 0); }
    20% { transform: translate(-50%, -50%) translate(-2px, 1px); }
    40% { transform: translate(-50%, -50%) translate(2px, -1px); }
    60% { transform: translate(-50%, -50%) translate(-1px, -2px); }
    80% { transform: translate(-50%, -50%) translate(1px, 2px); }
  }

  @keyframes scanline {
    0% { transform: translateY(-100%); }
    100% { transform: translateY(1000%); }
  }

  .glass-panel {
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(4px);
    will-change: transform, opacity;
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    padding: 16px;
    overflow: hidden;
    position: relative;
  }

  .scanline {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 10px;
    background: linear-gradient(to bottom, transparent, rgba(0, 212, 255, 0.4), transparent);
    animation: scanline 4s linear infinite;
    will-change: transform;
    pointer-events: none;
    z-index: 50;
  }
`;

const PORTFOLIO = {
  name: "Ruthvik J",
  role: "Software Engineer",
  focus: ["AI_SYSTEMS", "BACKEND_ENGINEERING", "DATA_PIPELINES", "SOFTWARE_DEVELOPMENT"],
  status: "OPEN_FOR_OPPORTUNITIES",
  skills: [
    { label: "Python & ML", level: 85 },
    { label: "Backend Systems", level: 75 },
    { label: "Data Processing", level: 70 },
    { label: "Cloud & ML Applications", level: 70 },
  ],
};

export default function Page() {
  const [booted, setBooted] = useState(false);
  const [showOperator, setShowOperator] = useState(false);
  const [showSkills, setShowSkills] = useState(false);

  return (
    <>
      <style>{customStyles}</style>

      <AnimatePresence>
        {!booted && <BootSequence onComplete={() => setBooted(true)} />}
      </AnimatePresence>

      {booted && (
        <main
          className="relative w-full"
          style={{ background: '#050510' }}
        >

          {/* FIXED NAV */}
          <nav className="mobile-nav" style={{
            position: 'fixed',
            top: 0,
            right: 0,
            zIndex: 1000,
            padding: '24px 40px',
            display: 'flex',
            alignItems: 'center',
            gap: '40px',
          }}>
            {[
              { label: 'ABOUT', id: 'about' },
              { label: 'WORK', id: 'experience' },
              { label: 'CONTACT', id: 'contact' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  const el = document.getElementById(item.id);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'rgba(255,255,255,0.75)',
                  fontSize: '13px',
                  fontFamily: 'monospace',
                  letterSpacing: '0.25em',
                  cursor: 'pointer',
                  padding: '4px 0',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
                onMouseLeave={e => e.currentTarget.style.color = '#ffffff'}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* FIXED SOCIAL SIDEBAR */}
          <div className="mobile-sidebar" style={{
            position: 'fixed',
            left: '24px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '24px',
          }}>
            {/* Top line */}
            <div className="mobile-sidebar-line" style={{
              width: '1px',
              height: '60px',
              background: 'linear-gradient(to bottom, transparent, rgba(139,92,246,0.3))',
            }} />

            {/* GitHub */}
            <a
              href="https://github.com/RuthvikJ"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              onMouseEnter={e => e.currentTarget.querySelector('img').style.filter = 'brightness(1.3) saturate(1.1)'}
              onMouseLeave={e => e.currentTarget.querySelector('img').style.filter = 'brightness(10) grayscale(1)'}
            >
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
                alt="GitHub"
                style={{
                  width: '20px',
                  height: '20px',
                  filter: 'brightness(10) grayscale(1)',
                  transition: 'filter 0.2s ease',
                }}
              />
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/ruthvik-j-1710r/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              onMouseEnter={e => e.currentTarget.querySelector('img').style.filter = 'brightness(1.3) saturate(1.1)'}
              onMouseLeave={e => e.currentTarget.querySelector('img').style.filter = 'brightness(0.6) grayscale(0.4)'}
            >
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg"
                alt="LinkedIn"
                style={{
                  width: '20px',
                  height: '20px',
                  filter: 'brightness(0.6) grayscale(0.4)',
                  transition: 'filter 0.2s ease',
                }}
              />
            </a>

            {/* Email */}
            <a
              href="mailto:ruthvik.j04@gmail.com"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              onMouseEnter={e => { e.currentTarget.style.color = 'rgba(139,92,246,0.9)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.45)'; }}
            >
              <span style={{
                fontSize: '16px',
                color: 'rgba(255,255,255,0.45)',
                transition: 'color 0.2s ease',
                lineHeight: 1,
              }}>
                ✉
              </span>
            </a>

            {/* Bottom line */}
            <div className="mobile-sidebar-line" style={{
              width: '1px',
              height: '60px',
              background: 'linear-gradient(to bottom, rgba(139,92,246,0.3), transparent)',
            }} />
          </div>

          {/* ── HERO SECTION ── */}
          <div className="hero-container relative w-full h-screen overflow-hidden flex items-center justify-center">

            {/* PERSPECTIVE GRID FLOOR */}
            <div style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              top: 0,
              left: 0,
              background: `
                linear-gradient(to bottom, transparent 50%, rgba(0, 212, 255, 0.05) 100%),
                radial-gradient(circle at center, transparent 0%, #050510 80%)
              `,
              perspective: '1000px',
              overflow: 'hidden',
              zIndex: -1
            }}>
              <div style={{
                position: 'absolute',
                width: '200%',
                height: '200%',
                bottom: '-50%',
                left: '-50%',
                backgroundImage: `
                  linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '60px 60px',
                transform: 'rotateX(60deg)',
                maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 60%)',
              }} />
            </div>

            {/* HUD NAV */}
            <nav className="mobile-hero-hud absolute top-0 w-full p-8 flex justify-between items-start z-50 pointer-events-none">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', pointerEvents: 'auto' }}>
                <div style={{
                  width: '12px',
                  height: '12px',
                  backgroundColor: '#00d4ff',
                  borderRadius: '50%',
                  boxShadow: '0 0 15px #00d4ff',
                  flexShrink: 0
                }} className="animate-pulse" />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '10px', color: '#00d4ff', fontWeight: 'bold', letterSpacing: '0.2em' }}>
                    SYSTEM_STATUS: ACTIVE
                  </span>
                  <span style={{ fontSize: '8px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>
                    LATENCY: 24MS // PORT: 3000
                  </span>
                </div>
              </div>
              <div className="flex gap-8 text-[10px] tracking-[0.3em] text-white/45 pointer-events-auto">
                <span className="hover:text-[#00d4ff] cursor-pointer transition-colors">[ 01_PROJECTS ]</span>
                <span className="hover:text-[#00d4ff] cursor-pointer transition-colors">[ 02_MODELS ]</span>
              </div>
            </nav>

            {/* BACKGROUND GLITCH TEXT */}
            {/* FOREGROUND CUBE */}
            <div className="relative z-10" style={{ transform: 'translateY(-40px)' }}>
              <HeroCore />
            </div>

            {/* MOBILE PANELS WRAPPER */}
            <div className="mobile-panels-wrapper">
              <button
                className="mobile-panel-toggle"
                onClick={() => setShowOperator(!showOperator)}
              >
                {showOperator ? "Hide Operator Profile" : "View Operator Profile"}
              </button>

              {/* LEFT PANEL — OPERATOR PROFILE */}
              <div className={`glass-panel side-panel ${!showOperator ? 'mobile-hidden' : ''}`} style={{
                position: 'absolute',
                left: '25px',
                top: '30%',
                width: '250px',
                zIndex: 20,
                pointerEvents: 'none'
              }}>
                <div className="scanline"></div>
                <div style={{
                  color: '#00d4ff',
                  fontSize: '12px',
                  letterSpacing: '0.2em',
                  borderBottom: '1px solid rgba(0, 212, 255, 0.3)',
                  marginBottom: '12px',
                  paddingBottom: '4px'
                }}>
                  OPERATOR_PROFILE
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.15em', marginBottom: '3px' }}>
                    DESIGNATION
                  </div>
                  <div style={{ fontSize: '13px', color: '#ffffff', letterSpacing: '0.1em', fontWeight: 600 }}>
                    {PORTFOLIO.name}
                  </div>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.15em', marginBottom: '3px' }}>
                    FUNCTION
                  </div>
                  <div style={{ fontSize: '11px', color: '#00d4ff', letterSpacing: '0.1em' }}>
                    {PORTFOLIO.role}
                  </div>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.15em', marginBottom: '6px' }}>
                    FOCUS_AREAS
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {PORTFOLIO.focus.map((item) => (
                      <span key={item} style={{
                        fontSize: '10px',
                        color: '#00d4ff',
                        border: '1px solid rgba(0,212,255,0.3)',
                        padding: '2px 8px',
                        letterSpacing: '0.1em'
                      }}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.15em', marginBottom: '3px' }}>
                    STATUS
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{
                      width: '6px', height: '6px',
                      backgroundColor: '#00d4ff',
                      borderRadius: '50%',
                      boxShadow: '0 0 8px #00d4ff'
                    }} className="animate-pulse" />
                    <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.8)', letterSpacing: '0.1em' }}>
                      {PORTFOLIO.status}
                    </span>
                  </div>
                </div>
              </div>

              <button
                className="mobile-panel-toggle"
                onClick={() => setShowSkills(!showSkills)}
              >
                {showSkills ? "Hide Skill Matrix" : "View Skill Matrix"}
              </button>

              {/* RIGHT PANEL — SKILL MATRIX */}
              <div className={`glass-panel side-panel ${!showSkills ? 'mobile-hidden' : ''}`} style={{
                position: 'absolute',
                right: '25px',
                top: '35%',
                width: '260px',
                zIndex: 20
              }}>
                <div className="scanline"></div>
                <div style={{
                  color: '#00d4ff',
                  fontSize: '12px',
                  letterSpacing: '0.2em',
                  borderBottom: '1px solid rgba(0, 212, 255, 0.3)',
                  marginBottom: '16px',
                  paddingBottom: '4px'
                }}>
                  SKILL_MATRIX
                </div>
                {PORTFOLIO.skills.map((skill, i) => (
                  <div key={skill.label} style={{ marginBottom: '14px' }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '11px',
                      color: 'rgba(255,255,255,0.5)',
                      letterSpacing: '0.1em',
                      marginBottom: '4px'
                    }}>
                      <span>{skill.label}</span>
                      <span>{skill.level}%</span>
                    </div>
                    <div style={{ width: '100%', height: '2px', backgroundColor: 'rgba(255,255,255,0.08)' }}>
                      <div style={{
                        width: `${skill.level}%`,
                        height: '100%',
                        backgroundColor: i === 0 ? '#00d4ff' : 'rgba(0,212,255,0.5)',
                        boxShadow: i === 0 ? '0 0 6px #00d4ff' : 'none'
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
          {/* ── END HERO SECTION ── */}

          <div id="about"><AboutSection /></div>
          <ExperienceSection />
          <ModulesSection />
          <div id="contact"><ContactSection /></div>
        </main>
      )}
    </>
  );
}