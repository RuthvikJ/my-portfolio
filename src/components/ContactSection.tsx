"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const CONTACT_LINKS = [
  {
    id: "email",
    label: "Email",
    tag: "01",
    value: "ruthvik.j04@gmail.com",
    href: "mailto:ruthvik.j04@gmail.com",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg",
    icon: "◉",
    description: "Drop me a message",
    color: "rgba(139, 92, 246, 0.8)",
    borderColor: "rgba(139, 92, 246, 0.35)",
    hoverBorder: "rgba(139, 92, 246, 0.65)",
    hoverBg: "rgba(139, 92, 246, 0.08)",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    tag: "02",
    value: "linkedin.com/in/ruthvik-j-1710r/",
    href: "https://www.linkedin.com/in/ruthvik-j-1710r/",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg",
    icon: "◈",
    description: "Let's connect professionally",
    color: "rgba(0, 212, 255, 0.8)",
    borderColor: "rgba(0, 212, 255, 0.25)",
    hoverBorder: "rgba(0, 212, 255, 0.5)",
    hoverBg: "rgba(0, 212, 255, 0.06)",
  },
  {
    id: "github",
    label: "GitHub",
    tag: "03",
    value: "github.com/RuthvikJ",
    href: "https://github.com/RuthvikJ",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    icon: "✦",
    description: "Check out my work",
    color: "rgba(139, 92, 246, 0.7)",
    borderColor: "rgba(139, 92, 246, 0.25)",
    hoverBorder: "rgba(139, 92, 246, 0.5)",
    hoverBg: "rgba(139, 92, 246, 0.06)",
  },
];

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        background: "#050510",
        position: "relative",
        padding: "100px 60px",
        overflow: "hidden",
      }}
    >
      {/* Top border */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1, ease: "easeOut" }}
        style={{
          position: "absolute",
          top: 0,
          left: "10%",
          width: "80%",
          height: "1px",
          background: "linear-gradient(to right, transparent, rgba(139, 92, 246, 0.4), transparent)",
          transformOrigin: "left",
        }}
      />

      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "300px",
          background: "radial-gradient(ellipse, rgba(139, 92, 246, 0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{
            fontSize: "11px",
            color: "rgba(139, 92, 246, 0.35)",
            fontFamily: "monospace",
            letterSpacing: "0.5em",
            marginBottom: "20px",
          }}
        >
          [ ESTABLISH_CONNECTION ]
        </motion.div>

        {/* Main heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{
            fontSize: "clamp(28px, 4vw, 48px)",
            color: "#ffffff",
            fontFamily: "monospace",
            fontWeight: 600,
            letterSpacing: "0.1em",
            textAlign: "center",
            margin: "0 0 20px 0",
            lineHeight: 1.1,
          }}
        >
          Let's Build Something
          <span
            style={{
              display: "block",
              background: "linear-gradient(135deg, rgba(139,92,246,0.9) 0%, rgba(0,212,255,0.7) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Together
          </span>
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            fontSize: "15px",
            color: "rgba(255,255,255,0.4)",
            fontFamily: "monospace",
            textAlign: "center",
            lineHeight: 1.8,
            maxWidth: "520px",
            margin: "0 0 60px 0",
            letterSpacing: "0.03em",
          }}
        >
          Open to opportunities, collaborations, and interesting problems.
          If you have something worth building — let's talk.
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{
            width: "100%",
            height: "1px",
            background: "linear-gradient(to right, transparent, rgba(139,92,246,0.2), transparent)",
            marginBottom: "60px",
            transformOrigin: "center",
          }}
        />

        {/* Contact cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
            width: "100%",
          }}
        >
          {CONTACT_LINKS.map((link, i) => (
            <motion.a
              key={link.id}
              href={link.href}
              target={link.id !== "email" ? "_blank" : undefined}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.3 + i * 0.1 }}
              onMouseEnter={() => setHovered(link.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "28px 24px",
                border: hovered === link.id
                  ? `1px solid ${link.hoverBorder}`
                  : `1px solid ${link.borderColor}`,
                background: hovered === link.id
                  ? link.hoverBg
                  : "rgba(255,255,255,0.02)",
                borderRadius: "6px",
                textDecoration: "none",
                position: "relative",
                overflow: "hidden",
                transition: "all 0.25s ease",
                boxShadow: hovered === link.id
                  ? `0 0 28px ${link.color.replace("0.8", "0.08")}`
                  : "none",
                cursor: "pointer",
              }}
            >
              {/* Tag */}
              <div
                style={{
                  fontSize: "10px",
                  color: hovered === link.id
                    ? link.color
                    : "rgba(139, 92, 246, 0.3)",
                  fontFamily: "monospace",
                  letterSpacing: "0.3em",
                  marginBottom: "14px",
                  transition: "color 0.2s ease",
                }}
              >
                {link.tag}_CHANNEL
              </div>

              {/* Icon */}
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  marginBottom: "14px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={link.logo}
                  alt={link.label}
                  style={{
                    width: "36px",
                    height: "36px",
                    objectFit: "contain",
                    filter: hovered === link.id
                      ? "brightness(1.2) saturate(1.1)"
                      : "brightness(0.7) saturate(0.8) grayscale(0.3)",
                    transition: "filter 0.25s ease",
                  }}
                />
              </div>

              {/* Label */}
              <div
                style={{
                  fontSize: "18px",
                  color: hovered === link.id ? "#ffffff" : "rgba(255,255,255,0.6)",
                  fontFamily: "monospace",
                  letterSpacing: "0.1em",
                  fontWeight: 500,
                  marginBottom: "8px",
                  transition: "color 0.2s ease",
                }}
              >
                {link.label}
              </div>

              {/* Description */}
              <div
                style={{
                  fontSize: "11px",
                  color: "rgba(255,255,255,0.25)",
                  fontFamily: "monospace",
                  letterSpacing: "0.04em",
                  lineHeight: 1.5,
                  marginBottom: "16px",
                  flex: 1,
                }}
              >
                {link.description}
              </div>

              {/* Value */}
              <div
                style={{
                  fontSize: "11px",
                  color: hovered === link.id
                    ? link.color
                    : "rgba(255,255,255,0.2)",
                  fontFamily: "monospace",
                  letterSpacing: "0.06em",
                  transition: "color 0.2s ease",
                  marginBottom: "16px",
                }}
              >
                {link.value}
              </div>

              {/* CTA */}
              <div
                style={{
                  fontSize: "10px",
                  color: hovered === link.id
                    ? link.color
                    : "rgba(255,255,255,0.15)",
                  fontFamily: "monospace",
                  letterSpacing: "0.2em",
                  transition: "color 0.2s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <span>CONNECT</span>
                <motion.span
                  animate={{ x: hovered === link.id ? 4 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  →
                </motion.span>
              </div>

              {/* Active bottom bar */}
              <motion.div
                animate={{ scaleX: hovered === link.id ? 1 : 0 }}
                transition={{ duration: 0.25 }}
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  height: "2px",
                  background: `linear-gradient(to right, ${link.color}, transparent)`,
                  transformOrigin: "left",
                }}
              />
            </motion.a>
          ))}
        </div>

        {/* Bottom status */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginTop: "60px",
          }}
        >
          <div
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "rgba(0, 212, 255, 0.8)",
              boxShadow: "0 0 8px rgba(0,212,255,0.6)",
            }}
            className="animate-pulse"
          />
          <span
            style={{
              fontSize: "11px",
              color: "rgba(255,255,255,0.25)",
              fontFamily: "monospace",
              letterSpacing: "0.2em",
            }}
          >
            AVAILABLE_FOR_OPPORTUNITIES
          </span>
        </motion.div>
      </div>

      {/* Bottom border */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        style={{
          position: "absolute",
          bottom: 0,
          left: "10%",
          width: "80%",
          height: "1px",
          background: "linear-gradient(to right, transparent, rgba(139, 92, 246, 0.25), transparent)",
          transformOrigin: "left",
        }}
      />
    </section>
  );
}
