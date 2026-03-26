"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const TIMELINE = [
  {
    id: 1,
    type: "EDUCATION",
    year: "2010-2020",
    title: "School",
    organization: "SSM Public School",
    description: "Completed primary and secondary education.",
    side: "left",
    accent: "rgba(139, 92, 246, 0.8)",
  },
  {
    id: 2,
    type: "EDUCATION",
    year: "2020-2022",
    title: "Pre-University",
    organization: "Kumarans PU College",
    description: "Completed Pre-University education with focus on Physics, Chemistry, and Mathematics.",
    side: "left",
    accent: "rgba(139, 92, 246, 0.8)",
  },
  {
    id: 3,
    type: "EDUCATION",
    year: "2022-2026",
    title: "B.E. Computer Science",
    organization: "EWIT",
    description: "Currently pursuing Bachelor of Engineering in Computer Science.",
    side: "left",
    accent: "rgba(139, 92, 246, 0.8)",
  },
  {
    id: 4,
    type: "INTERNSHIP",
    year: "2025",
    title: "Python and Data Analytics Intern",
    organization: "Dyashin Technosoft Private ltd",
    description: "Built backend microservices and contributed to production data pipelines. Worked closely with the engineering team on AI-powered features.",
    side: "left",
    accent: "rgba(0, 212, 255, 0.8)",
  },
  {
    id: 5,
    type: "CURRENT",
    year: "NOW",
    title: "Final Year Student",
    organization: "EWIT",
    description: "Currently in final year, actively seeking full-time opportunities in AI engineering, backend systems and data engineering.",
    side: "right",
    accent: "rgba(0, 212, 255, 0.8)",
  },
];

