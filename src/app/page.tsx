"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { useSimulation } from "@/context/SimulationContext";
import { useEffect, useState, useRef } from "react";
import dynamic from 'next/dynamic';
import { Github, Rss, Info, Pencil } from "lucide-react";

const MatrixRain = dynamic(() => import('@/components/MatrixRain'), { ssr: false });
const GaussianBeamVortex3DBackground = dynamic(() => import('@/components/GaussianBeamVortex3DBackground'), { ssr: false });

// Feature flag: Set to false to revert to MatrixRain if 3D background doesn't work well
const USE_3D_BACKGROUND = true;

export default function Home() {
  const { startSimulation } = useSimulation();
  const [countdown, setCountdown] = useState<number | null>(null);
  const hasLaunched = useRef(false); // Guard to prevent double-launch

  // Auto-Launch removed in favor of manual selection

  const handleEnterSystem = () => {
    if (hasLaunched.current) return; // Prevent duplicate calls
    setCountdown(3);
  };

  useEffect(() => {
    if (countdown === null || hasLaunched.current) return;
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      hasLaunched.current = true; // Mark as launched
      startSimulation();
    }
  }, [countdown, startSimulation]);

  // Console Easter Egg
  useEffect(() => {
    const styles = [
      'background: linear-gradient(to right, #000000, #111111)',
      'color: #06b6d4',
      'display: block',
      'text-align: center',
      'font-size: 16px',
      'padding: 10px',
      'font-family: monospace',
      'border: 1px solid #06b6d4',
    ].join(';');
    console.log('%c MTCF PROTOCOL INITIATED ', styles);
    console.log('%c > SYSTEM ACCESS: GRANTED', 'color: #10b981; font-family: monospace;');
    console.log('%c > SECRET TOOLS: /editor', 'color: #64748b; font-family: monospace;');
  }, []);

  return (
    <main className="relative flex h-screen w-full flex-col items-center overflow-hidden bg-black text-white selection:bg-cyan-500/30">

      {/* Background - Toggle between 3D Vortex and Matrix Rain */}
      {USE_3D_BACKGROUND ? <GaussianBeamVortex3DBackground /> : <MatrixRain />}

      {/* 3...2...1 Countdown Overlay */}
      <AnimatePresence>
        {countdown !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl"
          >
            <motion.span
              key={countdown}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1.5, opacity: 1 }}
              exit={{ scale: 3, opacity: 0 }}
              className="text-9xl font-bold text-cyan-500 font-mono"
            >
              {countdown === 0 ? "GO" : countdown}
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dark Gradient Overlay - Semi-transparent to show Matrix */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70 z-[2]" />

      {/* MTCF TITLE - At the very top */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="absolute top-4 sm:top-8 left-0 right-0 z-[15] flex flex-col items-center text-center"
      >
        <div className="flex items-center gap-2">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
            MTCF
          </h1>
          <Link href="/about">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 sm:h-10 sm:w-10 rounded-full border-cyan-500/50 bg-cyan-950/30 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-900/50 hover:border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all"
            >
              <Info className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="sr-only">About & IP Info</span>
            </Button>
          </Link>
        </div>
        <p className="text-[10px] sm:text-xs font-light tracking-[0.15em] sm:tracking-[0.2em] text-cyan-400/70 uppercase mt-1">
          MedTech Cognitive Foundry
        </p>
      </motion.div>

      {/* 3D ARENA VISUALIZATION - Centered in top empty space */}
      <div className="absolute inset-0 flex items-start justify-center z-[3] pt-[12vh] sm:pt-[15vh]" style={{ perspective: '1200px' }}>
        <div
          className="relative h-[30vh] w-[30vh] sm:h-[40vh] sm:w-[40vh] md:h-[50vh] md:w-[50vh] lg:h-[60vh] lg:w-[60vh]"
          style={{
            transformStyle: 'preserve-3d',
            transform: 'rotateX(65deg) rotateZ(-15deg)',
          }}
        >
          {/* Depth Shadow Layer (Creates 3D floating effect) */}
          <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/50 blur-3xl"
            style={{ transform: 'translateZ(-100px)' }} />

          {/* Core - Atomic Energy Source */}
          {/* Outer Diffuse Glow - Cyan/Teal */}
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(6,182,212,0.15) 0%, rgba(34,211,238,0.08) 30%, transparent 70%)',
              boxShadow: '0 0 150px 50px rgba(6,182,212,0.15)',
            }}
          />

          {/* Mid Beam Layer - Intense Cyan */}
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(34,211,238,0.4) 0%, rgba(6,182,212,0.2) 40%, transparent 70%)',
              boxShadow: '0 0 60px 20px rgba(34,211,238,0.3)',
            }}
          />

          {/* Inner Intense Core - White/Blue */}
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white blur-md"
            style={{
              boxShadow: '0 0 40px 10px rgba(255,255,255,0.8), 0 0 80px 20px rgba(6,182,212,0.8)',
            }}
          />

          {/* Orbiting Particles (Electrons) - No Visible Orbital Lines */}
          {[0, 60, 120, 180, 240, 300].map((deg, i) => (
            <motion.div
              key={i}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                width: `${250 + i * 20}px`,
                height: `${250 + i * 20}px`,
                transform: `rotateX(${65 + (i % 2) * 20}deg) rotateY(${deg}deg)`,
              }}
              animate={{ rotateZ: 360 }}
              transition={{ duration: 7 + i, repeat: Infinity, ease: "linear" }}
            >
              <div className={`absolute top-0 left-1/2 h-${i % 2 === 0 ? '2' : '3'} w-${i % 2 === 0 ? '2' : '3'} -translate-x-1/2 -translate-y-1/2 rounded-full ${i % 2 === 0 ? 'bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]' : 'bg-teal-400 shadow-[0_0_10px_rgba(45,212,191,0.8)]'}`} />
            </motion.div>
          ))}



        </div>
      </div>

      {/* ARENA SELECTION - Full height scrollable, cards can scroll up */}
      <div className="absolute inset-0 z-10 flex flex-col items-center overflow-y-auto pt-[40vh] sm:pt-[35vh] pb-8 px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl px-4"
        >
          {/* Card 1: AIthon 2026 (Active) */}
          <div
            onClick={handleEnterSystem}
            className="group relative flex flex-col items-center justify-center gap-4 rounded-xl border border-cyan-500/30 bg-black/40 p-6 backdrop-blur-sm transition-all hover:scale-105 hover:border-cyan-400 hover:bg-cyan-950/30 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] cursor-pointer"
          >
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <h3 className="text-xl font-bold text-cyan-50">AIthon 2026</h3>
            <p className="text-xs text-cyan-200/70">Algorithm Optimization Arena</p>
            <Button
              size="sm"
              className="mt-2 bg-cyan-600 hover:bg-cyan-500 text-white shadow-[0_0_20px_rgba(6,182,212,0.4)]"
            >
              ENTER ARENA
            </Button>
          </div>

          {/* Card 2: BioSim Challenge (Coming Soon) */}
          <div className="group relative flex flex-col items-center justify-center gap-4 rounded-xl border border-slate-700/30 bg-black/40 p-6 backdrop-blur-sm opacity-60 grayscale transition-all hover:grayscale-0 hover:opacity-100 cursor-not-allowed">
            <h3 className="text-xl font-bold text-slate-400 group-hover:text-purple-400">BioSim Challenge</h3>
            <p className="text-xs text-slate-500">Molecular Folding Simulation</p>
            <Badge variant="outline" className="mt-2 border-slate-600 text-slate-500">COMING SOON</Badge>
          </div>

          {/* Card 3: CyberMed Defense (Coming Soon) */}
          <div className="group relative flex flex-col items-center justify-center gap-4 rounded-xl border border-slate-700/30 bg-black/40 p-6 backdrop-blur-sm opacity-60 grayscale transition-all hover:grayscale-0 hover:opacity-100 cursor-not-allowed">
            <h3 className="text-xl font-bold text-slate-400 group-hover:text-green-400">CyberMed Defense</h3>
            <p className="text-xs text-slate-500">Network Security Wargame</p>
            <Badge variant="outline" className="mt-2 border-slate-600 text-slate-500">COMING SOON</Badge>
          </div>
        </motion.div>


      </div>

      {/* FOOTER - Fixed Bottom with background for visibility */}
      <div className="absolute bottom-0 left-0 right-0 z-50 flex w-full items-center justify-center px-6 py-4 pb-6 md:pb-4 bg-gradient-to-t from-black via-black/90 to-transparent">
        <div className="flex items-center gap-3">
          <Link href="https://github.com/ERockzilla/mtcf_2026" target="_blank">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-cyan-400 hover:bg-cyan-950/30">
              <Github className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </Button>
          </Link>
          {/* Hidden scratchpad link */}
          <Link href="/scratchpad">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-600/40 hover:text-cyan-400 hover:bg-cyan-950/30 opacity-30 hover:opacity-100 transition-all">
              <Pencil className="h-4 w-4" />
              <span className="sr-only">Scratchpad</span>
            </Button>
          </Link>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-orange-400 hover:bg-orange-950/30" onClick={() => alert("RSS Feed Verified: 12 Active Channels")}>
            <Rss className="h-4 w-4" />
            <span className="sr-only">RSS Feed</span>
          </Button>
        </div>
      </div>
    </main>
  );
}
