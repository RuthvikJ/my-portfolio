"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const PROFILE_IMG = "data:image/webp;base64,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";

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section
      ref={ref}
      style={{
        marginTop: '-400px',
        background: '#050510',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '100px 60px',
      }}
    >
      {/* Top border line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1, ease: "easeOut" }}
        style={{
          position: 'absolute',
          top: 0,
          left: '10%',
          width: '80%',
          height: '1px',
          background: 'linear-gradient(to right, transparent, rgba(139, 92, 246, 0.4), transparent)',
          transformOrigin: 'left',
        }}
      />

      {/* Top label */}
      <div style={{
        position: 'absolute',
        top: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: '25px',
        color: '#8b5cf6',
        letterSpacing: '0.4em',
        textTransform: 'uppercase',
        fontFamily: 'monospace',
        whiteSpace: 'nowrap',
      }}>
        ABOUT
      </div>

      {/* Main content */}
      <div style={{
        maxWidth: '960px',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: '1.2fr 0.8fr',
        gap: '80px',
        alignItems: 'center',
        marginTop: '40px',
      }}>

        {/* Left — Bio */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >

          <h1 style={{
            fontSize: 'clamp(32px, 4vw, 46px)',
            color: '#ffffff',
            fontWeight: 400,
            lineHeight: 1,
            margin: '0 0 6px 0',
            letterSpacing: '0.06em',
          }}>
            Ruthvik J
          </h1>

          <div style={{
            fontSize: '13px',
            color: 'rgba(0, 212, 255, 0.6)',
            letterSpacing: '0.25em',
            marginBottom: '32px',
            fontFamily: 'monospace',
            textTransform: 'uppercase',
          }}>
            Software Engineer
          </div>

          <p style={{
            fontSize: '15px',
            color: 'rgba(255,255,255,0.55)',
            lineHeight: 2,
            margin: '0 0 20px 0',
            fontFamily: 'monospace',
          }}>
            Focused on building intelligent backend systems, scalable data pipelines, and AI-driven applications. Hands-on experience
            in Python-based systems, data processing, and ML-assisted applications.

          </p>

          <p style={{
            fontSize: '15px',
            color: 'rgba(255,255,255,0.32)',
            lineHeight: 2,
            margin: 0,
            fontFamily: 'monospace',
          }}>
            Exploring the intersection of machine learning and production systems — creating solutions that are fast, reliable, and practical.
          </p>

          {/* CTA Buttons */}
          <div style={{
            display: 'flex',
            gap: '16px',
            marginTop: '40px',
            flexWrap: 'wrap',
          }}>
            <motion.a
              href="/Ruthvik_J_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                padding: '12px 32px',
                background: 'rgba(139, 92, 246, 0.08)',
                border: '1px solid rgba(139, 92, 246, 0.4)',
                color: 'rgba(139, 92, 246, 0.9)',
                fontSize: '11px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                fontFamily: 'monospace',
                cursor: 'pointer',
                display: 'inline-block',
              }}
            >
              View_Resume
            </motion.a>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                const el = document.getElementById('modules');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{
                padding: '12px 32px',
                background: 'transparent',
                border: '1px solid rgba(0, 212, 255, 0.25)',
                color: 'rgba(0, 212, 255, 0.65)',
                fontSize: '11px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                fontFamily: 'monospace',
                cursor: 'pointer',
              }}
            >
              View_Projects
            </motion.button>
          </div>
        </motion.div>

        {/* Right — Profile Photo */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{
            position: 'relative',
            width: '240px',
            height: '240px',
          }}>

            {/* Large ambient glow */}
            <div style={{
              position: 'absolute',
              inset: '-40px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(139, 92, 246, 0.25) 0%, rgba(139, 92, 246, 0.08) 50%, transparent 75%)',
              filter: 'blur(20px)',
            }} />

            {/* Medium glow ring */}
            <div style={{
              position: 'absolute',
              inset: '-16px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
              filter: 'blur(8px)',
            }} />

            {/* Photo */}
            <img
              src={PROFILE_IMG}
              alt="Ruthvik J"
              style={{
                width: '240px',
                height: '240px',
                borderRadius: '50%',
                objectFit: 'cover',
                position: 'relative',
                zIndex: 1,
                border: '1px solid rgba(139, 92, 246, 0.35)',
                filter: 'brightness(0.92)',
              }}
            />

            {/* Thin cyan outer ring */}
            <div style={{
              position: 'absolute',
              inset: '-6px',
              borderRadius: '50%',
              border: '1px solid rgba(0, 212, 255, 0.1)',
              zIndex: 2,
            }} />

          </div>
        </motion.div>

      </div>

      {/* Bottom border line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        style={{
          position: 'absolute',
          bottom: 0,
          left: '10%',
          width: '80%',
          height: '1px',
          background: 'linear-gradient(to right, transparent, rgba(139, 92, 246, 0.25), transparent)',
          transformOrigin: 'left',
        }}
      />
    </section>
  );
}