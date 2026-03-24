"use client";

import { Canvas } from "@react-three/fiber";
import React from "react";

export default function CanvasContainer({ children }: { children?: React.ReactNode }) {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <Canvas dpr={[1, 1.5]}>
        {/* Basic lighting for the 3D scene */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        
        {children}
      </Canvas>
    </div>
  );
}