export default function ExperienceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="experience"
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

      <div style={{ maxWidth: "860px", margin: "0 auto" }}>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          style={{ textAlign: "center", marginBottom: "80px" }}
        >
          <div style={{
            fontSize: "10px",
            color: "rgba(139, 92, 246, 0.55)",
            fontFamily: "monospace",
            letterSpacing: "0.5em",
            marginBottom: "16px",
          }}>
            [ SYSTEM_LOG ]
          </div>
          <h2 style={{
            fontSize: "clamp(24px, 3.5vw, 40px)",
            color: "#ffffff",
            fontFamily: "monospace",
            fontWeight: 600,
            letterSpacing: "0.1em",
            margin: "0 0 12px 0",
            lineHeight: 1.1,
          }}>
            My Career &{" "}
            <span style={{
              background: "linear-gradient(135deg, rgba(139,92,246,0.9), rgba(0,212,255,0.7))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              Experience
            </span>
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{
              width: "80px",
              height: "1px",
              background: "linear-gradient(to right, transparent, rgba(139,92,246,0.55), transparent)",
              margin: "0 auto",
              transformOrigin: "center",
            }}
          />
        </motion.div>

        {/* Timeline container */}
        <div
          ref={containerRef}
          style={{ position: "relative", paddingBottom: "40px" }}
        >

          {/* Static background line */}
          <div style={{
            position: "absolute",
            left: "50%",
            top: 0,
            bottom: 0,
            transform: "translateX(-50%)",
            width: "1px",
            background: "rgba(139, 92, 246, 0.08)",
          }} />

          {/* Scroll-driven animated line */}
          <div style={{
            position: "absolute",
            left: "50%",
            top: 0,
            transform: "translateX(-50%)",
            width: "1px",
            height: "100%",
            overflow: "hidden",
          }}>
            <motion.div
              style={{
                width: "100%",
                height: lineHeight,
                background: "linear-gradient(to bottom, rgba(139,92,246,0.9), rgba(0,212,255,0.6), rgba(139,92,246,0.4))",
                boxShadow: "0 0 8px rgba(139,92,246,0.5)",
                position: "relative",
              }}
            >
              {/* Comet head */}
              <motion.div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "rgba(0, 212, 255, 1)",
                  boxShadow: "0 0 12px rgba(0,212,255,1), 0 0 24px rgba(0,212,255,0.6)",
                }}
              />
            </motion.div>
          </div>

          {/* Timeline items */}
          {TIMELINE.map((item, index) => {
            const isLeft = item.side === "left";
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.12 }}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 60px 1fr",
                  marginBottom: "52px",
                  alignItems: "center",
                }}
              >
                {/* Left slot */}
                <div style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  paddingRight: "36px",
                }}>
                  {isLeft && (
                    <div style={{
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(139, 92, 246, 0.18)",
                      borderRadius: "6px",
                      padding: "18px 20px",
                      maxWidth: "300px",
                      textAlign: "right",
                      position: "relative",
                      transition: "border-color 0.2s ease",
                    }}>
                      {/* Connector line */}
                      <div style={{
                        position: "absolute",
                        right: "-37px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: "36px",
                        height: "1px",
                        background: "rgba(139, 92, 246, 0.25)",
                      }} />
                      <div style={{
                        fontSize: "9px",
                        color: item.accent,
                        fontFamily: "monospace",
                        letterSpacing: "0.25em",
                        marginBottom: "6px",
                        opacity: 0.8,
                      }}>
                        {item.type}
                      </div>
                      <div style={{
                        fontSize: "15px",
                        color: "#ffffff",
                        fontFamily: "monospace",
                        fontWeight: 500,
                        letterSpacing: "0.06em",
                        marginBottom: "4px",
                      }}>
                        {item.title}
                      </div>
                      <div style={{
                        fontSize: "11px",
                        color: item.accent,
                        fontFamily: "monospace",
                        letterSpacing: "0.1em",
                        marginBottom: "8px",
                        opacity: 0.8,
                      }}>
                        {item.organization}
                      </div>
                      <div style={{
                        fontSize: "12px",
                        color: "rgba(255,255,255,0.55)",
                        fontFamily: "monospace",
                        lineHeight: 1.7,
                      }}>
                        {item.description}
                      </div>
                    </div>
                  )}
                </div>

                {/* Center dot + year */}
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "6px",
                  zIndex: 2,
                }}>
                  <div style={{
                    fontSize: "10px",
                    color: "rgba(255,255,255,0.65)",
                    fontFamily: "monospace",
                    letterSpacing: "0.1em",
                    fontWeight: 600,
                    textAlign: "center",
                  }}>
                    {item.year}
                  </div>
                  <div style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    background: item.accent,
                    boxShadow: `0 0 14px ${item.accent}`,
                    border: "2px solid rgba(5, 5, 16, 1)",
                    flexShrink: 0,
                  }} />
                </div>

                {/* Right slot */}
                <div style={{
                  paddingLeft: "36px",
                }}>
                  {!isLeft && (
                    <div style={{
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(0, 212, 255, 0.18)",
                      borderRadius: "6px",
                      padding: "18px 20px",
                      maxWidth: "300px",
                      position: "relative",
                      transition: "border-color 0.2s ease",
                    }}>
                      {/* Connector line */}
                      <div style={{
                        position: "absolute",
                        left: "-37px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: "36px",
                        height: "1px",
                        background: "rgba(0, 212, 255, 0.25)",
                      }} />
                      <div style={{
                        fontSize: "9px",
                        color: item.accent,
                        fontFamily: "monospace",
                        letterSpacing: "0.25em",
                        marginBottom: "6px",
                        opacity: 0.8,
                      }}>
                        {item.type}
                      </div>
                      <div style={{
                        fontSize: "15px",
                        color: "#ffffff",
                        fontFamily: "monospace",
                        fontWeight: 500,
                        letterSpacing: "0.06em",
                        marginBottom: "4px",
                      }}>
                        {item.title}
                      </div>
                      <div style={{
                        fontSize: "11px",
                        color: item.accent,
                        fontFamily: "monospace",
                        letterSpacing: "0.1em",
                        marginBottom: "8px",
                        opacity: 0.8,
                      }}>
                        {item.organization}
                      </div>
                      <div style={{
                        fontSize: "12px",
                        color: "rgba(255,255,255,0.55)",
                        fontFamily: "monospace",
                        lineHeight: 1.7,
                      }}>
                        {item.description}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}

          {/* End glow dot */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 1.2 }}
            style={{
              position: "absolute",
              bottom: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: "16px",
              height: "16px",
              borderRadius: "50%",
              background: "rgba(139, 92, 246, 0.9)",
              boxShadow: "0 0 20px rgba(139,92,246,0.8), 0 0 40px rgba(139,92,246,0.4)",
            }}
          />
        </div>
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
