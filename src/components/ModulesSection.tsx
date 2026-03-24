"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState } from "react";

// ─── Data ──────────────────────────────────────────────────────────────────────

const MODULES = [
  {
    id: "projects",
    label: "Projects",
    tag: "01",
    icon: "◈",
    description: "Engineered systems & applications",
    data: [
      {
        name: "Multi-Modal Pediatric Screening System",
        desc: "ML pipeline combining pupillometry, gait sensors and retinal images for risk-based clinical screening.",
        impact: "Integrated 3 data modalities into a single validated screening workflow.",
        tech: ["Python", "LSTM", "BiLSTM", "CNN", "PyCharm"],
        github: "https://github.com/RuthvikJ/multi-model-disease-screening.git",
        demo: null,
        features: [
          "Pupillometry pipeline with blink removal, noise filtering and feature extraction",
          "Risk-based outputs using SVM, ELM, LSTM and BiLSTM models",
          "Retinal image classification via transfer learning",
        ],
        color: "rgba(139, 92, 246, 0.65)",
        symbol: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
        image: "/projects/screening.png",
      },
      {
        name: "Automated Futures Trading System",
        desc: "Real-time trading system processing WebSocket market streams with automated execution and risk controls.",
        impact: "Stable order flow validated through extended testnet dry-runs.",
        tech: ["Python", "WebSocket", "REST APIs", "Pandas"],
        github: "https://github.com/RuthvikJ/Binance-tradebot.git",
        demo: null,
        features: [
          "Live market data ingestion via WebSocket and REST API order management",
          "Position sizing constraints, trading toggles and structured error handling",
          "Testnet validation confirming strategy stability and API reliability",
        ],
        color: "rgba(0, 212, 255, 0.55)",
        symbol: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Binance_Logo.svg",
        image: "/projects/trading.png",
      },
      {
        name: "Gesture-Controlled Game Interface",
        desc: "Computer vision system mapping hand gestures to keyboard commands for real-time gameplay control.",
        impact: "Low-latency gesture recognition suitable for real-time interaction.",
        tech: ["Python", "OpenCV", "MediaPipe", "pynput"],
        github: "https://github.com/RuthvikJ/gesture-control-game-interface.git",
        demo: null,
        features: [
          "MediaPipe hand-landmark detection on live webcam frames",
          "Gesture-to-keyboard mapping with OpenCV frame processing",
          "Optimized for low-latency real-time game interaction",
        ],
        color: "rgba(139, 92, 246, 0.45)",
        symbol: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg",
        image: "/projects/gesture.png",
      },
      {
        name: "Women Safety Mobile App",
        desc: "Mobile application for women's safety with real-time location sharing and emergency contacts.",
        impact: "Dual-trigger SOS system combining manual and sensor-based activation.",
        tech: ["Android", "GPS", "Accelerometer", "SMS API"],
        github: "#",
        demo: null,
        features: [
          "SOS activation via manual input and shake-based accelerometer detection",
          "Real-time GPS location tracking with SMS alerts to emergency contacts",
          "Integrated accelerometer and GPS sensors for reliable background detection",
        ],
        color: "rgba(0, 212, 255, 0.4)",
        symbol: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg",
      },
    ],
  },
  {
    id: "skills",
    label: "Skills",
    tag: "02",
    icon: "◎",
    description: "Technologies & expertise",
    data: [
      { category: "Languages", items: ["Python", "C", "SQL", "JavaScript", "Java"] },
      { category: "Libraries", items: ["Pandas", "NumPy", "Scikit-learn", "OpenCV", "MediaPipe"] },
      { category: "Networking", items: ["REST APIs", "WebSocket", "Apache Kafka", "SQL Databases", "FastAPI"] },
      { category: "ML Models", items: ["SVM", "LSTM", "BiLSTM", "ELM", "AI Agents"] },
      { category: "Tools", items: ["Git", "VS Code", "Jupyter", "PyCharm", "Antigravity"] },
    ],
  },
  {
    id: "certs",
    label: "Certifications",
    tag: "03",
    icon: "✦",
    description: "Credentials & achievements",
    data: [
      {
        name: "AWS Academy Cloud Foundations",
        issuer: "Amazon Web Services",
        year: "2025",
        link: "/certs/aws.png",
        badge: "AWS",
        accentColor: "rgba(255, 153, 0, 0.65)",
      },
      {
        name: "Software Engineering Virtual Experience",
        issuer: "JPMorgan Chase — Forage",
        year: "2026",
        link: "/certs/jpmorgan.png",
        badge: "JPM",
        accentColor: "rgba(0, 105, 187, 0.65)",
      },
      {
        name: "AI Agents Intensive",
        issuer: "Google",
        year: "2025",
        link: "#",
        badge: "GGL",
        accentColor: "rgba(66, 133, 244, 0.65)",
      },
      {
        name: "Cyber Security",
        issuer: "Ethnotech Academic Solutions",
        year: "2024",
        link: "/certs/cybersecurity.png",
        badge: "SEC",
        accentColor: "rgba(139, 92, 246, 0.65)",
      },
      {
        name: "Data Science using Python",
        issuer: "Ethnotech Academic Solutions",
        year: "2024",
        link: "/certs/datascience.png",
        badge: "DS",
        accentColor: "rgba(0, 212, 255, 0.65)",
      },
      {
        name: "Java Programming",
        issuer: "Ethnotech Academic Solutions",
        year: "2023",
        link: "/certs/java.png",
        badge: "JAVA",
        accentColor: "rgba(237, 139, 0, 0.65)",
      },
      {
        name: "Web Programming",
        issuer: "Ethnotech Academic Solutions",
        year: "2024",
        link: "/certs/webprogramming.png",
        badge: "WEB",
        accentColor: "rgba(255, 103, 51, 0.65)",
      },
      {
        name: "Web Technologies",
        issuer: "Ethnotech Academic Solutions",
        year: "2024",
        link: "/certs/webtechnologies.png",
        badge: "WT",
        accentColor: "rgba(0, 180, 120, 0.65)",
      },
    ],
  },
];

