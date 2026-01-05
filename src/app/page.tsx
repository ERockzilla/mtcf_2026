"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useSimulation } from "@/context/SimulationContext";
import { useEffect, useState, useRef } from "react";

export default function Home() {
  const { startSimulation } = useSimulation();
  const [countdown, setCountdown] = useState<number | null>(null);
  const hasLaunched = useRef(false); // Guard to prevent double-launch

  // Auto-Launch after 10s idle
  useEffect(() => {
    if (hasLaunched.current) return; // Already launched, skip
    const timer = setTimeout(() => {
      handleEnterSystem();
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

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

  return (
    <main className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-black text-white selection:bg-cyan-500/30">

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

      {/* Background Ambience - Deep Space with Nebula */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#0c1929_0%,_#030712_50%,_#000000_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(6,182,212,0.08)_0%,_transparent_40%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,_rgba(168,85,247,0.06)_0%,_transparent_40%)]" />

      {/* 3D ARENA VISUALIZATION - Enhanced with MTCF Letters */}
      <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: '1200px' }}>
        <div
          className="relative h-[700px] w-[700px]"
          style={{
            transformStyle: 'preserve-3d',
            transform: 'rotateX(65deg) rotateZ(-15deg)',
          }}
        >

          {/* Depth Shadow Layer (Creates 3D floating effect) */}
          <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/50 blur-3xl"
            style={{ transform: 'translateZ(-100px)' }} />

          {/* Core - 3D Gaussian Laser Beam Effect */}
          {/* Outer Diffuse Glow (Gaussian Spread) */}
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(6,182,212,0.15) 0%, rgba(34,211,238,0.08) 30%, transparent 70%)',
              boxShadow: '0 0 150px 50px rgba(6,182,212,0.15)',
            }}
          />

          {/* Mid Beam Layer */}
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(34,211,238,0.4) 0%, rgba(6,182,212,0.2) 40%, transparent 70%)',
              boxShadow: '0 0 60px 20px rgba(34,211,238,0.3)',
            }}
          />

          {/* Inner Intense Core */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(34,211,238,0.8) 30%, rgba(6,182,212,0.5) 60%, transparent 80%)',
              boxShadow: '0 0 40px 15px rgba(34,211,238,0.6), 0 0 80px 30px rgba(6,182,212,0.3)',
            }}
          />

          {/* Laser Peak (Brightest Point) */}
          <motion.div
            animate={{ scale: [0.9, 1.3, 0.9], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
            style={{
              boxShadow: '0 0 20px 10px rgba(255,255,255,0.8), 0 0 40px 20px rgba(34,211,238,0.6), 0 0 80px 30px rgba(6,182,212,0.4)',
            }}
          />

          {/* Vertical Beam Column (Z-axis illusion) */}
          <motion.div
            animate={{ scaleY: [1, 1.5, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-1/2 top-1/2 w-4 h-40 -translate-x-1/2 -translate-y-1/2"
            style={{
              background: 'linear-gradient(to bottom, transparent 0%, rgba(34,211,238,0.6) 40%, rgba(34,211,238,0.6) 60%, transparent 100%)',
              filter: 'blur(4px)',
            }}
          />

          {/* Orbit Ring 1 - "M" */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="absolute left-1/2 top-1/2 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              border: '1px solid rgba(6,182,212,0.3)',
              boxShadow: '0 0 15px rgba(6,182,212,0.15), inset 0 0 15px rgba(6,182,212,0.1)',
            }}
          >
            <motion.span
              className="absolute top-0 left-1/2 text-3xl font-black text-cyan-400"
              style={{
                textShadow: '0 0 20px #22d3ee, 0 0 40px #22d3ee, 0 0 60px rgba(34,211,238,0.5)',
                transformStyle: 'preserve-3d',
              }}
              animate={{
                rotateY: 360,
                rotateZ: -360,
              }}
              transition={{
                rotateY: { duration: 3, repeat: Infinity, ease: "linear" },
                rotateZ: { duration: 12, repeat: Infinity, ease: "linear" },
              }}
            >
              M
            </motion.span>
          </motion.div>

          {/* Orbit Ring 2 - "T" */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute left-1/2 top-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              border: '1px solid rgba(168,85,247,0.3)',
              boxShadow: '0 0 20px rgba(168,85,247,0.15), inset 0 0 20px rgba(168,85,247,0.1)',
            }}
          >
            <motion.span
              className="absolute top-0 left-1/2 text-3xl font-black text-purple-400"
              style={{
                textShadow: '0 0 20px #a855f7, 0 0 40px #a855f7, 0 0 60px rgba(168,85,247,0.5)',
                transformStyle: 'preserve-3d',
              }}
              animate={{
                rotateY: -360,
                rotateZ: 360,
              }}
              transition={{
                rotateY: { duration: 4, repeat: Infinity, ease: "linear" },
                rotateZ: { duration: 20, repeat: Infinity, ease: "linear" },
              }}
            >
              T
            </motion.span>
          </motion.div>

          {/* Orbit Ring 3 - "C" */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute left-1/2 top-1/2 h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              border: '1px solid rgba(236,72,153,0.25)',
              boxShadow: '0 0 25px rgba(236,72,153,0.1), inset 0 0 25px rgba(236,72,153,0.08)',
            }}
          >
            <motion.span
              className="absolute top-0 left-1/2 text-3xl font-black text-pink-400"
              style={{
                textShadow: '0 0 20px #ec4899, 0 0 40px #ec4899, 0 0 60px rgba(236,72,153,0.5)',
                transformStyle: 'preserve-3d',
              }}
              animate={{
                rotateY: 360,
                rotateZ: -360,
              }}
              transition={{
                rotateY: { duration: 5, repeat: Infinity, ease: "linear" },
                rotateZ: { duration: 30, repeat: Infinity, ease: "linear" },
              }}
            >
              C
            </motion.span>
          </motion.div>

          {/* Orbit Ring 4 - "F" (Outermost) */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
            className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              border: '1px dashed rgba(34,197,94,0.2)',
              boxShadow: '0 0 30px rgba(34,197,94,0.08)',
            }}
          >
            <motion.span
              className="absolute top-0 left-1/2 text-2xl font-black text-green-400"
              style={{
                textShadow: '0 0 15px #22c55e, 0 0 30px #22c55e, 0 0 50px rgba(34,197,94,0.5)',
                transformStyle: 'preserve-3d',
              }}
              animate={{
                rotateY: -360,
                rotateZ: 360,
              }}
              transition={{
                rotateY: { duration: 6, repeat: Infinity, ease: "linear" },
                rotateZ: { duration: 45, repeat: Infinity, ease: "linear" },
              }}
            >
              F
            </motion.span>
          </motion.div>

        </div>
      </div>

      {/* CONTENT OVERLAY */}
      <div className="z-10 flex flex-col items-center gap-8 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="space-y-2"
        >
          <h1 className="text-5xl font-bold tracking-tighter sm:text-7xl md:text-9xl bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
            MTCF
          </h1>
          <p className="text-sm font-light tracking-[0.3em] text-cyan-400/80 uppercase">
            MedTech Cognitive Foundry
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <Button
            onClick={handleEnterSystem}
            size="lg"
            className="h-14 rounded-full border border-cyan-500/50 bg-cyan-950/30 px-10 text-lg text-cyan-50 backdrop-blur-md transition-all hover:bg-cyan-900/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.4)]"
          >
            ENTER SYSTEM
          </Button>
        </motion.div>
      </div>

      {/* FOOTER DATA STREAM */}
      <div className="absolute bottom-8 flex w-full justify-between px-8 text-[10px] font-mono text-slate-600">
        <span>FREQ: 40.23Hz</span>
        <span>SYS: ONLINE</span>
        <span>LOC: US-EAST-1</span>
      </div>

    </main>
  );
}
