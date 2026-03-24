"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface BootSequenceProps {
  onComplete: () => void;
}

const BOOT_LINES = [
  "> INITIALIZING_NEURAL_CORE........[OK]",
  "> LOADING_SYSTEM_MODULES..........[OK]",
  "> ESTABLISHING_CONNECTION.........[OK]",
  "> CALIBRATING_INTERFACE...........[OK]",
  "> ALL_SYSTEMS_NOMINAL..............[OK]",
];

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showWelcome, setShowWelcome] = useState(false);
  const [glitch, setGlitch] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const totalLines = BOOT_LINES.length;
    let currentLine = 0;

    const lineTimer = setInterval(() => {
      currentLine += 1;
      setVisibleLines(currentLine);
      setProgress(Math.round((currentLine / totalLines) * 100));

      if (currentLine >= totalLines) {
        clearInterval(lineTimer);
        setTimeout(() => setShowWelcome(true), 500);
      }
    }, 450);

    return () => clearInterval(lineTimer);
  }, []);

  useEffect(() => {
    if (!showWelcome) return;

    const glitchTimer = setTimeout(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 200);
    }, 1200);

    const exitTimer = setTimeout(() => {
      setExiting(true);
      setTimeout(onComplete, 900);
    }, 3000);

    return () => {
      clearTimeout(glitchTimer);
      clearTimeout(exitTimer);
    };
  }, [showWelcome, onComplete]);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          style={{
            position: "fixed",
            inset: 0,
            background: "#050510",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            fontFamily: "monospace",
            overflow: "hidden",
          }}
        >
          {/* Scanning line */}
          <motion.div
            animate={{ y: ["-10vh", "110vh"] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
            style={{
              position: "absolute",
              left: 0,
              width: "100%",
              height: "1px",
              background:
                "linear-gradient(to right, transparent, rgba(0,212,255,0.6), transparent)",
              pointerEvents: "none",
            }}
          />

          {/* Corner decorations */}
          {[
            { top: 24, left: 24, borderTop: "1px solid", borderLeft: "1px solid" },
            { top: 24, right: 24, borderTop: "1px solid", borderRight: "1px solid" },
            { bottom: 24, left: 24, borderBottom: "1px solid", borderLeft: "1px solid" },
            { bottom: 24, right: 24, borderBottom: "1px solid", borderRight: "1px solid" },
          ].map((style, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              style={{
                position: "absolute",
                width: 40,
                height: 40,
                borderColor: "rgba(0,212,255,0.3)",
                ...style,
              }}
            />
          ))}

          {/* NEURAL CORE identity header */}
          <motion.div
            initial={{ opacity: 0, letterSpacing: "0.8em" }}
            animate={{ opacity: 1, letterSpacing: "0.4em" }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{
              color: "rgba(0,212,255,0.9)",
              fontSize: "clamp(11px, 1.5vw, 14px)",
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              marginBottom: "8px",
              fontWeight: 300,
            }}
          >
            [ RJ.SYSTEM ]
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{
              width: "360px",
              height: "1px",
              background: "rgba(0,212,255,0.2)",
              marginBottom: "32px",
              transformOrigin: "left",
            }}
          />

          {/* Terminal lines */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            marginBottom: "24px",
            width: "360px",
          }}>
            {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                style={{
                  color: i === BOOT_LINES.length - 1
                    ? "#00d4ff"
                    : "rgba(0,212,255,0.45)",
                  fontSize: "11px",
                  letterSpacing: "0.12em",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                {line}
              </motion.div>
            ))}
          </div>

          {/* Progress bar */}
          <div style={{
            width: "360px",
            marginBottom: "48px",
          }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "9px",
              color: "rgba(0,212,255,0.4)",
              letterSpacing: "0.15em",
              marginBottom: "6px",
            }}>
              <span>BOOT_PROGRESS</span>
              <span>{progress}%</span>
            </div>
            <div style={{
              width: "100%",
              height: "2px",
              backgroundColor: "rgba(255,255,255,0.06)",
            }}>
              <motion.div
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                style={{
                  height: "100%",
                  backgroundColor: "#00d4ff",
                  boxShadow: "0 0 8px #00d4ff",
                }}
              />
            </div>
          </div>

          {/* Welcome text */}
          <AnimatePresence>
            {showWelcome && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                style={{
                  textAlign: "center",
                  position: "absolute",
                  bottom: "18%",
                }}
              >
                <motion.h1
                  animate={{
                    opacity: glitch ? [1, 0.2, 1, 0.5, 1] : 1,
                    x: glitch ? [-3, 3, -2, 2, 0] : 0,
                    textShadow: glitch
                      ? "2px 0 #ff00ff, -2px 0 #00ffff"
                      : [
                        "0 0 10px #00d4ff",
                        "0 0 40px #00d4ff",
                        "0 0 20px #00d4ff",
                      ],
                  }}
                  transition={{ duration: glitch ? 0.2 : 1.5 }}
                  style={{
                    color: "#00d4ff",
                    fontSize: "clamp(35px, 3vw, 28px)",
                    letterSpacing: "0.35em",
                    textTransform: "uppercase",
                    fontWeight: 300,
                    margin: 0,
                  }}
                >
                  Welcome to my Portfolio
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  style={{
                    color: "rgba(255,255,255,0.2)",
                    fontSize: "10px",
                    letterSpacing: "0.3em",
                    marginTop: "12px",
                    textTransform: "uppercase",
                  }}
                >
                  Initializing interface...
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