// ─── Skill icons (SVG URLs) ────────────────────────────────────────────────

const SKILL_ICONS: Record<string, string> = {
  Python: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  C: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
  SQL: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  JavaScript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  Java: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  Pandas: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg",
  NumPy: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg",
  "Scikit-learn": "https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg",
  OpenCV: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg",
  MediaPipe: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  "REST APIs": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  WebSocket: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  "Apache Kafka": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachekafka/apachekafka-original.svg",
  "SQL Databases": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  FastAPI: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
  SVM: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  LSTM: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  BiLSTM: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  ELM: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  "AI Agents": "https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg",
  Git: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  "VS Code": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
  Jupyter: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg",
  PyCharm: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pycharm/pycharm-original.svg",
  Antigravity: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
};

// ─── Square Placeholder ───────────────────────────────────────────────────────

function SquarePlaceholder({
  accentColor = "rgba(139,92,246,0.5)",
  size = 130,
  symbol = "◈",
  label = "",
}: {
  accentColor?: string;
  size?: number;
  symbol?: string;
  label?: string;
}) {
  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        flexShrink: 0,
        background: "rgba(8, 6, 22, 0.95)",
        border: `1px solid ${accentColor}`,
        borderRadius: "4px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        boxShadow: `0 0 20px ${accentColor.replace(/[\d.]+\)$/, "0.12)")}`,
      }}
    >
      {/* Grid bg */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(139,92,246,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139,92,246,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
        }}
      />
      {/* Corner accents */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "14px",
          height: "14px",
          borderTop: `1px solid ${accentColor}`,
          borderLeft: `1px solid ${accentColor}`,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: "14px",
          height: "14px",
          borderBottom: `1px solid ${accentColor}`,
          borderRight: `1px solid ${accentColor}`,
        }}
      />
      {/* Symbol */}
      <div
        style={{
          fontSize: `${size * 0.28}px`,
          color: accentColor,
          zIndex: 1,
          lineHeight: 1,
          textShadow: `0 0 16px ${accentColor}`,
        }}
      >
        {symbol}
      </div>
      {label && (
        <div
          style={{
            fontSize: "8px",
            color: "rgba(255,255,255,0.2)",
            fontFamily: "monospace",
            letterSpacing: "0.15em",
            marginTop: "8px",
            zIndex: 1,
          }}
        >
          {label}
        </div>
      )}
    </div>
  );
}

// ─── Wide Placeholder (for detail view) ──────────────────────────────────────

function WidePlaceholder({
  accentColor = "rgba(139,92,246,0.5)",
  height = 220,
  symbol = "◈",
  badge = "",
}: {
  accentColor?: string;
  height?: number;
  symbol?: string;
  badge?: string;
}) {
  return (
    <div
      style={{
        width: "100%",
        height: `${height}px`,
        background: "rgba(8, 6, 22, 0.95)",
        border: `1px solid ${accentColor}`,
        borderRadius: "4px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        boxShadow: `0 0 28px ${accentColor.replace(/[\d.]+\)$/, "0.1)")}`,
        flexShrink: 0,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(139,92,246,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139,92,246,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "24px 24px",
        }}
      />
      {[
        { top: 0, left: 0, borderTop: true, borderLeft: true },
        { top: 0, right: 0, borderTop: true, borderRight: true },
        { bottom: 0, left: 0, borderBottom: true, borderLeft: true },
        { bottom: 0, right: 0, borderBottom: true, borderRight: true },
      ].map((corner, idx) => (
        <div
          key={idx}
          style={{
            position: "absolute",
            top: corner.top !== undefined ? corner.top : undefined,
            bottom: corner.bottom !== undefined ? corner.bottom : undefined,
            left: corner.left !== undefined ? corner.left : undefined,
            right: corner.right !== undefined ? corner.right : undefined,
            width: "18px",
            height: "18px",
            borderTop: corner.borderTop ? `1px solid ${accentColor}` : undefined,
            borderBottom: corner.borderBottom ? `1px solid ${accentColor}` : undefined,
            borderLeft: corner.borderLeft ? `1px solid ${accentColor}` : undefined,
            borderRight: corner.borderRight ? `1px solid ${accentColor}` : undefined,
          }}
        />
      ))}
      <div
        style={{
          fontSize: badge ? "36px" : "40px",
          color: accentColor,
          zIndex: 1,
          lineHeight: 1,
          textShadow: `0 0 24px ${accentColor}`,
          fontFamily: "monospace",
          fontWeight: 700,
        }}
      >
        {badge || symbol}
      </div>
      <div
        style={{
          fontSize: "10px",
          color: "rgba(255,255,255,0.18)",
          fontFamily: "monospace",
          letterSpacing: "0.2em",
          marginTop: "10px",
          zIndex: 1,
        }}
      >
        PREVIEW
      </div>
    </div>
  );
}

