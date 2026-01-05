"use client";
import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSimulation } from '@/context/SimulationContext';

const teamColors: Record<string, string> = {
    alpha: '#06b6d4',
    beta: '#ec4899',
    gamma: '#22c55e',
    delta: '#eab308',
    epsilon: '#8b5cf6',
};

const baseOrbitRadii = [55, 85, 115, 145, 175]; // Fixed orbit lanes

export default function SolarSystem3D({ height = '300px' }: { height?: string }) {
    const { teams: simTeams } = useSimulation();

    // Sort teams by score (highest = rank 1 = innermost orbit)
    const rankedTeams = useMemo(() => {
        if (!simTeams || simTeams.length === 0) return [];
        return [...simTeams].sort((a, b) => b.score - a.score);
    }, [simTeams]);

    return (
        <div
            className="relative w-full overflow-hidden rounded-xl border border-slate-800 bg-gradient-to-br from-slate-950 to-black"
            style={{ height, perspective: '800px' }}
        >
            {/* Tilt Container */}
            <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ transform: 'rotateX(55deg)', transformStyle: 'preserve-3d' }}
            >
                {/* Sun - Central Core */}
                <motion.div
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute z-20 h-8 w-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600"
                    style={{ boxShadow: '0 0 30px rgba(6, 182, 212, 0.8), 0 0 60px rgba(6, 182, 212, 0.4)' }}
                />

                {/* Static Orbit Lanes */}
                {baseOrbitRadii.map((radius, i) => (
                    <div
                        key={`lane-${i}`}
                        className="absolute rounded-full border border-slate-700/40"
                        style={{
                            width: radius * 2,
                            height: radius * 2,
                            left: '50%',
                            top: '50%',
                            transform: 'translate(-50%, -50%)',
                        }}
                    />
                ))}

                {/* Orbiting Team Planets */}
                {rankedTeams.map((team, rankIndex) => {
                    const orbitRadius = baseOrbitRadii[rankIndex] || 175;
                    const color = teamColors[team.id] || '#ffffff';

                    // Velocity affects orbit speed: higher velocity = faster orbit
                    const avgVelocity = team.velocity.reduce((a, b) => a + b, 0) / team.velocity.length;
                    const orbitDuration = Math.max(4, 20 - (avgVelocity / 10)); // 4s (fast) to 20s (slow)

                    // Planet size based on rank
                    const planetSize = 18 - rankIndex * 2;

                    // Score affects glow intensity
                    const glowIntensity = Math.min(30, Math.max(10, team.score / 3));

                    return (
                        <div
                            key={team.id}
                            className="absolute"
                            style={{
                                width: orbitRadius * 2,
                                height: orbitRadius * 2,
                                left: '50%',
                                top: '50%',
                                transform: 'translate(-50%, -50%)',
                                animation: `spin${rankIndex % 2 === 0 ? '' : '-reverse'} ${orbitDuration}s linear infinite`,
                            }}
                        >
                            {/* Planet */}
                            <motion.div
                                className="absolute rounded-full"
                                style={{
                                    width: planetSize,
                                    height: planetSize,
                                    backgroundColor: color,
                                    boxShadow: `0 0 ${glowIntensity}px ${color}`,
                                    top: 0,
                                    left: '50%',
                                    transform: 'translateX(-50%) translateY(-50%)',
                                }}
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
                            />

                            {/* Label */}
                            <div
                                className="absolute text-[8px] font-bold whitespace-nowrap pointer-events-none"
                                style={{
                                    color: color,
                                    top: -2,
                                    left: '50%',
                                    transform: 'translateX(-50%) translateY(-100%)',
                                    textShadow: `0 0 6px ${color}`,
                                    animation: `counter-spin${rankIndex % 2 === 0 ? '' : '-reverse'} ${orbitDuration}s linear infinite`,
                                }}
                            >
                                #{rankIndex + 1}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Leaderboard */}
            <div className="absolute bottom-2 right-2 flex flex-col gap-0.5 text-[9px] font-mono bg-black/60 px-2 py-1 rounded border border-slate-800">
                {rankedTeams.map((team, i) => {
                    const avgVel = (team.velocity.reduce((a, b) => a + b, 0) / team.velocity.length).toFixed(0);
                    return (
                        <div key={team.id} className="flex items-center gap-1.5">
                            <span className="text-slate-500 w-4">#{i + 1}</span>
                            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: teamColors[team.id] }} />
                            <span className="w-12" style={{ color: teamColors[team.id] }}>{team.name.replace('Team ', '')}</span>
                            <span className="text-slate-500 w-6">{team.score.toFixed(0)}pts</span>
                            <span className="text-cyan-600">{avgVel}v</span>
                        </div>
                    );
                })}
            </div>

            {/* CSS Keyframes for rotation */}
            <style jsx>{`
                @keyframes spin {
                    from { transform: translate(-50%, -50%) rotate(0deg); }
                    to { transform: translate(-50%, -50%) rotate(360deg); }
                }
                @keyframes spin-reverse {
                    from { transform: translate(-50%, -50%) rotate(0deg); }
                    to { transform: translate(-50%, -50%) rotate(-360deg); }
                }
                @keyframes counter-spin {
                    from { transform: translateX(-50%) translateY(-100%) rotate(0deg); }
                    to { transform: translateX(-50%) translateY(-100%) rotate(-360deg); }
                }
                @keyframes counter-spin-reverse {
                    from { transform: translateX(-50%) translateY(-100%) rotate(0deg); }
                    to { transform: translateX(-50%) translateY(-100%) rotate(360deg); }
                }
            `}</style>
        </div>
    );
}
