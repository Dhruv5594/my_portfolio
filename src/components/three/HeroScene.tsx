"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo, useState } from "react";
import * as THREE from "three";
import { Sparkles, Eye, Box, Layers, Cpu, Mail } from "lucide-react";

// Floating particles that react to mouse
function Particles({ count = 100 }: { count?: number }) {
  const meshRef = useRef<THREE.Points>(null);

  const [positions] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return [pos];
  }, [count]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.03;
    meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.02) * 0.08;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#A78BFA"
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  );
}

// Interactive floating 3D node
function InteractiveNode({
  position,
  color,
  label,
  sectionId,
  geometryType = "octahedron",
}: {
  position: [number, number, number];
  color: string;
  label: string;
  sectionId: string;
  geometryType?: "octahedron" | "box" | "tetrahedron";
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime() + position[0];
    meshRef.current.rotation.x = t * 0.4;
    meshRef.current.rotation.y = t * 0.5;
    meshRef.current.position.y = position[1] + Math.sin(t * 1.2) * 0.12;
  });

  const handleClick = () => {
    const el = document.querySelector(sectionId);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <mesh
      ref={meshRef}
      position={position}
      scale={hovered ? 1.25 : 1}
      onClick={handleClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {geometryType === "octahedron" && <octahedronGeometry args={[0.35, 0]} />}
      {geometryType === "box" && <boxGeometry args={[0.45, 0.45, 0.45]} />}
      {geometryType === "tetrahedron" && <tetrahedronGeometry args={[0.4, 0]} />}

      <meshStandardMaterial
        color={color}
        wireframe={!hovered}
        emissive={color}
        emissiveIntensity={hovered ? 0.8 : 0.25}
        roughness={0.2}
      />
    </mesh>
  );
}

// Center Rotating Core Orb
function CentralCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { mouse } = useThree();

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.15 + mouse.y * 0.25;
    meshRef.current.rotation.y = t * 0.2 + mouse.x * 0.25;
    meshRef.current.position.y = Math.sin(t * 0.6) * 0.1;
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.2, 1]} />
      <meshStandardMaterial
        color="#7C3AED"
        wireframe
        transparent
        opacity={0.4}
        emissive="#4C1D95"
        emissiveIntensity={0.6}
      />
    </mesh>
  );
}

export function HeroScene() {
  const [mode, setMode] = useState<"3d" | "2d">("3d");

  if (mode === "2d") {
    return (
      <div className="w-full h-full rounded-3xl bg-[#0d0d16] border border-white/10 p-6 flex flex-col justify-between relative overflow-hidden">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-violet-400">DEV WORKSPACE (2D)</span>
            <button
              onClick={() => setMode("3d")}
              className="text-xs font-mono text-white/50 hover:text-white px-2.5 py-1 rounded bg-white/5 border border-white/10 transition-colors cursor-pointer"
            >
              Toggle 3D View ⟷
            </button>
          </div>
          <p className="text-sm text-white/70">
            Interactive developer stations. Click any module to jump directly to that section:
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 my-auto">
          {[
            { label: "Projects", desc: "FarmEase & EventHub", icon: Layers, href: "#projects", color: "#3B82F6" },
            { label: "Skills", desc: "MERN, Python, C++, DSA", icon: Cpu, href: "#skills", color: "#10B981" },
            { label: "GitHub", desc: "Live API Telemetry", icon: Box, href: "#github", color: "#8B5CF6" },
            { label: "Contact", desc: "WhatsApp & Email", icon: Mail, href: "#contact", color: "#EC4899" },
          ].map((item, i) => (
            <a
              key={i}
              href={item.href}
              className="p-3.5 rounded-xl bg-white/[0.03] border border-white/8 hover:border-violet-500/40 hover:bg-white/[0.06] transition-all group"
            >
              <item.icon size={16} style={{ color: item.color }} className="mb-2" />
              <p className="font-semibold text-white text-xs group-hover:text-violet-300 transition-colors">
                {item.label}
              </p>
              <p className="text-[11px] text-white/40">{item.desc}</p>
            </a>
          ))}
        </div>

        <div className="text-[11px] font-mono text-white/30 text-center">
          Performance Mode Active · 60 FPS
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative">
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 45 }}
        style={{ width: "100%", height: "100%" }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1} color="#A78BFA" />
        <pointLight position={[-3, -3, -2]} intensity={0.5} color="#06B6D4" />

        <CentralCore />
        <Particles count={90} />

        {/* Orbiting Interactive 3D Modules */}
        <InteractiveNode position={[-1.6, 0.7, 0.5]} color="#10B981" label="Skills" sectionId="#skills" geometryType="octahedron" />
        <InteractiveNode position={[1.7, 0.8, -0.2]} color="#3B82F6" label="Projects" sectionId="#projects" geometryType="box" />
        <InteractiveNode position={[1.5, -0.9, 0.4]} color="#8B5CF6" label="GitHub" sectionId="#github" geometryType="tetrahedron" />
        <InteractiveNode position={[-1.5, -0.8, -0.3]} color="#EC4899" label="Contact" sectionId="#contact" geometryType="box" />
      </Canvas>

      {/* Floating Mode Toggle Pill */}
      <div className="absolute top-4 right-4 z-10">
        <button
          type="button"
          onClick={() => setMode("2d")}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 hover:bg-black/80 border border-white/15 text-white/70 hover:text-white text-[11px] font-mono transition-all backdrop-blur-md cursor-pointer"
          title="Switch to 2D performance mode"
        >
          <Box size={12} className="text-violet-400" />
          <span>3D Workspace</span>
          <span className="text-white/30 text-[10px]">⟷ 2D</span>
        </button>
      </div>

      {/* Floating Node Guide */}
      <div className="absolute bottom-4 left-4 z-10 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/40 border border-white/10 backdrop-blur-md text-[11px] font-mono text-white/50">
        <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
        <span>Click 3D nodes to navigate</span>
      </div>
    </div>
  );
}