// ─── Projects Panel ───────────────────────────────────────────────────────────

function ProjectsPanel({ data }: { data: any[] }) {
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [gridHovered, setGridHovered] = useState<number | null>(null);
  const [btnHovered, setBtnHovered] = useState<string | null>(null);

  if (selectedProject) {
    return (
      <motion.div
        key="detail"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
      >
        {/* Back */}
        <button
          onClick={() => setSelectedProject(null)}
          onMouseEnter={() => setBtnHovered("back")}
          onMouseLeave={() => setBtnHovered(null)}
          style={{
            fontSize: "11px",
            color: btnHovered === "back"
              ? "rgba(139, 92, 246, 0.9)"
              : "rgba(139, 92, 246, 0.55)",
            fontFamily: "monospace",
            letterSpacing: "0.2em",
            background: "none",
            border: btnHovered === "back"
              ? "1px solid rgba(139, 92, 246, 0.45)"
              : "1px solid rgba(139, 92, 246, 0.2)",
            padding: "9px 20px",
            borderRadius: "2px",
            cursor: "pointer",
            marginBottom: "28px",
            transition: "all 0.2s ease",
            boxShadow: btnHovered === "back"
              ? "0 0 12px rgba(139,92,246,0.1)"
              : "none",
          }}
        >
          ← BACK TO PROJECTS
        </button>

        {/* Detail grid */}
        <div
          className="mobile-detail-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "36px",
            alignItems: "start",
          }}
        >
          {/* LEFT */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <div
              style={{
                fontSize: "26px",
                color: "#ffffff",
                fontFamily: "monospace",
                letterSpacing: "0.06em",
                fontWeight: 600,
                lineHeight: 1.15,
              }}
            >
              {selectedProject.name}
            </div>

            <div
              style={{
                fontSize: "15px",
                color: "rgba(255,255,255,0.5)",
                fontFamily: "monospace",
                lineHeight: 1.85,
              }}
            >
              {selectedProject.desc}
            </div>

            {/* Impact */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "10px",
                padding: "12px 16px",
                border: "1px solid rgba(0, 212, 255, 0.18)",
                background: "rgba(0, 212, 255, 0.03)",
                borderRadius: "3px",
              }}
            >
              <div
                style={{
                  width: "5px",
                  height: "5px",
                  borderRadius: "50%",
                  background: "rgba(0, 212, 255, 0.7)",
                  boxShadow: "0 0 8px rgba(0,212,255,0.5)",
                  flexShrink: 0,
                  marginTop: "5px",
                }}
              />
              <span
                style={{
                  fontSize: "12px",
                  color: "rgba(0, 212, 255, 0.65)",
                  fontFamily: "monospace",
                  lineHeight: 1.7,
                }}
              >
                {selectedProject.impact}
              </span>
            </div>

            {/* Tech */}
            <div>
              <div
                style={{
                  fontSize: "16px",
                  color: "rgba(139, 92, 246, 0.4)",
                  fontFamily: "monospace",
                  letterSpacing: "0.28em",
                  marginBottom: "12px",
                }}
              >
                TECH STACK
              </div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "7px",
                }}
              >
                {selectedProject.tech.map((t: string) => (
                  <span
                    key={t}
                    style={{
                      fontSize: "13px",
                      color: "rgba(0, 212, 255, 0.65)",
                      border: "1px solid rgba(0, 212, 255, 0.2)",
                      background: "rgba(0, 212, 255, 0.04)",
                      padding: "5px 14px",
                      fontFamily: "monospace",
                      letterSpacing: "0.1em",
                      borderRadius: "2px",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div
              style={{
                display: "flex",
                gap: "12px",
                marginTop: "4px",
              }}
            >
              <a
                href={selectedProject.github}
                onMouseEnter={() => setBtnHovered("gh")}
                onMouseLeave={() => setBtnHovered(null)}
                style={{
                  fontSize: "14px",
                  marginTop: "50px",
                  color: "rgba(210, 196, 241, 0.9)",
                  fontFamily: "monospace",
                  letterSpacing: "0.18em",
                  textDecoration: "none",
                  border: btnHovered === "gh"
                    ? "1px solid rgba(139, 92, 246, 1)"
                    : "1px solid rgba(139, 92, 246, 0.35)",
                  background: btnHovered === "gh"
                    ? "rgba(139, 92, 246, 0.12)"
                    : "rgba(139, 92, 246, 0.06)",
                  padding: "11px 28px",
                  borderRadius: "2px",
                  transition: "all 0.2s ease",
                  boxShadow: btnHovered === "gh"
                    ? "0 0 14px rgba(139,92,246,0.15)"
                    : "none",
                }}
              >
                GITHUB
              </a>
              {selectedProject.demo && (
                <a
                  href={selectedProject.demo}
                  onMouseEnter={() => setBtnHovered("demo")}
                  onMouseLeave={() => setBtnHovered(null)}
                  style={{
                    fontSize: "12px",
                    color: "rgba(0, 212, 255, 0.8)",
                    fontFamily: "monospace",
                    letterSpacing: "0.18em",
                    textDecoration: "none",
                    border: btnHovered === "demo"
                      ? "1px solid rgba(0, 212, 255, 0.45)"
                      : "1px solid rgba(0, 212, 255, 0.25)",
                    background: btnHovered === "demo"
                      ? "rgba(0, 212, 255, 0.07)"
                      : "rgba(0, 212, 255, 0.03)",
                    padding: "11px 28px",
                    borderRadius: "2px",
                    transition: "all 0.2s ease",
                    boxShadow: btnHovered === "demo"
                      ? "0 0 14px rgba(0,212,255,0.12)"
                      : "none",
                  }}
                >
                  LIVE DEMO
                </a>
              )}
            </div>
          </div>

          {/* RIGHT */}
          <div
            className="mobile-detail-grid-right"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "18px",
            }}
          >
            <div
              style={{
                width: "400px",
                height: "240px",
                alignSelf: "center",
                background: "rgba(8, 6, 22, 0.95)",
                border: `1px solid ${selectedProject.color}`,
                borderRadius: "4px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
                boxShadow: `0 0 20px ${selectedProject.color.replace(/[\d.]+\)$/, "0.08)")}`,
                willChange: "transform",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: `linear-gradient(rgba(139,92,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.04) 1px, transparent 1px)`,
                  backgroundSize: "24px 24px",
                }}
              />
              {[[{ top: 0, left: 0, bt: true, bl: true }, { top: 0, right: 0, bt: true, br: true }, { bottom: 0, left: 0, bb: true, bl: true }, { bottom: 0, right: 0, bb: true, br: true }]].flat().map((c: any, idx: number) => (
                <div
                  key={idx}
                  style={{
                    position: "absolute",
                    top: c.top !== undefined ? c.top : undefined,
                    bottom: c.bottom !== undefined ? c.bottom : undefined,
                    left: c.left !== undefined ? c.left : undefined,
                    right: c.right !== undefined ? c.right : undefined,
                    width: "16px",
                    height: "16px",
                    borderTop: c.bt ? `1px solid ${selectedProject.color}` : undefined,
                    borderBottom: c.bb ? `1px solid ${selectedProject.color}` : undefined,
                    borderLeft: c.bl ? `1px solid ${selectedProject.color}` : undefined,
                    borderRight: c.br ? `1px solid ${selectedProject.color}` : undefined,
                  }}
                />
              ))}
              {selectedProject.image ? (
                <img
                  src={selectedProject.image}
                  alt={selectedProject.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    position: "relative",
                    zIndex: 1,
                    opacity: 0.9,
                  }}
                />
              ) : selectedProject.symbol.startsWith("http") ? (
                <img
                  src={selectedProject.symbol}
                  alt={selectedProject.name}
                  style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "contain",
                    filter: "brightness(1.1)",
                    zIndex: 1,
                    position: "relative",
                  }}
                />
              ) : (
                <div
                  style={{
                    fontSize: "52px",
                    color: selectedProject.color,
                    zIndex: 1,
                    lineHeight: 1,
                    textShadow: `0 0 28px ${selectedProject.color}`,
                  }}
                >
                  {selectedProject.symbol}
                </div>
              )}
              <div
                style={{
                  fontSize: "10px",
                  color: "rgba(255,255,255,0.18)",
                  fontFamily: "monospace",
                  letterSpacing: "0.2em",
                  marginTop: "10px",
                  zIndex: 1,
                }}
              >
                PREVIEW
              </div>
            </div>

            {/* Features */}
            <div
              style={{
                border: "1px solid rgba(139, 92, 246, 0.15)",
                background: "rgba(255,255,255,0.01)",
                borderRadius: "3px",
                padding: "20px 24px",
              }}
            >
              <div
                style={{
                  fontSize: "13px",
                  color: "rgba(139, 92, 246, 0.45)",
                  fontFamily: "monospace",
                  letterSpacing: "0.28em",
                  marginBottom: "14px",
                }}
              >
                KEY FEATURES
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                {selectedProject.features.map((f: string, idx: number) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "10px",
                    }}
                  >
                    <span
                      style={{
                        color: "rgba(139, 92, 246, 0.5)",
                        fontFamily: "monospace",
                        fontSize: "11px",
                        flexShrink: 0,
                        marginTop: "2px",
                      }}
                    >
                      ◆
                    </span>
                    <span
                      style={{
                        fontSize: "13px",
                        color: "rgba(255,255,255,0.52)",
                        fontFamily: "monospace",
                        lineHeight: 1.7,
                      }}
                    >
                      {f}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Grid view
  return (
    <motion.div
      key="grid"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div
        className="mobile-modules-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          justifyContent: "center",
          gap: "18px",
        }}
      >
        {data.map((project: any, i: number) => (
          <motion.div
            key={project.name}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.3 }}
            onMouseEnter={() => setGridHovered(i)}
            onMouseLeave={() => setGridHovered(null)}
            whileHover={{ scale: 1.02 }}
            style={{
              border: gridHovered === i
                ? "1px solid rgba(139, 92, 246, 0.48)"
                : "1px solid rgba(139, 92, 246, 0.18)",
              background: gridHovered === i
                ? "rgba(139, 92, 246, 0.04)"
                : "rgba(255,255,255,0.015)",
              borderRadius: "6px",
              overflow: "hidden",
              transition: "border-color 0.22s ease, background 0.22s ease",
              boxShadow: gridHovered === i
                ? "0 4px 18px rgba(139,92,246,0.08)"
                : "none",
              cursor: "default",
              willChange: "transform",
            }}
          >
            {/* Square thumbnail + name side by side */}
            <div
              style={{
                display: "flex",
                gap: "0px",
              }}
            >
              {/* Square thumbnail — left */}
              <div
                style={{
                  width: "130px",
                  height: "130px",
                  flexShrink: 0,
                  background: "rgba(8, 6, 22, 0.95)",
                  borderRight: `1px solid ${project.color.replace(/[\d.]+\)$/, "0.18)")}`,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `
                      linear-gradient(rgba(139,92,246,0.05) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(139,92,246,0.05) 1px, transparent 1px)
                    `,
                    backgroundSize: "18px 18px",
                  }}
                />
                {project.symbol.startsWith("http") ? (
                  <img
                    src={project.symbol}
                    alt={project.name}
                    style={{
                      width: "48px",
                      height: "48px",
                      objectFit: "contain",
                      filter: "brightness(1.1)",
                      zIndex: 1,
                      position: "relative",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      fontSize: "32px",
                      color: project.color,
                      zIndex: 1,
                      lineHeight: 1,
                      textShadow: `0 0 16px ${project.color}`,
                    }}
                  >
                    {project.symbol}
                  </div>
                )}
                <div
                  style={{
                    fontSize: "8px",
                    color: "rgba(255,255,255,0.15)",
                    fontFamily: "monospace",
                    letterSpacing: "0.15em",
                    marginTop: "8px",
                    zIndex: 1,
                  }}
                >
                  {project.tech[0]}
                </div>
              </div>

              {/* Info — right */}
              <div
                style={{
                  flex: 1,
                  padding: "14px 16px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: "10px",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: "15px",
                      color: "#ffffff",
                      fontFamily: "monospace",
                      letterSpacing: "0.07em",
                      fontWeight: 500,
                      marginBottom: "8px",
                    }}
                  >
                    {project.name}
                  </div>
                  <div
                    style={{
                      fontSize: "13px",
                      color: "rgba(255,255,255,0.42)",
                      fontFamily: "monospace",
                      lineHeight: 1.75,
                    }}
                  >
                    {project.desc}
                  </div>
                </div>

                <button
                  onClick={() => setSelectedProject(project)}
                  onMouseEnter={() => setBtnHovered(`details-${i}`)}
                  onMouseLeave={() => setBtnHovered(null)}
                  style={{
                    alignSelf: "flex-start",
                    fontSize: "11px",
                    color: btnHovered === `details-${i}`
                      ? "rgba(139, 92, 246, 1)"
                      : "rgba(139, 92, 246, 0.75)",
                    fontFamily: "monospace",
                    letterSpacing: "0.2em",
                    background: btnHovered === `details-${i}`
                      ? "rgba(139, 92, 246, 0.1)"
                      : "rgba(139, 92, 246, 0.05)",
                    border: btnHovered === `details-${i}`
                      ? "1px solid rgba(139, 92, 246, 0.5)"
                      : "1px solid rgba(139, 92, 246, 0.28)",
                    padding: "8px 20px",
                    borderRadius: "2px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    boxShadow: btnHovered === `details-${i}`
                      ? "0 0 12px rgba(139,92,246,0.12)"
                      : "none",
                  }}
                >
                  DETAILS →
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Skills Panel ─────────────────────────────────────────────────────────────

function SkillsPanel({ data }: { data: any[] }) {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "32px",
      }}
    >
      {data.map((group: any, i: number) => (
        <motion.div
          key={group.category}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.07, duration: 0.3 }}
        >
          {/* Category header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              marginBottom: "14px",
            }}
          >
            <div
              style={{
                fontSize: "10px",
                color: "rgba(139, 92, 246, 0.55)",
                fontFamily: "monospace",
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
              }}
            >
              {group.category}
            </div>
            <div
              style={{
                flex: 1,
                height: "1px",
                background: "rgba(139, 92, 246, 0.1)",
              }}
            />
          </div>

          {/* Skill cards grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(90px, 1fr))",
              gap: "12px",
            }}
          >
            {group.items.map((item: string) => {
              const isHovered = hoveredSkill === `${group.category}-${item}`;
              return (
                <div
                  key={item}
                  onMouseEnter={() => setHoveredSkill(`${group.category}-${item}`)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  style={{
                    minHeight: "100px",
                    maxWidth: "110px",
                    padding: "12px 8px",
                    background: isHovered
                      ? "rgba(139, 92, 246, 0.08)"
                      : "rgba(255,255,255,0.02)",
                    border: isHovered
                      ? "1px solid rgba(139, 92, 246, 0.42)"
                      : "1px solid rgba(139, 92, 246, 0.1)",
                    borderRadius: "4px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    cursor: "default",
                    transition: "all 0.18s ease",
                    transform: isHovered ? "scale(1.04)" : "scale(1)",
                    boxShadow: isHovered
                      ? "0 2px 10px rgba(139,92,246,0.1)"
                      : "none",
                    willChange: "transform",
                  }}
                >
                  {/* Icon */}
                  <div
                    style={{
                      width: "38px",
                      height: "38px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {SKILL_ICONS[item] ? (
                      <img
                        src={SKILL_ICONS[item]}
                        alt={item}
                        style={{
                          width: "40px",
                          height: "40px",
                          objectFit: "contain",
                          filter: isHovered ? "brightness(1.15) saturate(1.1)" : "brightness(0.8) saturate(0.9)",
                          transition: "filter 0.2s ease",
                        }}
                      />
                    ) : (
                      <span
                        style={{
                          fontSize: "22px",
                          fontFamily: "monospace",
                          color: isHovered ? "rgba(139, 92, 246, 0.9)" : "rgba(255,255,255,0.5)",
                          transition: "color 0.2s ease",
                        }}
                      >
                        ◈
                      </span>
                    )}
                  </div>
                  {/* Name */}
                  <div
                    style={{
                      fontSize: "11px",
                      color: isHovered
                        ? "rgba(255,255,255,0.85)"
                        : "rgba(255,255,255,0.45)",
                      fontFamily: "monospace",
                      letterSpacing: "0.08em",
                      textAlign: "center",
                      lineHeight: 1.3,
                      transition: "color 0.2s ease",
                    }}
                  >
                    {item}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Certs Panel ──────────────────────────────────────────────────────────────

function CertsPanel({ data }: { data: any[] }) {
  const [selectedCert, setSelectedCert] = useState<any | null>(null);
  const [listHovered, setListHovered] = useState<number | null>(null);

  if (selectedCert) {
    return (
      <motion.div
        key="cert-detail"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0px",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-start",
            marginBottom: "24px",
          }}
        >
          <button
            onClick={() => setSelectedCert(null)}
            style={{
              fontSize: "11px",
              color: "rgba(139, 92, 246, 0.55)",
              fontFamily: "monospace",
              letterSpacing: "0.2em",
              background: "none",
              border: "1px solid rgba(139, 92, 246, 0.2)",
              padding: "9px 20px",
              borderRadius: "2px",
              cursor: "pointer",
            }}
          >
            ← BACK
          </button>
        </div>

        <div
          style={{
            width: "100%",
            maxWidth: "560px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
          }}
        >
          {selectedCert.link && selectedCert.link !== "#" ? (
            <img
              src={selectedCert.link}
              alt={selectedCert.name}
              style={{
                width: "100%",
                maxHeight: "400px",
                objectFit: "contain",
                borderRadius: "4px",
                border: `1px solid ${selectedCert.accentColor}`,
                boxShadow: `0 0 20px ${selectedCert.accentColor.replace("0.65", "0.1")}`,
              }}
            />
          ) : (
            <WidePlaceholder
              accentColor={selectedCert.accentColor}
              badge={selectedCert.badge}
              height={280}
            />
          )}

          <div
            style={{
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              gap: "6px",
            }}
          >
            <div
              style={{
                fontSize: "19px",
                color: "#ffffff",
                fontFamily: "monospace",
                letterSpacing: "0.07em",
              }}
            >
              {selectedCert.name}
            </div>
            <div
              style={{
                fontSize: "13px",
                color: "rgba(139, 92, 246, 0.5)",
                fontFamily: "monospace",
                letterSpacing: "0.14em",
              }}
            >
              {selectedCert.issuer}
            </div>
            <div
              style={{
                fontSize: "12px",
                color: "rgba(255,255,255,0.2)",
                fontFamily: "monospace",
                letterSpacing: "0.18em",
              }}
            >
              {selectedCert.year}
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      key="cert-list"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "14px",
        }}
      >
        {data.map((cert: any, i: number) => (
          <motion.div
            key={cert.name}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.3 }}
            onMouseEnter={() => setListHovered(i)}
            onMouseLeave={() => setListHovered(null)}
            whileHover={{ scale: 1.02 }}
            style={{
              border: listHovered === i
                ? "1px solid rgba(139, 92, 246, 0.38)"
                : "1px solid rgba(139, 92, 246, 0.12)",
              background: listHovered === i
                ? "rgba(139, 92, 246, 0.04)"
                : "rgba(255,255,255,0.015)",
              borderRadius: "5px",
              overflow: "hidden",
              display: "flex",
              alignItems: "stretch",
              transition: "border-color 0.2s ease, background 0.2s ease",
              boxShadow: listHovered === i
                ? "0 4px 20px rgba(139,92,246,0.08)"
                : "none",
              cursor: "default",
            }}
          >
            {/* Badge column */}
            <div
              style={{
                width: "80px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRight: `1px solid ${cert.accentColor.replace("0.65", "0.18")}`,
                background: cert.accentColor.replace("0.65", "0.06"),
                flexShrink: 0,
                fontSize: "14px",
                fontFamily: "monospace",
                fontWeight: 700,
                color: cert.accentColor,
                letterSpacing: "0.04em",
              }}
            >
              {cert.badge}
            </div>

            <div
              style={{
                flex: 1,
                padding: "20px 24px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "16px",
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: "15px",
                    color: "#ffffff",
                    fontFamily: "monospace",
                    letterSpacing: "0.05em",
                    marginBottom: "5px",
                  }}
                >
                  {cert.name}
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    color: "rgba(139, 92, 246, 0.65)",
                    fontFamily: "monospace",
                    letterSpacing: "0.28em",
                  }}
                >
                  {cert.issuer} · {cert.year}
                </div>
              </div>

              <button
                onClick={() => setSelectedCert(cert)}
                onMouseEnter={() => setListHovered(-i - 100)}
                onMouseLeave={() => setListHovered(i)}
                style={{
                  fontSize: "11px",
                  color: "rgba(139, 92, 246, 0.7)",
                  fontFamily: "monospace",
                  letterSpacing: "0.18em",
                  background: "rgba(139, 92, 246, 0.05)",
                  border: "1px solid rgba(139, 92, 246, 0.22)",
                  padding: "9px 20px",
                  borderRadius: "2px",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                  transition: "all 0.2s ease",
                }}
              >
                PREVIEW
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export default function ModulesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [activePanel, setActivePanel] = useState<string | null>("projects");
  const [closeHovered, setCloseHovered] = useState(false);

  const activeModule = MODULES.find((m) => m.id === activePanel) ?? null;

  function handleCardClick(id: string) {
    setActivePanel((prev) => (prev === id ? null : id));
  }


  return (
    <section
      id="modules"
      ref={ref}
      style={{
        background: "#050510",
        position: "relative",
        padding: "88px 48px",
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
          left: "8%",
          width: "84%",
          height: "1px",
          background: "linear-gradient(to right, transparent, rgba(139, 92, 246, 0.4), transparent)",
          transformOrigin: "left",
        }}
      />

      <div
        style={{
          maxWidth: "1160px",
          margin: "0 auto",
        }}
      >
        {/* ── Heading ──────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: "easeOut" }}
          style={{
            textAlign: "center",
            marginBottom: "48px",
          }}
        >
          <div
            style={{
              fontSize: "11px",
              color: "rgba(139, 92, 246, 0.35)",
              fontFamily: "monospace",
              letterSpacing: "0.5em",
              marginBottom: "12px",
            }}
          >
            [ SYSTEM MODULES ]
          </div>
          <div
            style={{
              fontSize: "30px",
              fontFamily: "monospace",
              letterSpacing: "0.2em",
              fontWeight: 500,
              background: "linear-gradient(135deg, rgba(255,255,255,0.92) 0%, rgba(139,92,246,0.75) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              lineHeight: 1.1,
            }}
          >
            PORTFOLIO SHOWCASE
          </div>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
            style={{
              width: "100px",
              height: "1px",
              background: "linear-gradient(to right, transparent, rgba(139,92,246,0.55), transparent)",
              margin: "14px auto 0",
              transformOrigin: "center",
            }}
          />
        </motion.div>

        {/* ── Module Cards ─────────────────────────────────────────────────── */}
        <div
          className="mobile-tabs"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "16px",
            marginBottom: "20px",
          }}
        >
          {MODULES.map((mod, i) => {
            const isActive = activePanel === mod.id;
            return (
              <motion.div
                key={mod.id}
                initial={{ opacity: 0, y: 28 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.2 + i * 0.1 }}
                onClick={() => handleCardClick(mod.id)}
                whileHover={{
                  scale: 1.02,
                  borderColor: isActive
                    ? "rgba(139, 92, 246, 0.72)"
                    : "rgba(139, 92, 246, 0.35)",
                }}
                style={{
                  border: isActive
                    ? "1px solid rgba(139, 92, 246, 0.58)"
                    : "1px solid rgba(139, 92, 246, 0.16)",
                  background: isActive
                    ? "rgba(139, 92, 246, 0.08)"
                    : "rgba(255,255,255,0.02)",
                  padding: "28px 30px",
                  cursor: "pointer",
                  borderRadius: "6px",
                  position: "relative",
                  overflow: "hidden",
                  transition: "background 0.25s ease, box-shadow 0.25s ease",
                  boxShadow: isActive
                    ? "0 0 32px rgba(139, 92, 246, 0.12)"
                    : "none",
                }}
              >
                <div
                  style={{
                    fontSize: "9px",
                    color: isActive
                      ? "rgba(139, 92, 246, 0.65)"
                      : "rgba(139, 92, 246, 0.3)",
                    fontFamily: "monospace",
                    letterSpacing: "0.32em",
                    marginBottom: "12px",
                    transition: "color 0.2s ease",
                  }}
                >
                  {mod.tag}_MODULE
                </div>

                <div
                  style={{
                    fontSize: "24px",
                    color: isActive
                      ? "rgba(139, 92, 246, 0.85)"
                      : "rgba(139, 92, 246, 0.25)",
                    marginBottom: "12px",
                    transition: "color 0.2s ease",
                    lineHeight: 1,
                  }}
                >
                  {mod.icon}
                </div>

                <div
                  style={{
                    fontSize: "18px",
                    color: isActive ? "#ffffff" : "rgba(255,255,255,0.58)",
                    fontFamily: "monospace",
                    letterSpacing: "0.1em",
                    marginBottom: "7px",
                    fontWeight: 500,
                    transition: "color 0.2s ease",
                  }}
                >
                  {mod.label}
                </div>

                <div
                  style={{
                    fontSize: "12px",
                    color: "rgba(255,255,255,0.25)",
                    fontFamily: "monospace",
                    letterSpacing: "0.04em",
                    lineHeight: 1.55,
                  }}
                >
                  {mod.description}
                </div>

                {/* Active bottom bar */}
                <motion.div
                  animate={{ scaleX: isActive ? 1 : 0 }}
                  transition={{ duration: 0.28 }}
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    height: "2px",
                    background: "linear-gradient(to right, rgba(139,92,246,0.85), rgba(0,212,255,0.45))",
                    transformOrigin: "left",
                  }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* ── Content Panel ────────────────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          {activeModule && (
            <motion.div
              key={activeModule.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              style={{
                border: "1px solid rgba(139, 92, 246, 0.25)",
                background: "rgba(10, 8, 20, 0.85)",
                backdropFilter: "blur(6px)",
                borderRadius: "6px",
                overflow: "hidden",
              }}
            >
              {/* Header */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "18px 32px",
                  borderBottom: "1px solid rgba(139, 92, 246, 0.12)",
                  background: "rgba(139, 92, 246, 0.04)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <div
                    style={{
                      width: "7px",
                      height: "7px",
                      borderRadius: "50%",
                      background: "rgba(0, 212, 255, 0.75)",
                      boxShadow: "0 0 8px rgba(0,212,255,0.55)",
                    }}
                  />
                  <span
                    style={{
                      fontSize: "11px",
                      color: "rgba(139, 92, 246, 0.65)",
                      fontFamily: "monospace",
                      letterSpacing: "0.28em",
                    }}
                  >
                    {activeModule.tag}_MODULE // {activeModule.label.toUpperCase()}
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "22px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "12px",
                      color: "rgba(255,255,255,0.2)",
                      fontFamily: "monospace",
                      letterSpacing: "0.18em",
                    }}
                  >
                    {(activeModule.data as any[]).length} ENTRIES
                  </span>
                  <button
                    onClick={() => setActivePanel(null)}
                    onMouseEnter={() => setCloseHovered(true)}
                    onMouseLeave={() => setCloseHovered(false)}
                    style={{
                      fontSize: "13px",
                      color: closeHovered
                        ? "rgba(139, 92, 246, 0.85)"
                        : "rgba(139, 92, 246, 0.45)",
                      fontFamily: "monospace",
                      letterSpacing: "0.2em",
                      background: "none",
                      border: closeHovered
                        ? "1px solid rgba(139, 92, 246, 0.4)"
                        : "1px solid rgba(139, 92, 246, 0.18)",
                      padding: "5px 14px",
                      borderRadius: "2px",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                  >
                    CLOSE ✕
                  </button>
                </div>
              </div>

              {/* Content */}
              <div
                style={{
                  padding: "28px",
                  maxHeight: "580px",
                  overflowY: "auto",
                  scrollbarWidth: "thin",
                  scrollbarColor: "rgba(139,92,246,0.3) transparent",
                }}
              >
                <AnimatePresence mode="wait">
                  {activePanel === "projects" && (
                    <ProjectsPanel
                      key="projects"
                      data={activeModule.data as any}
                    />
                  )}
                  {activePanel === "skills" && (
                    <SkillsPanel
                      key="skills"
                      data={activeModule.data as any}
                    />
                  )}
                  {activePanel === "certs" && (
                    <CertsPanel
                      key="certs"
                      data={activeModule.data as any}
                    />
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom border */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        style={{
          position: "absolute",
          bottom: 0,
          left: "8%",
          width: "84%",
          height: "1px",
          background: "linear-gradient(to right, transparent, rgba(139, 92, 246, 0.25), transparent)",
          transformOrigin: "left",
        }}
      />
    </section>
  );
}